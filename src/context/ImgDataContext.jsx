import { createContext, useState, useContext, useEffect, useRef} from "react";
import { PlateDataContext } from './PlateDataContext';
import useCrud from "../hooks/useCrud";
import { ServiceReportContext } from "./ServiceReportContext";
import { ImgDescriptionContext } from "./ImgDescriptionContext";

export const ImgDataContext = createContext(false);
export function ImgDataProvider({ children }) {

	const { BASE_URL, getInfos } = useContext(PlateDataContext) 
  const { ServiceReportId } = useContext(ServiceReportContext)
  // const {createDescInitial} = useContext(ImgDescriptionContext)
  // console.log(typeof createDescInitial); // Debe imprimir "function"


	const [images, getImages, createImages, deleteImages] = useCrud(BASE_URL)
	const [imagesDiagnosis, getImagesDiagnosis, createImagesDiagnosis, deleteImagesDiagnosis] = useCrud(BASE_URL)
  const [imagesObservations, getImagesObservations, createImagesObservations, deleteImagesObservations] = useCrud(BASE_URL)
	const [imagesEvidenceI, getImagesEvidenceI, createImagesEvidenceI, deleteImagesEvidenceI] = useCrud(BASE_URL)
	const [imagesEvidenceF, getImagesEvidenceF, createImagesEvidenceF, deleteImagesEvidenceF] = useCrud(BASE_URL)

  const [descInitial, getDescInitial, createDescInitial, deleteDescInitial, updateDescInitial] = useCrud(BASE_URL)



	useEffect(() => {
		getImages('/images_datas/'),
    getImagesDiagnosis('/img_datas_diagnosis/'),
    getImagesObservations('/img_datas_observations/')
    getImagesEvidenceI('/img_datas_evidence_i/'),
    getImagesEvidenceF('/img_datas_evidence_f/')
	  }, [])

  // console.log(images) 
	// console.log(imagesDiagnosis)
  // console.log(imagesObservations)
  // console.log(imagesEvidenceI)
  // console.log(imagesEvidenceF)

  //USESTATE 
  {/* Estados para el manejo de img*/}
  const [img, setImg] = useState(true) // muestra u oculta el div de la img
  const [imgFile, setImgFile] = useState([]); // se guardan las imagenes
  const [loading, setLoading] = useState(false); // Estado para animación de carga
  const inputImgRef = useRef(null); // Referencia para el input de archivo

  {/* Estados para el manejo de imgDiagnosis*/}
  const [imgDiagnosis, setImgDiagnosis] = useState(true) // muestra u oculta el div de la img
  const [imgFileDiagnosis, setImgFileDiagnosis] = useState([]); // se guardan las imagenes
  const [loadingDiagnosis, setLoadingDiagnosis] = useState(false); // Estado para animación de carga
  const inputImgRefDiagnosis = useRef(null); // Referencia para el input de archivo

  {/* Estados para el manejo de imgObservations*/}
  const [imgObservations, setImgObservations] = useState(true) // muestra u oculta el div de la img
  const [imgFileObservations, setImgFileObservations] = useState([]); // se guardan las imagenes
  const [loadingObservations, setLoadingObservations] = useState(false); // Estado para animación de carga
  const inputImgRefObservations = useRef(null); // Referencia para el input de archivo

  {/* Estados para el manejo de imgEvidenceI*/}
  const [imgEvidenceI, setImgEvidenceI] = useState(true) // muestra u oculta el div de la img
  const [imgFileEvidenceI, setImgFileEvidenceI] = useState([]); // se guardan las imagenes
  const [loadingEvidenceI, setLoadingEvidenceI] = useState(false); // Estado para animación de carga
  const inputImgRefEvidenceI = useRef(null); // Referencia para el input de archivo

  {/* Estados para el manejo de imgEvidenceF*/}
  const [imgEvidenceF, setImgEvidenceF] = useState(true) // muestra u oculta el div de la img
  const [imgFileEvidenceF, setImgFileEvidenceF] = useState([]); // se guardan las imagenes
  const [loadingEvidenceF, setLoadingEvidenceF] = useState(false); // Estado para animación de carga
  const inputImgRefEvidenceF = useRef(null); // Referencia para el input de archivo

  //fUNCIONES GUARDAR IMGS
  {/* Funciones guardar img */}
  const [btnSaveImg, setBtnSaveImg] = useState(true)
  const saveImg = async (e) => {
    e.preventDefault()
    // si hay una imagen en imgFile
    if(imgFile){
      // Se crea
      setBtnClearImg(false)
      setLoading(true); // Inicia la animación de carga
      const formData = new FormData();
      formData.append('images', imgFile);
      formData.append('service_report_id', ServiceReportId);
      await createImages('/images_datas/', formData);
      console.log('imagen creada y asociada al servicio de reporte con id:', ServiceReportId)
      getInfos('/plate_datas/')
      setLoading(false); // Detiene la animación de carga
      imgReset()
    } else {
      alert('Favor de seleccionar una imagen')
      console.log("No se subió ninguna imagen para el nuevo registro.");
    }
  }

  {/* Funciones guardar imgDiagnosis */}
  const [btnSaveImgDiagnosis, setBtnSaveImgDiagnosis] = useState(true)
  const saveImgDiagnosis = async (e) => {
    e.preventDefault()
    // si hay una imagen en imgFile
    if(imgFileDiagnosis){
      // Se crea
      setBtnClearImgDiagnosis(false)
      setLoadingDiagnosis(true); // Inicia la animación de carga
      const formData = new FormData();
      formData.append('images_diagnosis', imgFileDiagnosis);
      formData.append('service_report_id', ServiceReportId);
      await createImagesDiagnosis('/img_datas_diagnosis/', formData);
      console.log('imagen creada y asociada al servicio de reporte con id:', ServiceReportId)
      getInfos('/plate_datas/')
      setLoadingDiagnosis(false); // Detiene la animación de carga
      imgResetDiagnosis()
    } else {
      alert('Favor de seleccionar una imagen')
      console.log("No se subió ninguna imagen para el nuevo registro.");
    }
  }

  {/* Funciones guardar imgObservations */}
  const [btnSaveImgObservations, setBtnSaveImgObservations] = useState(true)
  const saveImgObservations = async (e) => {
    e.preventDefault()
    // si hay una imagen en imgFile
    if(imgFileObservations){
      // Se crea
      setBtnClearImgObservations(false)
      setLoadingObservations(true); // Inicia la animación de carga
      const formData = new FormData();
      formData.append('images_observations', imgFileObservations);
      formData.append('service_report_id', ServiceReportId);
      await createImagesObservations('/img_datas_observations/', formData);
      console.log('imagen creada y asociada al servicio de reporte con id:', ServiceReportId)
      getInfos('/plate_datas/')
      setLoadingObservations(false); // Detiene la animación de carga
      imgResetObservations()
    } else {
      alert('Favor de seleccionar una imagen')
      console.log("No se subió ninguna imagen para el nuevo registro.");
    }
  }

  {/* Funciones guardar imgEvidenceI */}
  const [btnSaveImgEvidenceI, setBtnSaveImgEvidenceI] = useState(true)
  const [descInitisal, setDescInitisal] = useState("")

   // Manejar cambios en el textarea
   const handleTextareaChange = (e) => {
    setDescInitisal(e.target.value);
    
  };

  const saveImgEvidenceI = async (e) => {
    e.preventDefault();

    if (imgFileEvidenceI) {
        try {
            setBtnClearImgEvidenceI(false);
            setLoadingEvidenceI(true); // Inicia la animación de carga

            // Crear un FormData para enviar la imagen
            const formData = new FormData();
            formData.append("images_evidence_i", imgFileEvidenceI);
            formData.append("service_report_id", ServiceReportId);

            // Enviar la solicitud para crear la imagen
            const response = await createImagesEvidenceI("/img_datas_evidence_i/", formData);

            // Capturar el ID desde la respuesta
            const imgId = response.id; // Asume que la respuesta contiene 'id'

            // Crear la descripción independientemente del valor de descInitisal
            const newDescription = {
                imgDescriptionEvidenceI: descInitisal || "Descripción", // Usa un valor predeterminado si descInitisal está vacío
                imgEvidenceIId: imgId,
            };

            // Enviar la solicitud para crear la descripción
            await createDescInitial("/evidence_initial/", newDescription);
            console.log("Descripción creada con éxito:", newDescription);

            console.log("Imagen creada y asociada al servicio de reporte con id:", ServiceReportId);
            console.log("ID de la imagen creada:", imgId);
            getInfos('/plate_datas/')

            // Detener la animación de carga y resetear
            setLoadingEvidenceI(false);
            imgResetEvidenceI();
        } catch (error) {
            console.error("Error al crear la imagen o la descripción:", error);
            alert("Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo.");
            setLoadingEvidenceI(false);
        }
      } else {
          alert("Favor de seleccionar una imagen");
          console.log("No se subió ninguna imagen para el nuevo registro.");
      }
  };


  {/* Funciones guardar imgEvidenceF */}
  const [btnSaveImgEvidenceF, setBtnSaveImgEvidenceF] = useState(true)
  const saveImgEvidenceF = async (e) => {
    e.preventDefault()
    // si hay una imagen en imgFile
    if(imgFileEvidenceF){
      // Se crea
      setBtnClearImgEvidenceF(false)
      setLoadingEvidenceF(true); // Inicia la animación de carga
      const formData = new FormData();
      formData.append('images_evidence_f', imgFileEvidenceF);
      formData.append('service_report_id', ServiceReportId);
      await createImagesEvidenceF('/img_datas_evidence_f/', formData);
      console.log('imagen creada y asociada al servicio de reporte con id:', ServiceReportId)
      getInfos('/plate_datas/')
      setLoadingEvidenceF(false); // Detiene la animación de carga
      imgResetEvidenceF()
    } else {
      alert('Favor de seleccionar una imagen')
      console.log("No se subió ninguna imagen para el nuevo registro.");
    }
  }

//FUNCIONES ELIMINAR IMAGENES
  
  {/* Funciones eliminar img */}
  const deleteImg = async (imageId, e) => {
    e.preventDefault()
    try {
      if (window.confirm("¿Está seguro de eliminar la imagen?")) {
        // Eliminar imagen de la base de datos
        await deleteImages('/images_datas/', imageId);
        getInfos('/plate_datas/')
        console.log('imagen eliminada con id', imageId)       
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  }

  {/* Funciones eliminar imgDiagnosis */}
  const deleteImgDiagnosis = async (imageId, e) => {
    e.preventDefault()
    try {
      if (window.confirm("¿Está seguro de eliminar la imagen?")) {
        // Eliminar imagen de la base de datos
        await deleteImagesDiagnosis('/img_datas_diagnosis/', imageId);
        getInfos('/plate_datas/')
        console.log('imagen eliminada con id', imageId)       
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  }

  {/* Funciones eliminar imgObservations */}
  const deleteImgObservations = async (imageId, e) => {
    e.preventDefault()
    try {
      if (window.confirm("¿Está seguro de eliminar la imagen?")) {
        // Eliminar imagen de la base de datos
        await deleteImagesObservations('/img_datas_observations/', imageId);
        getInfos('/plate_datas/')
        console.log('imagen eliminada con id', imageId)       
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  }

  {/* Funciones eliminar imgEvidenceI */}
  const deleteImgEvidenceI = async (imageId, e) => {
    e.preventDefault()
    try {
      if (window.confirm("¿Está seguro de eliminar la imagen?")) {
        // Eliminar imagen de la base de datos
        await deleteImagesEvidenceI('/img_datas_evidence_i/', imageId);
        getInfos('/plate_datas/')
        console.log('imagen eliminada con id', imageId)       
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  }

    {/* Funciones eliminar imgEvidenceF */}
    const deleteImgEvidenceF = async (imageId, e) => {
      e.preventDefault()
      try {
        if (window.confirm("¿Está seguro de eliminar la imagen?")) {
          // Eliminar imagen de la base de datos
          await deleteImagesEvidenceF('/img_datas_evidence_f/', imageId);
          getInfos('/plate_datas/')
          console.log('imagen eliminada con id', imageId)       
        }
      } catch (error) {
        console.error("Error al eliminar la imagen:", error);
      }
    }

  //FUNCIONES LIMPIAR IMGS
  {/* Funciones limpiar img */}
  const [btnClearImg, setBtnClearImg] = useState(true)
  const clearImg = (e) => {
    e.preventDefault()
    imgReset()
  }

  {/* Funciones limpiar imgDiagnosis */}
  const [btnClearImgDiagnosis, setBtnClearImgDiagnosis] = useState(true)
  const clearImgDiagnosis = (e) => {
    e.preventDefault()
    imgResetDiagnosis()
  }

  {/* Funciones limpiar imgObservations */}
  const [btnClearImgObservations, setBtnClearImgObservations] = useState(true)
  const clearImgObservations = (e) => {
    e.preventDefault()
    imgResetObservations()
  }

  {/* Funciones limpiar imgEvidenceI */}
  const [btnClearImgEvidenceI, setBtnClearImgEvidenceI] = useState(true)
  const clearImgEvidenceI = (e) => {
    e.preventDefault()
    imgResetEvidenceI()
  }

  {/* Funciones limpiar imgEvidenceF */}
  const [btnClearImgEvidenceF, setBtnClearImgEvidenceF] = useState(true)
  const clearImgEvidenceF = (e) => {
    e.preventDefault()
    imgResetEvidenceF()
  }

  //FUNCIONES CARGAR IMGS
  
  // MUESTRA LA IMAGEN SELECCIOANDA INPUT FILE o HANDLEIMAGE
  const chargeImg = () => { 
  if (imgFile instanceof File) {
        return URL.createObjectURL(imgFile);
    }
  };

  // MUESTRA LA IMAGEN SELECCIOANDA INPUT FILE o HANDLEIMAGE Diagnosis
  const chargeImgDiagnosis = () => { 
    if (imgFileDiagnosis instanceof File) {
        return URL.createObjectURL(imgFileDiagnosis);
    }
  };

  // MUESTRA LA IMAGEN SELECCIOANDA INPUT FILE o HANDLEIMAGE DObservations
  const chargeImgObservations = () => { 
    if (imgFileObservations instanceof File) {
        return URL.createObjectURL(imgFileObservations);
    }
  };

  const chargeImgEvidenceI = () => { 
    if (imgFileEvidenceI instanceof File) {
          return URL.createObjectURL(imgFileEvidenceI);
      }
  };

  const chargeImgEvidenceF = () => { 
    if (imgFileEvidenceF instanceof File) {
          return URL.createObjectURL(imgFileEvidenceF);
      }
  };

  //FUNCIONES INPUTS IMG
  const [inputL, setInputL] = useState(false)
  const inputImg = (e) => { //SELECCIONADOR DE LA IMAGEN 
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImgFile(file)
      setInputL(true)
      setImg(false)
      setBtnClearImg(true)
      setBtnSaveImg(false)
      console.log(e.target.files[0])
    } 
  };

  const [inputLDiagnosis, setInputLDiagnosis] = useState(false)
  const inputImgDiagnosis = (e) => { //SELECCIONADOR DE LA IMAGEN Diagnosis 
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImgFileDiagnosis(file)
      setInputLDiagnosis(true)
      setImgDiagnosis(false)
      setBtnClearImgDiagnosis(true)
      setBtnSaveImgDiagnosis(false)
      console.log(e.target.files[0])
    } 
  };

  const [inputLObservations, setInputLObservations] = useState(false)
  const inputImgObservations = (e) => { //SELECCIONADOR DE LA IMAGEN Diagnosis 
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImgFileObservations(file)
      setInputLObservations(true)
      setImgObservations(false)
      setBtnClearImgObservations(true)
      setBtnSaveImgObservations(false)
      console.log(e.target.files[0])
    } 
  };

  const [inputLEvidenceI, setInputLEvidenceI] = useState(false)
  const inputImgEvidenceI = (e) => { //SELECCIONADOR DE LA IMAGEN 
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImgFileEvidenceI(file)
      setInputLEvidenceI(true)
      setImgEvidenceI(false)
      setBtnClearImgEvidenceI(true)
      setBtnSaveImgEvidenceI(false)
      console.log(e.target.files[0])
    } 
  };

  const [inputLEvidenceF, setInputLEvidenceF] = useState(false)
  const inputImgEvidenceF = (e) => { //SELECCIONADOR DE LA IMAGEN 
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImgFileEvidenceF(file)
      setInputLEvidenceF(true)
      setImgEvidenceF(false)
      setBtnClearImgEvidenceF(true)
      setBtnSaveImgEvidenceF(false)
      console.log(e.target.files[0])
    } 
  };

  //RESETS
  const imgReset = () => {
    setImgFile(null)
    setBtnSaveImg(true)
    setImg(true)
    setInputL(false)
    inputImgRef.current.value = null; // Limpiar input file
  }

  const imgResetDiagnosis = () => {
    setImgFileDiagnosis(null)
    setBtnSaveImgDiagnosis(true)
    setImgDiagnosis(true)
    setInputLDiagnosis(false)
    inputImgRef.current.value = null; // Limpiar input file
  }

  const imgResetObservations = () => {
    setImgFileObservations(null)
    setBtnSaveImgObservations(true)
    setImgObservations(true)
    setInputLObservations(false)
    inputImgRef.current.value = null; // Limpiar input file
  }

  const imgResetEvidenceI = () => {
    setImgFileEvidenceI(null)
    setBtnSaveImgEvidenceI(true)
    setImgEvidenceI(true)
    setInputLEvidenceI(false)
    inputImgRef.current.value = null; // Limpiar input file
  }

  const imgResetEvidenceF = () => {
    setImgFileEvidenceF(null)
    setBtnSaveImgEvidenceF(true)
    setImgEvidenceF(true)
    setInputLEvidenceF(false)
    inputImgRef.current.value = null; // Limpiar input file
  }

  

  const postDescInit = (e) => {
    e.preventDefault()
    console.log(descInitisal)
    if(descInitisal) {
      const imgId = 11
      const newDescription = {
        imgDescriptionEvidenceI: descInitisal,
        imgEvidenceIId: imgId,
      }
      createDescInitial('/evidence_initial/', newDescription)
      console.log('info guardada', newDescription)
    } else {
      console.log('debe ingresar información')
    }
  

  }

  const valuesImgDataFunrtions = {
    ServiceReportId,

    inputL, 
    img,
    inputImg,
    btnClearImg,
    clearImg,
    loading,
    chargeImg,
    saveImg,
    btnSaveImg,
    deleteImg,
    inputImgRef,
    images,

    inputLDiagnosis, 
    imgDiagnosis,
    inputImgDiagnosis,
    btnClearImgDiagnosis,
    clearImgDiagnosis,
    loadingDiagnosis,
    chargeImgDiagnosis,
    saveImgDiagnosis,
    btnSaveImgDiagnosis,
    deleteImgDiagnosis,
    inputImgRefDiagnosis,
    imagesDiagnosis,

    inputLObservations, 
    imgObservations,
    inputImgObservations,
    btnClearImgObservations,
    clearImgObservations,
    loadingObservations,
    chargeImgObservations,
    saveImgObservations,
    btnSaveImgObservations,
    deleteImgObservations,
    inputImgRefObservations,
    imagesObservations,

    inputLEvidenceI, 
    imgEvidenceI,
    inputImgEvidenceI,
    btnClearImgEvidenceI,
    clearImgEvidenceI,
    loadingEvidenceI,
    chargeImgEvidenceI,
    saveImgEvidenceI,
    btnSaveImgEvidenceI,
    deleteImgEvidenceI,
    inputImgRefEvidenceI,
    imagesEvidenceI,

    inputLEvidenceF, 
    imgEvidenceF,
    inputImgEvidenceF,
    btnClearImgEvidenceF,
    clearImgEvidenceF,
    loadingEvidenceF,
    chargeImgEvidenceF,
    saveImgEvidenceF,
    btnSaveImgEvidenceF,
    deleteImgEvidenceF,
    inputImgRefEvidenceF,
    imagesEvidenceF,

    
    handleTextareaChange,
    descInitisal,
  }

  return (
    <ImgDataContext.Provider value={valuesImgDataFunrtions} >
      {children}
    </ImgDataContext.Provider>
  )
}