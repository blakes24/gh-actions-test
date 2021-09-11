// Global variables
let github;
let context;

/**
 * Check the labels of an issue, and return the column the issue should be sorted into when closed
 * @param {Object} g - github object
 * @param {Object} c - context object
 * @returns - returns an object with the action's result, which is passed on to the next action
 */
function main({ g, c }) {
  github = g;
  context = c;

  const labels = obtainLabels();
  console.log(issues);

  if (labels.includes("role: back end/devOps")) {
    return "Done";
  }
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
