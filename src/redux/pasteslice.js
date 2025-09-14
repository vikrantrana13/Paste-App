import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  pastes: [], // each: {_id, title, content, createdAt}
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addPaste: {
      reducer(state, action) {
        state.pastes.unshift(action.payload);
      },
      prepare({ title, content }) {
        return {
          payload: {
            _id: nanoid(),
            title: title ?? "",
            content: content ?? "",
            createdAt: Date.now(),
          },
        };
      },
    },
    updatePaste(state, action) {
      const { _id, title, content } = action.payload;
      const idx = state.pastes.findIndex(p => p._id === _id);
      if (idx !== -1) {
        state.pastes[idx] = { ...state.pastes[idx], title, content };
      }
    },
    removeFromPastes(state, action) {
      const id = action.payload;
      state.pastes = state.pastes.filter(p => p._id !== id);
    },
  },
});

export const { addPaste, updatePaste, removeFromPastes } = pasteSlice.actions;
export default pasteSlice.reducer;
