module.exports = {
	extends: ["stylelint-config-standard"],
	overrides: [
		{
			files: ["*.astro", "**/*.astro"],
			customSyntax: "postcss-html",
		},
	],
	rules: {
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"],
			},
		],
		"function-no-unknown": [true, { ignoreFunctions: ["theme"] }],
		"declaration-empty-line-before": "never",
		"no-descending-specificity": null,
		"custom-property-empty-line-before": "never",
		"hue-degree-notation": "number",
		"alpha-value-notation": "number",
		"selector-pseudo-class-no-unknown": [
			true,
			{
				ignorePseudoClasses: ["global"],
			},
		],
	},
};
