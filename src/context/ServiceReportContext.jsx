import { createContext, useState, useEffect,  useRef } from "react";
import useCrud from "../hooks/useCrud";
import { PlateDataContext } from './PlateDataContext';
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { HandleFuntionsContext } from "./HandleFunctionsContext";
import Swal from 'sweetalert2'

export const ServiceReportContext = createContext(false);

export function ServiceReportProvider({ children }) {

  const { BASE_URL, infos, getInfos, handleRefresh } = useContext(PlateDataContext) 
  const { setSelectedInfo } = useContext(HandleFuntionsContext)

  const {handleSubmit, register, reset} = useForm()

  const [service, getService, createService, deleteService, updateService] = useCrud(BASE_URL)
  const [images, getImages, createImages, deleteImages, updateImages] = useCrud(BASE_URL)

  const [serviceEdit, setServiceEdit] = useState()
  const [selectedService, setSelectedService] = useState(null)
  const [imagesEdits, setImagesEdits] = useState() // carga imagenes
  

  useEffect(() => {
    getService('/report_datas/')
  }, [])

  useEffect(() => {
    getImages('/images_datas/') // carga imahgenes
  }, [])

  console.log(service)
  console.log(images)  // carga imagenes

  //Abre ServiceReport
  const [serviceReport, setServiceReport] = useState(true)
  const handleServiceReport = (info) => {
    if (!infos) {
      console.warn('No se han cargado los datos aún.');
      return;
    }
    const foundData = infos.find(item => item.id === info.id);
    if (foundData) {
      setSelectedInfo(foundData);
      console.log("Información encontrada del registro:", foundData);
      console.log('Información encontrada del Servicio de reporte', foundData.serviceReport)
      setServiceReport(false);
      setServiceEdit(foundData.serviceReport)
      resetForm()
      console.log(`Editando serviceReport con ID: ${foundData.serviceReport.id}`);
    } else {
      console.warn('No se encontró el registro con ese ID');
    }
  }

  const [actBtnDelete, setActBtnDelete] = useState(false)

  const handleDeleteServiceReport = async () => {
    if (serviceEdit.id) {
      Swal.fire({
        title: "¿Estás seguro de eliminar este Servicio de Reporte?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, ¡elimínalo!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log("ServiceReport BORRADO con ID:", serviceEdit.id);
          await deleteService('/report_datas/', serviceEdit.id);
          setActBtnDelete(true);
          resetForm();
          handleServiceReportClose();
          getInfos('/plate_datas/')
          // handleRefresh()
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu Reporte de Servicio ha sido eliminado.",
            icon: "success"
          });
          handleRefresh()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelado",
            text: "Tu Reporte de Servicio está a salvo :)",
            icon: "error"
          });
        }
      });
    } else {
      console.error("Error: No hay Service Report seleccionado para eliminar.");
    }
  };

//   const handleDeleteServiceReport = async () => {
//     if (serviceEdit.id) {
//         console.log("ServiceReport BORRADO con ID:", serviceEdit.id);
//         await deleteService('/report_datas/', serviceEdit.id);
//         // setActBtnDelete(true);
//         resetForm();
//         handleServiceReportClose();
//     } else {
//         console.error("Error: No hay Service Report seleccionado para eliminar.");
//     }
// };

  const newServiceReport = (info) => {
    if (info){
      setServiceReport(false)
      const newService = infos.find(item => item.id === info.id)
      setSelectedService(newService)
      console.log('Abriendo nuevo Reporte de Servicio, asociado al id:', newService.id);
      console.log('Aqui esta la informacion del id:', newService.id, 'y su contenido es:', newService);
    }else {

    }
  }
  // Cierra Service Report
  const handleServiceReportClose = () => {
    setServiceReport(true)
  }

  const resetForm = () => {
    reset({
      problemDescription: '',
      observations: '',
      requirementForRepair: '',
      serviceCompleted: '' 
    });
  }

  useEffect(() => {
    reset(serviceEdit)
   }, [serviceEdit])

   const Submit = async (data) => {
    let newServiceReport = {};
  
    // Crear o actualizar el reporte de servicio
    if (serviceEdit && serviceEdit.id) {
      await updateService('/report_datas/', serviceEdit.id, data);
      newServiceReport = serviceEdit;
      handleServiceReportClose()
      handleRefresh()
      getInfos('/plate_datas/')
    } else {
      if (selectedService.serviceReport === null) {
        newServiceReport = {
          ...data,
          plateId: selectedService.id,
        };
        const createdReport = await createService('/report_datas/', newServiceReport);
        newServiceReport = createdReport;
        handleServiceReportClose()
        resetForm();
        getInfos('/plate_datas/')
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Nuevo Reporte de servicio Creado"
        });
      }
    }
  
    // Subir imágenes seleccionadas
    if (selectedImages.length > 0) {
      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });
      formData.append('service_report_id', newServiceReport.id);
    
      try {
        await createImages('/images_datas/', formData);
        console.log("Imágenes asociadas al Service Report:", newServiceReport.id);
    
        // Vuelve a obtener las imágenes actualizadas
        await getImages('/images_datas/');
      } catch (error) {
        console.error("Error al subir imágenes:", error);
      }
    }
  };
  



  /////// LOGICA IMAGENES

  const [imageFile, setImageFile] = useState(null); // no muestra la imagen
  const [showHideA, setShowHideA] = useState(true)   // Inicialmente no se muestra "Adjuntar"
  const [showHideX, setShowHideX] = useState(true)
  const [hideImage, setHideImage] = useState(true)
  const [btnDeleteImage, setBtnDeleteImage] = useState(true)

  const [imagesEdit, setImagesEdit] = useState()

  const fileInputRef = useRef(null); // Referencia para el input de archivo

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

  const showImg = () => { // MUESTRA LA IMAGEN SELECCIOANDA INPUT FILE o HANDLEIMAGE
    if (imageFile instanceof File) {
        return URL.createObjectURL(imageFile);
    }else if (imagesEdit) {
      return imagesEdit; // Mostrar la URL de la imagen editada si está disponible
    }
    return null;
  };

  // const handleImage = (e) => { //SELECCIONADOR DE LA IMAGEN 
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   if (file) {
  //       setImageFile(file);
  //       setShowHideX(false)
  //       setShowHideA(false);
  //       setHideImage(false)
  //       // setBtnDeleteImage(false);
  //       console.log(e.target.files[0])
  //   }
  // };

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImage = (event) => {
    const files = Array.from(event.target.files); // Convertir a un array
    setSelectedImages((prevImages) => [...prevImages, ...files]); // Actualizar estado
    setShowHideA(false); // Mostrar controles
    setHideImage(false);
  };
  

  const handleRemoveImage = (index, e) => {
    e.preventDefault();
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDeleteAllImages = () => {
    setSelectedImages([]);
  };
  
  




  const handleDeleteImage = async (e) => {  //ELIMINA LA IMAGEN DE LA BASE DE DATOS
    e.preventDefault();
    if (info && info.image && info.image[0] && window.confirm('¿Está seguro de eliminar la imagen?')) {
      await deleteImages('/image_datas/', info.image[0].id);
      setImageFile(null);
      setBtnDeleteImage(true)
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      // Actualiza los datos
      await getInfos('/plate_datas/');
      setShowHideA(true)
      setHideImage(true)
    } else {
      console.error("No se pudo encontrar la imagen para eliminar");
    }
  };
  



  const valuesCheckListFunrtions = {

    serviceReport, setServiceReport,
    handleServiceReport, handleServiceReportClose,

    handleSubmit, register, reset, Submit,

    newServiceReport, handleDeleteServiceReport,

    //CARGA DE IMAGENES

    showHideA, showHideX, hideImage, btnDeleteImage, setImagesEdit, clearImage, handleX, showImg, handleImage, handleDeleteImage, fileInputRef, selectedImages, handleRemoveImage, handleDeleteAllImages



  }

  return (
    <ServiceReportContext.Provider value={valuesCheckListFunrtions} >
      {children}
    </ServiceReportContext.Provider>
  )
}