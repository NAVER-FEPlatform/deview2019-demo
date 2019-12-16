import { LitElement, html, customElement, property } from 'lit-element';
import { repeat, ItemTemplate } from 'lit-html/directives/repeat';
import VanillaInfinite, { InfiniteOptions } from "@egjs/deview-infinite";

/*
     tag: "div",
        options: {},
        onAppend: () => { },
    };
    private infinite!: VanillaInfinite;
    private container!: HTMLElement;

    public render() {
        const props = this.props;
        const Tag = props.tag as any;
        const attributes = { ...props };

        delete attributes.tag;
        delete attributes.options;

        return (
            <Tag {...attributes}></Tag>
        );
    }
    public componentDidMount() {
        this.container = ReactDOM.findDOMNode(this) as HTMLElement;
        this.infinite = new VanillaInfinite(
            this.container,
            {
                ...this.props.options,
                renderExternal: true,
            },
        ).on("append", e => {
            this.props.onAppend!({ ...e });
        });

*/

@customElement("lit-deview-infinite")
export class LitDeviewInfinite extends LitElement {
    private infinite: VanillaInfinite;

    @property({
        type: Object
    }) options: Partial<InfiniteOptions> = {};
    @property({
        type: Array
    }) items: any[] = [];
    @property({
        type: Function,
    }) itemBy: (item: any, index: number) => any = item => item;
    @property({
        type: Function,
    }) template: ItemTemplate<any> = () => "";

    render() {
        return html`
        ${repeat(this.items, this.itemBy, this.template)}
        `;
    }
    firstUpdated() {
        this.infinite = new VanillaInfinite(
            this,
            {
                ...this.options,
                renderExternal: true,
            },
        ).on("append", e => {
            this.dispatchEvent(new CustomEvent('append', {
                detail: { ...e },
            }));
        });
    }
    updated() {
        this.infinite.sync([].slice.call(this.shadowRoot.children));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.infinite.destroy();
    }
}



declare global {
    interface HTMLElementTagNameMap {
        "lit-deview-infinite": LitDeviewInfinite;
    }
}
