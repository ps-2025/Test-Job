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
  const { addToFavorites, removeFromFavorites, isFavorite, favorites } =
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
    if (isFavorite(project.id)) {
      removeFromFavorites(project.id);
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
            <Typography sx={{ float: "right" }}>Project ID:</Typography>
          </Box>
          <Typography>{project?.id}</Typography>
        </Box>
        <img
          src={isFavorite(project?.id) ? FavActiveImage : FavImage}
          alt={project?.isFavorite ? "Favorite Project" : "Not Favorite"}
          width={32}
          height={32}
          onClick={(e) => {
            handleFavoriteClick(project);
          }}
        />
      </Box>

      {/* Project Details */}
      <Box sx={{ display: "flex" }}>
        <Box sx={{ minWidth: "150px", marginRight: "14px" }}>
          <Typography sx={{ float: "right" }}>Project Name:</Typography>
        </Box>
        <Typography>{project?.name}</Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ minWidth: "150px", marginRight: "18px" }}>
          <Typography sx={{ float: "right" }}>Description:</Typography>
        </Box>
        <Typography>{project?.description}</Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ minWidth: "150px", marginRight: "18px" }}>
          <Typography sx={{ float: "right" }}>Start Date:</Typography>
        </Box>
        <Typography>{project?.startDate}</Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ minWidth: "150px", marginRight: "18px" }}>
          <Typography sx={{ float: "right" }}>End Date:</Typography>
        </Box>
        <Typography>{project?.endDate}</Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ minWidth: "150px", marginRight: "18px" }}>
          <Typography sx={{ float: "right" }}>Project Manager:</Typography>
        </Box>
        <Typography>{project?.manager}</Typography>
      </Box>

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
