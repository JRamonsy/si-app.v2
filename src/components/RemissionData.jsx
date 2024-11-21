import React, { useState, useEffect } from 'react';



const RemissionData = ({ id, handleDeleteData }) => {

  const [cantidad, setCantidad] = useState(0);
  const [unitario, setUnitario] = useState(0);
  const [total, setTotal] = useState(0);

  // Función para calcular el total
  useEffect(() => {
    setTotal(cantidad * unitario);
  }, [cantidad, unitario]);

  return (
    <section className='relative w-full m-0'>
      <ul className='w*full flex flex-row'>
        <li className='bg-white text-black text-xs border-x border-b border-black text-center py-4 basis-1/12 flex items-center justify-center'>
          <input 
            className='cantidad w-3/4 text-center' 
            type="number" 
            placeholder='cantidad'
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))} // Actualiza la cantidad
          />
        </li>
        <li className='bg-white text-black text-xs border-r border-b border-black text-center py-4 basis-1/12 flex items-center justify-center'>
          <input className='w-3/4 text-center' type="text" placeholder='unidad' />
        </li>
        <li className='bg-white text-black text-xs border-r border-b border-black text-center py-4 basis-7/12'>
          <textarea className='w-11/12' name="" id="" placeholder='descripción' ></textarea>
        </li>
        <li className='bg-white text-black text-[10px] border-r border-b border-black text-center py-2 basis-1/12 flex items-center justify-center'>
          <input className='w-3/4 text-center' type="date" />
        </li>
        <li className='bg-white text-black text-xs border-r border-b border-black text-center py-2 basis-1/12 flex items-center justify-center'>
          <input 
            className='unitario w-3/4 text-center' 
            type="number" 
            placeholder='p. unitario'
            value={unitario}
            onChange={(e) => setUnitario(Number(e.target.value))} // Actualiza el precio unitario
          />
        </li>
        <li className='total bg-white text-black text-xs border-r border-b border-black text-center py-2 basis-1/12 flex items-center justify-center'>
          {total.toFixed(2)} {/* Muestra el total calculado */}
        </li>
      </ul>
      <div onClick={() => handleDeleteData(id)} className="absolute inset-y-0 right-0 cursor-pointer text-white hover:text-black">
        <h2>X</h2>
      </div>
    </section>
  );
};

export default RemissionData;
