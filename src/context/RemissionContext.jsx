import { createContext, useState, useEffect} from "react";
import useCrud from "../hooks/useCrud";
import { PlateDataContext } from './PlateDataContext';
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { HandleFuntionsContext } from "./HandleFunctionsContext";
import Swal from 'sweetalert2'

export const RemissionContext = createContext(false);

export function RemissionProvider({ children }) {

  const { BASE_URL, infos, getInfos, handleRefresh } = useContext(PlateDataContext) 
  const { setSelectedInfo } = useContext(HandleFuntionsContext)

  const {handleSubmit, register, reset} = useForm()

  const [remission, getRemission, createRemission, deleteRemission, updateRemission] = useCrud(BASE_URL)

  const [remissionEdit, setRemissionEdit] = useState()
  const [selectedRemission, setSelectedRemission] = useState(null)

  useEffect(() => {
    getRemission('/remission_datas/')
  }, [])

  // console.log(remission)

  //Abre Remision
  const [openRemission, setOpenRemission] = useState(true)
  const handleRemission = (info) => {
    if (!infos) {
      console.warn('No se han cargado los datos aún.');
      return;
    }
    const foundData = infos.find(item => item.id === info.id);
    if (foundData) {
      setSelectedInfo(foundData);
      console.log("Información encontrada del registro:", foundData);
      console.log('Información encontrada de remision', foundData.Remission)
      setOpenRemission(false);
      setRemissionEdit(foundData.Remission)
      resetForm()
      console.log(`Editando remission con ID: ${foundData.Remission.id}`);
    } else {
      console.warn('No se encontró el registro con ese ID');
    }
  }

  const [actBtnDelete, setActBtnDelete] = useState(false)

  const handleDeleteRemission = async () => {
    if (remissionEdit.id) {
      Swal.fire({
        title: "¿Estás seguro de eliminar esta Remisión?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, ¡elimínala"
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log("Remision BORRADA con ID:", remissionEdit.id);
          await deleteRemission('/remission_datas/', remissionEdit.id);
          // setActBtnDelete(true);
          resetForm();
          handleRemissionClose();
          getInfos('/plate_datas/')
          handleRefresh()
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu remisión ha sido eliminada.",
            icon: "success"
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelado",
            text: "Tu Remisión está a salvo :)",
            icon: "error"
          });
        }
      });
    } else {
      console.error("Error: No hay checklist seleccionado para eliminar.");
    }
  };

  // const handleDeleteRemission = async () => {
  //   if (remissionEdit.id) {
  //       console.log("Remision BORRADA con ID:", remissionEdit.id);
  //       await deleteRemission('/remission_datas/', remissionEdit.id);
  //       // setActBtnDelete(true);
  //       resetForm();
  //       handleRemissionClose();
  //   } else {
  //       console.error("Error: No hay Service Report seleccionado para eliminar.");
  //   }
  // };

  const newRemission = (info) => {
    if (info){
      setOpenRemission(false)
      const newRemission = infos.find(item => item.id === info.id)
      setSelectedRemission(newRemission)
      console.log('Abriendo nueva Remision, asociado al id:', newRemission.id);
      console.log('Aqui esta la informacion del id:', newRemission.id, 'y su contenido es:', newRemission);
    }else {

    }
  }
  // Cierra remmision
  const handleRemissionClose = () => {
    setOpenRemission(true)
  }

  const resetForm = () => {
    reset({
      email: '',
      referenceAgent: '',
      phone: '',
      remissionDate: '',
      receivedDate: '',
      whoReceive: '',
      quantity: '',
      unit: '',
      deliveryDate: '',
      unit: '',
      price: '',
      totalPrice: '',
      subtotal: '',
      vat: '',
      total: '',
    });
  }

  useEffect(() => {
    reset(remissionEdit)
   }, [remissionEdit])

  const Submit = async ( data) => {

    if (!data.remissionDate) {
      data.remissionDate = null;
    }
    
    if (!data.receivedDate) {
      data.receivedDate = null;
    }

    if (remissionEdit && remissionEdit.id) {  
      await updateRemission('/remission_datas/', remissionEdit.id, data);
      handleRemissionClose();
      console.log("Remision actualizada con éxito.");
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
        title: "Remisión editada"
      });
    } else {
      if (selectedRemission.Remission === null) {
      const newRemission = {
          ...data,
          plateId: selectedRemission.id,
      };
      await createRemission('/remission_datas/', newRemission, data);
      handleRemissionClose();
      resetForm();
      getInfos('/plate_datas/')
      console.log('Se ha creado una nueva Remision')
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
        title: "Nueva remisión creada"
      });

      }
    }

  }
  



  const valuesRemissionFunrtions = {

    handleRemission, openRemission, handleRemissionClose, newRemission,
    handleDeleteRemission, createRemission,



    handleSubmit, register, Submit,



  }

  return (
    <RemissionContext.Provider value={valuesRemissionFunrtions} >
      {children}
    </RemissionContext.Provider>
  )
}