const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  input: "./src/LitDeviewInfinite.ts",
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    output: "./dist/infinite.esm.js",
    exports: "named",
  },
  {
    ...defaultOptions,
    format: "cjs",
    output: "./dist/infinite.cjs.js",
    exports: "named",
  },
  {
    ...defaultOptions,
    format: "umd",
    name: "UMD",
    output: "./dist/infinite.umd.js",
    exports: "named",
    resolve: true,
  },
]);
