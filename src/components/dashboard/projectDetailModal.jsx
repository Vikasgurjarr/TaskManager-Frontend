import PropTypes from "prop-types";
import { Modal, Box, Typography, Button } from "@mui/material";

const ProjectDetailsModal = ({ open, onClose, project }) => {
  if (!project) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="project-details-modal-title"
      aria-describedby="project-details-modal-description"
      closeAfterTransition
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="project-details-modal-title"
          variant="h6"
          component="h2"
        >
          {project.name}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Created by: {project.creatorName}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Created Date: {new Date(project.createdDate).toLocaleDateString()}{" "}
          {new Date(project.createdDate).toLocaleTimeString()}
        </Typography>
        <Typography sx={{ mt: 2 }}>Deadline: {project.deadlineDate}</Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ ml: 2 }}
            onClick={() => console.log("Delete project")}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ProjectDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  project: PropTypes.object,
};

export default ProjectDetailsModal;
