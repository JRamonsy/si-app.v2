import React, { useState} from "react";
import ImageUploader from "./ImageUploader";
import { useContext } from "react";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";
import { ServiceReportContext } from "../context/ServiceReportContext";
import { MdDeleteForever } from "react-icons/md";



const ServiceReport = () => {

  const { selectedInfo} = useContext(HandleFuntionsContext);

  const { serviceReport, handleServiceReportClose, handleSubmit, register, Submit, handleDeleteServiceReport,              showHideA, showHideX, hideImage, btnDeleteImage, setImagesEdit, clearImage, handleX, showImg, handleImage, handleDeleteImage, fileInputRef, selectedImages, handleRemoveImage, handleDeleteAllImages } = useContext(ServiceReportContext)

  

  

  

  
  return (
    <section className={` fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center 
      ${serviceReport && 'scale-0'} transform transition-transform duration-200 ease`} >
      <section className='m-5'>
        {/* <div className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
            <h2 >✔</h2>
          </div> */}
      </section>
      <form onSubmit={handleSubmit(Submit)} className='bg-white m-0 w-9/12 pt-2 rounded-lg h-[90vh] overflow-y-auto '>
        <div  className="flex justify-between items-center">
          <div className="bg-black">
            <img className='w-16' src="\logo-2.png" alt="" />
          </div>
          <h1 className='text-2xl m-0 font-bold'>
            CENTRO DE SERVICIO {selectedInfo?.id || 'datos no disponible'}
          </h1>
          <div className="text-sm">
          HOJA No. 1 / 2
          </div>
        </div>
        <div className="text-sm text-right mb-2">
          <label>FECHA: <label>{selectedInfo?.receivedDate || 'datos no disponible'}</label> </label>
        </div>
        <table className='w-full border-collapse mb-5'>
        <tbody>
          <tr>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              CLIENTE:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
              <label>{selectedInfo?.customer || 'datos no disponible'}</label>
              {/* <input className='w-full' type="text" /> */}
            </td>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              No. SERIE:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
              <label>{selectedInfo?.serie || 'datos no disponible'}</label>
            </td>
          </tr>
          <tr>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              USUARIO:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.user || 'datos no disponible'}</label>
            </td>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              FRAME:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.frame || 'datos no disponible'}</label>
            </td>
          </tr>
          <tr>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              SPEC:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
              <label>{selectedInfo?.spec || 'datos no disponible'}</label>
            </td>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              VOLTS:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
             <label>{selectedInfo?.volts || 'datos no disponible'}</label>
            </td>
          </tr>
          <tr>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              CATALAGO N°:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.catalog || 'datos no disponible'}</label>
            </td>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              EQUIPO:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.equipment || 'datos no disponible'}</label>
            </td>
          </tr>
          <tr>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              POTENCIA:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.power || 'datos no disponible'}</label>
            </td>
            <th className='border border-solid border-black p-1 text-sm text-left p-1 w-3/12'>
              MARCA:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.brand || 'datos no disponible'}</label>
            </td>
          </tr>
        </tbody>  
        </table>

        <div className="bg-gray-400 p-1 mt-5 font-bold text-center">
          I. DESCRIPCION DEL PROBLEMA
        </div>
        <div className='m-0 p-3'>
            <textarea {...register('problemDescription')} className='w-full resize-none h-[100px]' placeholder="Escriba la descripción detallada del problema"></textarea>
        </div>
        <div className="bg-gray-400 p-1 font-bold text-center">
          II. FOTOGRAFIAS DE RECIBIDO
        </div>

        <div className='recibo w-full p-1'>
        {/* <section>
          <div className={`${hideImage && 'hidden'} relative w-ful flex justify-center` }>
            <button onClick={handleX} className={` ${showHideX && 'scale-0'} absolute text-2xl hover:text-white`} >Cambiar Imagen</button>

            <img className="  border rounded-2xl w-[250px] h-[250px] items-center justify-center object-cover" src={showImg()} alt="" />
          </div>
            <input 
            className={` ${showHideA ? '' : 'hidden'} `} 
            onChange={handleImage} 
            type="file" 
            ref={fileInputRef} // Asignar la referencia al input
            />
            <button onClick={handleDeleteImage} className={` ${btnDeleteImage && 'hidden'} border border-black m-2 p-1 hover:bg-white`} >eliminar imagen</button>
          </section> */}

          <section>
            {/* Sección para mostrar las imágenes seleccionadas */}
            <div className={`${hideImage && 'hidden'} relative w-full flex justify-center flex-wrap gap-4`}>
              {selectedImages.length > 0 ? (
                selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <button 
                      onClick={() => handleRemoveImage(index)} 
                      className={`absolute text-2xl hover:text-white`} 
                    >
                      ✖
                    </button>
                    <img 
                      className="border rounded-2xl w-[250px] h-[250px] object-cover" 
                      src={URL.createObjectURL(image)} 
                      alt={`Selected ${index}`} 
                    />
                  </div>
                ))
              ) : (
                <p>No hay imágenes seleccionadas</p>
              )}
            </div>

            {/* Input para seleccionar múltiples imágenes */}
            <input
              className={`${showHideA ? '' : 'hidden'}`} 
              onChange={handleImage} 
              type="file" 
              multiple // Permitir múltiples archivos
              ref={fileInputRef} 
            />

            {/* Botón para eliminar todas las imágenes */}
            <button 
              onClick={handleDeleteAllImages} 
              className={`${btnDeleteImage && 'hidden'} border border-black m-2 p-1 hover:bg-white`}
            >
              Eliminar todas las imágenes
            </button>
          </section>



   
        </div>

        <div className="bg-gray-400 p-1 font-bold text-center">
          III. OBSERVACIONES
        </div>
        <div className='m-0 p-3'>
          <textarea {...register('observations')} className='resize-none w-full h-[200px]' placeholder="Escriba las observaciones" ></textarea>
        </div>
        <div className="bg-gray-400 p-1  font-bold text-center">
          IV. DIAGNOSTICO Y EVALUACION CON FOTOGRAFIAS
        </div>


        <div className="diagnostico">
        {/* <ImageUploader/> */}

        </div>

        






        <div className="bg-gray-400 p-1  font-bold text-center" >
          V. REQUERIMIENTO PARA REPARACION
        </div>
        <div className='m-0 p-3'>
          <textarea {...register('requirementForRepair')} className='resize-none w-full h-[200px]' placeholder="Escriba los requerimientos para la reparación"></textarea>
        </div>

        <div className="flex justify-between items-center">
          <div className="bg-black">
            <img className='w-16' src="\logo-2.png" alt="" />
          </div>
          <h1 className='text-2xl m-0 font-bold'>
            CENTRO DE SERVICIO
          </h1>
          <div className="text-sm">
          HOJA No. 2 / 2
          </div>
        </div>
        <div className="text-sm text-right mb-2">
          <label>FECHA: <label>{selectedInfo?.receivedDate || 'datos no disponible'}</label> </label>
        </div>
        <table className='w-full border-collapse mb-5'>
        <tbody>
          <tr>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              CLIENTE:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
              <label>{selectedInfo?.customer || 'datos no disponible'}</label>
              {/* <input className='w-full' type="text" /> */}
            </td>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              No. SERIE:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
              <label>{selectedInfo?.serie || 'datos no disponible'}</label>
            </td>
          </tr>
          <tr>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              USUARIO:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.user || 'datos no disponible'}</label>
            </td>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              FRAME:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.frame || 'datos no disponible'}</label>
            </td>
          </tr>
          <tr>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              SPEC:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
              <label>{selectedInfo?.spec || 'datos no disponible'}</label>
            </td>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              VOLTS:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
             <label>{selectedInfo?.volts || 'datos no disponible'}</label>
            </td>
          </tr>
          <tr>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              CATALAGO N°:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.catalog || 'datos no disponible'}</label>
            </td>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              EQUIPO:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.equipment || 'datos no disponible'}</label>
            </td>
          </tr>
          <tr>
            <th className='border border-solid border-black p-1.5 text-sm text-left p-1 w-3/12'>
              POTENCIA:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.power || 'datos no disponible'}</label>
            </td>
            <th className='border border-solid border-black p-1 text-sm text-left p-1 w-3/12'>
              MARCA:
            </th>
            <td className='border border-solid border-black p-1 text-sm text-center'>
            <label>{selectedInfo?.brand || 'datos no disponible'}</label>
            </td>
          </tr>
        </tbody> 
        </table>
      
        <div className="bg-gray-400 p-1 mt-5 font-bold text-center">
          VI. EVIDENCIA FOTOGRÁFICA
        </div>

        <div className="evidencia">
          {/* <ImageUploader/> */}

        </div>
        <div className="bg-gray-400 p-1  font-bold text-center" >
          VII. SERVICIO REALIZADO
        </div>
        <div className='m-0 p-3'>
          <textarea {...register('serviceCompleted')} className='resize-none w-full h-[200px]' placeholder="Escriba el servicio realizado"></textarea>
        </div>
        <div className="bg-gray-400 p-1 mt-5 font-bold text-center">
          VIII. EVIDENCIA FOTOGRÁFICA DE SERVICIO REALIZADO
        </div>
        <div className="evidencia">
          {/* <ImageUploader/> */}

        </div>

        <button className="w-full  px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600">GUARDAR</button>

      </form>
      <section className='m-5'>
        <div onClick={handleServiceReportClose} className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
            <h2 >X</h2>
        </div>
        <div onClick={handleDeleteServiceReport}  className={` cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30`}>
          <h2 ><MdDeleteForever /></h2>
        </div>
      </section>

    </section>
  )
}

export default ServiceReport
