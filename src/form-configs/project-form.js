import * as Yup from "yup";

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
    label: "Description",
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

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Project name is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
  manager: Yup.string().required("Project manager is required"),
});
