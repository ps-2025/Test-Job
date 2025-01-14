// services/project-api.js
import axios from "axios";
import { handleApiError } from "./error-handler";
import { v4 as uuidv4 } from "uuid";
import process from "process";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Add this for debugging

const generateId = () => uuidv4();

export const api = {
  // Projects
  createProject: async (project) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects`, project);
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw handleApiError(error);
    }
  },
  getProjects: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw handleApiError(error);
    }
  },

  // Favorite Projects
  getFavoriteProjects: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/favoriteProjects`);
      return response.data;
    } catch (error) {
      console.error("Error fetching favorite projects:", error);
      throw handleApiError(error);
    }
  },

  updateProject: async (project) => {
    try {
      if (!project.id) {
        project.id = generateId();
      }
      const response = await axios.put(
        `${API_BASE_URL}/projects/${project.id}`,
        project
      );
      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw handleApiError(error);
    }
  },
  updateFavoriteProject: async (project) => {
    try {
      if (!project.id) {
        project.id = generateId();
      }
      const response = await axios.put(
        `${API_BASE_URL}/favoriteProjects/${project.id}`,
        project
      );
      return response.data;
    } catch (error) {
      console.error("Error updating favorite project:", error);
      throw error;
    }
  },
};
