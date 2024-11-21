import { useContext, useState } from "react";
import { PlateDataContext } from "../context/PlateDataContext";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";
import { useForm } from "react-hook-form";

const CheckList = ({}) => {

  const {getInfos, checks, getCheck, createCheck, checksEdit, setChecksEdit, updateCheck, deleteCheck} = useContext(PlateDataContext);
  const {checkList, setCheckList, selectedInfo, selectedCheck, newCheckList, handleCheckListOpen} = useContext(HandleFuntionsContext);
  const {handleSubmit, register, reset} = useForm()
  
  const [btnEditCheck, setBtnEditCheck] = useState(true)
  const [btnDeleteCheck, setBtnDeleteCheck] = useState(true)


  

    // Salir del check list
    const handleCloseCheckList = () => {
      setCheckList(true)
      resetForm()
    } 
 

    const Submit = async ( data) => {
      if (checksEdit && checksEdit.id) {    
        await updateCheck('/checklist_datas/', checksEdit.id, data);
        handleCloseCheckList();
        console.log("Checklist actualizado con éxito.");
        getInfos('/plate_datas/')
      } else {
        if (selectedCheck.checkList === null) {
        const newCheckList = {
            ...data,
            plateId: selectedCheck.id,
        };
        await createCheck('/checklist_datas/', newCheckList, data);
        handleCloseCheckList();
        resetForm();
        getInfos('/plate_datas/')

        }
      }
    }

    const handleDeleteCheckList = () => {
      if(checksEdit.id){
        console.log(checksEdit.id)
        console.log('Checklist BORRADO con ID:', checksEdit.id);
        deleteCheck('/checklist_datas/', checksEdit.id)
        handleCloseCheckList()

      } else {
        console.error("Error: No hay checklist seleccionado para eliminar.");
      }
    }
  
  

    const resetForm = () => {
      reset({
        technicianNameExitStep: '',
        technicianNamevisualInspection: '',
        technicianNamePhotographicEvidence: '',
        technicianNameRequiredParts: '',
        technicianNameRequiredMaterials: '',
        technicianNameEvidenceProcess: '',
        technicianNameEvidenceTerm: '',
        technicianNameSulzerReport: '',
        technicianNameRemission: '',
        technicianNameGuide: '',
        advanceExitStep: '',
        advanceVisualInspection: '',
        advancePhotographicEvidence: '',
        advanceRequiredParts: '',
        advanceRequiredMaterials: '',
        advanceEvidenceProcess: '',
        advanceEvidenceTerm: '',
        advanceSulzerReport: '',
        advanceRemission: '',
        advanceGuide: '',
        comments: '',
        requiredMaterials: ''
      });
    }

  

  // const handleEditCheck = () => {
  //   if(checks.length > 0) {
  //     const checkToEdit = checks.find(check => check.plateId === selectedInfo.id)
  //     console.log(checkToEdit)
  //     setChecksEdit(checkToEdit) // se guarda selectedInfo dentro de la variabole de estado
  //     resetForm()
  //     console.log(`Editando checkList con ID: ${checkToEdit.id}`);
  //   }else{
  //     console.log('no existe ningun checkList asociado')
  //   }
  // }



  return (
    <section className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center 
    ${checkList && 'scale-0'} transform transition-transform duration-200 ease`}>
      <section className="m-5" >
        {/* <div className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
          <h2 >✔</h2>
        </div> */}
      </section>
      <form onSubmit={handleSubmit(Submit)} className='w-full max-w-2xl h-[90vh] overflow-y-auto p-5 rounded-lg bg-white '>
          <div className="flex justify-between items-center mb-5 bg-white ">
            <img
              alt="Logo de Suministros Industriales con texto y un símbolo gráfico"
              className="w-52 h-auto"
              src="public\logo suministros industriales.png"
              />
            <h1 className='text-lg font-bold bg-white'>CHECK LIST DE SERVICIOS SI{selectedInfo?.id || 'datos no disponible'}</h1>
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
                <td className='flex justify-center border border-black p-2 bg-white' ><input 
                {...register('advanceExitStep')} className='cursor-pointer' type="checkbox" /></td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Inspección Visual</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNamevisualInspection')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' ><input 
                {...register('advanceVisualInspection')}className='cursor-pointer' type="checkbox" /></td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Evidencia fotográfica</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNamePhotographicEvidence')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' ><input 
                {...register('advancePhotographicEvidence')} className='cursor-pointer' type="checkbox" /></td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Foto placa</td>
                <td className='border border-black p-1.5 text-left bg-white'><input  className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' >
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
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameRequiredParts')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' ><input 
                {...register('advanceRequiredParts')} className='cursor-pointer' type="checkbox" /></td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Materiales requeridos</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameRequiredMaterials')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' ><input 
                {...register('advanceRequiredMaterials')}className='cursor-pointer' type="checkbox" /></td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Evidencia proceso</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameEvidenceProcess')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' ><input 
                {...register('advanceEvidenceProcess')} className='cursor-pointer' type="checkbox" /></td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Evidencia término</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameEvidenceTerm')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' ><input 
                {...register('advanceEvidenceTerm')} className='cursor-pointer' type="checkbox" /></td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Reporte Sulzer</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameSulzerReport')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' ><input 
                {...register('advanceSulzerReport')} className='cursor-pointer' type="checkbox" /></td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Remisión</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameRemission')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='flex justify-center border border-black p-2 bg-white' ><input 
                {...register('advanceRemission')} className='cursor-pointer' type="checkbox" /></td>
              </tr>
              <tr className='tr-check-list'>
                <td className='border border-black p-1.5 text-left bg-white'>Guía</td>
                <td className='border border-black p-1.5 text-left bg-white'><input {...register('technicianNameGuide')} className='w-full border-0 bg-white' type="text" /></td>
                <td className='border border-black p-1.5 text-left bg-white' ><input 
                 {...register('advanceGuide')} className='cursor-pointer' type="checkbox" /></td>
              </tr>
            </tbody>
          </table>

          <div className="mt-5 bg-white">
            <p className='bg-white'>Diagnostico</p>
            <textarea {...register('comments')} className="bg-white border border-black" rows="4" style={{ width: '100%', resize: 'none' }}></textarea>
          </div>
          <div className="mt-5 bg-white">
            <p className='bg-white'>Materiales requeridos</p>
            <textarea {...register('requiredMaterials')} className="bg-white border border-black" rows="4" style={{ width: '100%', resize: 'none' }}></textarea>
          </div>
          <button className="w-full m-5 px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600">GUARDAR</button>
        </form>
        <section className="m-5" >
        <div onClick={handleCloseCheckList} className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
          <h2 >X</h2>
        </div>
        {/* <div onClick={handleEditCheck}  className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
          <h2 >editar</h2>
        </div> */}
        {/* <div onClick={handleEditCheck}  className={`${btnEditCheck && 'hidden'} cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30`}>
          <h2 >editar</h2>
        </div> */}
        <div onClick={handleDeleteCheckList}  className={`${btnDeleteCheck && 'hidden'} cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30`}>
          <h2 >eliminar</h2>
        </div>
        
      </section>
    </section>

  )
}

export default CheckList
