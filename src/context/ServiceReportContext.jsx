import { createContext, useState, useEffect, useRef } from "react";
import useCrud from "../hooks/useCrud";
import { PlateDataContext } from './PlateDataContext';
import { useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { HandleFuntionsContext } from "./HandleFunctionsContext";
import Swal from 'sweetalert2'

export const ServiceReportContext = createContext(false);

export function ServiceReportProvider({ children }) {

  const { BASE_URL, infos, getInfos, handleRefresh } = useContext(PlateDataContext) 
  const { setSelectedInfo } = useContext(HandleFuntionsContext)

  const methods = useForm(); // Crear instancia de useForm
  const { reset, register, handleSubmit, setValue } = methods;

  const [service, getService, createService, deleteService, updateService] = useCrud(BASE_URL);
  const [descInitial, getDescInitial, createDescInitial, deleteDescInitial, updateDescInitial] = useCrud(BASE_URL)

  const [serviceEdit, setServiceEdit] = useState();
  const [descriptionEdit, setDescriptionEdit] = useState();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    getService('/report_datas/');
  }, []);

    useEffect(() => {
    getDescInitial('/evidence_initial/')
  }, [])

  // console.log(service)
  // console.log(descInitial)

  const [serviceReport, setServiceReport] = useState(true);
  const [ServiceReportId, setServiceReportId] = useState();
  // Abre service Report
  const handleServiceReport = (info) => {
    if (!infos) {
      console.warn('No se han cargado los datos aún.');
      return;
    }
    const foundData = infos.find(item => item.id === info.id);
    if (foundData) {
      console.log('información encontrada del id', foundData.id)
      console.log('información encontrada', foundData)
      setSelectedInfo(foundData);
      setServiceReport(false);
      setServiceEdit(foundData.serviceReport);
      resetForm();
      setServiceReportId(foundData.serviceReport.id);
    } else {
      console.warn('No se encontró el registro con ese ID');
    }
  };

  const handleDeleteServiceReport = async () => {
    if (serviceEdit && serviceEdit.id) {
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
          await deleteService('/report_datas/', serviceEdit.id);
          resetForm();
          handleServiceReportClose();
          getInfos('/plate_datas/');
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu Reporte de Servicio ha sido eliminado.",
            icon: "success"
          });
          handleRefresh();
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
    if (info) {
      setServiceReport(false);
      const newService = infos.find(item => item.id === info.id);
      setSelectedService(newService);
    }
  };

  const handleServiceReportClose = () => {
    setServiceReport(true);
  };

  const resetForm = () => {
    reset({
      problemDescription: '',
      observations: '',
      requirementForRepair: '',
      serviceCompleted: '' 
    });
  };

  useEffect(() => {
    if (serviceEdit) {
      setValue('problemDescription', serviceEdit.problemDescription);
      setValue('observations', serviceEdit.observations);
      setValue('requirementForRepair', serviceEdit.requirementForRepair);
      setValue('serviceCompleted', serviceEdit.serviceCompleted);
    }
  }, [serviceEdit, setValue]);

  const handleDescriptionChange = (imgId, value) => {
    setValue(`description_${imgId}`, value); // Actualiza el valor en el formulario
    setDescriptionEdit({ id: imgId, description: value }); // Guarda el cambio en el estado/contexto
  };
  

  const Submit = async (data) => {
    console.log(data)
    let newServiceReport = {};
  
    // Crear o actualizar el reporte de servicio
    if (serviceEdit && serviceEdit.id) {
      await updateService('/report_datas/', serviceEdit.id, data);
      newServiceReport = serviceEdit;
      handleServiceReportClose();
      getInfos('/plate_datas/');
    } else {
      console.error("Error: No hay información para elditar.");
    }
  };

  const valuesCheckListFunrtions = {
    serviceReport, setServiceReport,
    handleServiceReport, handleServiceReportClose,
    newServiceReport, handleDeleteServiceReport,
    createService,
    ServiceReportId,
    register,
    handleSubmit,
    Submit,
    setDescriptionEdit,
    methods,
    handleDescriptionChange
  };

  return (
    <ServiceReportContext.Provider value={valuesCheckListFunrtions} >
      {children}
    </ServiceReportContext.Provider>
  );
}
