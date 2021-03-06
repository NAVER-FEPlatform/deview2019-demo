import Component from "@egjs/component";
import { diff, ChildrenDiffResult } from "@egjs/children-differ";
import { InfiniteOptions, Item } from "./types";

function makeElement(html: string) {
    const el = document.createElement("div");

    el.innerHTML = html;
    return el.children[0] as HTMLElement;
}

export default class DeviewInfinite extends Component {
    public options!: InfiniteOptions;
    private items: Item[] = [];
    private containerOffset = 0;
    private containerHeight = 0;
    private scrollHeight = 0;
    private timer = 0;
    constructor(
        private container: HTMLElement,
        options: Partial<InfiniteOptions> = {},
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
    public insert(index: number, data: HTMLElement | string) {
        const options = this.options;
        const items = this.items;
        const item: Item = {
            el: typeof data === "object" ? data : makeElement(data),
            size: 0,
            pos: 0,
        };
        items.splice(index, 0, item);

        if (!options.renderExternal) {
            const nexItem = items[index + 1];
            this.container.insertBefore(item.el, nexItem ? nexItem.el : null);
            this.layout();
        }
        return item;
    }
    public remove(index: number) {
        const options = this.options;
        const item = this.items.splice(index, 1)[0];

        if (!options.renderExternal) {
            this.container.removeChild(item.el);
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
            if (!item.size) {
                item.size = item.el.offsetHeight;
            }
            item.pos = pos;
            pos += item.size + margin;
        });
        if (!overflow) {
            this.container.style.height = `${pos}px`;
        }
        this.scrollHeight = pos;
        this.items.forEach(item => {
            item.el.style.cssText += `position: absolute;top: ${item.pos}px;`;
        });
        this.onScroll();
        return this;
    }
    public sync(elements: HTMLElement[]) {
        const items = this.items;
        const { maintained, added } = diff(items.map(item => item.el), elements) as ChildrenDiffResult<HTMLElement>;

        const nextList: Item[] = [];

        maintained.forEach(([fromIndex]) => {
            nextList.push(items[fromIndex]);
        });
        this.items = nextList;

        added.forEach(index => {
            this.insert(index, elements[index]);
        });
        this.layout();
        return this;
    }
    public append(data: HTMLElement | string) {
        this.insert(this.items.length, data);
        return this;
    }
    public destroy() {
        (this.options.overflow ? this.container : window).removeEventListener("scroll", this.onScroll);
        window.removeEventListener("resize", this.onResize);
    }
    private onScroll = () => {
        const {
            threshold,
            overflow,
        } =  this.options;
        const scrollTop = overflow
            ? this.container.scrollTop
            : window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        const relativeScrollTop = scrollTop - this.containerOffset;

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
        this.containerOffset = overflow
            ? 0
            : this.container.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        this.containerHeight = overflow ? this.container.offsetHeight : window.innerHeight;
        this.items.forEach(item => {
            item.size = 0;
        });
        this.layout();
    }
}
