import { PropTypes } from "prop-types";
import React, { useState, useCallback, useMemo } from "react";
import {
  PROJECT_FORM_FIELDS,
  validateProject,
} from "@form-configs/project-form";
import Form from "@components/common/Form";
import FormField from "@components/common/FormField";

const initialState = {
  formData: {},
  errors: {},
};

const FormFields = React.memo(({ fields, formData, errors, onChange }) => (
  <>
    {fields.map((field) => (
      <FormField
        key={field.name}
        value={formData[field.name] || ""}
        onChange={onChange}
        error={Boolean(errors[field.name])}
        helperText={errors[field.name]}
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
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ProjectForm = ({
  initialData = {},
  onSubmit,
  isLoading = false,
  submitLabel,
}) => {
  const [{ formData, errors }, setState] = useState(() => ({
    ...initialState,
    formData: initialData,
  }));

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
      errors: { ...prev.errors, [name]: "" },
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateProject(formData);
    if (Object.keys(validationErrors).length > 0) {
      setState((prev) => ({
        ...prev,
        errors: validationErrors,
      }));
      return;
    }
    onSubmit(formData);
  }, [formData, onSubmit]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const formProps = useMemo(
    () => ({
      onSubmit: handleSubmit,
      disabled: isLoading || !isValid,
      submitLabel: submitLabel,
    }),
    [handleSubmit, isLoading, isValid]
  );

  return (
    <Form {...formProps}>
      <FormFields
        fields={PROJECT_FORM_FIELDS}
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />
    </Form>
  );
};

ProjectForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default React.memo(ProjectForm);
