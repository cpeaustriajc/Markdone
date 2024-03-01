import { Config } from "tailwindcss";

export default {
	content: ['./src/**/*.{ts,tsx}', './index.html'],
	theme: {},
	plugins: [require('@tailwindcss/typography')],
} satisfies Config
