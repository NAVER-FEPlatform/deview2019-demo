const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  input: "./src/LitDeviewRecycle.ts",
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    output: "./dist/recycle.esm.js",
    exports: "named",
  },
  {
    ...defaultOptions,
    format: "cjs",
    output: "./dist/recycle.cjs.js",
    exports: "named",
  },
]);
