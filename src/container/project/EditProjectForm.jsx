import React, { useMemo } from "react";
import {
  PROJECT_FORM_FIELDS,
} from "@form-configs/project-form";
import { PropTypes } from "prop-types";
import { useFormik } from "formik";
import Form from "@components/common/Form";
import FormField from "@components/common/FormField";
import { validationSchema } from "../../form-configs/project-form";

const FormFields = React.memo(({ fields, formik }) => (
  <>
    {fields.map((field) => (
      <FormField
        key={field.name}
        name={field.name}
        value={formik.values[field.name] || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
        helperText={formik.touched[field.name] && formik.errors[field.name]}
        {...field}
      />
    ))}
  </>
));

FormFields.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
  formik: PropTypes.object.isRequired,
};

const ProjectForm = ({
  initialData = {},
  onSubmit,
  isLoading = false,
  submitLabel,
}) => {
  const formik = useFormik({
    initialValues: {
      id: initialData.id || "",
      name: initialData.name || "",
      description: initialData.description || "",
      startDate: initialData.startDate || "",
      endDate: initialData.endDate || "",
      manager: initialData.manager || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const formProps = useMemo(
    () => ({
      onSubmit: formik.handleSubmit,
      submitLabel: submitLabel,
    }),
    [formik.handleSubmit, isLoading, formik.isValid, formik.dirty]
  );
  return (
    <Form {...formProps}>
       <FormFields fields={PROJECT_FORM_FIELDS} formik={formik} />
    </Form>
  );
};

ProjectForm.displayName = "ProjectForm";

ProjectForm.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    manager: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  submitLabel: PropTypes.string,
};

export default React.memo(ProjectForm);
