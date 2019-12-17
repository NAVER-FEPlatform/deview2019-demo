import DeviewInfinite from "@egjs/react-deview-infinite";
import { InfiniteProps } from "@egjs/react-deview-infinite/declaration/types";
import Preact, { Component } from "preact";

export default DeviewInfinite as any as new (...args: any[]) => Component<InfiniteProps>;
