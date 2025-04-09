import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import textData from '../data/textData.json';
import imageIcon from '../image/web-image/bakso.png';

function NavbarApp({ isLogin, setIsLogin }) {
  const [navPath, setNavPath] = useState([]);
  const navigate = useNavigate();
  const pageNavState = useLocation();

  useEffect(() => {
    setNavPath(textData.NavbarApp.navbarPath);
  }, [navPath]);

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem('customer');
    localStorage.removeItem('selectedFood');
    localStorage.removeItem('selectedDrinks');
    localStorage.removeItem('selectedSnacks');
    setTimeout(() => {
      window.location.reload()
    }, [500])
  }

  return (
    <nav className='sticky top-0 z-[100] w-full h-auto bg-slate-50/20 backdrop-blur-sm'>
      <div className='w-full h-auto flex justify-center items-center'>
        <div className='w-[90%] h-auto flex justify-between items-center py-5 truncate'>
          <div className='w-auto h-auto flex flex-row items-center gap-2'>
            <div className='w-full max-w-[70px] h-auto'>
              <img src={imageIcon} alt="" className='z-[10] w-full h-auto will-change-transform transition-all duration-500 hover:scale-[1.5] hover:rotate-[370deg] active:scale-[1] hover:translate-x-[0.5rem] hover:relative' />
            </div>
            <div className='flex flex-col'>
              <p className='text-3xl will-change-transform transition-all duration-300 hover:scale-[1.2] active:scale-[0.9]'>{textData.NavbarApp.header_title.text_1} <span className='text-green-500'>{textData.NavbarApp.header_title.text_2}</span></p>
              <p className='text-xl tracking-wide will-change-transform transition-all duration-300 hover:scale-[1.4] hover:text-pink-400 active:scale-[1] active:rotate-[10deg]'>{textData.NavbarApp.child_title.text} </p>
            </div>
          </div>
          <div className={`flex flex-row gap-3 transition-transform will-change-transform duration-500  ${pageNavState.pathname === "/" && isLogin ? 'translate-x-0' : 'translate-x-[6rem]'}`}>
            {navPath.map((path, index) => (
                <button className={`${pageNavState.pathname === path ? `text-green-500 scale-[1.1]` : ``} text-xl tracking-wider capitalize px-2 py-1 cursor-pointer will-change-transform hover:scale-[1.4] hover:rotate-[3deg] active:scale-[0.9] active:rotate-[10deg] transition-all duration-300`} key={index} onClick={() => navigate(path)}>
                  {path === "/" ? "Order" : path.replace("/", "")}
                </button>
            ))}
              <button onClick={handleLogout} className='flex flex-row gap-1 items-center capitalize px-2 py-1 cursor-pointer will-change-transform hover:text-red-400 transition-all duration-300'>
                <span className='bi bi-box-arrow-right text-lg'></span>
                <span className='text-xl'>keluar</span>
              </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarApp;