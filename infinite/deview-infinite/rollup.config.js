const buildHelper = require("@egjs/build-helper");
const name = "Infinite";

export default buildHelper([
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinite.cjs.js",
		exports: "named",
		format: "cjs",
	},
	{
		name,
		input: "./src/index.ts",
		output: "./dist/infinite.esm.js",
		exports: "named",
		format: "es",
	},
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinite.js",
		format: "umd",
		exports: "default",
		resolve: true,
	},
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinite.min.js",
		format: "umd",
		exports: "default",
		resolve: true,
		uglify: true,
	},
]);
