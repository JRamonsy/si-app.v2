import CheckList from './CheckList'
import DataSheet from './DataSheet'
import Remission from './Remission'
import MaterialList from "./MaterialList";
import ServiceReport from './ServiceReport'
import {useContext, useState, useEffect } from "react";
import { PlateDataContext } from "../context/PlateDataContext";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";
import { CheckListContext } from "../context/CheckListContext";
import { ServiceReportContext } from "../context/ServiceReportContext";
import { RemissionContext } from '../context/RemissionContext';
import { MaterialListContext } from "../context/MaterialListContext";
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

  const { handleOpenMateriaList, } = useContext(MaterialListContext);

  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
        cancelButton: "btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: "Contraseña requerida",
      text: "Por favor, introduce tu contraseña para confirmar.",
      icon: "warning",
      input: "password", // Campo de entrada para contraseña
      inputPlaceholder: "Ingresa tu contraseña",
      inputAttributes: {
        maxlength: 20,
        autocapitalize: "off",
        autocorrect: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      preConfirm: (password) => {
        if (!password) {
          Swal.showValidationMessage("La contraseña no puede estar vacía.");
          return false;
        }
        // Aquí validas la contraseña ingresada
        const validPassword = "1234"; // Cambia esto por la lógica para validar la contraseña
        if (password !== validPassword) {
          Swal.showValidationMessage("Contraseña incorrecta.");
          return false;
        }
        return true;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("Deleting plate info with ID:", info.id);
        deleteInfos("/plate_datas/", info.id);
        if (info.image && info.image.length > 0) {
          // console.log("Deleting image with ID:", info.image[0].id);
          deleteImages("/image_datas/", info.image[0].id);
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
  


  const handleEdit = () => {  // CARGA LOS DATOS DE UN REGISTRO A EL FORMULARIO PARA EDITAR
    setNewService(false)
    setInfosEdit(info);
    if (info.image && info.image.length > 0) {
      setImagesEdit(info.image[0].imageUrl);
      setBtnDeleteImage(false)
      setShowHideA(false);
      setHideImage(false)
      // setShowHideX(false);
      // console.log(info.image[0]);
      // console.log(info)
    } else {
      // console.warn("No hay imágenes disponibles para editar.");
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

  // Circulo de progreso
  const totalInputs = 11; 
  const progressValue = (trueCount / totalInputs) * 100;
 
  function CircularProgressWithLabel({ value, color, size, thickness, customColor, textStyle }) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress 
          variant="determinate" 
          value={value}
          color={color}
          size={size}
          thickness={thickness}
          sx={{ color: customColor ? customColor : '' }}
          />
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
            ...textStyle
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
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12 flex justify-center items-center'>
              <span className='font-bold text-xl ' >
                {`${info.id}`}
              </span></td>
            <td className='font-sans flex justify-center items-center border border-black text-slate-300 text-center p-1 text-sm basis-1/12' >
            <CircularProgressWithLabel value={progressValue} customColor="#9ad247" size={70} thickness={8}
              textStyle={{ fontSize: '.9rem', color: '#fff', fontWeight: 'bold', fontFamily: 'Arial' }} />         
            </td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12 flex justify-center items-center' ><span>{`${info.customer}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12 flex justify-center items-center' ><span>{`${info.user}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12 flex justify-center items-center' ><span>{`${info.receivedDate}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12 flex justify-center items-center' ><span>{`${info.customer}${info.id}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12 flex justify-center items-center' ><span>{`${info.finalDate || ""}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-2/12 flex justify-center items-center' ><span>{`${info.note}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12 flex justify-center items-center' ><span>{`${info.quote}`}</span></td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12' >
            <section className='flex flex-col items-center'>
    
              <section className='w-full flex justify-between items-center'>
                <h3 className='text-left' >CheckList:</h3>
                <button className={`bg-lime-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-lime-500`} onClick={() => handleCheckListOpen(info)} title='Editar Check List' ><FaEdit /></button>
              </section>

              <section className='w-full flex justify-between items-center'>
                <h3 className='text-left' >Reporte de servicio:</h3>
                <button className={`bg-lime-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-lime-500`} onClick={() => handleServiceReport(info)} title='Editar Reporte de Servicio' ><FaEdit /></button>
              </section>

              <section className='w-full flex justify-between items-center'>
                <h3 className='text-left' >Remisión:</h3>
                <button className={`bg-lime-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-lime-500`} onClick={() => handleRemission(info)} title='Editar Remisión' ><FaEdit /></button>
              </section>

              <section className='w-full flex justify-between items-center'>
                <h3 className='text-left'>Lista de materiales:</h3>
                <button  className='bg-sky-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-sky-500' onClick={() => handleOpenMateriaList(info) } title='Eliminar registro' ><HiOutlineArrowsExpand/></button>
              </section>
            </section>
            </td>
            <td className='font-sans border border-black text-slate-300 text-center p-1 text-sm basis-1/12' >
             <section className='flex flex-col justify-center items-center' >
                <button className='bg-yellow-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-yellow-500' onClick={() => handleDataSheet(info)}
                title="Abrir Reporte General"><HiOutlineArrowsExpand/></button>
                <button  className='bg-lime-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-lime-500' onClick={handleEdit} title='Editar información del equipo' ><FaEdit /></button>
                <button  className='bg-red-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-red-500' onClick={handleDelete} title='Eliminar registro' ><MdDeleteForever /></button>
              </section>
            </td>
          </tr>
        </tbody>
      </table>
      <DataSheet />
      <CheckList />
      <Remission />
      <ServiceReport />
      <MaterialList info={info}/>

    </section>
  )
}

export default FollowUp2