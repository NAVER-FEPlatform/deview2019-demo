const buildHelper = require("@egjs/build-helper");
const preact = require("rollup-plugin-preact");


const defaultOptions = {
    sourcemap: false,
    tsconfig: "tsconfig.build.json",
    external: {
        "preact": "preact",
        "preact/compat": "preact/compat",
        "@egjs/agent": "eg.Agent",
        "@egjs/deview-infinite": "eg.DeviewInfinite",
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
        input: "src/preact-deview-infinite/Infinite.ts",
        output: "./dist/infinite.esm.js",
        format: "es",
    },
    {
        ...defaultOptions,
        input: "src/preact-deview-infinite/Infinite.ts",
        output: "./dist/infinite.cjs.js",
        format: "cjs",
        exports: "default",
    },
]);
