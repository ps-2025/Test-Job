import { useEffect, useState } from "react";
import { api } from "@services/project-api";

/**
 * Custom hook for managing projects and favorite projects
 * @returns {Object} Projects state and handlers
 */
export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData] = await Promise.all([api.getProjects()]);

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error.message || "Failed to load projects. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Handles saving updated project information
   * @param {Project} updatedProject - The project with updated information
   */
  const handleSave = async (updatedProject) => {
    try {
      // Handle the case when a project is updated or created

      // Update the project in the main projects list
      setProjects((prev) =>
        prev.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        )
      );
    } catch (error) {
      console.error("Error saving project:", error);
      throw error;
    }
  };

  return {
    projects,
    isLoading,
    error,
    handleSave,
  };
};
