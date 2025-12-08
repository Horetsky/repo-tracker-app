import baseConfig from "../../eslint.config.js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
    ...baseConfig,
    {
        plugins: {
            "@next/next": nextPlugin,
        },
    },
];