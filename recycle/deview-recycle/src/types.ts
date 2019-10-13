export interface RecycleOptions {
    renderExternal: boolean;
    overflow: boolean;
    margin: number;
    threshold: number;
}
export interface Item {
    key: any;
    pos: number;
    size: number;
    el: HTMLElement | null;
    mounted: boolean;
    updated: boolean;
}
