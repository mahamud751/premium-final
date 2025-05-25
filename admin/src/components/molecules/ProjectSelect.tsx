import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { Project } from "@/services/types";

interface ProjectSelectProps {
  projects: Project[];
  selectedProject: string;
  onProjectChange: (event: SelectChangeEvent<string>) => void;
}

const ProjectSelect: React.FC<ProjectSelectProps> = ({
  projects,
  selectedProject,
  onProjectChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="project-select-label">Project</InputLabel>
      <Select
        labelId="project-select-label"
        id="project-select"
        value={selectedProject}
        label="Project"
        onChange={onProjectChange}
        name="project_id"
      >
        {projects?.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProjectSelect;
