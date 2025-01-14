import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Create context
const FavoriteProjectsContext = createContext();

// Custom hook for using the context
export const useFavoriteProjects = () => {
  const context = useContext(FavoriteProjectsContext);
  if (!context) {
    throw new Error(
      "useFavoriteProjects must be used within a FavoriteProjectsProvider"
    );
  }
  return context;
};

// Provider component
export const FavoriteProjectsProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([
    {
      "id": "202310",
      "name": "Timeline",
      "startDate": "2023-06-15",
      "endDate": "2025-01-02",
      "manager": "Kess",
      "description": "Timeline Description"
    },
  ]);

  // Add project to favorites
  const addToFavorites = (project) => {
    setFavorites((prevFavorites) => {
      // Check if project already exists
      if (!prevFavorites.some((fav) => fav.id === project.id)) {
        return [...prevFavorites, project];
      }
      return prevFavorites;
    });
  };

  // Remove project from favorites
  const removeFromFavorites = (projectId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((project) => project.id !== projectId)
    );
  };

  // Check if a project is in favorites
  const isFavorite = (projectId) => {
    return favorites.some((project) => project.id === projectId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <FavoriteProjectsContext.Provider value={value}>
      {children}
    </FavoriteProjectsContext.Provider>
  );
};

FavoriteProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
