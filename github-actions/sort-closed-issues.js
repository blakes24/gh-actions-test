// Global variables
let context;

/**
 * Check the labels of an issue, and return the column the issue should be sorted into when closed
 * @param {Object} c - context object
 * @returns - returns an object with the action's result, which is passed on to the next action
 */
function main({ c }) {
  context = c;

  /** if issue includes these labels there should be no visual changes and it should be moved to the Done column */
  const doneLabels = [
    "role: back end/devOps",
    "Feature: Analytics",
    "Feature: Refactor CSS",
    "Feature: Refactor HTML",
    "Feature: Refactor JS / Liquid",
    "P-Feature: Home page",
  ];

  const labels = obtainLabels();

  for (let label of labels) {
    if (doneLabels.includes(label)) {
      return "Done";
    }
  }
  // all other issues go to UAT column
  return "UAT";
}

/**
 * Get all labels from the issue
 * @return {Array} - returns an array of all the labels
 */
function obtainLabels() {
  const labelsObject = context.payload.issue.labels;
  const labels = labelsObject.map((label) => label.name);
  return labels;
}

module.exports = main;
