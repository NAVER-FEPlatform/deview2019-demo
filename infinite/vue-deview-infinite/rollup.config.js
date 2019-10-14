const buildHelper = require("@egjs/build-helper");


const defaultOptions = {
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    input: "./src/index.ts",
    output: "./dist/infinite.esm.js",
    exports: "named",
  },
  {
    ...defaultOptions,
    format: "cjs",
    input: "./src/index.umd.ts",
    output: "./dist/infinite.cjs.js",
  },
]);
