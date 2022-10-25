module.exports = {
  // this will check Typescript files
  "**/*.(ts)": () => "yarn tsc --noEmit",

  // This will lint and format TypeScript and JavaScript files
  "**/*.(ts|js)": filenames => [
    `yarn eslint ${filenames.join(" ")}`,
    `yarn prettier --write ${filenames.join(" ")}`,
  ],

  // this will Format MarkDown and JSON
  "**/*.(md|json)": filenames => `yarn prettier --write ${filenames.join(" ")}`,
};
