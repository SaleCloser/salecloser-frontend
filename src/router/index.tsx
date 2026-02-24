import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTE_RULES } from "../types/auth.types";
import LoginPage from "../features/auth/pages/LoginPage";

export function AppRouter() {
  return (
    <Router>
      <Routes>
        {/** ONLY FOR GUESTS */}
        <Route element={<ProtectedRoute rules={[ROUTE_RULES.REQUIRE_GUEST]} />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/** Protected Routes */}
      </Routes>
    </Router>
  );
}
