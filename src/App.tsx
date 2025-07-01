import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import BusinessRoute from './components/BusinessRoute';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ProfilePage from './pages/ProfilePage';
import BusinessPage from './pages/BusinessPage';
import AddActivityPage from './pages/AddActivityPage';
import AdminActivitiesPage from './pages/AdminActivitiesPage';
import NotFoundPage from './pages/NotFoundPage';
import BusinessActivitiesPage from './pages/BusinessActivitiesPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen #0a1128 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/activities"
                element={
                  <PrivateRoute>
                    <ActivitiesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/business"
                element={
                  <PrivateRoute>
                    <BusinessPage />
                  </PrivateRoute>
                }
              />
              <Route
                  path="/my-activities"
                  element={
                    <PrivateRoute>
                      <BusinessActivitiesPage />
                    </PrivateRoute>
                  }
                />

              {/* Business-only Routes */}
              <Route
                path="/activities/new"
                element={
                  <PrivateRoute>
                    <BusinessRoute>
                      <AddActivityPage />
                    </BusinessRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/activities"
                element={
                  <PrivateRoute>
                    <BusinessRoute>
                      <AdminActivitiesPage />
                    </BusinessRoute>
                  </PrivateRoute>
                }
              />

              {/* Not Found */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
