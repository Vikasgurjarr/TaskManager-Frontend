import { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addProject } from "../../react-redux/Api/projectApi";
import { validateProject } from "../../utils/ProjectModalValidation";

const AddProjectModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [newProject, setNewProject] = useState({
    name: "",
    status: "notStarted",
    deadlineDate: "",
    createdDate: new Date().toISOString().split("T")[0], // Set default created date
    creatorName: "", // Set default creator name
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleAddProject = () => {
    const validationErrors = validateProject(newProject);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const { name, status, deadlineDate, createdDate, creatorName } = newProject;

    dispatch(
      addProject({
        name,
        status,
        deadlineDate,
        createdDate,
        creatorName,
      })
    )
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error adding project:", error);
        setErrors({ form: "An error occurred while adding the project." });
      });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
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
          outline: "none",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Project
        </Typography>
        {errors.form && <Typography color="error">{errors.form}</Typography>}
        <TextField
          fullWidth
          margin="normal"
          label="Project Name"
          name="name"
          value={newProject.name}
          onChange={handleInputChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="Deadline Date"
          name="deadlineDate"
          value={newProject.deadlineDate}
          onChange={handleInputChange}
          error={Boolean(errors.deadlineDate)}
          helperText={errors.deadlineDate}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Created Date"
          value={newProject.createdDate}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Creator Name"
          name="creatorName"
          value={newProject.creatorName}
          onChange={handleInputChange}
          error={Boolean(errors.creatorName)}
          helperText={errors.creatorName}
        />
        <FormControl fullWidth margin="normal" error={Boolean(errors.status)}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={newProject.status}
            onChange={handleInputChange}
            label="Status"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="notStarted">Not Started</MenuItem>
          </Select>
          {errors.status && (
            <Typography variant="caption" color="error">
              {errors.status}
            </Typography>
          )}
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddProject}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};

AddProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddProjectModal;
