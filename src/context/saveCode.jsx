
import { createContext, useState, useEffect,  useRef } from "react";
import useCrud from "../hooks/useCrud";
import { PlateDataContext } from './PlateDataContext';
import { useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { HandleFuntionsContext } from "./HandleFunctionsContext";
import Swal from 'sweetalert2'
import { ImgDataContext } from "./ImgDataContext";

export const ServiceReportContext = createContext(false);

export function ServiceReportProvider({ children }) {

  const { BASE_URL, infos, getInfos, handleRefresh } = useContext(PlateDataContext) 
  const { setSelectedInfo } = useContext(HandleFuntionsContext)

  const methods = useForm(); // Crear instancia de useForm
  const { reset, register, handleSubmit} = methods;


  const [service, getService, createService, deleteService, updateService] = useCrud(BASE_URL)
  const [imagesEvidenceI, getImagesEvidenceI, createImagesEvidenceI, deleteImagesEvidenceI] = useCrud(BASE_URL)


  const [serviceEdit, setServiceEdit] = useState()
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    getService('/report_datas/')
  }, [])

  // console.log(service)

  //Abre ServiceReport
  const [serviceReport, setServiceReport] = useState(true)
  const [ServiceReportId, setServiceReportId] = useState() // id del servicio de reporte
  const [] = useState() // id de la imagen
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
      setServiceReportId(foundData.serviceReport.id)
    } else {
      console.warn('No se encontró el registro con ese ID');
    }
  }

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

   const [descriptionEdit, setDescriptionEdit] = useState()

   const Submit = async (data) => {
    let newServiceReport = {};
  
    // Crear o actualizar el reporte de servicio
    if (serviceEdit && serviceEdit.id) {
      await updateService('/report_datas/', serviceEdit.id, data);
      newServiceReport = serviceEdit;
      handleServiceReportClose()
      // handleRefresh()
      getInfos('/plate_datas/')
    } else {
      if(descriptionEdit && descriptionEdit.id) {
        await createImagesEvidenceI('/img_datas_evidence_i/', descriptionEdit.id, data)      

      }
      // if (selectedService.serviceReport === null) {
      //   newServiceReport = {
      //     ...data,
      //     plateId: selectedService.id,
      //   };
      //   const createdReport = await createService('/report_datas/', newServiceReport);
      //   newServiceReport = createdReport;
      //   handleServiceReportClose()
      //   resetForm();
      //   getInfos('/plate_datas/')
      //   const Toast = Swal.mixin({
      //     toast: true,
      //     position: "top",
      //     showConfirmButton: false,
      //     timer: 2000,
      //     timerProgressBar: true,
      //     didOpen: (toast) => {
      //       toast.onmouseenter = Swal.stopTimer;
      //       toast.onmouseleave = Swal.resumeTimer;
      //     }
      //   });
      //   Toast.fire({
      //     icon: "success",
      //     title: "Nuevo Reporte de servicio Creado"
      //   });
      // }
    }

  };
  
  const valuesCheckListFunrtions = {

    serviceReport, setServiceReport,
    handleServiceReport, handleServiceReportClose,

    // handleSubmit,
    //  register,
      // reset,
      // Submit,

    newServiceReport, handleDeleteServiceReport,
    createService,

    ServiceReportId,

    // methods,
     register,
      handleSubmit,

     Submit,

     setDescriptionEdit,

  }

  return (
    <ServiceReportContext.Provider value={valuesCheckListFunrtions} >
      {children}
    </ServiceReportContext.Provider>
  )
}