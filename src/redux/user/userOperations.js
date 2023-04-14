import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  try {
    const { data } = await api.get("/users");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async (params) => {
    try {
      const { data } = await api.put(`/users/${params.id}`, {
        followers: params.follow,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
