import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from "../Actions/usersActions";
import { fetchUsers, deleteUser } from "../Api/userApi";

export const fetchUsersAsync = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const users = await fetchUsers();
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};

export const deleteUserAsync = (userId) => async (dispatch) => {
  dispatch(deleteUserRequest());
  try {
    await deleteUser(userId);
    dispatch(deleteUserSuccess(userId));
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

// Export actions and reducer
export const selectUsers = (state) => state.users.users;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;
