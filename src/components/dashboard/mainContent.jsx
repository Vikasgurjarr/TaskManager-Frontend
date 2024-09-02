import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Pagination,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import AddProjectModal from "./addProjectModal";
import AssignUsersDialog from "./assignUsersDialog";
import {
  fetchProjects,
  selectProjects,
  selectLoading,
  selectError,
  updateProject,
  deleteProject,
} from "../../react-redux/Api/projectApi"; // Assuming your Redux slice actions and selectors are defined here
import { fetchUsersAsync } from "../../react-redux/ThunkActions/userThunkActions"; // Assuming fetchUsers action is defined in userSlice
import {
  setSnackbarOpen,
  setIsModalOpen,
  setSnackbarMessage,
} from "../../react-redux/Actions/projectActions";

const ProjectSection = styled(Box)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const AddProjectButton = styled(Button)`
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #2c387e;
  }
`;

const ProjectListContainer = styled(Box)`
  margin-top: 16px;
  overflow-y: auto;
  height: 418px;
`;

const greenColor = "#4caf50";
const lightGreyColor = "#f4f5f7";

const Content = styled(Box)`
  && {
    margin-top: 80px;
    flex-grow: 1;
    padding: 24px;
    background-color: ${lightGreyColor};
    height: 100%;
  }
`;

const StyledSnackbar = styled(Snackbar)`
  .MuiSnackbarContent-root {
    background-color: white;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    border: 2px solid ${greenColor};
    border-radius: 8px;
    color: ${greenColor};
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .loading-bar {
    width: 100%;
    height: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${greenColor};
    border-radius: 0 0 8px 8px;
  }
`;

const StyledTableHeadCell = styled(TableCell)`
  && {
    font-weight: bold;
    background-color: ${greenColor};
    color: white;
    position: sticky;
    top: 0;
    z-index: 100;
  }
`;

const ContentSection = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const isModalOpen = useSelector((state) => state.projects.isModalOpen);
  const snackbarOpen = useSelector((state) => state.projects.snackbarOpen);
  const snackbarMessage = useSelector(
    (state) => state.projects.snackbarMessage
  );
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedProject, setEditedProject] = useState({
    name: "",
    status: "notStarted",
    deadlineDate: "",
    creatorName: "",
    assignedTo: [], // New state for assigned users
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const users = useSelector((state) => state.users.users); // Fetch users from Redux store

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsersAsync()); // Fetch users when component mounts
  }, [dispatch]);

  const handleOpenModal = () => {
    dispatch(setIsModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
  };

  const handleEditDialogOpen = (project) => {
    setEditedProject(project);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditedProject({
      name: "",
      status: "notStarted",
      deadlineDate: "",
      creatorName: "",
      assignedTo: [],
    });
    setErrors({});
  };

  const handleEditProjectChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleUpdateProject = async () => {
    const validationErrors = validateProject(editedProject);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(updateProject(editedProject._id, editedProject)); // Ensure editedProject._id is passed as projectId
      dispatch(setSnackbarMessage("Project updated successfully"));
      dispatch(setSnackbarOpen(true));
      handleEditDialogClose();
    } catch (error) {
      console.error("Error updating project:", error);
      dispatch(
        setSnackbarMessage(`Failed to update project: ${error.message}`)
      );
      dispatch(setSnackbarOpen(true));
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await dispatch(deleteProject(projectId));
      dispatch(setSnackbarMessage("Project deleted successfully"));
      dispatch(setSnackbarOpen(true));
    } catch (error) {
      console.error("Error deleting project:", error);
      dispatch(
        setSnackbarMessage(`Failed to delete project: ${error.message}`)
      );
      dispatch(setSnackbarOpen(true));
    }
  };

  const handleSnackbarClose = () => {
    dispatch(setSnackbarOpen(false));
  };

  const handleAssignToDialogOpen = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleAssignToDialogClose = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const assignUserToProject = (userId) => {
    const user = users.find((user) => user.id === userId);
    setEditedProject((prevProject) => ({
      ...prevProject,
      assignedTo: [...prevProject.assignedTo, user],
    }));
  };

  const removeUserFromProject = (userId) => {
    setEditedProject((prevProject) => ({
      ...prevProject,
      assignedTo: prevProject.assignedTo.filter((user) => user.id !== userId),
    }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const [filter, setFilter] = useState("all"); // Define filter state
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProjects = projects
    .filter((project) => (filter === "all" ? true : project.status === filter))
    .filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Handle error state
  }

  return (
    <Content>
      <ProjectSection>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant="h4">PROJECTS</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <TextField
              label="Search by Project Name"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 200, marginRight: "150px" }}
            />
            <AddProjectButton
              variant="contained"
              size="large"
              onClick={handleOpenModal}
            >
              Add Project
            </AddProjectButton>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Items per Page</InputLabel>
              <Select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                label="Items per Page"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={filter}
                onChange={handleFilterChange}
                label="Filter by Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="notStarted">Not Started</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <ProjectListContainer>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "calc(95vh - 300px)" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell align="left">Sno</StyledTableHeadCell>
                  <StyledTableHeadCell align="left">Name</StyledTableHeadCell>
                  <StyledTableHeadCell align="left">Status</StyledTableHeadCell>
                  <StyledTableHeadCell align="left">
                    Deadline Date
                  </StyledTableHeadCell>
                  <StyledTableHeadCell align="left">
                    Created By
                  </StyledTableHeadCell>
                  <StyledTableHeadCell align="left">
                    Assigned To
                  </StyledTableHeadCell>
                  <StyledTableHeadCell align="left">
                    Actions
                  </StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProjects.map((project, index) => (
                  <TableRow key={project._id} hover>
                    <TableCell align="left">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="left">{project.name}</TableCell>
                    <TableCell align="left">{project.status}</TableCell>
                    <TableCell align="left">{project.deadlineDate}</TableCell>
                    <TableCell align="left">{project.creatorName}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PersonAddIcon />}
                        onClick={() => handleAssignToDialogOpen(project)}
                      >
                        Assign To
                      </Button>
                      <AssignUsersDialog
                        open={isProjectModalOpen && selectedProject === project}
                        onClose={handleAssignToDialogClose}
                        project={editedProject}
                        users={users}
                        assignUser={assignUserToProject}
                        removeUser={removeUserFromProject}
                        projectId={project._id} // Pass the projectId prop here
                      />
                    </TableCell>

                    <TableCell align="left">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditDialogOpen(project)}
                      >
                        <EditIcon style={{ color: "#1976d2" }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteProject(project._id)}
                      >
                        <DeleteIcon style={{ color: "#f44336" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ProjectListContainer>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Pagination
            count={Math.ceil(filteredProjects.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </ProjectSection>
      <AddProjectModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <StyledSnackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message={snackbarMessage}
        action={<div className="loading-bar" />}
      />
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Project Name"
            name="name"
            value={editedProject.name}
            onChange={handleEditProjectChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <FormControl fullWidth margin="normal" error={Boolean(errors.status)}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={editedProject.status}
              onChange={handleEditProjectChange}
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
          <TextField
            fullWidth
            margin="normal"
            type="date"
            label="Deadline Date"
            name="deadlineDate"
            value={editedProject.deadlineDate}
            onChange={handleEditProjectChange}
            error={Boolean(errors.deadlineDate)}
            helperText={errors.deadlineDate}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Content>
  );
};

export default ContentSection;

function validateProject(project) {
  let errors = {};

  if (!project.name) {
    errors.name = "Project name is required";
  }

  if (!project.deadlineDate) {
    errors.deadlineDate = "Deadline date is required";
  }

  return errors;
}
