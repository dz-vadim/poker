import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage.tsx";
import Header from "./components/Header.tsx";
import {useAuth} from "./auth/AuthContext";
import Rooms from "./pages/RoomsPage.tsx";
import RoomDetails from "./components/RoomDetails.tsx";
import TablePage from "./pages/TablePage.tsx";

export default function App() {
  const {isAuthenticated} = useAuth();

  return (
    <div>
      <Header/>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/rooms" element={<Rooms/>}/>
        <Route path="/rooms/:id" element={<RoomDetails />} />

        <Route path="/login"
               element={isAuthenticated ? <Navigate to="/" replace/> : <LoginPage/>}
        />
        <Route path="/register"
               element={isAuthenticated ? <Navigate to="/" replace/> : <RegisterPage/>}
        />

          <Route path="/poker-table/:id?"
                 element= {<TablePage/>}
          />
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  );
}
