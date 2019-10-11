const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  input: "./src/react-deview-infinite/index.ts",
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    output: "./dist/infinite.esm.js",
  },
  {
    ...defaultOptions,
    format: "cjs",
    output: "./dist/infinite.cjs.js",
  },
]);
