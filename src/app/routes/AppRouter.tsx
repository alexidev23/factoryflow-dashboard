import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import AppLayout from "../layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";

import DashboardHomePage from "@/features/home/DashboardHomePage";

import ProductListPage from "@/features/products/pages/ProductsListPage";
import ProductCreatePage from "@/features/products/pages/ProductCreatePage";
import ProductDetailPage from "@/features/products/pages/ProductDetailPage";

import VehicleListPage from "@/features/vehicles/pages/VehiclesListPage";
import VehicleRegisterPage from "@/features/vehicles/pages/VehicleRegisterPage";
import VehicleDetailPage from "@/features/vehicles/pages/VehicleDetailPage";

import EmployeesListsPage from "@/features/employees/pages/EmployeesListPage";
import EmployeeRegisterPage from "@/features/employees/pages/EmployeeRegisterPage";
import EmployeeDetailPage from "@/features/employees/pages/EmployeeDetailPage";

import OrderListPage from "@/features/orders/pages/OrdersListPage";
import OrderCreatePage from "@/features/orders/pages/OrderCreatePage";
import OrderDetailPage from "@/features/orders/pages/OrderDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Públicas
      { path: "login", element: <LoginPage /> },

      // Privadas
      {
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <DashboardHomePage /> },
          { path: "products", element: <ProductListPage /> },
          { path: "products/create", element: <ProductCreatePage /> },
          { path: "products/:id", element: <ProductDetailPage /> },

          { path: "vehicles", element: <VehicleListPage /> },
          { path: "vehicles/register", element: <VehicleRegisterPage /> },
          { path: "vehicles/:id", element: <VehicleDetailPage /> },

          { path: "employees", element: <EmployeesListsPage /> },
          { path: "employees/register", element: <EmployeeRegisterPage /> },
          { path: "employees/:id", element: <EmployeeDetailPage /> },

          { path: "orders", element: <OrderListPage /> },
          { path: "orders/create", element: <OrderCreatePage /> },
          { path: "orders/:id", element: <OrderDetailPage /> },
        ],
      },
    ],
  },
]);
