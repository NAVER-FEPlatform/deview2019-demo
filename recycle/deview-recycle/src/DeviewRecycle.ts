import Component from "@egjs/component";
import { diff } from "@egjs/list-differ";
import { RecycleOptions, Item } from "./types";

function makeElement(html: string) {
    const el = document.createElement("div");

    el.innerHTML = html;
    return el.children[0] as HTMLElement;
}

export default class DeviewRecycle extends Component {
    public options!: RecycleOptions;
    private items: Item[] = [];
    private containerOffset = 0;
    private containerHeight = 0;
    private scrollHeight = 0;
    private timer = 0;
    private startCursor = -1;
    private endCursor = -1;
    constructor(
        private container: HTMLElement,
        options: Partial<RecycleOptions> = {},
    ) {
        super();
        this.options = {
            threshold: 100,
            margin: 0,
            renderExternal: false,
            overflow: false,
            ...options,
        };
        if (options.overflow) {
            container.style.overflow = "scroll";
        }

        (options.overflow ? container : window).addEventListener("scroll", this.onScroll);
        window.addEventListener("resize", this.onResize);

        this.onResize();
        this.onScroll();
    }
    public insert(index: number, data: HTMLElement | string, key: any) {
        const renderExternal = this.options.renderExternal;
        const items = this.items;
        const item: Item = {
            el: renderExternal
                ? null
                : (typeof data === "object" ? data : makeElement(data)),
            key,
            size: 0,
            pos: 0,
            mounted: false,
            updated: false,
        };
        items.splice(index, 0, item);

        if (!renderExternal) {
            this.refreshCursor();
            this.layout();
        }
        return item;
    }
    public remove(index: number) {
        const options = this.options;
        const item = this.items.splice(index, 1)[0];

        if (!options.renderExternal) {
            if (item.mounted) {
                this.container.removeChild(item.el!);
            }
            this.refreshCursor();
            this.layout();
        }
        return item;
    }
    public layout() {
        const {
            overflow,
            margin = 0,
        } = this.options;
        let pos = 0;
        this.items.forEach(item => {
            if (item.mounted && !item.updated) {
                item.size = item.el!.offsetHeight;
                item.updated = true;
            }
            item.pos = pos;
            pos += item.size + margin;
        });
        if (!overflow) {
            this.container.style.height = `${pos}px`;
        }
        this.scrollHeight = pos;
        this.items.forEach(item => {
            if (!item.mounted) {
                return;
            }
            item.el!.style.cssText += `position: absolute;top: ${item.pos}px;`;
        });
        this.onScroll();
        return this;
    }
    public beforeSync(data: any[]) {
        const items = this.items;
        const itemKeys = this.items.map(item => item.key);
        const result = diff(itemKeys, data, key => key);

        result.removed.forEach(index => {
            this.remove(index);
        });
        result.ordered.forEach(([fromIndex, toIndex]) => {
            const item = items.splice(fromIndex, 1)[0];

            items.splice(toIndex, 0, item);
        });
        result.added.forEach(index => {
            this.insert(index, "", data[index]);
        });
        this.refreshCursor();
    }
    public sync(elements: HTMLElement[]) {
        this.items.slice(this.startCursor, this.endCursor + 1).forEach((item, i) => {
            item.el = elements[i];
            item.mounted = true;
        });
        this.layout();
        return this;
    }
    public append(data: HTMLElement | string) {
        this.insert(this.items.length, data, "");
        return this;
    }
    public destroy() {
        (this.options.overflow ? this.container : window).removeEventListener("scroll", this.onScroll);
        window.removeEventListener("resize", this.onResize);
    }
    public getRenderingIndexes() {
        return { start: this.startCursor, end: this.endCursor };
    }
    private onScroll = () => {
        const {
            threshold,
            overflow,
        } = this.options;
        const scrollTop = overflow ? this.container.scrollTop : document.documentElement.scrollTop;
        const relativeScrollTop = scrollTop - this.containerOffset;

        // 아무 고려하지 않은채.
        const items = this.items;
        const length = items.length;

        if (length) {
            const endScrollTop = relativeScrollTop + this.containerHeight;
            let startCursor = -1;
            let endCursor = -1;

            const visibleItems = items.filter((item, i) => {
                const startPos = item.pos;
                const endPos = startPos + item.size;

                if (startPos - threshold <= endScrollTop && scrollTop <= endPos + threshold) {
                    startCursor < 0 && (startCursor = i);
                    endCursor = i;
                    return true;
                } else {
                    return false;
                }
            });

            if (!visibleItems.length) {
                if (items[length - 1].pos < scrollTop) {
                    startCursor = length - 1;
                    endCursor = startCursor;
                } else {
                    startCursor = 0;
                    endCursor = 0;
                }
            }
            this.setCursor(startCursor, endCursor);

            if (endCursor !== length - 1) {
                return;
            }
        }

        if (
            relativeScrollTop > this.scrollHeight - this.containerHeight - threshold
        ) {
            clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                this.trigger("append", {
                    requestIndex: this.items.length,
                });
            }, 60);
        }
    }
    private onResize = () => {
        const overflow = this.options.overflow;
        this.containerOffset = overflow ? 0 : this.container.getBoundingClientRect().top;
        this.containerHeight = overflow ? this.container.offsetHeight : window.innerHeight;
        this.items.forEach(item => {
            item.updated = false;
        });
        this.layout();
    }
    private refreshCursor() {
        let startCursor = -1;
        let endCursor = -1;

        this.items.forEach((item, i) => {
            if (!item.mounted) {
                return;
            }
            (startCursor < 0) && (startCursor = i);
            endCursor = i;
        });
        this.startCursor = startCursor;
        this.endCursor = endCursor;
    }
    private setCursor(startCursor: number, endCursor: number) {
        const container = this.container;
        const items = this.items;
        const renderExternal = this.options.renderExternal;

        this.recycle([
            { start: 0, end: startCursor - 1 },
            { start: endCursor + 1, end: items.length },
        ]);
        const prevStartCursor = this.startCursor;
        const prevEndCursor = this.endCursor;
        this.startCursor = startCursor;
        this.endCursor = endCursor;

        for (let i = endCursor; i >= startCursor; --i) {
            const item = items[i];
            if (item.mounted) {
                continue;
            }
            const nextItem = items[i + 1];
            const child = nextItem && nextItem.mounted ? nextItem.el : null;

            if (!renderExternal) {
                container.insertBefore(item.el!, child);
            }
            item.mounted = true;
        }

        if (!renderExternal && (prevStartCursor !== startCursor || prevEndCursor !== endCursor)) {
            this.layout();
        }
        this.trigger("visibleChange", {
            startCursor,
            endCursor,
        });
    }
    private recycle(ranges: Array<{ start: number, end: number }>) {
        const items = this.items;
        const renderExternal = this.options.renderExternal;

        ranges.forEach(({ start, end }) => {
            for (let i = start; i <= end; ++i) {
                const item = items[i];

                if (!item || !item.mounted) {
                    continue;
                }
                item.mounted = false;

                if (!renderExternal) {
                    this.container.removeChild(item.el!);
                }
            }
        });
    }
}
