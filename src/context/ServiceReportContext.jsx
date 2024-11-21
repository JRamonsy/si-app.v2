import { createContext, useState, useEffect} from "react";
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

  const [serviceEdit, setServiceEdit] = useState()
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    getService('/report_datas/')
  }, [])

  // console.log(service)

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
          handleRefresh()
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu Reporte de Servicio ha sido eliminado.",
            icon: "success"
          });
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

  const Submit = async ( data) => {

    if (serviceEdit && serviceEdit.id) {  
      await updateService('/report_datas/', serviceEdit.id, data);
      handleServiceReportClose();
      console.log("Service Report actualizado con éxito.");
      getInfos('/plate_datas/')
      handleRefresh()
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
        title: "Reporte de servicio editado"
      });
    } else {
      if (selectedService.serviceReport === null) {
      const newServiceReport = {
          ...data,
          plateId: selectedService.id,
      };
      await createService('/report_datas/', newServiceReport, data);
      handleServiceReportClose();
      resetForm();
      getInfos('/plate_datas/')
      console.log('Se ha creado un nuevo Reporte de Servicio')
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

  }
  



  const valuesCheckListFunrtions = {

    serviceReport, setServiceReport,
    handleServiceReport, handleServiceReportClose,

    handleSubmit, register, reset, Submit,

    newServiceReport, handleDeleteServiceReport

  }

  return (
    <ServiceReportContext.Provider value={valuesCheckListFunrtions} >
      {children}
    </ServiceReportContext.Provider>
  )
}