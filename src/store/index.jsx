import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  chatId: "null",
  chatUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state, action) => {
      if (action.payload) {
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName,
          photoURL: action.payload.photoURL,
          // Add other necessary properties here
        };
      } else {
        state.user = null;
      }
    },
    setChatUser: (state, action) => {
      if (action.payload) {
        state.chatUser = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName,
          photoURL: action.payload.photoURL,
          // Add other necessary properties here
        };
        state.chatId =
          state.user.uid > action.payload.uid
            ? state.user.uid + action.payload.uid
            : action.payload.uid + state.user.uid;
      } else {
        state.chatUser = {};
        state.chatId = "null";
      }
    },
  },
});

export const { setMode, setUser, setChatUser } = authSlice.actions;
const reduce = authSlice.reducer;
export default reduce;
