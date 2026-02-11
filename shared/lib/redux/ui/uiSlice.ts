import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isSearchModalOpen: boolean;
  // isCartModalOpen: boolean;
  // isMobileMenuOpen: boolean;
}

const initialState: UiState = {
  isSearchModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSearchModal(state) {
      state.isSearchModalOpen = true;
    },
    closeSearchModal(state) {
      state.isSearchModalOpen = false;
    },
    toggleSearchModal(state) {
      state.isSearchModalOpen = !state.isSearchModalOpen;
    },
  },
});

export const { openSearchModal, closeSearchModal, toggleSearchModal } =
  uiSlice.actions;
export default uiSlice.reducer;
