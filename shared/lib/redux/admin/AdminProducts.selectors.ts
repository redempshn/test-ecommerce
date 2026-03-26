import { productsAdapter } from "../adapter";
import { RootState } from "../store/store";

export const {
  selectAll: selectAdminAllProducts,
  selectById: selectAdminProductById,
} = productsAdapter.getSelectors<RootState>((state) => state.adminProducts);
