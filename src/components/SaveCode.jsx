const resetForm = () => {
    reset({
      // technicianNameExitStep: '',
      // technicianNamevisualInspection: '',
      // technicianNamePhotographicEvidence: '',
      // technicianNameRequiredParts: '',
      // technicianNameRequiredMaterials: '',
      // technicianNameEvidenceProcess: '',
      // technicianNameEvidenceTerm: '',
      // technicianNameSulzerReport: '',
      // technicianNameRemission: '',
      // technicianNameGuide: '',
      // advanceExitStep: '',
      // advanceVisualInspection: '',
      // advancePhotographicEvidence: '',
      // advanceRequiredParts: '',
      // advanceRequiredMaterials: '',
      // advanceEvidenceProcess: '',
      // advanceEvidenceTerm: '',
      // advanceSulzerReport: '',
      // advanceRemission: '',
      // advanceGuide: '',
      comments: ''
    });
  }

  const handleEditCheck = () => {
    if (!selectedInfo?.checkList) { // si selectedInfo no tiene a checkList que es true
      console.log('No se encontró ningún checkList para editar'); // manda esto en la consola
    }else { // en otro caso si es falso y tiene a checkList
      console.log(selectedInfo.id)
      const checkToEdit = checks.find(check => check.plateId === selectedInfo.id)
      console.log(checkToEdit.id)
      setChecksEdit(selectedInfo) // se guarda selectedInfo dentro de la variabole de estado
      console.log(selectedInfo.checkList)
      resetForm()
      console.log(`Editando checkList con ID: ${checkToEdit.id}`);
    }
  }

  const Submit = async (data) => {
    try {
        if (selectedInfo.checkList && selectedInfo.checkList.id) {
            const checkListId = selectedInfo.checkList.id;
            console.log(checkListId); // Verifica el ID en la consola
            await updateCheck('/checklist_datas/', checkListId, data);
            resetForm()
            handleCloseCheckList(true);
        } else {
            if (selectedInfo.checkList === null) {
                const newCheckList = {
                    ...data,
                    plateId: selectedInfo.id,
                };
                await createCheck('/checklist_datas/', newCheckList);
                handleCloseCheckList(false);
                resetForm();
                console.log('Se ha creado un nuevo registro de checklist');
            } else {
                console.log('Ya existe un registro de checklist');
            }
        }
    } catch (error) {
        console.error('Error al procesar el formulario:', error);
    }
};

const Submit1 = ( data) => {
  if (selectedCheck.checkList === null) {
    const newCheckList = {
        ...data,
        plateId: selectedCheck.id,
    };
    createCheck('/checklist_datas/', newCheckList, data);
    handleCloseCheckList();
    resetForm();
} else {
    console.log('Ya existe un registro de checklist');
}
}

const handleDeleteCheckList = () => {
  if(selectedCheck.checkList.id){
    console.log(selectedCheck.checkList.id)
    deleteCheck('/checklist_datas/', selectedCheck.checkList.id)
    console.log('Checklist BORRADO con ID:', selectedCheck.checkList.id);
    // handleCloseCheckList();
    // console.log("Checklist eliminado con éxito.");
    // getInfos('/plate_datas/')
  } else {
    console.error("Error: No hay checklist seleccionado para eliminar.");
  }
}

// WEBCAM
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { useContext } from "react";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";

const WebCamSi = () => {
    const {setOpenServiceReport} = useContext(HandleFuntionsContext);


  const [isCameraOn, setIsCameraOn] = useState(false);
  const webcamRef = useRef(null);

  const capture = useCallback((e) => {
    e.preventDefault();
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setIsCameraOn(false); // Apagar la cámara después de tomar la foto
  }, [webcamRef]);

  return (
    <>
      {isCameraOn && (
        <Webcam
          audio={false}
          width={250}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      )}
      <button onClick={() => setIsCameraOn(!isCameraOn)}>
        {isCameraOn ? 'Apagar Cámara' : 'Encender Cámara'}
      </button>
      {isCameraOn && (
        <button onClick={capture}>Tomar Foto</button>
      )}
    </>
  );
};

export default WebCamSi;



// cargar imagenes varias

  // const [images, setimages] = useState([]);

  // const changeInput = (e) => {
  //   //esto es el indice que se le dará a cada imagen, a partir del indice de la ultima foto
  //   let indexImg;

  //   //aquí evaluamos si ya hay imagenes antes de este input, para saber en dónde debe empezar el index del proximo array
  //   if (images.length > 0) {
  //     indexImg = images[images.length - 1].index + 1;
  //   } else {
  //     indexImg = 0;
  //   }

  //   let newImgsToState = readmultifiles(e, indexImg);
  //   let newImgsState = [...images, ...newImgsToState];
  //   setimages(newImgsState);

  //   console.log(newImgsState);
  // };

  // function readmultifiles(e, indexInicial) {
  //   const files = e.currentTarget.files;

  //   //el array con las imagenes nuevas
  //   const arrayImages = [];

  //   Object.keys(files).forEach((i) => {
  //     const file = files[i];

  //     let url = URL.createObjectURL(file);

  //     //console.log(file);
  //     arrayImages.push({
  //       index: indexInicial,
  //       name: file.name,
  //       url,
  //       file
  //     });

  //     indexInicial++;
  //   });

  //   //despues de haber concluido el ciclo retornamos las nuevas imagenes
  //   return arrayImages;
  // }

  // function deleteImg(indice) {
  //   //console.log("borrar img " + indice);

  //   const newImgs = images.filter(function (element) {
  //     return element.index !== indice;
  //   });
  //   console.log(newImgs);
  //   setimages(newImgs);
  // }