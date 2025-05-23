import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import RequireAuth from "./components/auth/RequireAuth";
import SelfUser from "./components/auth/SelfUser";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import AdvertsPage from "./pages/AdvertsPage";
import AdvertPage from "./pages/AdvertPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import UpdateAdvertPage from "./pages/UpdateAdvertPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForbbidenPage from "./pages/Forbbiden";
import IsOwner from "./components/auth/IsOwner";
import HomePage from "./pages/HomePage";
import ChatsPage from "./pages/ChatsPage";
import ChatPage from "./pages/ChatPage";
import RecoveryPasswordPage from "./pages/RecoveryPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/adverts" element={<AdvertsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/my-chats"
          element={
            <RequireAuth>
              <ChatsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/my-chats/:chatId"
          element={
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
          }
        />
        <Route path="/recovery-password" element={<RecoveryPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
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
        <Route path="/adverts/favorites/:username" element={<AdvertsPage />} />
        <Route path="/adverts/user/:username" element={<AdvertsPage />} />
        <Route path="/adverts/:advert" element={<AdvertPage />} />
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
              <IsOwner>
                <UpdateAdvertPage />
              </IsOwner>
            </RequireAuth>
          }
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/403" element={<ForbbidenPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
}

export default App;
