import React, { useState, useEffect } from 'react';
import dataSnack from '../data/dataSnack.json';

function SnackPage({ isLogin }) {
  const [snacks, setSnacks] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState([]);
  const [username, setUsername] = useState('');
  document.title = 'Menu Sampingan';

  useEffect(() => {
    setSnacks(dataSnack);
    const savedSnacks = JSON.parse(localStorage.getItem('selectedSnacks')) || [];
    setSelectedSnacks(savedSnacks);
  }, []);

  useEffect(() => {
    if (isLogin && localStorage.getItem('customer')) {
      setUsername(localStorage.getItem('customer'));
    }
  }, [isLogin]);

  const handleAddToOrder = (item) => {
    const updatedSnackOrder = [...selectedSnacks];
    const index = updatedSnackOrder.findIndex(snack => snack.id === item.id);

    if (index === -1) {
      updatedSnackOrder.push({ ...item, quantity: 1 });
    } else {
      updatedSnackOrder[index].quantity += 1;
    }

    setSelectedSnacks(updatedSnackOrder);
    localStorage.setItem('selectedSnacks', JSON.stringify(updatedSnackOrder));
  };

  const handleRemoveFromOrder = (item) => {
    const updatedSnackOrder = [...selectedSnacks];
    const index = updatedSnackOrder.findIndex(snack => snack.id === item.id);

    if (index !== -1) {
      if (updatedSnackOrder[index].quantity > 1) {
        updatedSnackOrder[index].quantity -= 1;
      } else {
        updatedSnackOrder.splice(index, 1);
      }
    }

    setSelectedSnacks(updatedSnackOrder);
    localStorage.setItem('selectedSnacks', JSON.stringify(updatedSnackOrder));
  };

  return (
    <div className='w-full h-auto min-h-screen'>
    <div className='h-full w-full flex justify-center'>
      <div className='w-[90%] h-full'>
        <div className='w-full flex flex-col items-center mt-[3rem] gap-4'>
          <div className='w-full flex flex-row justify-between items-center'>
            <p className='text-4xl'>Menu Sampingan</p>
            <div className='flex flex-col gap-3 items-end'>
              {isLogin && username.length > 0 ? (
                <p className='text-2xl text-green-400'>Hallow, <span className='text-black'>{username}</span></p>
              ) : (
                <p className='text-2xl text-red-600'>Isi nama dulu!!</p>
              )}
            </div>
          </div>
          <div className='w-full h-auto flex flex-row flex-wrap justify-center gap-3 mt-[4rem]'>
            {snacks.map(item => (
              <div key={item.id} className='flex flex-col items-center border p-4 rounded-lg shadow-lg w-60 will-change-transform transition-all duration-300 hover:relative hover:scale-[1.05] active:scale-[1]'>
                <img src={item.img_src} alt={item.nama} className='w-full h-40 object-cover mb-4 rounded' />
                <div className='w-full px-2 '>
                  <p className='text-lg'>{item.nama}</p>
                  <p className='text-sm'>Rp {(item.harga).toLocaleString()}</p>
                </div>
                <div className={`${isLogin ? 'justify-between' : ' justify-center'} w-full flex flex-row items-center mt-4 mb-2 px-5`}>
                  {isLogin ? (
                    <>
                      <button className='cursor-pointer border-[1px] border-transparent px-1 rounded-full will-change-transform transition-all duration-300 hover:border-green-400/40 hover:scale-[1.3] active:rotate-[-35deg]' onClick={() => handleRemoveFromOrder(item)}>
                        <span className='bi bi-dash-lg text-2xl'></span>
                      </button>
                      <p className='text-xl'>{selectedSnacks.find(f => f.id === item.id)?.quantity || 0}</p>
                      <button className='cursor-pointer border-[1px] border-transparent px-1 rounded-full will-change-transform transition-all duration-300 hover:border-green-400/40 hover:scale-[1.3] active:rotate-[35deg]' onClick={() => handleAddToOrder(item)}>
                        <span className='bi bi-plus-lg text-2xl'></span>
                      </button>
                    </>
                  ) : (
                    <>
                      <p className='text-red-500 text-xl font-bold'>Isi nama dulu</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SnackPage;
