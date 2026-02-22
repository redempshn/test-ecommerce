import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isSearchModalOpen: boolean;
  isLoginModalOpen: boolean;
  // isCartModalOpen: boolean;
  // isMobileMenuOpen: boolean;
}

const initialState: UiState = {
  isSearchModalOpen: false,
  isLoginModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSearchModal(state) {
      state.isSearchModalOpen = true;
    },
    openLoginModal(state) {
      state.isLoginModalOpen = true;
    },
    closeSearchModal(state) {
      state.isSearchModalOpen = false;
    },
    closeLoginModal(state) {
      state.isLoginModalOpen = false;
    },
    toggleSearchModal(state) {
      state.isSearchModalOpen = !state.isSearchModalOpen;
    },
    toggleLoginModal(state) {
      state.isLoginModalOpen = !state.isLoginModalOpen;
    },
  },
});

export const {
  openSearchModal,
  closeSearchModal,
  toggleSearchModal,
  openLoginModal,
  closeLoginModal,
  toggleLoginModal,
} = uiSlice.actions;
export default uiSlice.reducer;
