import * as React from "react";
import VanillaRecycle from "@egjs/deview-recycle";
import { RecycleProps } from "./types";
import * as ReactDOM from "react-dom";

export default class DeviewRecycle extends React.PureComponent<RecycleProps> {
    public static defaultProps: Required<RecycleProps> = {
        tag: "div",
        options: {},
        onAppend: () => { },
        onVisibleChange: () => { },
    };
    private recycle!: VanillaRecycle;
    private container!: HTMLElement;

    public render() {
        const props = this.props;
        const Tag = props.tag as any;
        const attributes = { ...props };

        delete attributes.tag;
        delete attributes.options;
        delete attributes.children;

        let visibleChildren: React.ReactElement[] = [];

        if (this.recycle) {
            const children = React.Children.toArray(this.props.children) as React.ReactElement[];
            this.recycle.beforeSync(children.map(child => child.key));

            const indexes = this.recycle.getRenderingIndexes();

            visibleChildren = children.slice(indexes.start, indexes.end + 1);
        }
        return (
            <Tag {...attributes}>{visibleChildren}</Tag>
        );
    }
    public componentDidMount() {
        this.container = ReactDOM.findDOMNode(this) as HTMLElement;
        this.recycle = new VanillaRecycle(
            this.container,
            {
                ...this.props.options,
                renderExternal: true,
            },
        ).on("append", e => {
            this.props.onAppend!({ ...e });
        }).on("visibleChange", e => {
            this.props.onVisibleChange!({ ...e });
            this.forceUpdate();
        });

        this.recycle.sync([].slice.call(this.container.children));
    }
    public componentDidUpdate() {
        this.recycle.sync([].slice.call(this.container.children));
    }
}
