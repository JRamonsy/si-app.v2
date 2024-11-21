import CheckList from './CheckList'
import DataSheet from './DataSheet'
import Remission from './Remission'
import ServiceReport from './ServiceReport'
import {useContext, useState, useEffect } from "react";
import { PlateDataContext } from "../context/PlateDataContext";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";
import { CheckListContext } from "../context/CheckListContext";
import { ServiceReportContext } from "../context/ServiceReportContext";
import { RemissionContext } from '../context/RemissionContext';
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';





const FollowUp2 = ({info, trueCount}) => {

  const { deleteInfos, deleteImages, setInfosEdit, setImagesEdit } = useContext(PlateDataContext);

  const {setShowHideA, setHideImage, setBtnDeleteImage, setNewService, handleDataSheet } = useContext(HandleFuntionsContext);  

  const { newCheckList, handleCheckListOpen, actBtnDelete } = useContext(CheckListContext)

  const { handleServiceReport, newServiceReport } = useContext(ServiceReportContext)

  const { handleRemission, newRemission } = useContext(RemissionContext);


const handleDelete = () => { // ELIMINA REGISTRO DE LA BASE DE DATOS
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
      cancelButton: "btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: "¿Estás seguro de eliminar este registro?",
    text: "¡No podrás recuperar la información guardada!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, ¡elimínalo!",
    cancelButtonText: "No, cancelar",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('Deleting plate info with ID:', info.id);
      deleteInfos('/plate_datas/', info.id);
      if (info.image && info.image.length > 0) {
        console.log('Deleting image with ID:', info.image[0].id);
        deleteImages('/image_datas/', info.image[0].id);
      }

      swalWithBootstrapButtons.fire({
        title: "¡Eliminado!",
        text: "Tu registro ha sido eliminado.",
        icon: "success"
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelado",
        text: "Tu registro está a salvo :)",
        icon: "error"
      });
    }
  });
};


  // const handleDelete = () => { // ELIMINA REGISTRO DE LA BASE DE DATOS
  //   if (window.confirm('¿Está seguro de eliminar este registro?')) {
  //     console.log('Deleting plate info with ID:', info.id);
  //     deleteInfos('/plate_datas/', info.id);
  //     if (info.image && info.image.length > 0) {
  //       console.log('Deleting image with ID:', info.image[0].id);
  //       deleteImages('/image_datas/', info.image[0].id);
  //     }
  //   }
  // };

  const handleEdit = () => {  // CARGA LOS DATOS DE UN REGISTRO A EL FORMULARIO PARA EDITAR
    setNewService(false)
    setInfosEdit(info);
    if (info.image && info.image.length > 0) {
      setImagesEdit(info.image[0].imageUrl);
      setBtnDeleteImage(false)
      setShowHideA(false);
      setHideImage(false)
      // setShowHideX(false);
      console.log(info.image[0]);
    } else {
      console.warn("No hay imágenes disponibles para editar.");
      setImagesEdit(null);
    }
  };

  const [btnNewCheck, setBtnNewCheck] = useState(true)
  const [btnEditCheck, setBtnEditCheck] = useState(true)
  useEffect(() => {
      if (info.checkList) {
        setBtnNewCheck(true);
        setBtnEditCheck(false);
      } else {
        setBtnNewCheck(false);
        setBtnEditCheck(true);
      }
  }, [info.checkList, actBtnDelete]); 

  const [btnNewReport, setBtnNewReport] = useState(true)
  const [btnEditReport, setBtnEditReport] = useState(true)
  useEffect(() => {
    if (info.serviceReport) {
      setBtnNewReport(true);
      setBtnEditReport(false);
    } else {
      setBtnNewReport(false);
      setBtnEditReport(true);
    }
  }, [info.serviceReport]); 

  const [btnNewRemission, setBtnNewRemission] = useState(true)
  const [btnEditRemission, setBtnEditRemission] = useState(true)
  useEffect(() => {
    if (info.Remission) {
      setBtnNewRemission(true);
      setBtnEditRemission(false);
    } else {
      setBtnNewRemission(false);
      setBtnEditRemission(true);
    }
  }, [info.Remission]);




  


  const totalInputs = 11; 
  const progressValue = (trueCount / totalInputs) * 100;
 
  function CircularProgressWithLabel({ value }) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={value} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>{`${Math.round(value)}%`}</span> 
        </Box>
      </Box>
    );
  }

  return (
    <section>
      <table className='w-full border-collapse' >
        <tbody>
          <tr className='flex'  >
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12 ' ><span>
              {`${info.id}`}
              <section>
                <button className='bg-yellow-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-yellow-500' onClick={() => handleDataSheet(info)}
                title="Abrir Reporte General"><HiOutlineArrowsExpand/></button>
                <button  className='bg-lime-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-lime-500' onClick={handleEdit} title='Editar información del equipo' ><FaEdit /></button>
                <button  className='bg-red-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-red-500' onClick={handleDelete} title='Eliminar registro' ><MdDeleteForever /></button>
              </section></span></td>
            <td className='font-sans flex justify-center items-center border border-black text-slate-300 text-center p-1 text-sm basis-1/12' >
            <CircularProgressWithLabel value={progressValue}/>         
            </td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12' ><span>{`${info.customer}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12' ><span>{`${info.user}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12' ><span>{`${info.receivedDate}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12' ><span>{`${info.remissionNum}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12' ><span>{`${info.finalDate}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-2/12' ><span>{`${info.note}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12' ><span>{`${info.quote}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-2/12' >
            <section className='flex flex-col items-center'>
    
              <section className='w-full flex justify-start items-center'>
                <h3 >CheckList:</h3>
                  <button className={`${btnNewCheck && 'hidden'} bg-sky-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-sky-500 `} onClick={() =>  newCheckList(info)} title='Nuevo Check List'><MdOutlinePostAdd /></button>
                  <button className={`${btnEditCheck && 'hidden'} bg-lime-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-lime-500`} onClick={() => handleCheckListOpen(info)} title='Editar Check List' ><FaEdit /></button>
              </section>

              <section className='w-full flex justify-start items-center'>
                <h3>Reporte de servicio:</h3>
                  <button className={`${btnNewReport && 'hidden'} bg-sky-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-sky-500 `} onClick={() =>  newServiceReport(info)} title='Nuevo Reporte de Servicio' ><MdOutlinePostAdd /></button>
                  <button className={`${btnEditReport && 'hidden'} bg-lime-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-lime-500`} onClick={() => handleServiceReport(info)} title='Editar Reporte de Servicio' ><FaEdit /></button>
              </section>

              <section className='w-full flex justify-start items-center'>
                <h3>Remisión:</h3>
                <button className={`${btnNewRemission && 'hidden'} bg-sky-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-sky-500 `} onClick={() =>  newRemission(info)} title='Nueva Remisión' ><MdOutlinePostAdd /></button>
                <button className={` ${btnEditRemission && 'hidden'} bg-lime-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-lime-500`} onClick={() => handleRemission(info)} title='Editar Remisión' ><FaEdit /></button>
              </section>
            </section>
            </td>
          </tr>
        </tbody>
      </table>
      <DataSheet />
      <CheckList />
      <Remission />
      <ServiceReport />
    </section>
  )
}

export default FollowUp2