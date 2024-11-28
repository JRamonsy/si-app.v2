import { useContext } from "react";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";

const DataSheet = () => {

  const {openDataSheet, handleDataSheetClose, selectedInfo} = useContext(HandleFuntionsContext);

  // Función para dividir el texto de requerimiento de material en líneas
  const renderGeneralDiagnosis = (tasks) => {
    if (!tasks) return <p>No hay datos disponibles</p>;
    // Dividir el texto en líneas
    const tasksList = tasks.split('\n');
    // Renderizar la lista
    return (
      <ul className="list-inside">
        {tasksList.map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  // Función para dividir el texto de diagnostico general en líneas
  const renderMaterialsAsList = (materials) => {
    if (!materials) return <p>No hay datos disponibles</p>;
    // Dividir el texto en líneas
    const materialsList = materials.split('\n');
    // Renderizar la lista
    return (
      <ul className="list-inside">
        {materialsList.map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  // Función para dividir el texto de servicio realizado en líneas
  const renderServiceList = (services) => {
    if (!services) return <p>No hay datos disponibles</p>;
    // Dividir el texto en líneas
    const servicesList = services.split('\n');
    // Renderizar la lista
    return (
      <ul className="list-inside">
        {servicesList.map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className={` fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center 
      ${openDataSheet && 'scale-0'} transform transition-transform duration-200 ease`}>
      <div className='bg-white p-10 w-10/12 h-[90vh] overflow-y-auto'>
        <div className='text-center'>
          <h1 className="text-xl font-bold" >REPORTE GENERAL CON ID: {selectedInfo?.id || 'datos no disponible'} </h1>         
        </div>
        <section className='my-5'>
          <section className={` flex justify-center items-center  transform transition-transform duration-200 ease`}>
            <form  className='w-full max-w-2xl p-5 rounded-lg bg-white '>
              <div className="flex justify-between items-center mb-5 bg-white ">
                <img
                  alt="Logo de Suministros Industriales con texto y un símbolo gráfico"
                  className="w-52 h-auto"
                  src="\logo suministros industriales.png"
                />
                <h1 className='text-lg font-bold bg-white'>INFORMACION DEL EQUIPO</h1>
              </div>

              <div className="flex justify-between mb-2.5">
                <label className="basis-2/6 bg-white">FECHA DE RECIBO:</label>
                <label className="basis-1/6 border-b border-black" >{selectedInfo?.receivedDate || 'datos no disponible'}</label>
                <label className="basis-2/6 bg-white">FECHA DE TERMINO:</label>
                <label className="basis-1/6 border-b border-black" >{selectedInfo?.finalDate || 'Sin especificar'}</label>
              </div>

              <div className="flex justify-between mb-2.5">
                <label className="basis-1/6 bg-white" >CLIENTE:</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.customer || 'datos no disponible'}</label>
                <label className="basis-1/6 bg-white" >CAT. N°</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.user || 'datos no disponible'}</label>
              </div>

              <div className="flex justify-between mb-2.5">
                <label className="basis-1/6 bg-white" >USUARIO:</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.user || 'datos no disponible'}</label>
                <label className="basis-1/6 bg-white" >HP:</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.hp || 'datos no disponible'}</label>
              </div>

              <div className="flex justify-between mb-2.5">
                <label className="basis-1/6 bg-white" >SPEC:</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.spec || 'datos no disponible'}</label>
                <label className="basis-1/6 bg-white" >FRAME:</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.frame || 'datos no disponible'}</label>
              </div>

              <div className="flex justify-between mb-2.5">
                <label className="basis-1/6 bg-white" >N° SERIE</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.serie || 'datos no disponible'}</label>
                <label className="basis-1/6 bg-white" >VOLTS</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.volts || 'datos no disponible'}</label>
              </div>

              <div className="flex justify-between mb-2.5">
                <label className="basis-1/6 bg-white" >MARCA:</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.brand || 'datos no disponible'}</label>
                <label className="basis-1/6 bg-white" >EQUIPO:</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.equipment || 'datos no disponible'}</label>
              </div>
              {/* <div className="flex justify-between mb-2.5">
                <label className="basis-1/6 bg-white" >POTENCIA:</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.power || 'datos no disponible'}</label>
                <label className="basis-1/6 bg-white" >MARCA:</label>
                <label className="basis-2/6 border-b border-black" >{selectedInfo?.brand || 'datos no disponible'}</label>
              </div> */}
              <div className=" m-5 flex justify-center">
                <hr className="w-5/6" />
              </div>
              <div>
                <h2 className='text-lg font-bold bg-white text-center' >EVIDENCIA DE PLACA</h2>
              </div>
              <div className="flex justify-center items-center" >
              {selectedInfo?.image && selectedInfo.image.length > 0 
                  ? (
                    <img className=" w-60" src={selectedInfo.image[0].imageUrl} alt="Evidencia de placa" />
                    ) 
                  : (
                    <p>Imagen no disponible</p>
                    )
                }
              </div>
              <div className="m-5 flex justify-center">
                <hr className="w-5/6" />
              </div>
              <section>
                <h2 className='text-lg font-bold bg-white text-center'>OTROS DATOS</h2>
                <div className="flex flex-col">
                  {/* <div>
                    <label className="bg-white" >REMISIÓN:</label>
                    <label className="basis-2/6 border-b border-black" >{selectedInfo?.remissionNum || 'datos no disponible'}</label>
                  </div> */}
                  <div>
                    <label className="bg-white" >DESCRIPCIÓN RAPIDA:</label>
                    <label className="basis-2/6 border-b border-black" >{selectedInfo?.note || 'datos no disponible'}</label>
                  </div>
                  <div>
                    <label className="bg-white" >COTIZACIÓN:</label>
                    <label className="basis-2/6 border-b border-black" >{selectedInfo?.quote || 'datos no disponible'}</label>
                  </div>
                </div>
              </section>
            </form>
          </section>
          </section>

          <hr className="h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 my-6 border-0 rounded-full" />

          <section className='my-5'>
            <div className='flex flex-col' >
            <section className={`   flex justify-center items-center transform transition-transform duration-200 ease`}>
              <form className='w-full max-w-2xl  p-5 rounded-lg bg-white '>
                <div className="flex justify-between items-center mb-5 bg-white ">
                  <img
                    alt="Logo de Suministros Industriales con texto y un símbolo gráfico"
                    className="w-52 h-auto"
                    src="\logo suministros industriales.png"
                  />
                  <h1 className='text-lg font-bold bg-white'>CHECK LIST DE SERVICIOS SI</h1>
                </div>
                <div className="flex justify-between mb-2.5">
                  <label className="basis-4/12  bg-white">FECHA DE RECIBO:</label>
                  <label className=" border-b border-black" >{selectedInfo?.receivedDate || 'datos no disponible'}</label>
                  <label className="basis-4/12 bg-white">FECHA DE TERMINO:</label>
                  <label className="border-b border-black" >{selectedInfo?.finalDate || 'Sin especificar'}</label>
                </div>
                <div className="flex justify-between mb-2.5">
                  <label className="basis-1/4 bg-white" >CLIENTE:</label>
                  <label className="basis-1/4 text-center border-b border-black" >{selectedInfo?.customer || 'datos no disponible'}</label>
                  <label className="basis-1/4 bg-white" >CAT. N°:</label>
                  <label className="basis-1/4 text-center border-b border-black" >{selectedInfo?.cat || 'datos no disponible'}</label>
                </div>
                <div className="flex justify-between mb-2.5">
                  <label className="basis-1/4 bg-white" >USUARIO</label>
                  <label className="basis-1/4 text-center border-b border-black" >{selectedInfo?.user || 'datos no disponible'}</label>
                  <label className="basis-1/4 bg-white" >HP</label>
                  <label className="basis-1/4 text-center border-b border-black" >{selectedInfo?.hp || 'datos no disponible'}</label>
                </div>
                <div className="flex justify-between mb-2.5">
                  <label className="basis-1/4 bg-white" >SPEC:</label>
                  <label className="basis-1/4 text-center border-b border-black" >{selectedInfo?.spec || 'datos no disponible'}</label>
                  <label className="basis-1/4 bg-white" >FRAME</label>
                  <label className="basis-1/4 text-center border-b border-black" >{selectedInfo?.frame || 'datos no disponible'}</label>
                </div>
                <div className="flex justify-between mb-2.5">
                  <label className="basis-1/4 bg-white" >N° SERIE</label>
                  <label className="basis-1/4 text-center border-b border-black" >{selectedInfo?.serie || 'datos no disponible'}</label>
                  <label className="basis-1/4 bg-white" >VOLTS</label>
                  <label className="basis-1/4 text-center border-b border-black" >{selectedInfo?.volts || 'datos no disponible'}</label>
                </div>
                <table className='w-full border-collapse mt-5'>
                  <thead className='thead-check-list'>
                    <tr className='tr-check-list'>
                      <th className='border border-black p-1.5 text-left bg-white'>ETAPA</th>
                      <th className='border border-black p-1.5 text-left bg-white'>NOMBRE TECNICO</th>
                      <th className='border border-black p-1.5 text-left bg-white'>AVANCE SI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white' >Pase de Salida</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label className=" " >{selectedInfo?.checkList?.technicianNameExitStep || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white' ><label >
                    {(selectedInfo?.checkList?.advanceExitStep) ? '✅' : '◻️'}
                  </label></td>
                    </tr>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white'>Inspección Visual</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label>{selectedInfo?.checkList?.technicianNamevisualInspection || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white' ><label >
                    {(selectedInfo?.checkList?.advanceVisualInspection) ? '✅' : '◻️'}
                  </label>  </td>
                    </tr>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white'>Evidencia fotográfica</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label>{selectedInfo?.checkList?.technicianNamePhotographicEvidence || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white' ><label>
                    {(selectedInfo?.checkList?.advancePhotographicEvidence) ? '✅' : '◻️'}
                  </label></td>
                    </tr>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white'>Foto placa</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label>{selectedInfo?.checkList?.t_platePhoto || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white' >
                        <div className='cursor-pointer'>
                          {selectedInfo?.image && selectedInfo.image.length > 0
                            ? '✅'
                            : '◻️'
                          }
                        </div>
                      </td>
                    </tr>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white'>Piezas requeridas</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label>{selectedInfo?.checkList?.technicianNameRequiredParts || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white'><label>
                    {(selectedInfo?.checkList?.advanceRequiredParts) ? '✅' : '◻️'}
                  </label>  </td>
                    </tr>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white'>Materiales requeridos</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label>{selectedInfo?.checkList?.technicianNameRequiredMaterials || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white'><label>
                    {(selectedInfo?.checkList?.advanceRequiredMaterials) ? '✅' : '◻️'}
                  </label> </td>
                    </tr>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white'>Evidencia proceso</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label>{selectedInfo?.checkList?.technicianNameEvidenceProcess || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white' ><label>
                    {(selectedInfo?.checkList?.advanceEvidenceProcess) ? '✅' : '◻️'}
                  </label> </td>
                    </tr>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white'>Evidencia término</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label>{selectedInfo?.checkList?.technicianNameEvidenceTerm || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white'><label>
                    {(selectedInfo?.checkList?.advanceEvidenceTerm) ? '✅' : '◻️'}
                  </label>  </td>
                    </tr>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white'>Reporte Sulzer</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label>{selectedInfo?.checkList?.technicianNameSulzerReport || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white'><label>
                    {(selectedInfo?.checkList?.advanceSulzerReport) ? '✅' : '◻️'}
                  </label> </td>
                    </tr>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white'>Remisión</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label>{selectedInfo?.checkList?.technicianNameRemission || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white'><label>
                    {(selectedInfo?.checkList?.advanceRemission) ? '✅' : '◻️'}
                  </label>  </td>
                    </tr>
                    <tr className='tr-check-list'>
                      <td className='border border-black p-1.5 text-left bg-white'>Guía</td>
                      <td className='border border-black p-1.5 text-left bg-white'><label>{selectedInfo?.checkList?.technicianNameGuide || 'datos no disponible'}</label></td>
                      <td className='border border-black p-1.5 text-center bg-white'><label className="" >
                    {(selectedInfo?.checkList?.advanceGuide) ? '✅' : '◻️'}
                  </label></td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-5 bg-white">
                  <p className='bg-white'>Diagnostico general:</p>
                  {/* <label className="underline" >{selectedInfo?.checkList?.comments || 'datos no disponible'}</label> */}
                  <div className="border p-3">
                    {renderGeneralDiagnosis(selectedInfo?.checkList?.comments)}
                  </div>
                </div>
                <div className="mt-5 bg-white">
                  <p className='bg-white'>Materiales requeridos:</p>
                  {/* <label className="underline" >{selectedInfo?.checkList?.requiredMaterials || 'datos no disponible'}</label> */}
                  <div className="border p-3">
                    {renderMaterialsAsList(selectedInfo?.checkList?.requiredMaterials)}
                  </div>
                </div>
              </form>
            </section>

            <hr className="h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 my-6 border-0 rounded-full" />

            <section className={`my-5 backdrop-blur-sm flex justify-center items-center transform transition-transform duration-200 ease`} >
              <form className='bg-white m-0 w-9/12 pt-2 rounded-lg '>
                <div className="flex justify-between items-center">
                  <div className="bg-black">
                    <img className='w-16' src="\logo-2.png" alt="" />
                  </div>
                  <h1 className='text-2xl m-0 font-bold'>
                    CENTRO DE SERVICIO
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
                        <label>{selectedInfo?.cat || 'datos no disponible'}</label>
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
                        <label>{selectedInfo?.hp || 'datos no disponible'}</label>
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
                <label>{selectedInfo?.serviceReport?.problemDescription || 'datos no disponible'}</label>
                </div>
                <div className="bg-gray-400 p-1 font-bold text-center">
                  II. FOTOGRAFIAS DE RECIBIDO
                </div>
                <div className='recibo w-full p-1 w-full flex justify-center flex-wrap gap-4'>
                {selectedInfo?.serviceReport?.images?.length > 0 ? (
                  selectedInfo.serviceReport.images.map((image, index) => (
                    <div key={index} className="relative ">
                      <img 
                        className="border rounded-2xl w-[150px] h-[150px] object-cover" 
                        src={image.imageUrl} 
                        alt={`Selected ${index}`} 
                      />
                    </div>
                  ))
                ) : (
                  <p>No hay imágenes seleccionadas</p>
                )}
                </div>
                <div className="bg-gray-400 p-1 font-bold text-center">
                  III. OBSERVACIONES
                </div>
                <div className='m-0 p-3'>
                <label>{selectedInfo?.serviceReport?.observations || 'datos no disponible'}</label>
                </div>
                <div className="bg-gray-400 p-1  font-bold text-center">
                  IV. DIAGNOSTICO Y EVALUACION CON FOTOGRAFIAS
                </div>
                <div className="diagnostico">
                </div>
                <div className="bg-gray-400 p-1  font-bold text-center" >
                  V. REQUERIMIENTO PARA REPARACION
                </div>
                <div className='m-0 p-3'>
                <label>{selectedInfo?.serviceReport?.requirementForRepair || 'datos no disponible'}</label>
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
                        <label>{selectedInfo?.cat || 'datos no disponible'}</label>
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
                        <label>{selectedInfo?.hp || 'datos no disponible'}</label>
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
                </div>
                <div className="bg-gray-400 p-1  font-bold text-center" >
                  VII. SERVICIO REALIZADO
                </div>
                <div className='m-0 p-3'>
                {/* <label>{selectedInfo?.serviceReport?.serviceCompleted || 'datos no disponible'}</label> */}
                <div className="border p-3">
                    {renderServiceList(selectedInfo?.serviceReport?.serviceCompleted)}
                  </div>
                </div>
                <div className="bg-gray-400 p-1 mt-5 font-bold text-center">
                  VIII. EVIDENCIA FOTOGRÁFICA DE SERVICIO REALIZADO
                </div>
                <div className="evidencia">
                </div>
              </form>            
            </section>
            </div>
          </section>
          
          <hr className="h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 my-6 border-0 rounded-full" />


        <section className='flex justify-center items-center backdrop-blur-sm transform transition-transform duration-200 ease' >

          <form className=' w-10/12 bg-white   m-0 p-5 rounded-lg '>
            <div className="bg-[#1e4e8c] text-white p-1 text-center  text-3xl">
              REMISIÓN
            </div>
            <div className=" flex p-2.5">
              <div className='flex  items-center'>
                <img alt="Logo de Suministros Industriales" src="\logo suministros industriales.png" width="300" />

              </div>
              <div className='w-3/4 '>
                <div className='bg-gray-200 m-2 text-center border border-black' >
                  <label>EMPRESA: </label>
                  <label>{selectedInfo?.customer || 'datos no disponible'}</label>
                  <div className='flex'>
                    <div className=' text-center w-2/4 border-t border-r border-black flex flex-col '>
                      <label>SERVICIO SOLICITADO POR: </label>
                      <label>{selectedInfo?.user || 'datos no disponible'}</label>
                    </div>
                    <div className='text-center w-2/4 border-t border-black flex flex-col'>
                      <label>CORREO: </label>
                      <label>{selectedInfo?.Remission?.email || 'datos no disponible'}</label>
                    </div>
                  </div>
                </div>

                <div className=' flex bg-gray-200 m-2 border border-black'>
                  <div className=' text-center w-2/4  '>
                    <div className='border-b border-r border-black flex flex-col'>
                      <label>AGENTE DE REFERENCIA: </label>
                      <label>{selectedInfo?.Remission?.referenceAgent || 'datos no disponible'}</label>
                    </div>
                    <div className=' flex flex-col border-r border-black'>
                      <label>FECHA: </label>
                      <label>{selectedInfo?.Remission?.remissionDate || 'datos no disponible'}</label>
                    </div>
                  </div>
                  <div className=' text-center w-2/4  '>
                    <div className='text-center flex flex-col'>
                      <label>TELEFONO: </label>
                      <label>{selectedInfo?.Remission?.phone || 'datos no disponible'}</label>
                    </div>
                    <div className='border-t border-black flex flex-col'>
                      <label>FOLIO: </label>
                      <label>{selectedInfo?.customer || 'datos no disponible'}{selectedInfo?.id}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1e4e8c] p-4 text-center text-white ">
              <div >
                {/* <label htmlFor="">GUIA:
                  <input className='w-3/6 px-2 bg-[#1e4e8c]' type="text" placeholder='Escriba la guia de rastreo si aplica' />
                </label> */}
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

            <section className='w-full '>
              <ul className='w*full flex flex-row ' >
                <li className=' text-black text-xs border border-black text-center  px-1 py-4 basis-1/12' >CANTIDAD</li>
                <li className=' text-black text-xs border-y border-black text-center  px-1 py-4 basis-1/12' >UNIDAD</li>
                <li className=' text-black text-xs border border-black text-center  px-1 py-4 basis-7/12' ><label>
                <div className="flex font-bold justify-center">
                  {selectedInfo?.equipment && (
                    <div className="mr-2">
                      Equipo: {selectedInfo?.equipment},
                    </div>  
                  )}
                  {selectedInfo?.spec && (
                    <div className="mr-2">
                      Spec:{selectedInfo?.spec},
                    </div>
                  )}
                  {selectedInfo?.frame && (
                    <div className="mr-2">
                      Frame: {selectedInfo?.frame},
                    </div>
                  )}
                  {selectedInfo?.hp && (
                    <div className="mr-2">
                      Hp: {selectedInfo?.hp},
                    </div>
                  )}
                  {selectedInfo?.volts && (
                    <div>
                      Volts: {selectedInfo?.volts}
                    </div>
                  )}
                </div>
                    
                <div className="border p-3">
                  {renderServiceList(selectedInfo?.serviceReport?.serviceCompleted)}
                </div></label></li>
                <li className=' text-white text-xs border-y border-black text-center  px-1 py-2 basis-1/12' >FECHA DE ENTREGA</li>
                <li className=' text-black text-xs border border-black text-center  px-1 py-2 basis-1/12' >PRECIO UNITARIO</li>
                <li className=' text-black text-xs border-y border-r border-black text-center  px-1 py-2 basis-1/12 ' >PRECIO TOTAL</li>
              </ul>
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
                <label>{selectedInfo?.Remission?.receivedDate || 'datos no disponible'}</label>
              </div>
              <div>
                <label>NOMBRE DE LA PERSONA QUE RECIBE:  </label>
                <label>{selectedInfo?.Remission?.whoReceive || 'datos no disponible'}</label>
              </div>
            </div>
            <div className="mt-12 text-center">
              <div className='flex flex-col items-center'>
                <input className='border-b border-black w-2/4 text-center ' type="text" />
                <label>FIRMA Y SELLO DE LA EMPRESA</label>
              </div>
            </div>
          </form>
        </section>

        <hr className="h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 my-6 border-0 rounded-full" />

        <section className="flex flex-col justify-center items-center">
          <div className="w-1/2 border rounded-[15px] px-5">
            <div className="m-5">
              <h3 className="text-lg font-bold">Materiales Requeridos para registro: {selectedInfo?.id}</h3>
            </div>
            <div className="flex flex-col">
              <label className="my-2"><b>Remisión:</b> {selectedInfo?.customer}{selectedInfo?.id || 'datos no disponible'}</label>
              <label className="my-2"><b>Descripción Rapida:</b> {selectedInfo?.note || 'datos no disponible'}</label>
              <label className="my-2"><b>Lista de Materiales:</b>{renderMaterialsAsList(selectedInfo?.checkList?.requiredMaterials)}</label>
            </div>
          </div>
        </section>








          {/* <section className='my-5'>
            <div>
              <h2 className='font-bold'>REMISIÓN</h2>
            </div>
            <div>
              <label>EMPRESA: </label>
              <label className="border-b border-black" >{selectedInfo?.customer || 'datos no disponible'}</label>
            </div>
            <div>
              <label>SERVICIO SOLICITADO POR: </label>
              <label className="border-b border-black" >{selectedInfo?.user || 'datos no disponible'}</label>
            </div>
            <ul>
              
              
              <li>CORREO:</li>
              <li>AGENTE DE REFERENCIA:</li>
              <div>
              <label>FECHA </label>
              <label className="border-b border-black" >{selectedInfo?.receivedDate || 'datos no disponible'}</label>
            </div>
              <li>TELEFONO:</li>
              <li>GUIA:</li>
              <li>CANTIDAD:</li>
              <li>UNIDAD:</li>
              <li>DESCRIPCIÓN:</li>
              <li>FECHA ENTREGA:</li>
              <li>PRECIO UNITARIO:</li>
              <li>PRECIO TOTAL:</li>
              <li>Subtotal:</li>
              <li>I.V.A.:</li>
              <li>Total:</li>
              <li>FECHA DE RECIBIDO:</li>
              <li>NOMBRE DE LA PERSONA QUE RECIBE:</li>
              <li>FIRMA Y SELLO DE LA EMPRESA:</li>
            </ul>
          </section>
          <hr />
          <section>
            <div>
              <h2 className='font-bold'>REPORTE DE SERVICIO</h2>
            </div>
            <div>
              <label>CLIENTE: </label>
              <label className="border-b border-black" >{selectedInfo?.customer || 'datos no disponible'}</label>
            </div>
            <div>
              <label>USUARIO: </label>
              <label className="border-b border-black" >{selectedInfo?.user || 'datos no disponible'}</label>
            </div>
            <div>
              <label>SPEC: </label>
              <label className="border-b border-black" >{selectedInfo?.spec || 'datos no disponible'}</label>
            </div>
            <div>
              <label>CATALAGO N°: </label>
              <label className="border-b border-black" >{selectedInfo?.catalog || 'datos no disponible'}</label>
            </div>
            <div>
              <label>POTENCIA: </label>
              <label className="border-b border-black" >{selectedInfo?.power || 'datos no disponible'}</label>
            </div>
            <div>
              <label>No. SERIE: </label>
              <label className="border-b border-black" >{selectedInfo?.serie || 'datos no disponible'}</label>
            </div>
            <div>
              <label>FRAME: </label>
              <label className="border-b border-black" >{selectedInfo?.frame || 'datos no disponible'}</label>
            </div>
            <div>
              <label>VOLTS: </label>
              <label className="border-b border-black" >{selectedInfo?.volts || 'datos no disponible'}</label>
            </div>
            <div>
              <label>EQUIPO: </label>
              <label className="border-b border-black" >{selectedInfo?.equipment || 'datos no disponible'}</label>
            </div>
            <div>
              <label>MARCA: </label>
              <label className="border-b border-black" >{selectedInfo?.brand || 'datos no disponible'}</label>
            </div>
            <div>
              <label>DESCRIPCION DEL PROBLEMA: </label>
              <label className="border-b border-black" >{selectedInfo?.serviceReport?.problemDescription || 'datos no disponible'}</label>
            </div>
            <div>
              <label>OBSERVACIONES: </label>
              <label className="border-b border-black" >{selectedInfo?.serviceReport?.observations || 'datos no disponible'}</label>
            </div>
            <div>
              <label>REQUERIMIENTO PARA REPARACION: </label>
              <label className="border-b border-black" >{selectedInfo?.serviceReport?.requirementForRepair || 'datos no disponible'}</label>
            </div>
            <ul>
              
              
              
              
              <br />   
              
              <br />
              
              <br />
            </ul>
          </section> */}
      
      </div>
      <section className='m-5'>
        <div onClick={handleDataSheetClose} className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
            <h2 >X</h2>
        </div>
      </section>
    </div>
  )
}

export default DataSheet
