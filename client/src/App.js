import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from './config/store';
import setAuthToken from './config/setAuthToken';
import { setCurrentUser, logout } from './actions/authActions';

// import Components
import Login from './components/admin/Login';
import Home from './components/Home';
import AdminDashboard from './components/admin/AdminDashboard';
import Logout from './components/common/Logout';
import Navbar from './components/common/Navbar';
import ListEvents from './components/events/ListEvents';
import Footer from './components/common/Footer';
import EventDetails from './components/events/EventDetails';
import TestPayment from './components/test/TestPayment';


// firebase Configuration
import './config/firebase';


// Checking if the user is authenticated
if (localStorage.jwtToken) {
  // Set Authorization Header
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set Current User
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logout());
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/events' element={<ListEvents />} />
          <Route path='/events/:id' element={<EventDetails />} />

          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/test" element={<TestPayment />} />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
