// @see lint-staged section https://nextjs.org/docs/pages/building-your-application/configuring/eslint
const path = require("path");

const eslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const formatCommand = "prettier --write";

module.exports = {
  // this will check Typescript files.
  "**/*.(ts|tsx)": () => "pnpm tsc --noEmit",
  // this will lint and format on the selected extensions.
  "*.{js,jsx,ts,tsx}": [formatCommand, eslintCommand],
};
