import { createContext, useState } from "react";
import {useContext } from "react";
import { PlateDataContext } from './PlateDataContext';
import Swal from 'sweetalert2'


export const HandleFuntionsContext = createContext(false);

// el que provee acceso a context
export function HandleFunctionsProvider({ children }) {

  const { infos, setChecksEdit } = useContext(PlateDataContext);


  const [imageFile, setImageFile] = useState(null); // no muestra la imagen
  const [showHideA, setShowHideA] = useState(true)   // Inicialmente no se muestra "Adjuntar"
  const [showHideX, setShowHideX] = useState(true)
  const [hideImage, setHideImage] = useState(true)
  const [btnDeleteImage, setBtnDeleteImage] = useState(true)
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [selectedCheck, setSelectedCheck] = useState(null)

  const clearImage = (e) => {
    setImageFile();
    setShowHideA(true)
    e.preventDefault();
  };

  const handleX = (e) => { // MOSTRAR U OCULTAR BOTON DE EDITAR IMAGEN
    e.preventDefault();
    setShowHideX(true)
    setHideImage(true)
    setShowHideA(true)
  }

  //Cierra LogIn
  const [logIn, setLogIn] = useState(false)

  const handleEnterLogIn = (e) => { //carrar log in y entrar a seguimiento
    e.preventDefault();
    setLogIn(true);
  }

  //Salir seguimiento y volcer a Login
  const handleExitLogin = () => {
    setLogIn(false)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  //Abre plateData
  const [newService, setNewService] = useState(true)
  const handleNew = () => {
    setNewService(false)
  }

  //Abre CheckList
  // const [checkList, setCheckList] = useState(true)
  // const handleCheckListOpen = (info) => {
  //   if (!infos) {
  //     console.warn('No se han cargado los datos aún.');
  //     return;
  //   }
  //   const foundData = infos.find(item => item.id === info.id);
  //   if (foundData) {
  //     setSelectedInfo(foundData);
  //     console.log("Información encontrada del registro:", foundData);
  //     console.log('Información encontrada del checklist', foundData.checkList)
  //     setCheckList(false)

  //     setChecksEdit(foundData.checkList) // se guarda selectedInfo dentro de la variabole de estado
  //     console.log(`Editando checkList con ID: ${foundData.checkList.id}`);
  //   } else {
  //     console.warn('No se encontró el registro con ese ID');
  //   }
  // }

  // const newCheckList = (info) => {
  //   if (info){
  //     setCheckList(false)
  //     const nchecks = infos.find(item => item.id === info.id)
  //     setSelectedCheck(nchecks)
  //     console.log('Abriendo nuevo checklist, asociado al id:', nchecks.id);
  //     console.log('Aqui esta la informacion del id:', nchecks.id, 'y su contenido es:', nchecks);
  //   }else {

  //   }
  // }

  

  // //Abre Remission
  // const [openRemission, setOpenRemission] = useState(true)
  // const handleRemission = (info) => {
  //   if (!infos) {
  //     console.warn('No se han cargado los datos aún.');
  //     return;
  //   }
  //   const foundData = infos.find(item => item.id === info.id);
  //   if (foundData) {
  //     setSelectedInfo(foundData);
  //     console.log("Información encontrada:", foundData);
  //     setOpenRemission(false);
  //   } else {
  //     console.warn('No se encontró el registro con ese ID');
  //   }
  // }
  // Cerrar remission
  // const handleRemissionClose = () => {
  //   setOpenRemission(true);
  // };

  //Abre ServiceReport
  // const [openServiceReport, setOpenServiceReport] = useState(true)
  // const handleServiceReport = (info) => {
  //   if (!infos) {
  //     console.warn('No se han cargado los datos aún.');
  //     return;
  //   }
  //   const foundData = infos.find(item => item.id === info.id);
  //   if (foundData) {
  //     setSelectedInfo(foundData);
  //     console.log("Información encontrada:", foundData);
  //     setOpenServiceReport(false);
  //   } else {
  //     console.warn('No se encontró el registro con ese ID');
  //   }
  // }
  // // Cierra Service Report
  // const handleServiceReportClose = () => {
  //   setOpenServiceReport(true)
  // }

  //Abre DataSeet
  const [openDataSheet, setOpenDataSheet] = useState(true)
  // const handleDataSheet = (info) => {
  //   console.log("Hoja de datos abierto con ID:", info.id);
  //   // Lógica adicional aquí
  //   setOpenDataSheet(false);
  // }

  const handleDataSheet = (info) => {
    if (!infos) {
      console.warn('No se han cargado los datos aún.');
      return;
    }
    const foundData = infos.find(item => item.id === info.id);
    if (foundData) {
      setSelectedInfo(foundData);
      console.log("Información encontrada:", foundData);
      setOpenDataSheet(false);
    } else {
      console.warn('No se encontró el registro con ese ID');
    }
  };
  

  // cerrar dataSheet
  const handleDataSheetClose = () => {
    setOpenDataSheet(true)
  }

  const valuesHandleFunrtions = {
    imageFile, 
    setImageFile, 
    showHideA, 
    setShowHideA, 
    showHideX, 
    setShowHideX, 
    hideImage, 
    setHideImage, 
    btnDeleteImage, 
    setBtnDeleteImage, 
    clearImage, 
    handleX, 
    logIn, 
    setLogIn, 
    handleEnterLogIn, 
    handleExitLogin, 
    newService, 
    setNewService, 
    handleNew, 
    // checkList, 
    // setCheckList, 
    // handleCheckListOpen, 
    // handleCloseCheckList, 
    // openRemission, 
    // setOpenRemission, 
    // handleRemission, 
    // handleRemissionClose, 
    // openServiceReport, 
    // setOpenServiceReport, 
    // handleServiceReport, 
    // handleServiceReportClose, 
    openDataSheet, 
    setOpenDataSheet, 
    handleDataSheet, 
    handleDataSheetClose,
    selectedInfo,
    setSelectedInfo,
    // newCheckList,
    selectedCheck,
    setSelectedCheck
  }

  return (
    <HandleFuntionsContext.Provider value={valuesHandleFunrtions} >
      {children}
    </HandleFuntionsContext.Provider>
  )
}