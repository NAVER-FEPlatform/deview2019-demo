export interface InfiniteOptions {
    renderExternal: boolean;
    overflow: boolean;
    margin: number;
    threshold: number;
}
export interface Item {
    pos: number;
    size: number;
    el: HTMLElement;
}
