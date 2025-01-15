import { PropTypes } from "prop-types";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditProjectForm from "./EditProjectForm";
import { Box, CircularProgress } from "@mui/material";
import ErrorMessage from "@components/common/ErrorMessage";
import { api } from "@services/project-api";
import { nanoid } from "nanoid";

/**
 * Project editing component that handles form display and submission
 * Includes error handling and responsive design
 * @param {Object} props Component props
 * @param {Array} props.projects List of all projects
 * @param {Function} props.onSave Callback function for save operation
 */

const ProjectEdit = ({ projects, onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useMemo(() => projects?.find((p) => p.id === parseInt(id)), [projects, id]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = Boolean(id);

  useMemo(() => {
    if (!isEditMode) {
      setProject((prevState) => ({
        ...prevState,
        id: nanoid(8),
      }));
    }
  }, [isEditMode]);

  // Fetch project data
  useEffect(() => {
    if (!isEditMode) return;
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getProjects();
        const foundProject = response.find((p) => p.id === id);

        if (!foundProject) {
          throw new Error("Project not found");
        }

        setProject(foundProject);
      } catch (err) {
        setError(err.message || "Failed to fetch project");
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, isEditMode]);

  const handleSave = useCallback(
    async (formData) => {
      try {
        setError(null);

        if (isEditMode) {
          // Update project
          const updatedProject = await api.updateProject(formData);

          // Check if project is in favorites and update if necessary
          const favorites = await api.getFavoriteProjects();
          const isFavorite = favorites.find((fav) => fav.id === formData.id);

          if (isFavorite) {
            await api.updateFavoriteProject({
              id: formData.id,
              name: formData.name,
            });
          }

          // Call the onSave prop to update parent component state
          if (onSave) {
            onSave(updatedProject);
          }
        } else {
          const newProject = await api.createProject(formData);

          onSave(newProject);
        }

        navigate("/");
      } catch (err) {
        // setError(err.message || `Failed to save  project`);
        // console.error(`Error  "saving"  project:`, err);
        setError(
          err.message || `Failed to ${isEditMode ? "save" : "create"} project`
        );
        console.error(
          `Error ${isEditMode ? "saving" : "creating"} project:`,
          err
        );
      }
    },
    [navigate, isEditMode, onSave]
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <ErrorMessage message={error} />
      </Box>
    );
  }

  return (
    <Box m={5}>
      <EditProjectForm
        initialData={project || {}}
        onSubmit={handleSave}
        submitLabel={isEditMode ? "Update" : "Create"}
      />
    </Box>
  );
};

ProjectEdit.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
};

ProjectEdit.defaultProps = {
  projects: [],
  onSave: () => {},
};

export default ProjectEdit;
