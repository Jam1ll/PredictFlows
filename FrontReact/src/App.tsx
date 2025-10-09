import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CryptoListPage from './pages/CryptoListPage';
import CryptoDetailPage from './pages/CryptoDetailPage';
import StocksPage from './pages/StocksPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crypto" element={<CryptoListPage />} />
        <Route path="/crypto/:id" element={<CryptoDetailPage />} />
        <Route path="/stocks" element={<StocksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
