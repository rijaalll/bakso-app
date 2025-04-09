// REACT IMPORT
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// STYLE IMPORT
import './index.css';
import './font/MyFont.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// PAGE, COMPONENT IMPORT
import NavbarApp from './template/NavbarApp.jsx';
import MainApp from './page/MainApp.jsx';
import FoodPage from './page/FoodPage.jsx';
import DrinkPage from './page/DrinkPage.jsx';
import SnackPage from './page/SnackPage.jsx';
import NotFound from './page/NotFound.jsx';

function App() {
  const [ isLogin, setIsLogin ] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('customer')) {
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <div className={`w-full h-auto min-h-screen bg-slate-100 dark:bg-slate-800 transition-colors duration-300`}>
      <Router>
        <NavbarApp setIsLogin={setIsLogin} isLogin={isLogin} />
        <Routes>
          <Route path='/' element={<MainApp setIsLogin={setIsLogin} isLogin={isLogin} />} />
          <Route path='/food' element={<FoodPage isLogin={isLogin} />} />
          <Route path='/drink' element={<DrinkPage isLogin={isLogin} />} />
          <Route path='/snack' element={<SnackPage isLogin={isLogin} />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;