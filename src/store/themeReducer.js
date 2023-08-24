import { createSlice } from "@reduxjs/toolkit";

const initialTheme = { darkTheme: false };

const theme = createSlice({
  name: "themeToggle",
  initialState: initialTheme,
  reducers: {
    themeToggle(state) {
      const bodyElement = document.body;
      bodyElement.dataset.bsTheme =
        bodyElement.dataset.bsTheme === "light" ? "dark" : "light";
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const themeActions = theme.actions;

export default theme.reducer;
