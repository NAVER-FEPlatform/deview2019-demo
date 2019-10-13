const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  input: "./src/react-deview-recycle/index.ts",
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    output: "./dist/recycle.esm.js",
  },
  {
    ...defaultOptions,
    format: "cjs",
    output: "./dist/recycle.cjs.js",
  },
]);
