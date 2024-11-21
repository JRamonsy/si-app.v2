import React, { useEffect, useState } from 'react'
import RemissionData from './RemissionData';
import { useContext } from "react";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";
import { RemissionContext } from '../context/RemissionContext';
import { MdDeleteForever } from "react-icons/md";

const Remission = () => {

  const { selectedInfo } = useContext(HandleFuntionsContext);
  const { openRemission, handleRemissionClose, handleSubmit, register, Submit, handleDeleteRemission  } = useContext(RemissionContext);
  

  const [guia, setGuia] = useState(true)
  const handleGuia = () => {
    setGuia(!guia ),
    setGuiabtn(!guiabtn)
  }

  const [guiabtn, setGuiabtn] = useState(true)

  const [remissionDataList, setRemissionDataList] = useState([]);

  const handleAddData = () => {
    // Agregar un nuevo objeto con un identificador único
    const newData = { id: Date.now() };
    setRemissionDataList([...remissionDataList, newData]);
  };
  
  const handleDeleteData = (id) => {
    // Eliminar el objeto cuyo 'id' coincide con el que se pasó
    const updatedList = remissionDataList.filter(data => data.id !== id);
    setRemissionDataList(updatedList);
  };





  return (
    <section className={`flex justify-center items-center fixed inset-0 bg-black/20 backdrop-blur-sm transform transition-transform duration-200 ease ${openRemission && 'scale-0'}`} >
      <section className='m-5' >
        {/* <div className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
          <h2 >✔</h2>
        </div> */}
        <div onClick={handleAddData} className='cursor-pointer text-slate-300 hover:text-white' >
          <h2>agregar</h2>
        </div>
        <div onClick={handleGuia} className='cursor-pointer  text-slate-300 hover:text-white' >
          <h2>{`${guiabtn === false ? '- guia' : '+ guia'}`}</h2>
        </div>

      </section>
      <form onSubmit={handleSubmit(Submit)} className=' w-10/12 bg-white border  m-0 p-5 rounded-lg h-[90vh] overflow-y-auto '>
        <div className="bg-[#1e4e8c] text-white p-1 text-center  text-3xl">
          REMISIÓN
        </div>
        <div className=" flex p-2.5">
          <div className='flex  items-center'>
            <img alt="Logo de Suministros Industriales"  src="public\logo suministros industriales.png" width="300" />

          </div>
          <div className='w-3/4 '>
            <div className='bg-gray-200 m-2 text-center border border-black' >
              <label>EMPRESA: </label>
              <label>{selectedInfo?.customer || 'datos no disponible'}</label>
              <div className='flex'>
                <div className=' text-center w-2/4 border-t border-r border-black '>
                <label>SERVICIO SOLICITADO POR: </label>
                <label>{selectedInfo?.user || 'datos no disponible'}</label>
                </div>
                <div className='text-center w-2/4 border-t border-black '>
                <label>CORREO: </label>
                <input {...register('email')} className='bg-gray-200 ' type="email" placeholder="correo de quien solicita" />
                </div>              
              </div>            
            </div>

            <div className=' flex bg-gray-200 m-2 border border-black'>
              <div className=' text-center w-2/4  '>
                <div className='border-b border-r border-black'>
                  <label>AGENTE DE REFERENCIA: </label>
                  <input {...register('referenceAgent')} className='bg-gray-200 ' type="text" placeholder="nombre del agente"/>
                </div>
                <div className=' flex flex-col border-r border-black'>
                  <label>FECHA: </label>
                  <label>{selectedInfo?.receivedDate || 'datos no disponible'}</label>
                </div>
              </div>
              <div className=' text-center w-2/4  '>
                <div className='text-center '>
                  <label>TELEFONO: </label>
                  <input {...register('phone')} className='bg-gray-200 ' type="text" placeholder="telefono del agente"/>
                </div>
                <div className='border-t border-black'>
                  <label>FOLIO: </label>
                  <input {...register('folio')} className='bg-gray-200 ' type="text" placeholder="folio de la remisión"/>
                </div>
              </div>              
            </div>  
          </div>
        </div>
        <div className="bg-[#1e4e8c] p-4 text-center text-white ">
          <div className={`${guia && 'scale-0'}`}>
            <label  htmlFor="">GUIA: 
              <input className='w-3/6 px-2 bg-[#1e4e8c]' type="text" placeholder='Escriba la guia de rastreo si aplica' />
            </label>
          </div>
        </div>

        <section className='w-full mt-5'>
          <ul className='w*full flex flex-row ' >
            <li className='bg-[#1e4e8c] text-white text-xs border border-black text-center  px-1 py-4 basis-1/12' >CANTIDAD</li>
            <li className='bg-[#1e4e8c] text-white text-xs border-y border-black text-center  px-1 py-4 basis-1/12' >UNIDAD</li>
            <li className='bg-[#1e4e8c] text-white text-xs border border-black text-center  px-1 py-4 basis-7/12' >DECRIPCION</li>
            <li className='bg-[#1e4e8c] text-white text-xs border-y border-black text-center  px-1 py-2 basis-1/12' >FECHA DE ENTREGA</li>
            <li className='bg-[#1e4e8c] text-white text-xs border border-black text-center  px-1 py-2 basis-1/12' >PRECIO UNITARIO</li>
            <li className='bg-[#1e4e8c] text-white text-xs border-y border-r border-black text-center  px-1 py-2 basis-1/12 ' >PRECIO TOTAL</li>
          </ul>
        </section>
        <section className='w-full'>
          {remissionDataList.map((data) => (
            <RemissionData key={data.id} id={data.id} handleDeleteData={handleDeleteData} />
          ))}
        </section>
        <section className='w-full m-0'>
          <ul className='w*full flex flex-row ' >
            <li className='bg-white basis-1/12' ></li>
            <li className='bg-white basis-1/12' ></li>
            <li className='bg-white basis-7/12' ></li>
            <li className='bg-white basis-1/12' ></li>
            <li className=' subtotal bg-[#1e4e8c] text-white text-xs border-x border-b border-black text-center px-1 py-2 basis-1/12' >Subtotal:</li>
            <li className='bg-[#1e4e8c] text-white text-xs border-b border-r border-black text-center  px-1 py-2 basis-1/12 ' ></li>
          </ul>
        </section>
        <section className='w-full m-0'>
          <ul className='w*full flex flex-row ' >
            <li className='bg-white basis-1/12' ></li>
            <li className='bg-white basis-1/12' ></li>
            <li className='bg-white basis-7/12' ></li>
            <li className='bg-white basis-1/12' ></li>
            <li className='bg-[#1e4e8c] text-white text-xs border-x border-b border-black text-center px-1 py-2 basis-1/12' >I.V.A.:</li>
            <li className='bg-[#1e4e8c] text-white text-xs border-b border-r border-black text-center px-1 py-2 basis-1/12 flex flex-row' ><input className=' iva bg-[#1e4e8c] w-1/2' type="number" />%</li>
          </ul>
        </section>
        <section className='w-full m-0'>
          <ul className='w*full flex flex-row ' >
            <li className='bg-white basis-1/12' ></li>
            <li className='bg-white basis-1/12' ></li>
            <li className='bg-white basis-7/12' ></li>
            <li className='bg-white basis-1/12' ></li>
            <li className=' total bg-[#1e4e8c] text-white text-xs border-x border-b border-black text-center px-1 py-2 basis-1/12' >Total:</li>
            <li className='bg-[#1e4e8c] text-white text-xs border-b border-r border-black text-center px-1 py-2 basis-1/12 ' ></li>
          </ul>
        </section>  

        <div className='flex flex-col'>
          <div >
            <label>FECHA DE RECIBIDO: </label>
            <input {...register('receivedDate')} className='border-b border-black w-1/4 text-center ' type="date" />
          </div>
          <div>
            <label>NOMBRE DE LA PERSONA QUE RECIBE:  </label>
            <input {...register('whoReceive')} className='border-b border-black w-1/4 text-center ' type="text" />
          </div>
        </div>
        <div className="mt-12 text-center">
          <div className='flex flex-col items-center'>
            <input className='border-b border-black w-2/4 text-center ' type="text" />
            <label>FIRMA Y SELLO DE LA EMPRESA</label>
          </div>
        </div>
        <button className="w-full  px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600">GUARDAR</button>
      </form>
      <section className='m-5'>
        <div onClick={handleRemissionClose} className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
            <h2 >X</h2>
          </div>
          <div onClick={handleDeleteRemission}  className={` cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30`}>
          <h2 ><MdDeleteForever /></h2>
        </div>
      </section>
      
    </section>
  )
}

export default Remission
