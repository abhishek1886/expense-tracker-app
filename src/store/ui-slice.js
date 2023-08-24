import { createSlice } from "@reduxjs/toolkit"; 

const ui = createSlice({
  name: 'ui',
  initialState: { error: '' },
  reducers: {
    addError(state, actions) {
      state.error = actions.payload;
    }
  }
})

export const uiActions = ui.actions;

export default ui.reducer;