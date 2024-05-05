module.exports = {
  "*.{js,jsx,ts,tsx}": ["biome lint --apply ./src"],
  "**/*.ts?(x)": () => "yarn lint",
  "*.{json,yaml}": ["biome format --write ./src"],
};
