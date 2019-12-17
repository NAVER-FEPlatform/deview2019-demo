const buildHelper = require("@egjs/build-helper");
const preact = require("rollup-plugin-preact");


const defaultOptions = {
    sourcemap: false,
    tsconfig: "tsconfig.build.json",
    external: {
        "preact": "preact",
        "preact/compat": "preact/compat",
        "@egjs/agent": "eg.Agent",
        "@egjs/deview-recycle": "eg.DeviewRecycle",
        "@egjs/children-differ": "eg.ChildrenDiffer",
    },
    exports: "named",
    plugins: [
        preact({
            noPropTypes: false,
            noEnv: false,
            noReactIs: false,
            usePreactX: true,
        }),
    ],
};

export default buildHelper([
    {
        ...defaultOptions,
        input: "src/preact-deview-recycle/Recycle.ts",
        output: "./dist/recycle.esm.js",
        format: "es",
    },
    {
        ...defaultOptions,
        input: "src/preact-deview-recycle/Recycle.ts",
        output: "./dist/recycle.cjs.js",
        format: "cjs",
        exports: "default",
    },
]);
