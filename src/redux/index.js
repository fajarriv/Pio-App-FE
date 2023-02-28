import { createSlice } from "@reduxjs/toolkit";

const initState = {
  mode: "light",
  user: null,
  token: null,
  allPost: [],
  availUser: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setAllPost: (state, action) => {
      state.allPost = action.payload.allPost;
    },
    setPost: (state, action) => {
      const updatedPosts = state.allPost.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.allPost = updatedPosts;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.closeFriends = action.payload.closeFriends;
      } else {
        console.error("You dont have closefriends");
      }
    },
    setAvail: (state, action) => {
      if (action.payload.availUser) {
        state.availUser = action.payload.availUser;
      }
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setAllPost,
  setPost,
  setUser,
  setAvail,
} = authSlice.actions;

export default authSlice.reducer;
