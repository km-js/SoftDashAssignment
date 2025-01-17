import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tables" element={<Tables />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
