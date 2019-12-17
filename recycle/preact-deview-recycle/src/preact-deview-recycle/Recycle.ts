import DeviewRecycle from "@egjs/react-deview-recycle";
import { RecycleProps } from "@egjs/react-deview-recycle/declaration/types";
import Preact, { Component } from "preact";

export default DeviewRecycle as any as new (...args: any[]) => Component<RecycleProps>;
