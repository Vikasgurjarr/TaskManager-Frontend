import axiosInstance from "../axiosInstance";

export const fetchUsers = () => {
  return axiosInstance
    .get("/users")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteUser = (userId) => {
  return axiosInstance.delete(`/users/${userId}`).catch((error) => {
    throw error;
  });
};
