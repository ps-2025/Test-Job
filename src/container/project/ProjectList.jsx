// components/ProjectList.jsx
import React from "react";
import { Button, Grid } from "@mui/material";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import { projectTableHeads } from "@utils/constants";
import CustomTable from "@components/common/CustomTable";
import { useFavoriteProjects } from "@provider/FavoriteProjectProvider";
import FavImage from "../../assets/images/favorite.svg";
import FavActiveImage from "../../assets/images/favorite-active.svg";
import { EDIT_BUTTON_TEXT } from "@utils/constants";
import { CREATE_BUTTON_TEXT } from "@utils/constants";

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
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item>
          {isFavorite(project?.id) ? (
            <img
              src={FavActiveImage}
              alt="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(project);
              }}
            />
          ) : (
            <img
              src={FavImage}
              alt="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(project);
              }}
            />
          )}
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/projects/${project.id}/edit`);
            }}
          >
            {EDIT_BUTTON_TEXT}
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Grid display={"flex"} justifyContent={"end"} marginBottom={"20px"}>
        <Button variant="contained" onClick={() => navigate("/projects/new")}>
          {CREATE_BUTTON_TEXT}
        </Button>
      </Grid>

      <CustomTable
        columns={projectTableHeads}
        data={projects}
        renderActions={renderActions}
      />
    </>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProjectList;
