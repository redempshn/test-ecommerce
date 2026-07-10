import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isSearchModalOpen: boolean;
  isLoginModalOpen: boolean;
  isOpenDrawer: boolean;
  isReviewModalOpen: boolean;
  // isCartModalOpen: boolean;
  // isMobileMenuOpen: boolean;
}

const initialState: UiState = {
  isOpenDrawer: false,
  isSearchModalOpen: false,
  isLoginModalOpen: false,
  isReviewModalOpen: false,
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
    openDrawer(state) {
      state.isOpenDrawer = true;
    },
    openReviewModal(state) {
      state.isReviewModalOpen = true;
    },
    closeSearchModal(state) {
      state.isSearchModalOpen = false;
    },
    closeLoginModal(state) {
      state.isLoginModalOpen = false;
    },
    closeDrawer(state) {
      state.isOpenDrawer = false;
    },
    closeReviewModal(state) {
      state.isReviewModalOpen = false;
    },
    toggleSearchModal(state) {
      state.isSearchModalOpen = !state.isSearchModalOpen;
    },
    toggleLoginModal(state) {
      state.isLoginModalOpen = !state.isLoginModalOpen;
    },
    toggleDrawer(state) {
      state.isOpenDrawer = !state.isOpenDrawer;
    },
    toggleReviewModal(state) {
      state.isReviewModalOpen = !state.isReviewModalOpen;
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
  openDrawer,
  closeDrawer,
  toggleDrawer,
  openReviewModal,
  closeReviewModal,
  toggleReviewModal,
} = uiSlice.actions;
export default uiSlice.reducer;
