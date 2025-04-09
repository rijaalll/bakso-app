import React, { useState, useEffect } from 'react';

function MainApp({ setIsLogin, isLogin }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [username, setUsername] = useState('');
  const [inputUsername, setInputUsername] = useState('');

  useEffect(() => {
    document.title = 'Pesanan';
  })

  useEffect(() => {
    const savedFood = JSON.parse(localStorage.getItem('selectedFood')) || [];
    const savedDrinks = JSON.parse(localStorage.getItem('selectedDrinks')) || [];
    const savedSnacks = JSON.parse(localStorage.getItem('selectedSnacks')) || [];
    setSelectedItems([...savedFood, ...savedDrinks, ...savedSnacks]);
    setSelectedFood(savedFood);

    if (localStorage.getItem('customer')) {
      setUsername(localStorage.getItem('customer'));
      setIsLogin(true);
    }
  }, [setIsLogin]);

  const calculateFoodTotalPrice = () => {
    return selectedFood.reduce((acc, item) => acc + item.harga * item.quantity, 0);
  };

  const handleUsernameSubmit = () => {
    if (inputUsername.trim()) {
      localStorage.setItem('customer', inputUsername);
      setUsername(inputUsername);
      setIsLogin(true);
    }
  };

  return (
    <>
      {isLogin ? (
        <div className='w-full h-auto min-h-screen'>
          <div className='h-full w-full flex justify-center'>
            <div className='w-[90%] h-full'>
              <div className='w-full h-auto flex flex-col mt-[3rem] gap-4'>
                <div className='w-full flex flex-row justify-between items-center'>
                  <p className='text-4xl'>Pesanan Kamu</p>
                  <div className='flex flex-col gap-3 items-end'>
                    <p className='text-2xl text-green-400'>Hallow, <span className='text-black'>{username}</span></p>
                  </div>
                </div>
                <div className='w-full flex flex-col gap-5 mt-[4rem]'>
                  {selectedItems.map(item => (
                    <div key={item.id} className="py-2 flex justify-between border-y-[2px] border-transparent hover:border-green-300/80 transition-all duration-300">
                      <div className='flex flex-row gap-3 justify-start'>
                        <span className='text-xl'>{item.quantity} x</span>
                        <span className='text-xl tracking-wide'>{item.nama}</span>
                      </div>
                      <div className='w-auto flex flex-col justify-start'>
                        <span className='text-base tracking-wide'>Rp. {(item.harga).toLocaleString()} x {item.quantity}</span>
                        <span className='text-xl tracking-wide'>Total: Rp. {(item.harga * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedItems.length === 0 ? (
                  <div className='w-full flex justify-center items-center'>
                    <p className='text-2xl text-center'>{`kamu belum memesan :(`}</p>
                  </div>
                ) : (
                  <div className='w-full flex justify-end my-[3rem] border-t-2 py-[2rem]'>
                    <p className='text-3xl'>Total : Rp. {(calculateFoodTotalPrice()).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <div className="flex flex-col items-center gap-[4rem]">
            <p className='text-4xl'>Nama kamu</p>
            <div className='flex flex-col gap-[2rem]'>
              <input type="text" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} className="border-b-2 border-black/30 bg-transparent p-2 focus:border-black/80 focus:outline-none" placeholder="disini" />
              <button onClick={handleUsernameSubmit} className="will-change-transform w-auto border-2 border-green-400/50 hover:bg-green-400 text-black hover:text-white hover:scale-110 active:scale-[0.9] py-2 px-6 rounded-lg transition-all duration-300" >
                Lanjoot
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MainApp;