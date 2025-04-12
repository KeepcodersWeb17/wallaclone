import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import AdvertsPage from "./pages/AdvertsPage";
import AdvertPage from "./pages/AdvertPage";
import RequireAuth from "./components/auth/RequireAuth";
import UpdateAdvertPage from "./pages/UpdateAdvertPage";
import UserPage from "./pages/UserPage";
import ForbbidenPage from "./pages/Forbbiden";

function App() {
  const [test, setTest] = useState<string>("Loading...");

  useEffect(() => {
    fetch("https://api.wallaclone.keepcoders.duckdns.org/test") // Fetch de test al endpoint /test
      .then((res) => res.json())
      .then((data) => setTest(data.test))
      .catch((err) => {
        console.error(err);
        setTest("Error loading data");
      });
  }, []);

  return (
    <>
      <h1>{test}</h1>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/recoverypassword" element={<h2>RecoveryPage</h2>} />
        <Route path="/adverts" element={<AdvertsPage />} />
        <Route path="/adverts/:advert" element={<AdvertPage />} />
        <Route
          path="/users/:username"
          element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          }
        />
        <Route
          path="/adverts/new"
          element={
            <RequireAuth>
              <NewAdvertPage />
            </RequireAuth>
          }
        />
        <Route
          path="/adverts/update/:advert"
          element={
            <RequireAuth>
              <UpdateAdvertPage />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/403" element={<ForbbidenPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </>
  );
}

export default App;
