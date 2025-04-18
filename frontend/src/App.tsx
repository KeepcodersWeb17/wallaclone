import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
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
import Layout from "./layouts/Layout";
import UpdateUserPage from "./pages/UpdateUserPage";
import SelfUser from "./components/auth/SelfUser";

function App() {
  const [test, setTest] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost:4000/test") // Fetch de test al endpoint /test
      .then((res) => res.json())
      .then((data) => setTest(data.test))
      .catch((err) => {
        console.error(err);
        setTest("Error loading data");
      });
  }, []);

  return (
    <>
      <h1 className="text-xxl mt-10 text-center font-bold text-red-500">
        {test}
      </h1>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/adverts" element={<AdvertsPage />} />
          <Route index element={<Navigate to="/adverts" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/recoverypassword" element={<h2>RecoveryPage</h2>} />
          <Route
            path="/adverts/favorites/:username"
            element={<AdvertsPage />}
          />
          <Route path="/adverts/user/:username" element={<AdvertsPage />} />
          <Route path="/adverts/:advert" element={<AdvertPage />} />
          <Route
            path="/users/:username"
            element={
              <RequireAuth>
                <SelfUser>
                  <UserPage />
                </SelfUser>
              </RequireAuth>
            }
          />
          <Route
            path="/users/:username/edit"
            element={
              <RequireAuth>
                <SelfUser>
                  <UpdateUserPage />
                </SelfUser>
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
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/403" element={<ForbbidenPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
