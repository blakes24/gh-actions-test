/**
 * Check the labels of an issue, and return the column the issue should be sorted into when closed
 * @param {Object} context - context object
 * @returns - returns an object with the action's result, which is passed on to the next action
 */
function main({ context }) {
  /** if issue includes these labels there should be no visual changes and it should be moved to the Done column */
  const doneLabels = [
    "role: back end/devOps",
    "Feature: Analytics",
    "Feature: Refactor CSS",
    "Feature: Refactor HTML",
    "Feature: Refactor JS / Liquid",
    "Feature: Refactor GHA",
  ];

  const labels = obtainLabels(context);

  /** if issue includes one of the done labels there should be no visual changes - move to the Done column */
  for (let doneLabel of doneLabels) {
    if (labels.includes(doneLabel)) {
      if (doneLabel !== "role: back end/devOps") {
        return "Done";
      }
      // for 'role: back end/devOps' - only move to Done if there is no 'role: front end' label
      if (!labels.includes("role: front end")) {
        return "Done";
      }
    }
  }

  // all other issues go to UAT column
  return "UAT";
}

/**
 * Get all labels from the issue
 * @return {Array} - returns an array of all the labels
 */
function obtainLabels(context) {
  const labelsObject = context.payload.issue.labels;
  const labels = labelsObject.map((label) => label.name);
  return labels;
}

module.exports = main;
