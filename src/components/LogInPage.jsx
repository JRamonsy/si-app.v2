import { useContext } from "react";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";

const LogInPage = ()=> {

  const {handleEnterLogIn} = useContext(HandleFuntionsContext);


  return (
    <div className={`fixed w-full h-full flex justify-center items-center bg-slate-900 ${ 'scale-0'} transform transition-transform duration-200 ease `}>
        <form className='w-2/6 shadow-2xl shadow-cyan-400/50  bg-white rounded-[25px] flex flex-col items-center py-8 px-2' action="">
          <img className='w-5/6 mb-5' src="\logo suministros industriales.png" alt="" />
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-bold'>Sistema de seguimiento</h1>
          </div>
          <section className='w-full flex flex-col items-center'>
            <div className='flex flex-col w-5/6 my-4 '>
              <label className='text-center text-slate-500 font-bold' htmlFor="">Usuario</label>
              <input className='border border-black rounded-[6px] px-4 py-1' type="text" id="" />
            </div>
            <div className='flex flex-col w-5/6 my-'>
              <label className='text-center text-slate-500 font-bold' htmlFor="">Contraseña</label>
              <input className='border border-black rounded-[6px] px-4 py-1' type="password"  />
            </div>
            <div className='w-full flex justify-center items-center'>
              <button onClick={handleEnterLogIn} className='w-5/6 bg-blue-600 text-white text-2xl font-bold my-4 py-1 rounded-[6px] hover:bg-blue-500'>INGRESAR</button>
            </div>
          </section>               
        </form>
    </div>
  )
}

export default LogInPage
