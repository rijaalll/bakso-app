
function NotFound() {
    document.title = 'Not Found';
    return (
        <div className={`w-full h-[80vh]`}>
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-auto h-auto flex flex-col items-center gap-1">
                    {/* <img src={reactIcon} alt="react-icon" className='w-[100px] h-[100px] min-[720px]:w-[150px] min-[720px]:h-[150px] animate-spin-slow my-2'/> */}
                    <p className="dark:text-white font-sans text-lg min-[720px]:text-2xl">{`<404 Page />`}</p>
                    <p className='dark:text-white font-sans text-sm min-[720px]:text-base'>This page for 404</p>
                    <p className='dark:text-white text-sm min-[720px]:text-lg'>edit in <code className='text-blue-500'>src/page/NotFound.jsx</code></p>
                </div>
            </div>
        </div>
    )
}

export default NotFound;