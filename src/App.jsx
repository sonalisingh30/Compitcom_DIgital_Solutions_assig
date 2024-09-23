// src/App.js

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthLayout from "./pages/AuthLayout";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./pages/DashboardLayout";
import { Provider } from "react-redux";
import store from "./store"; // Assuming your store file path is correct

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Navigate replace to="signin" />} />
              <Route path="signin" element={<SignIn />} />
            </Route>
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={DashboardLayout} />}
            />
          </Routes>
        </Router>
        <Toaster position="top-right" reverseOrder={false} />
      </Provider>
    </>
  );
}

export default App;
