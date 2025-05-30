import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./context/AuthContext";

// Page imports
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import LeftBar from "./components/leftbar/LeftBar";
import RightBar from "./components/rightbar/RightBar";
import Profile from "./pages/profile/Profile";

function App() {
  const { userId } = useAuth();
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div
          className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr_400px]
                    gap-0 xl:gap-x-5 2xl:gap-x-15 3xl:gap-x-35"
        >
          <NavBar />
          <LeftBar />
          <main className="mt-16 mx-5 p-4 h-[calc(100vh-64px)] overflow-y-auto col-span-1">
            <Outlet />
          </main>
          <RightBar />
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!userId) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
