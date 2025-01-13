import { createContext, useState, useEffect} from "react";
import useCrud from "../hooks/useCrud";
import { PlateDataContext } from './PlateDataContext';
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { HandleFuntionsContext } from "./HandleFunctionsContext";
import Swal from 'sweetalert2'

export const CheckListContext = createContext(false);

export function CheckListProvider({ children }) {

  const { BASE_URL, infos, getInfos, handleRefresh } = useContext(PlateDataContext) 
  const { selectedInfo, setSelectedInfo } = useContext(HandleFuntionsContext)

  const {handleSubmit, register, reset} = useForm()

  const [checks, getCheck, createCheck, deleteCheck, updateCheck] = useCrud(BASE_URL)
  
  const [checksEdit, setChecksEdit] = useState()
  const [selectedCheck, setSelectedCheck] = useState(null)
  const [btnDeleteCheck, setBtnDeleteCheck] = useState(true)

  useEffect(() => {
    getCheck('/checklist_datas/')
  }, [])

  // console.log(checks)

  //Abre CheckList
  const [checkList, setCheckList] = useState(true)
  const handleCheckListOpen = (info) => {
    if (!infos) {
      console.warn('No se han cargado los datos aún.');
      return;
    }
    const foundData = infos.find(item => item.id === info.id);
    if (foundData) {
      setSelectedInfo(foundData);
      // console.log("Información encontrada del registro:", foundData);
      // console.log('Información encontrada del checklist', foundData.checkList)
      setCheckList(false)
      setChecksEdit(foundData.checkList) 
      resetForm()
      // console.log(`Editando checkList con ID: ${foundData.checkList.id}`);
    } else {
      console.warn('No se encontró el registro con ese ID');
    }
  }

  const newCheckList = (info) => {
    if (info){
      setCheckList(false)
      const nchecks = infos.find(item => item.id === info.id)
      setSelectedCheck(nchecks)
      console.log('Abriendo nuevo checklist, asociado al id:', nchecks.id);
      console.log('Aqui esta la informacion del id:', nchecks.id, 'y su contenido es:', nchecks);
    }else {

    }
  }

  // Salir del check list
  const handleCloseCheckList = () => {
    setCheckList(true)
    resetForm()
  } 

  const Submit = async ( data) => {
    if (checksEdit && checksEdit.id) {    
      await updateCheck('/checklist_datas/', checksEdit.id, data);
      handleCloseCheckList();
      // console.log("Checklist actualizado con éxito.");
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
        title: "CheckList Actualizado"
      });
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
      // console.log('Se ha creado un nuevo CheckList')
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
        title: "Nuevo CheckList Creado"
      });

      }
    }
  }

  const [actBtnDelete, setActBtnDelete] = useState(false)


const handleDeleteCheckList = async () => {
  if (checksEdit.id) {
    Swal.fire({
      title: "¿Estás seguro de eliminar este Check List?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Checklist BORRADO con ID:", checksEdit.id);
        await deleteCheck("/checklist_datas/", checksEdit.id);
        setActBtnDelete(true);
        resetForm();
        handleCloseCheckList();
        getInfos('/plate_datas/')
        handleRefresh()
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu checklist ha sido eliminado.",
          icon: "success"
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelado",
          text: "Tu checklist está a salvo :)",
          icon: "error"
        });
      }
    });
  } else {
    console.error("Error: No hay checklist seleccionado para eliminar.");
  }
};




//   const handleDeleteCheckList = async () => {
//     if (checksEdit.id) {
//         console.log("Checklist BORRADO con ID:", checksEdit.id);
//         await deleteCheck("/checklist_datas/", checksEdit.id);
//         setActBtnDelete(true);
//         resetForm();
//         handleCloseCheckList();
//     } else {
//         console.error("Error: No hay checklist seleccionado para eliminar.");
//     }
// };


  const resetForm = () => {
    reset({
      technicianNameExitStep: '',
      technicianNamevisualInspection: '',
      technicianNamePhotographicEvidence: '',
      technicianNameRequiredParts: '',
      t_platePhoto: '',
      technicianNameRequiredMaterials: '',
      technicianNameEvidenceProcess: '',
      technicianNameEvidenceTerm: '',
      technicianNameSulzerReport: '',
      t_finalInspection: '',
      technicianNameRemission: '',
      technicianNameGuide: '',
      advanceExitStep: 'false"',
      advanceVisualInspection: 'false',
      advancePhotographicEvidence: 'false',
      advanceRequiredParts: 'false',
      advanceRequiredMaterials: 'false',
      advanceEvidenceProcess: 'false',
      advanceEvidenceTerm: 'false',
      advanceSulzerReport: 'false',
      a_finalInspection: 'false',
      advanceRemission: 'false',
      advanceGuide: 'false',
      comments: '',
      requiredMaterials: ''
    });
  }

  useEffect(() => {
  if (checksEdit) {
    reset({
      ...checksEdit,
      advanceExitStep: checksEdit.advanceExitStep ? "true" : "false",
      advanceVisualInspection: checksEdit.advanceVisualInspection ? "true" : "false",
      advancePhotographicEvidence: checksEdit.advancePhotographicEvidence ? "true" : "false",
      advanceRequiredParts: checksEdit.advanceRequiredParts ? "true" : "false",
      advanceRequiredMaterials: checksEdit.advanceRequiredMaterials ? "true" : "false",
      advanceEvidenceProcess: checksEdit.advanceEvidenceProcess ? "true" : "false",
      advanceEvidenceTerm: checksEdit.advanceEvidenceTerm ? "true" : "false",
      advanceSulzerReport: checksEdit.advanceSulzerReport ? "true" : "false",
      a_finalInspection: checksEdit.a_finalInspection ? "true" : "false",
      advanceRemission: checksEdit.advanceRemission ? "true" : "false",
      advanceGuide: checksEdit.advanceGuide ? "true" : "false",
    });
  }
}, [checksEdit, reset]);

  // useEffect(() => {
  //   reset(checksEdit)
  //  }, [checksEdit])

  //  useEffect(() => {
  //   if (!selectedInfo?.checkList) {
  //     console.log('no existe un checklist aun')
  //   } else {
  //     setBtnDeleteCheck(false)
  //   }
  //  }, [checksEdit]);

  const valuesCheckListFunrtions = {


    handleSubmit,
    Submit,
    register,
    reset,

    checkList,
    handleCheckListOpen,
    newCheckList,
    handleCloseCheckList,
    Submit,
    handleDeleteCheckList,
    btnDeleteCheck,

    checks, 
    getCheck, 
    createCheck, 
    deleteCheck, 
    updateCheck, 
    checksEdit, 
    setChecksEdit,

    actBtnDelete
  }

  return (
    <CheckListContext.Provider value={valuesCheckListFunrtions} >
      {children}
    </CheckListContext.Provider>
  )
}