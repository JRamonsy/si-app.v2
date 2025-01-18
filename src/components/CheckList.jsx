import { useContext } from "react";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";
import { CheckListContext } from "../context/CheckListContext";

const CheckList = ({}) => {

  const { selectedInfo } = useContext(HandleFuntionsContext);
  const { checkList, handleCloseCheckList, handleSubmit, Submit, register, }= useContext(CheckListContext)

  const handleChangeExitStep = (e) => {};
  const handleChangeVisualInspection = (e) => {};
  const handleChangePhotographicEvidence = (e) => {};
  const handleChangeRequiredParts = (e) => {};
  const handleChangeRequiredMaterials = (e) => {};
  const handleChangeEvidenceProcess = (e) => {};
  const handleChangeEvidenceTerm = (e) => {};
  const handleChangeSulzerReport = (e) => {};
  const handleChangea_finalInspection = (e) => {};
  const handleChangeRemission = (e) => {};
  const handleChangeGuide = (e) => {};

  return (
    <section className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center 
    ${checkList && 'scale-0'} transform transition-transform duration-200 ease`}>
      <section className="m-5" >
      </section>
      <form onSubmit={handleSubmit(Submit)} className='w-full max-w-2xl h-[90vh] overflow-y-auto p-5 rounded-lg bg-white '>
          <div className="flex justify-between items-center mb-5 bg-white ">
            <img
              alt="Logo de Suministros Industriales con texto y un símbolo gráfico"
              className="w-52 h-auto"
              src="\logo suministros industriales.png"
              />
            <h1 className='text-lg font-bold bg-white'>CHECK LIST DE SERVICIOS SI {selectedInfo?.id || 'datos no disponible'}</h1>
          </div>
          <div className="flex justify-between mb-2.5">
            <label className="basis-4/12  bg-white">FECHA DE RECIBO:</label>
            <label className=" border-b border-black" >{selectedInfo?.receivedDate || 'datos no disponible'}</label>
            {/* <input className="flex-2 border-0 border-b border-black bg-white" type="date" /> */}
            <label className="basis-4/12 bg-white">FECHA DE TERMINO:</label>
            <label className="border-b border-black" >{selectedInfo?.finalDate || 'datos no disponible'}</label>
            {/* <input className="flex-2 border-0 border-b border-black bg-white" type="date" /> */}
          </div>

          <div className="flex justify-between mb-2.5">
            <label className="basis-1/4 bg-white" >CLIENTE:</label>
            <label className="basis-1/4 text-center border-b border-black" >{selectedInfo?.customer || 'datos no disponible'}</label>
            {/* <input className="flex-2 border-0 border-b border-black bg-white" type="text"/> */}
            <label className="basis-1/4 bg-white" >CAT. N°:</label>
            <label className="basis-1/4 text-center border-b border-black" >{selectedInfo?.cat || 'datos no disponible'}</label>
            {/* <input className="flex-2 border-0 border-b border-black bg-white" type="text" /> */}
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
                <td className='border border-black p-1.5 text-left bg-white'><input 
                {...register('technicianNameExitStep')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('advanceExitStep', { required: true })}
                      onChange={(e) => handleChangeExitStep(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('advanceExitStep', { required: true })}
                      onChange={(e) => handleChangeExitStep(e)}/>No
                  </label>
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Inspección Visual</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNamevisualInspection')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('advanceVisualInspection', { required: true })}
                      onChange={(e) => handleChangeVisualInspection(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('advanceVisualInspection', { required: true })}
                      onChange={(e) => handleChangeVisualInspection(e)}/>No
                  </label> 
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Evidencia fotográfica</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNamePhotographicEvidence')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('advancePhotographicEvidence', { required: true })}
                      onChange={(e) => handleChangePhotographicEvidence(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('advancePhotographicEvidence', { required: true })}
                      onChange={(e) => handleChangePhotographicEvidence(e)}/>No
                  </label>
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Foto placa</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('t_platePhoto')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                <div className='cursor-pointer'>
                {selectedInfo?.image && selectedInfo.image.length > 0 
                ? 'Sí' 
                : 'No'
                } 
                </div>
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Piezas requeridas</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameRequiredParts')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('advanceRequiredParts', { required: true })}
                      onChange={(e) => handleChangeRequiredParts(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('advanceRequiredParts', { required: true })}
                      onChange={(e) => handleChangeRequiredParts(e)}/>No
                  </label>
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Materiales requeridos</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameRequiredMaterials')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('advanceRequiredMaterials', { required: true })}
                      onChange={(e) => handleChangeRequiredMaterials(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('advanceRequiredMaterials', { required: true })}
                      onChange={(e) => handleChangeRequiredMaterials(e)}/>No
                  </label>
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Evidencia proceso</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameEvidenceProcess')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('advanceEvidenceProcess', { required: true })}
                      onChange={(e) => handleChangeEvidenceProcess(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('advanceEvidenceProcess', { required: true })}
                      onChange={(e) => handleChangeEvidenceProcess(e)}/>No
                  </label>
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Evidencia término</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameEvidenceTerm')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('advanceEvidenceTerm', { required: true })}
                      onChange={(e) => handleChangeEvidenceTerm(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('advanceEvidenceTerm', { required: true })}
                      onChange={(e) => handleChangeEvidenceTerm(e)}/>No
                  </label>
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Reporte</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameSulzerReport')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('advanceSulzerReport', { required: true })}
                      onChange={(e) => handleChangeSulzerReport(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('advanceSulzerReport', { required: true })}
                      onChange={(e) => handleChangeSulzerReport(e)}/>No
                  </label>
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Inspección Final</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('t_finalInspection')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('a_finalInspection', { required: true })}
                      onChange={(e) => handleChangea_finalInspection(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('a_finalInspection', { required: true })}
                      onChange={(e) => handleChangea_finalInspection(e)}/>No
                  </label>
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Remisión</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameRemission')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('advanceRemission', { required: true })}
                      onChange={(e) => handleChangeRemission(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('advanceRemission', { required: true })}
                      onChange={(e) => handleChangeRemission(e)}/>No
                  </label>
                </td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Guía</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameGuide')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
                  <label>
                    <input type="radio" value="true"
                      {...register('advanceGuide', { required: true })}
                      onChange={(e) => handleChangeGuide(e)}/>Sí
                  </label>
                  <label>
                    <input type="radio" value="false"
                      {...register('advanceGuide', { required: true })}
                      onChange={(e) => handleChangeGuide(e)}/>No
                  </label>
                 </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-5 bg-white">
            <p className='bg-white'>Diagnostico general:</p>
            <textarea {...register('comments')} className="bg-white border border-black px-2" rows="4" style={{ width: '100%', resize: 'none' }}></textarea>
          </div>
          <div className="mt-5 bg-white">
            <p className='bg-white'>Materiales requeridos:</p>
            <textarea {...register('requiredMaterials')} className="bg-white border border-black px-2" rows="4" style={{ width: '100%', resize: 'none' }}></textarea>
          </div>
          <button className="w-full m-5 px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600">GUARDAR</button>
        </form>
        <section className="m-5" >
        <div onClick={handleCloseCheckList} className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
          <h2 >X</h2>
        </div>        
      </section>
    </section>
  )
}

export default CheckList
