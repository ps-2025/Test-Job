import { PropTypes } from "prop-types";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ErrorMessage from "@components/common/ErrorMessage";
import { api } from "@services/project-api";
import { createProductDetailStyles } from "../../styles/appStyles";
import { useResponsive } from "@hooks/useResponsive";
import FavImage from "../../assets/images/favorite.svg";
import FavActiveImage from "../../assets/images/favorite-active.svg";
import { useFavoriteProjects } from "@provider/FavoriteProjectProvider";
import { BACK_BUTTON_TEXT } from "@utils/constants";
import { EDIT_BUTTON_TEXT } from "@utils/constants";
import { PROJECT_ID_LABEL } from "@utils/constants";

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
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoriteProjects();

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

  const handleFavoriteClick = (project) => {
    if (isFavorite(project?.id)) {
      removeFromFavorites(project?.id);
    } else {
      addToFavorites(project);
    }
  };

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
        <Box sx={{ display: "flex" }}>
          <Box sx={{ minWidth: "150px", marginRight: "18px" }}>
            <Typography sx={{ float: "right" }}>{PROJECT_ID_LABEL}</Typography>
          </Box>
          <Typography>{project?.id}</Typography>
        </Box>
        <img
          src={isFavorite(project?.id) ? FavActiveImage : FavImage}
          alt={isFavorite(project?.id) ? "Favorite Project" : "Not Favorite"}
          width={32}
          height={32}
          onClick={(e) => {
            handleFavoriteClick(project);
          }}
        />
      </Box>

      {/* Project Details */}
      <ProjectDetails project={project} />

      {/* Buttons */}
      <Box style={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          {BACK_BUTTON_TEXT}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/projects/${id}/edit`)}
        >
          {EDIT_BUTTON_TEXT}
        </Button>
      </Box>
    </Box>
  );
};

/**
 * Displays project details in rows.
 * @param {Object} props Component props.
 * @param {Object} props.project The project object.
 */
const ProjectDetails = ({ project }) => (
  <>
    <DetailRow label="Project Name" value={project?.name} />
    <DetailRow label="Description" value={project?.description} />
    <DetailRow label="Start Date" value={project?.startDate} />
    <DetailRow label="End Date" value={project?.endDate} />
    <DetailRow label="Project Manager" value={project?.manager} />
  </>
);

/**
 * Renders a single detail row with a label and value.
 * @param {Object} props Component props.
 * @param {string} props.label The label for the detail.
 * @param {string} props.value The value for the detail.
 */
const DetailRow = ({ label, value }) => (
  <Box sx={{ display: "flex" }}>
    <Box sx={{ minWidth: "150px", marginRight: "18px" }}>
      <Typography sx={{ float: "right" }}>{label}:</Typography>
    </Box>
    <Typography>{value}</Typography>
  </Box>
);

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
