import {Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { APP_ROUTES } from "./utils/appRoutes"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={APP_ROUTES.LOGIN} replace/>}/>
        <Route path={APP_ROUTES.LOGIN} element={<Login />}/>
        <Route path={APP_ROUTES.SIGNUP} element={<Signup />}/>

        <Route path={APP_ROUTES.DASHBOARD} element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
      </Routes>
    </>
  )
}

export default App
