import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnprotectedRoutes from './Components/Navigation/UnprotectedRoutes';
import ProtectedRoutes from './Components/Navigation/ProtectedRoutes';

import theme from './StyledComponents/Theme';

import RegistrationPage from './Pages/RegistrationPage';
// import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import AllPostsPage from './Pages/AllPostsPage';
import AllUsersPage from './Pages/AllUsersPage';
import RegistrationConfirmation from './Pages/RegistrationConfirmation';
import EmailVerification from './Pages/EmailVerification';
import UnifiedSearchPage from './Pages/UnifiedSearchPage';
import FeedPage from './Pages/FeedPage';


import { ThemeProvider } from '@emotion/react';

import { Navigate } from 'react-router-dom';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Unprotected Routes */}
          <Route element={<UnprotectedRoutes />}>

            <Route path="/register" element={<RegistrationPage />} />

            <Route path="/verify" element={<EmailVerification />} />

            <Route path="/registration-confirmation" element={<RegistrationConfirmation />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/search" element={<UnifiedSearchPage />} />
            <Route path="/allposts" element={<AllPostsPage />} />
            <Route path="/allusers" element={<AllUsersPage />} />
            <Route path="/profile/:profileUserId" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to={`/`} />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;