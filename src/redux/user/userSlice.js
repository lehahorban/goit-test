import { createSlice } from "@reduxjs/toolkit";
import { getUsers, updateUserById } from "./userOperations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoading: false,
    following: false,
  },
  reducers: {
    updateFollowingById(state, { payload }) {
      const { id, following } = payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      state.users[userIndex] = {
        ...state.users[userIndex],
        following,
      };
    },
  },

  extraReducers: {
    [getUsers.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },

    [updateUserById.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [updateUserById.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { id, followers } = payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      state.users[userIndex] = {
        ...state.users[userIndex],
        followers,
      };
    },
    [updateUserById.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
export const { updateFollowingById } = userSlice.actions;
