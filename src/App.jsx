import React, { Suspense, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { useProjects } from "@hooks/useProjects";
import { useResponsive } from "@hooks/useResponsive";
import { createAppStyles } from "./styles/appStyles";
import ProjectList from "@container/project/ProjectList";
import ProjectEdit from "@container/project/ProjectEdit";
import Sidebar from "@components/Sidebar/Sidebar";
import ProjectDetail from "@container/project/ProjectDetail";

/**
 * Main application component that handles routing and layout
 * @returns {JSX.Element} The rendered App component
 */
const App = () => {
  const { projects, favoriteProjects, isLoading, error, handleSave } =
    useProjects();

  const isMobile = useResponsive();
  const styles = useMemo(() => createAppStyles(isMobile), [isMobile]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <Sidebar favoriteProjects={favoriteProjects} />
        </div>
        <main style={styles.mainContent}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<ProjectList projects={projects} />} />
              <Route
                path="/projects/:id/edit"
                element={
                  <ProjectEdit projects={projects} onSave={handleSave} />
                }
              />
              <Route
                path="/projects/:id"
                element={<ProjectDetail projects={projects} />}
              />
              <Route
                path="/projects/new"
                element={
                  <ProjectEdit projects={projects} onSave={handleSave} />
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
