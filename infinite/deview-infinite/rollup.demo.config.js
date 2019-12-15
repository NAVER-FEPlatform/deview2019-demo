const buildHelper = require("@egjs/build-helper");

export default buildHelper([
	{
		input: "./demo/",
		output: "./dist/infinite.min.js",
		format: "umd",
		exports: "default",
		resolve: true,
	},
]);
