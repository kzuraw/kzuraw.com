import { type Configuration } from "lint-staged";

const config: Configuration = {
  "*": "prettier --ignore-unknown --write",
  "package.json": "sort-package-json",
};

export default config;
