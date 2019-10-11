import { InfiniteOptions } from "@egjs/deview-infinite";

export interface InfiniteProps {
    tag?: string;
    options?: Partial<InfiniteOptions>;
    onAppend?: (e: { requestIndex?: number }) => any,
    [key: string]: any;
}
