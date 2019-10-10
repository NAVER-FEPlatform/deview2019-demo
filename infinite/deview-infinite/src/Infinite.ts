import { DiffResult } from "@egjs/list-differ";
import { InifniteOptions, Item } from "./types";

function makeElement(html: string) {
    const el = document.createElement(html);

    el.innerHTML = html;
    return el.children[0] as HTMLElement;
}
export default class Infinite {
    private items: Item[] = [];
    constructor(
        private container: HTMLElement,
        private options: Partial<InifniteOptions> = {},
    ) { }
    public insert(index: number, data: HTMLElement | string) {
        const options = this.options;
        const items = this.items;
        const item: Item = {
            el: typeof data === "object" ? data : makeElement(data),
            pos: 0,
        };
        items.splice(index, 0, item);

        if (!options.renderExternal) {
            const nexItem = items[index + 1];
            this.container.insertBefore(item.el, nexItem ? nexItem.el : null);
        }
    }
    public remove(index: number) {
        const options = this.options;
        const item = this.items.splice(index, 1)[0];

        if (!options.renderExternal) {
            this.container.removeChild(item.el);
        }
        return item;
    }
    public layout() {

    }
    public sync(result: DiffResult<HTMLElement>) {
        const { removed, ordered, added, list } = result;

        removed.forEach(index => {
            this.remove(index);
        });
        ordered.forEach(([fromIndex, toIndex]) => {
            const item = this.remove(fromIndex);

            this.insert(toIndex, item.el);
        });
        added.forEach(index => {
            this.insert(index, list[index]);
        });
    }
}
