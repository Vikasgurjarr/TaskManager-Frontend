import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  TextField,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../components/dashboard/sidebar";
import TopBar from "../components/dashboard/topAppBar";
import {
  AppBarStyled,
  DrawerStyled,
} from "../components/dashboard/dashboardStyle";
import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
} from "../react-redux/ThunkActions/userThunkActions";
import {
  deleteUserAsync,
  fetchUsersAsync,
} from "../react-redux/ThunkActions/userThunkActions";

// Styled components for styling
const UserSection = styled(Box)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledTableHeadCell = styled(TableCell)`
  && {
    font-weight: bold;
    background-color: #3f9c9e;
    color: white;
    position: sticky;
    top: 0;
    z-index: 100;
  }
`;

const lightGreyColor = "#f4f5f7";

const PageContainer = styled(Box)`
  display: flex;
  height: 95vh;
  background-color: ${lightGreyColor};
`;

const Content = styled(Box)`
  margin-top: 64px; /* Adjust if the AppBar height is different */
  flex-grow: 1;
  padding: 24px;
  overflow-y: auto;
`;

const ProjectListContainer = styled(Box)`
  margin-top: 16px;
  height: calc(95vh - 250px); /* Adjust height as needed */
`;

const HeaderSection = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SearchContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 300px;
    padding: 5px 5px;
    margin-right: 200px;
    .MuiOutlinedInput-root {
      border-radius: 25px;
      background-color: #f0f0f0;
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: #3f9c9e;
    }
    .MuiOutlinedInput-input {
      padding: 10px 15px;
    }
  }
`;

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [localUsers, setLocalUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortClick = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = localUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUserAsync(userId));
      setLocalUsers(localUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  return (
    <PageContainer>
      {/* Side Drawer */}
      <DrawerStyled variant="permanent">
        {/* Drawer content */}
        <Sidebar />
      </DrawerStyled>

      {/* Main content area */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top App Bar */}
        <AppBarStyled position="fixed">
          <TopBar />
        </AppBarStyled>

        <Content>
          <UserSection>
            <HeaderSection>
              <Typography variant="h4">USERS</Typography>
              <SearchContainer>
                <StyledTextField
                  label="Search by Name"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </SearchContainer>
            </HeaderSection>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">Error: {error}</Typography>
            ) : (
              <ProjectListContainer>
                <TableContainer
                  component={Paper}
                  sx={{ maxHeight: "calc(95vh - 300px)" }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <StyledTableHeadCell align="left">
                          Sno
                        </StyledTableHeadCell>
                        <StyledTableHeadCell align="left">
                          <TableSortLabel
                            active={true}
                            direction={sortOrder}
                            onClick={handleSortClick}
                          >
                            Name
                          </TableSortLabel>
                        </StyledTableHeadCell>
                        <StyledTableHeadCell align="left">
                          Email
                        </StyledTableHeadCell>
                        <StyledTableHeadCell align="left">
                          Phone
                        </StyledTableHeadCell>
                        <StyledTableHeadCell align="left">
                          Address
                        </StyledTableHeadCell>
                        <StyledTableHeadCell align="left">
                          City
                        </StyledTableHeadCell>
                        <StyledTableHeadCell align="left">
                          Gender
                        </StyledTableHeadCell>
                        <StyledTableHeadCell align="left">
                          Actions
                        </StyledTableHeadCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedUsers.map((user, index) => (
                        <TableRow key={user._id} hover>
                          <TableCell align="left">
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell align="left">{user.name}</TableCell>
                          <TableCell align="left">{user.email}</TableCell>
                          <TableCell align="left">{user.mobile}</TableCell>
                          <TableCell align="left">{user.address}</TableCell>
                          <TableCell align="left">{user.city}</TableCell>
                          <TableCell align="left">{user.gender}</TableCell>
                          <TableCell align="left">
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              <DeleteIcon style={{ color: "#f44336" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={sortedUsers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </ProjectListContainer>
            )}
          </UserSection>
        </Content>
      </Box>
    </PageContainer>
  );
};

export default UsersPage;
// ye he meri team.js file or me tumhe ek or file deeta hu
