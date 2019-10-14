const buildHelper = require("@egjs/build-helper");


const defaultOptions = {
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    input: "./src/index.ts",
    output: "./dist/recycle.esm.js",
    exports: "named",
  },
  {
    ...defaultOptions,
    format: "cjs",
    input: "./src/index.umd.ts",
    output: "./dist/recycle.cjs.js",
  },
]);
