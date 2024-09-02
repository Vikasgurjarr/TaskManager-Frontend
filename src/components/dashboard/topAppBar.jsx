import { useState, useEffect } from "react";
import styled from "styled-components";
import PayButton from "./strikePayment";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Modal,
  Backdrop,
  TextField,
  Button,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { clearTokenFromLS } from "../../utils/Token";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests

const TopBarContainer = styled(AppBar)`
  && {
    background-color: #ffffff;
    z-index: 1240;
    position: fixed;
    width: calc(100% - 240px);
    margin-left: 240px;
    margin-bottom: 16px;
  }
`;

const ProfileEditorContainer = styled.div`
  width: 400px;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalBackdrop = styled(Backdrop)`
  && {
    backdrop-filter: blur(3px);
  }
`;

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Set form fields with fetched user data
        setName(response.data.name);
        setMobile(response.data.mobile);
        setAddress(response.data.address);
        setCity(response.data.city);

        if (response.data.isAdmin == true) {
          setRole("Admin");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsProfileEditorOpen(true);
    handleProfileMenuClose();
  };

  const handleProfileEditorClose = () => {
    setIsProfileEditorOpen(false);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(
        "/api/auth/user/update",
        {
          name,
          mobile,
          address,
          city,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Profile updated successfully:", response.data);
      // Update user state with updated data
      setName(response.data.name);
      setMobile(response.data.mobile);
      setAddress(response.data.address);
      setCity(response.data.city);
      handleProfileEditorClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    clearTokenFromLS(); // Clear the token
    handleProfileMenuClose(); // Close the menu
    navigate("/login"); // Navigate to login page
  };

  return (
    <>
      <TopBarContainer>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="grey"
            sx={{ flexGrow: 1 }}
          >
            Hellow {name} {role == "Admin" && role}
          </Typography>
          <PayButton></PayButton>
          <Typography
            variant="body1"
            color="black"
            sx={{ marginRight: "16px" }}
          >
            {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
          </Typography>
          
          <IconButton
            edge="end"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="black"
          >
            <AccountCircle />
          </IconButton>
          {/* Profile Menu */}
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={isMenuOpen}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleEditProfileClick}>Edit Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </TopBarContainer>
      {/* Profile Editor Modal */}
      <Modal
        open={isProfileEditorOpen}
        onClose={handleProfileEditorClose}
        aria-labelledby="profile-editor-title"
        aria-describedby="profile-editor-description"
        BackdropComponent={ModalBackdrop}
      >
        <ProfileEditorContainer>
          <Typography variant="h6" id="profile-editor-title" gutterBottom>
            Edit Profile
          </Typography>
          {/* Form Fields */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Mobile"
            fullWidth
            margin="normal"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "16px" }}
            onClick={handleSaveProfile}
          >
            Save
          </Button>
        </ProfileEditorContainer>
      </Modal>
    </>
  );
};

export default TopBar;
// this is my topbar.jsx
