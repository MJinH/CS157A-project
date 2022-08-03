import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MainPage } from './components/MainPage';
import { AuthContextProvider } from './authContext/AuthContext';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
function App() {
  return (
    <>
      <AuthContextProvider>
          <Router>
              <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route exact path="/:username" element={<MainPage/>} />
                <Route exact path="/:username/cart" element={<Cart/>}/>
                <Route exact path="/:username/profile" element={<Profile/>}/>
              </Routes>
          </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
