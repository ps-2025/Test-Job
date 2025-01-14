// components/ProjectList.jsx
import React from "react";
import { Button, Grid } from "@mui/material";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

import { projectTableHeads } from "@utils/constants";
import CustomTable from "@components/common/CustomTable";
import { useFavoriteProjects } from "@provider/FavoriteProjectProvider";

const ProjectList = ({ projects }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoriteProjects();

  const handleFavoriteClick = (project) => {
    if (isFavorite(project.id)) {
      removeFromFavorites(project.id);
    } else {
      addToFavorites(project);
    }
  };

  const renderActions = (project) => {
    return (
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick(project);
            }}
          >
            {isFavorite(project?.id) ? <Favorite /> : <FavoriteBorder />}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/projects/${project.id}/edit`);
            }}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <CustomTable
      columns={projectTableHeads}
      data={projects}
      renderActions={renderActions}
    />
  );
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default ProjectList;
