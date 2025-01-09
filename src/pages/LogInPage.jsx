import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const LogInPage = () => {

  const { loginUser } = useAuth()

  const { handleSubmit, register, reset } = useForm()

  const navigate = useNavigate()

  const Submit = async (data) => {
    try {
      await loginUser(data);
      navigate('/'); // Solo se navega si loginUser no lanza error
    } catch (err) {
      console.error('Error en inicio de sesión', err);
      alert('Credenciales incorrectas');
    }
  };
  

  const handleReset = (e) => {
    e.preventDefault()
    reset({
      userName: '',
      password: ''
    })
  }

  return (
    <div>
      <div className={`fixed w-full h-full flex justify-center items-center bg-slate-900 transform transition-transform duration-200 ease `}>
        <form onSubmit={handleSubmit(Submit)} className='w-2/6 shadow-2xl shadow-cyan-400/50  bg-white rounded-[50px] flex flex-col items-center py-8 px-2' action="">
          <img className='w-5/6 mb-5' src="\logo suministros industriales.png" alt="" />
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-bold'>Sistema de seguimiento</h1>
          </div>
          <section className='w-full flex flex-col items-center'>
            <div className='flex flex-col w-5/6 my-4 '>
              <label className='text-center text-slate-500 font-bold'>Usuario</label>
              <input className='border border-black rounded-[15px] px-4 py-1' {...register('userName')} type="text" />
            </div>
            <div className='flex flex-col w-5/6 my-'>
              <label className='text-center text-slate-500 font-bold'>Contraseña</label>
              <input className='border border-black rounded-[15px] mb-4 px-4 py-1' {...register('password')} type="password" />
            </div>
            <div className='w-full flex justify-center items-center'>
              <button className='w-3/6 bg-blue-600 text-white text-2xl font-bold my-2 py-1 rounded-[18px] hover:bg-blue-500'>INGRESAR</button>
            </div>
            <div className='w-full flex justify-center items-center'>
              <button onClick={handleReset} className='w-1/6 bg-slate-600 text-white text-base  py-1 rounded-[18px] hover:bg-slate-500'>RESET</button>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
 
export default LogInPage
