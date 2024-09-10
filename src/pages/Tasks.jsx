import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from "@mui/material";
import Sidebar from "../components/dashboard/sidebar";
import TopBar from "../components/dashboard/topAppBar";
import {
  fetchTasks,
  createNewTask,
  selectTasks,
  deleteTask,
  updateTask,
} from "../react-redux/ThunkActions/taskThunk"; // Import Redux actions and selectors
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MainContent = styled(Box)`
  margin-left: 240px;
  padding: 16px;
  margin-top: 50px;
  overflow-y: auto; /* Enable vertical scrolling */
  height: calc(100vh - 130px); /* Adjust height based on your layout */
`;

const TaskCards = styled(Card)`
  width: 350px;
  height: 300px;
  margin-bottom: 20px;
  margin-right: 20px;
  position: relative;
  overflow: hidden;
`;

const Task = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    projectName: "",
    description: "",
    assignedTo: "",
    comments: [],
  });
  const [editTask, setEditTask] = useState({
    _id: "",
    projectName: "",
    description: "",
    assignedTo: "",
    comments: [],
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]); // State to hold projects data
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTasks());
    fetchUsers();
    fetchProjects(); // Fetch projects data on component mount
  }, [dispatch]);

  const fetchUsers = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/users`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error
    }
  };

  const fetchProjects = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Handle error
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTask({
      projectName: "",
      description: "",
      assignedTo: "",
      comments: [],
    });
  };

  const handleEditOpen = (task) => {
    setEditOpen(true);
    setEditTask(task);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditTask({
      _id: "",
      projectName: "",
      description: "",
      assignedTo: "",
      comments: [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(createNewTask(newTask));
    handleClose();
  };

  const handleEditSubmit = () => {
    dispatch(updateTask(editTask));
    handleEditClose();
  };

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  };

  const addComment = (taskId, comment) => {
    // Update the task with the new comment locally and in the backend
    const updatedTask = tasks.find((task) => task._id === taskId);
    if (updatedTask) {
      const updatedComments = [...updatedTask.comments, comment];
      const updatedTaskData = { ...updatedTask, comments: updatedComments };
      dispatch(updateTask(updatedTaskData));
    }
  };

  return (
    <>
      <Sidebar />
      <TopBar />
      <MainContent>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          style={{
            width: "100px",
            height: "50px",
            position: "fixed",
            right: "40px",
            top: "70px",
            backgroundColor: "grey",
            fontSize: "30px",
          }}
        >
          +
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Task</DialogTitle>
          <DialogContent>
            <TextField
              select
              margin="dense"
              name="projectName"
              label="Project Name"
              type="text"
              fullWidth
              value={newTask.projectName}
              onChange={handleChange}
            >
              {projects.map((project) => (
                <MenuItem key={project._id} value={project.name}>
                  {project.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              name="description"
              label="Task Description"
              type="text"
              fullWidth
              value={newTask.description}
              onChange={handleChange}
            />
            <TextField
              select
              margin="dense"
              name="assignedTo"
              label="Assign To"
              type="text"
              fullWidth
              value={newTask.assignedTo}
              onChange={handleChange}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user.name}>
                  {user.name} - {user.email}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              select
              margin="dense"
              name="projectName"
              label="Project Name"
              type="text"
              fullWidth
              value={editTask.projectName}
              onChange={handleEditChange}
            >
              {projects.map((project) => (
                <MenuItem key={project._id} value={project.name}>
                  {project.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              name="description"
              label="Task Description"
              type="text"
              fullWidth
              value={editTask.description}
              onChange={handleEditChange}
            />
            <TextField
              select
              margin="dense"
              name="assignedTo"
              label="Assign To"
              type="text"
              fullWidth
              value={editTask.assignedTo}
              onChange={handleEditChange}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user.name}>
                  {user.name} - {user.email}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              addComment={addComment}
              handleEdit={handleEditOpen}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </MainContent>
    </>
  );
};

const TaskCard = ({ task, addComment, handleEdit, handleDelete }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(task._id, comment);
      setComment("");
    }
  };

  return (
    <TaskCards
      style={{
        width: "350px",
        height: "300px",
        marginBottom: "20px",
        marginRight: "20px",
        position: "relative",
      }}
    >
      <CardContent style={{ position: "relative" }}>
        <Typography variant="h5">{task.projectName}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Assigned To: {task.assignedTo}
        </Typography>
        <List>
          {task.comments.map((c, index) => (
            <ListItem key={index}>
              <ListItemText primary={c} />
            </ListItem>
          ))}
        </List>
        <EditIcon
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            cursor: "pointer",
            color: "#1976d2",
          }}
          onClick={() => handleEdit(task)}
        />
        <DeleteIcon
          style={{
            position: "absolute",
            top: "5px",
            right: "30px",
            cursor: "pointer",
            color: "#f44336",
          }}
          onClick={() => handleDelete(task._id)}
        />
        <form onSubmit={handleCommentSubmit}>
          <TextField
            margin="dense"
            label="Add Comment"
            type="text"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Add Comment
          </Button>
        </form>
      </CardContent>
    </TaskCards>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assignedTo: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  addComment: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Task;
