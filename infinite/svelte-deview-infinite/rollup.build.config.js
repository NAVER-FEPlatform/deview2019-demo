import buildHelper from "@egjs/build-helper";
import svelte from 'rollup-plugin-svelte';

const defaultOptions = {
	tsconfig: "",
	input: './src/DeviewInfinite.svelte',
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
		output: "dist/infinite.cjs.js",
		format: "cjs",
	},
	{
		...defaultOptions,
		output: "dist/infinite.esm.js",
		format: "es",
	},
]);