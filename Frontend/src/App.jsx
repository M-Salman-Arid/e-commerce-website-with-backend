import { BrowserRouter, Routes, Route } from "react-router-dom";

// Customer Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import VerifyOTP from "./pages/Auth/verifyOTP";

// Admin Layout
import AdminLayout from "./components/Admin/AdminLayout";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Products from "./pages/Admin/Products/Products";
import AddProduct from "./pages/Admin/AddProducts/AddProduct";
import Categories from "./pages/Admin/Categories/Categories";
import Orders from "./pages/Admin/Orders/Orders";
import Users from "./pages/Admin/Users/Users";
import Profile from "./pages/Admin/Profile/Profile";

// routes

import ProtectedRoute from "./components/routes/ProtectedRoutes";
import PublicRoute from "./components/routes/PublicRoutes";
import AdminRoute from "./components/routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route element={<PublicRoute />}>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

        </Route>

        <Route element={<ProtectedRoute />}>

          <Route path="/profile" element={<Profile />} />

        </Route>


        <Route element={<AdminRoute />}>

          <Route path="/admin" element={<AdminLayout />}>
          
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;