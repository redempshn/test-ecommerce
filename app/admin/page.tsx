import ProtectedRoute from "@/shared/ui/ProtectedRoute";
import AdminPanel from "@/widgets/ui/AdminPanel";

const AdminPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminPanel />
    </ProtectedRoute>
  );
};
export default AdminPage;
