import buildHelper from "@egjs/build-helper";
import svelte from 'rollup-plugin-svelte';
import babel from "rollup-plugin-babel";

const defaultOptions = {
	tsconfig: "",
	input: './src/DeviewRecycle.svelte',
	commonjs: true,
	external: {
		"svelte": "svelte",
	},
	plugins: [
		svelte(),
	],
}
export default buildHelper([
	{
		...defaultOptions,
		output: "dist/recycle.cjs.js",
		format: "cjs",
	},
	{
		...defaultOptions,
		output: "dist/recycle.esm.js",
		format: "es",
	},
]);