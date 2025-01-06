
import { useContext } from "react";
import { PlateDataContext } from "../context/PlateDataContext";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";
import FollowUp2 from "./FollowUp2";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoMdExit } from "react-icons/io";

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';





const HeaderFollowUp = () => {

  const { infos } = useContext(PlateDataContext);
  
  const { handleNew } = useContext(HandleFuntionsContext);


  //Pagina Protegida

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperar el usuario del localStorage
    const storedUser = localStorage.getItem('userLogged');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Convertir de string a objeto
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogged');
    navigate('/login');
  };

  //reloj Digital

  const newTime = new Date().toLocaleTimeString()
  const [ctime, setCtime] = useState(newTime);

  const updateTime = () => {
    const newCtime = new Date().toLocaleTimeString()
    setCtime(newCtime);
  }

  setInterval(updateTime, 1000)
  

  return (
    <div>
      <header className="w-full flex">
        <div className="w-4/12 flex justify-around items-center">
          <img className="w-[200px] rounded border-black border-[4px]" src="\logo suministros industriales.png" alt="" />
          <div className="text-xl text-slate-200 border border-white rounded p-2 font-extrabold" >{ctime}</div>
        </div>
        <div className="w-4/12 flex flex-col justify-center items-center">
          <h2 className='  text-3xl text-white font-bold font-sans'>SEGUIMIENTO DE ORDENES</h2>  
          <button onClick={handleNew} className='bg-sky-600 text-white py-1 px-2 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-sky-500 h-10 ' title="Nuevo registro" ><MdOutlinePostAdd /></button>
        </div>
        <div className="w-4/12  flex justify-around items-center">
        <div>
          {user && (
            <h2 className="text-xl text-slate-200">
              Bienvenid@: {user.firstName} 
            </h2>
          )}
        </div>
          <button onClick={handleLogOut} className='h-8 bg-red-600 text-white py-1 px-2 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-red-500' title="Salir" ><IoMdExit /></button>
        </div>
      </header>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='flex'>
              <th className='font-sans border border-solid border-black bg-sky-600 text-slate-200 p-1 text-sm text-center basis-1/12'>ID</th>
              <th className='font-sans border border-solid border-black bg-sky-600 text-slate-200 p-1 text-sm text-center basis-1/12'>ESTATUS</th>
              <th className='font-sans border border-solid border-black bg-sky-600 text-slate-200 p-1 text-sm text-center basis-1/12'>CLIENTE</th>
              <th className='font-sans border border-solid border-black bg-sky-600 text-slate-200 p-1 text-sm text-center basis-1/12'>USUARIO</th>
              <th className='font-sans border border-solid border-black bg-sky-600 text-slate-200 p-1 text-sm text-center basis-1/12'>FECHA DE INICIO</th>
              <th className='font-sans border border-solid border-black bg-sky-600 text-slate-200 p-1 text-sm text-center basis-1/12' >REMISIÓN</th>
              <th className='font-sans border border-solid border-black bg-sky-600 text-slate-200 p-1 text-sm text-center basis-1/12' >FECHA DE TERMINO</th>
              <th className='border border-solid border-black bg-sky-600 text-slate-200 p-1 text-sm text-center basis-2/12' >DESCRIPCIÓN RAPIDA</th>
              <th className='font-sans border border-solid border-black bg-sky-600 text-slate-200 p-1 text-sm text-center basis-1/12' >COTIZACIÓN</th>
              <th className='font-sans border border-solid border-black bg-sky-600 text-slate-200 p-1 text-sm text-center basis-2/12' >FORMATOS</th>
            </tr>
          </thead>
        </table>  
        <div>
        {
          infos?.map((info) => {
            const trueCount = info.checkList 
              ? Object.values(info.checkList).filter(value => value === true).length 
              : 0;

            return (
              <div key={info.id}>
                {/* Renderiza FollowUp2 siempre */}
                <FollowUp2 
                  info={info} 
                  trueCount={trueCount}
                />
              </div>
            );
          })
        }

          {/* {
            infos?.map((info) => {
              const trueCount = Object.values(info.checkList).filter(value => value === true).length;
              return (
                <div key={info.id}>
                  <FollowUp2 
                    info={info} 
                    trueCount={trueCount}
                  />
                  <h2>Total de valores true: {trueCount}</h2>
                </div>
              );
            })
          } */}
        </div>
      
    </div>
  )
}

export default HeaderFollowUp
