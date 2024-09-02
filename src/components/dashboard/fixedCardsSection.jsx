import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types"; // Import PropTypes
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const darkGreyColor = "#343A40";

const OverviewButton = styled(IconButton)`
  && {
    color: ${darkGreyColor};
  }
`;

const FixedCardsSection = ({ projects, setFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const totalProjects = projects.length;
  const inProgressCount = projects.filter(
    (project) => project.status === "pending"
  ).length;
  const completedCount = projects.filter(
    (project) => project.status === "completed"
  ).length;
  const notStartedCount = projects.filter(
    (project) => project.status === "notStarted"
  ).length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (status) => {
    setFilter(status);
    handleClose();
  };

  return (
    <>
      <OverviewButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </OverviewButton>
      <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuItemClick("all")}>
          <Typography variant="h6" style={{ color: "black" }}>
            Total Projects: {totalProjects}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("pending")}>
          <Typography variant="h6" style={{ color: "orange" }}>
            In Progress: {inProgressCount}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("completed")}>
          <Typography variant="h6" style={{ color: "green" }}>
            Completed: {completedCount}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("notStarted")}>
          <Typography variant="h6" style={{ color: "red" }}>
            Not Started: {notStartedCount}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

// Define prop types for FixedCardsSection
FixedCardsSection.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["pending", "completed", "notStarted"])
        .isRequired,
    })
  ).isRequired,
  setFilter: PropTypes.func.isRequired, // Add setFilter prop type
};

export default FixedCardsSection;
