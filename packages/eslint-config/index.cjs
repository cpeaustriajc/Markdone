module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
		'next/core-web-vitals',
		'turbo',
		'prettier',
	],
	parserOptions: {
		parser: '@typescript-eslint/parser',
		babelOptions: {
			presets: [require.resolve('next/babel')],
		},
	},
	plugins: ['@typescript-eslint', '@tanstack/eslint-plugin-query'],
}
