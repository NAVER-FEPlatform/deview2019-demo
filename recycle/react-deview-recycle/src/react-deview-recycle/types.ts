import { RecycleOptions } from "@egjs/deview-recycle";

export interface RecycleProps {
    tag?: string;
    options?: Partial<RecycleOptions>;
    onAppend?: (e: { requestIndex?: number }) => any,
    [key: string]: any;
}
