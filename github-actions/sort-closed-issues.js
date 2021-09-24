const obtainLabels = require("./obtain-labels");

/**
 * Check the labels of an issue, and return the column the issue should be sorted into when closed
 * @param {Object} context - context object from actions/github-script
 * @returns - returns the appropriate column, which is passed on to the next action
 */
function main({ context }) {
  const doneColumn = "Done";
  const UATColumn = "UAT";

  const hardLabels = [
    "Feature: Refactor CSS",
    "Feature: Refactor HTML",
    "Feature: Refactor JS / Liquid",
    "Feature: Refactor GHA",
  ];

  const softLabels = ["role: back end/devOps", "Feature: Analytics"];

  const overrideSoftLabels = ["role: front end"];

  const issueLabels = obtainLabels(context);

  function checkLabels(labelArray) {
    return (label) => labelArray.includes(label);
  }

  // function isHardLabel(label) {
  //   return hardLabels.includes(label);
  // }
  // function isSoftLabel(label) {
  //   return softLabels.includes(label);
  // }
  // function isOverrideLabel(label) {
  //   return overrideSoftLabels.includes(label);
  // }

  /** if issue includes hard labels there should be no visual changes - move to the Done column */
  if (issueLabels.some(checkLabels(hardLabels))) {
    return doneColumn;
  }

  /** if issue does not include a hard label, but does contain an override label - move to UAT */
  if (issueLabels.some(checkLabels(overrideSoftLabels))) {
    return UATColumn;
  }

  /** if issue includes soft labels (no hard or override) - move to Done */
  if (issueLabels.some(checkLabels(softLabels))) {
    return doneColumn;
  }

  // all other issues go to UAT column
  return UATColumn;
}

module.exports = main;
