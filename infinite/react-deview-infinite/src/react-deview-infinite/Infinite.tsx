import * as React from "react";
import VanillaInfinite from "@egjs/deview-infinite";
import { InfiniteProps } from "./types";
import * as ReactDOM from "react-dom";

export default class Infinite extends React.PureComponent<InfiniteProps> {
    public static defaultProps: Required<InfiniteProps> = {
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

        this.infinite.sync([].slice.call(this.container.children));
    }
    public componentDidUpdate() {
        this.infinite.sync([].slice.call(this.container.children));
    }
}
