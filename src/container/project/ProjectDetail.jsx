import { PropTypes } from "prop-types";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ErrorMessage from "@components/common/ErrorMessage";
import { api } from "@services/project-api";
import { createProductDetailStyles } from "../../styles/appStyles";
import { useResponsive } from "@hooks/useResponsive";

/**
 * Project editing component that handles form display and submission
 * Includes error handling and responsive design
 * @param {Object} props Component props
 * @param {Array} props.projects List of all projects
 * @param {Function} props.onSave Callback function for save operation
 */

const ProjectDetail = ({ projects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const isMobile = useResponsive();
  const styles = useMemo(() => createProductDetailStyles(isMobile), [isMobile]);

  useMemo(() => projects?.find((p) => p.id === parseInt(id)), [projects, id]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch project data
  useEffect(() => {
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
  }, [id]);

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
    <Box style={styles.container}>
      {/* Header */}
      <Box style={styles.header}>
        <Typography variant="body1">
          Project ID:{" "}
          <Box component="span" sx={{ marginLeft: "14px" }}>
            {project?.id}
          </Box>
        </Typography>
        <img
          src={
            project?.isFavorite
              ? "/images/star-icon.png"
              : "/images/default-icon.png"
          }
          alt={project?.isFavorite ? "Favorite Project" : "Not Favorite"}
          width={32}
          height={32}
        />
      </Box>

      {/* Project Details */}
      <Typography variant="body1">
        Project Name:{" "}
        <Box component="span" sx={{ marginLeft: "14px" }}>
          {project?.name}
        </Box>
      </Typography>
      <Typography variant="body1">
        Description:{" "}
        <Box component="span" sx={{ marginLeft: "14px" }}>
          {project?.description}
        </Box>
      </Typography>

      <Typography variant="body1">
        Start Date:{" "}
        <Box component="span" sx={{ marginLeft: "14px" }}>
          {project?.startDate}
        </Box>
      </Typography>
      <Typography variant="body1">
        End Date:{" "}
        <Box component="span" sx={{ marginLeft: "14px" }}>
          {project?.endDate}
        </Box>
      </Typography>
      <Typography variant="body1">
        Project Manager:{" "}
        <Box component="span" sx={{ marginLeft: "14px" }}>
          {project?.manager}
        </Box>
      </Typography>

      {/* Buttons */}
      <Box style={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/projects/${id}/edit`)}
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

ProjectDetail.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
};

ProjectDetail.defaultProps = {
  projects: [],
  onSave: () => {},
};

export default ProjectDetail;
