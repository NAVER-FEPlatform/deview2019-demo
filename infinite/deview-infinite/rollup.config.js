const buildHelper = require("@egjs/build-helper");
const name = "eg.InfiniteGrid";

export default buildHelper([
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinitegrid.cjs.js",
		format: "esm",
		external,
	},
	{
		name,
		input: "./src/index.ts",
		output: "./dist/infinitegrid.esm.js",
		format: "esm",
		external,
	},
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinitegrid.js",
		format: "umd",
		resolve: true,
	},
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinitegrid.min.js",
		format: "umd",
		resolve: true,
		uglify: true,
	},
]);
