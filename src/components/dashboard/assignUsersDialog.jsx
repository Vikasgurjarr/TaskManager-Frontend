import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Checkbox,
  styled,
  FormControlLabel,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { assignUsersToProject } from "../../react-redux/Api/projectApi"; // Import the thunk for assigning users

const StyledModal = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "40%",
    maxWidth: "90%",
    margin: "auto",
    borderRadius: "8px",
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: "8px 8px 0 0",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    justifyContent: "flex-end",
  },
}));

const AssignUsersDialog = ({ open, onClose, users, projectId }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch = useDispatch();

  const handleAssignUser = () => {
    const userIds = selectedUsers.map((user) => user._id);
    console.log("Assigning users with IDs:", userIds); // Add this line for debugging
    dispatch(assignUsersToProject({ projectId, userIds }))
      .then(() => {
        selectedUsers.forEach((user) => {
          sendNotification(user.email); // Send notification to each selected user
        });
        setSnackbarMessage("Users assigned successfully.");
        setSnackbarOpen(true);
        onClose(); // Close dialog after assigning users
      })
      .catch((error) => {
        setSnackbarMessage("Error assigning users.");
        setSnackbarOpen(true);
        console.error("Error assigning users:", error);
      });
  };

  const handleUserClick = (user) => {
    const selectedIndex = selectedUsers.indexOf(user);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedUsers, user];
    } else {
      newSelected = selectedUsers.filter((item) => item !== user);
    }

    setSelectedUsers(newSelected);
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users);
    }
    setSelectAll(!selectAll);
  };

  const handleCancel = () => {
    setSelectedUsers([]);
    onClose();
  };

  const isSelected = (user) => selectedUsers.indexOf(user) !== -1;

  const sendNotification = (email) => {
    // Simulated email sending logic (replace with actual implementation)
    console.log(`Sending notification to ${email}...`);
    setTimeout(() => {
      console.log(`Notification sent successfully to ${email}`);
    }, 2000); // Simulate 2 second delay
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <StyledModal open={open} onClose={onClose}>
        <DialogTitle>
          Assign Users to Project
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: "inherit" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAllClick}
                color="primary"
              />
            }
            label="Select All"
          />
          <List dense>
            {users.map((user) => (
              <ListItem
                key={user._id}
                button
                onClick={() => handleUserClick(user)}
                style={{
                  backgroundColor: isSelected(user) ? "#e0f7e0" : "transparent",
                  borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                  paddingTop: "8px",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    style={{
                      backgroundColor: isSelected(user) ? "green" : undefined,
                    }}
                  >
                    <CheckCircleIcon
                      fontSize="small"
                      style={{ color: "white" }}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.email} />
                <Checkbox
                  checked={isSelected(user)}
                  color="primary"
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleUserClick(user);
                  }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            onClick={handleAssignUser}
            color="primary"
            disabled={selectedUsers.length === 0}
          >
            Save
          </Button>
        </DialogActions>
      </StyledModal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

AssignUsersDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  projectId: PropTypes.string.isRequired,
};

export default AssignUsersDialog;
