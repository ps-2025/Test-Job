export const PROJECT_FORM_FIELDS = [
  {
    name: "id",
    label: "Project ID",
    disabled: true,
  },
  {
    name: "name",
    label: "Project Name",
    required: true,
  },
  {
    name: "description",
    label: "Project Description",
    required: true,
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "date",
    required: true,
  },
  {
    name: "endDate",
    label: "End Date",
    type: "date",
    required: true,
  },
  {
    name: "manager",
    label: "Project Manager",
    required: true,
  },
];

export const validateProject = (values) => {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = "Project name is required";
  }

  if (!values.description?.trim()) {
    errors.description = "Description is required";
  }

  if (!values.startDate) {
    errors.startDate = "Start date is required";
  }

  if (!values.endDate) {
    errors.endDate = "End date is required";
  }

  if (values.startDate && values.endDate && values.startDate > values.endDate) {
    errors.endDate = "End date must be after start date";
  }

  if (!values.manager?.trim()) {
    errors.manager = "Project manager is required";
  }

  return errors;
};
