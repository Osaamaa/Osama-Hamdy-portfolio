import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // Full-document links also work on any static host and use native view transitions.
  { rules: { "@next/next/no-html-link-for-pages": "off" } },
  globalIgnores([".next/**", "out/**", ".cache/**", "test-results/**", "playwright-report/**", "next-env.d.ts"]),
]);
