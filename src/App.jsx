import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
// import Employees from "./pages/CreateEmployee";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import Dashboard from "./pages/EmployeeDashboard";
import { PrimeReactProvider } from "primereact/api";
import "/node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import SignUpForm from "./features/users/SignUpForm";
import LoginForm from "./features/users/LoginForm";
// import CreateEmployee1 from "./pages/CreateEmployee1";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import Account from "./features/users/Account";
import { UserContextProvider } from "./contexts/UserContext";
// import { UserContextProvider } from "./contexts/UserContext";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      // i will render the dashboard instead of this Home component, and i will put the contents in the home component in a header element of the AppLayout
      // in retrospect, I will have to take this Home page and put it outside of the route, this is because since it's in the protected route, you can't access it unless you log in
      // {
      //   path: "/",
      //   element: <Home />,
      // },
      // this will be in the dashboard
      // {
      //   // path: "employees",
      //   // Will change the component name. I was getting some weird glitch in vscode not auto importing components
      //   // element: <CreateEmployee1 />,
      // },
      {
        path: "employee/dashboard",
        element: <EmployeeDashboard />,
        // element: <Dashboard />,
      },
      {
        path: "manager/dashboard",
        element: <ManagerDashboard />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "signup",
    element: <SignUpForm />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 10000,
      // if I want the leave request to be automatically refetched for employees once it's approved, the the staleTime should be set to 0 and the refetchOnWindowFocus should also be set to true
      // staleTime: 0,
      gcTime: 5 * 60 * 100000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <UserContextProvider>
      <PrimeReactProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PrimeReactProvider>
    </UserContextProvider>
  );
}

export default App;
