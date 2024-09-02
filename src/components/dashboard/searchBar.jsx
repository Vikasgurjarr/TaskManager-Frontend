// components/SearchBar.jsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../../redux/slices/projectSlice"; // Adjust path as per your project structure
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to fetch projects based on search term
  const fetchProjectsBySearch = () => {
    dispatch(fetchProjects(searchTerm)); // Adjust action payload structure as needed
  };

  return (
    <TextField
      label="Search Projects"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={fetchProjectsBySearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
