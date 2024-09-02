export const validateProject = (project) => {
  const errors = {};

  if (!project.name) {
    errors.name = "Project name is required";
  } else if (project.name.length < 3) {
    errors.name = "Project name must be at least 3 characters";
  }

  if (!["pending", "completed", "notStarted"].includes(project.status)) {
    errors.status = "Invalid project status";
  }

  return errors;
};
