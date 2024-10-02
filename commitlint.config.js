// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Minor Feature Release
        "fix", // Patch Fix Release
        "perf", // Performance Improvement
        "BREAKING CHANGE", // Major Breaking Release
      ],
    ],
    "scope-empty": [2, "never"], // Ensures that scope is not empty
    "subject-full-stop": [2, "never"], // Ensures the subject doesn't end with a period
    "subject-case": [0, "never", ["start-case", "pascal-case", "upper-case"]],
  },
};
