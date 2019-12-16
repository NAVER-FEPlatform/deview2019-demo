import { LitElement, html, customElement, property } from 'lit-element';
import { repeat, ItemTemplate } from 'lit-html/directives/repeat';
import VanillaRecycle, { RecycleOptions } from "@egjs/deview-recycle";

@customElement("lit-deview-recycle")
export class LitDeviewRecycle extends LitElement {
    private recycle: VanillaRecycle;

    @property({
        type: Object
    }) options: Partial<RecycleOptions> = {};
    @property({
        type: Array
    }) items: any[] = [];
    @property({
        type: Function,
    }) itemBy: (item: any, index: number) => any = item => item;
    @property({
        type: Function,
    }) css: ItemTemplate<any> = () => "";
    @property({
        type: Function,
    }) template: ItemTemplate<any> = () => "";

    render() {
        const recycle = this.recycle;
        const items = this.items;
        const itemBy = this.itemBy;
        let start = 0;
        let end = items.length;

        if (this.recycle) {
            recycle.beforeSync(items.map(itemBy));
            const indexes = recycle.getRenderingIndexes();

            start = indexes.start;
            end = indexes.end;
          }
          return html`
          ${this.css}
        ${repeat(items, this.itemBy, (item, i) => {
            if ( start <= i && i <= end) {
                return this.template(item, i);
            } else {
                return undefined;
            }
        })}
        `;
    }
    firstUpdated() {
        this.recycle = new VanillaRecycle(
            this,
            {
                ...this.options,
                renderExternal: true,
            },
        ).on("append", e => {
            this.dispatchEvent(new CustomEvent('append', {
                detail: { ...e },
            }));
        }).on("visibleChange", e => {
            this.dispatchEvent(new CustomEvent('visibleChange', {
                detail: { ...e },
            }));
            this.requestUpdate();
        });
    }
    updated() {
        this.recycle.sync([].slice.call(this.shadowRoot.querySelectorAll(":not(style)")));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.recycle.destroy();
    }
}



declare global {
    interface HTMLElementTagNameMap {
        "lit-deview-recycle": LitDeviewRecycle;
    }
}
