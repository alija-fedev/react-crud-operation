import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  return (
    <div className="App">
      {/* <HomePage /> */}

      <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/details" element={<DetailsPage />}/>
        <Route path="/login" element={<LoginForm />}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
