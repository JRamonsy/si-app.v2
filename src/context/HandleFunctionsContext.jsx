import { createContext, useState,  useRef } from "react";
import {useContext } from "react";
import { PlateDataContext } from './PlateDataContext';
import Swal from 'sweetalert2'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


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

  //Abre plateData
  const [newService, setNewService] = useState(true)
  const handleNew = () => {
    setNewService(false)
  }



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
      // console.log("Información encontrada:", foundData);
      setOpenDataSheet(false);
    } else {
      console.warn('No se encontró el registro con ese ID');
    }
  };
  
  // cerrar dataSheet
  const handleDataSheetClose = () => {
    setOpenDataSheet(true)
  }

  const handleDownloadPdfEquipment = () => {
    const content = document.querySelector("#equipment-information");
    if (!content) {
      console.error("No se encontró el contenido para exportar a PDF.");
      return;
    }
    // Esperar a que las imágenes estén cargadas
    const images = content.querySelectorAll("img");
    const promises = Array.from(images).map((img) => {
      return new Promise((resolve, reject) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = reject;
        }
      });
    });
    Promise.all(promises)
      .then(() => {
        html2canvas(content, { scale: 2, useCORS: true }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save("información_de_equipo.pdf");
        });
      })
      .catch((error) => {
        console.error("Error al cargar las imágenes:", error);
      });
  };

  const handleDownloadPdfCheckList = () => {
    const section1 = document.querySelector("#check_list_1"); // Primera sección
    const section2 = document.querySelector("#check_list_2"); // Segunda sección
  
    if (!section1 || !section2) {
      console.error("No se encontraron todas las secciones para exportar a PDF.");
      return;
    }
  
    const pdf = new jsPDF("p", "mm", "a4"); // Crear una instancia de PDF
  
    // Renderizar y agregar la primera sección
    html2canvas(section1, { scale: 2 }).then((canvas1) => {
      const imgData1 = canvas1.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 15; // Margen en mm
      const imgWidth = pdfWidth - 2 * margin;
      const imgHeight = (canvas1.height * imgWidth) / canvas1.width;
      const x = margin;
      const y = margin;
  
      pdf.addImage(imgData1, "PNG", x, y, imgWidth, imgHeight); // Añadir imagen de la primera sección
  
      // Renderizar y agregar la segunda sección
      html2canvas(section2, { scale: 2 }).then((canvas2) => {
        const imgData2 = canvas2.toDataURL("image/png");
        const imgHeight2 = (canvas2.height * imgWidth) / canvas2.width;
  
        pdf.addPage(); // Añadir una nueva página
        pdf.addImage(imgData2, "PNG", x, y, imgWidth, imgHeight2); // Añadir imagen de la segunda sección
  
        pdf.save("check_list.pdf"); // Guardar el archivo PDF
      });
    });
  };

  //Service Report PDF

  const sectionRef = useRef();

  

  const handleDownloadPdfServiceReport = async () => {
    try {
      // Mostrar indicador de carga
      const loadingElement = document.createElement("div");
      loadingElement.innerText = "Generando PDF...";
      loadingElement.style.position = "fixed";
      loadingElement.style.top = "50%";
      loadingElement.style.left = "50%";
      loadingElement.style.transform = "translate(-50%, -50%)";
      loadingElement.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      loadingElement.style.color = "white";
      loadingElement.style.padding = "10px 20px";
      loadingElement.style.borderRadius = "5px";
      loadingElement.style.zIndex = "1000";
      document.body.appendChild(loadingElement);
  
      const sectionElement = document.getElementById("service_repor_t1");
      if (!sectionElement) {
        throw new Error("No se encontró el elemento con id 'service_repor_t1'");
      }
  
      // Capturar el contenido como imagen
      const canvas = await html2canvas(sectionElement, {
        scale: 2, // Mejora la calidad
        useCORS: true,
      });
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      // Dimensiones de la página
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
  
      // Reducimos la altura un poco
      const scaleFactor = 1;
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = Math.ceil(((canvas.height * imgWidth) / canvas.width) * scaleFactor);
  
      let yPosition = margin;
      let heightLeft = imgHeight;
      let currentHeight = 0;
      let totalPages = 0;
      let pageNumbers = [];
  
      // Determinar cuántas páginas tendrá el PDF
      while (heightLeft > 0) {
        totalPages++;
        heightLeft -= Math.min(heightLeft, pageHeight - 2 * margin);
      }
  
      // Reset para iteración real
      heightLeft = imgHeight;
      currentHeight = 0;
      let currentPage = 1;
  
      while (heightLeft > 0) {
        const fragmentHeight = Math.min(heightLeft, pageHeight - 2 * margin);
  
        const croppedCanvas = document.createElement("canvas");
        const croppedCtx = croppedCanvas.getContext("2d");
  
        croppedCanvas.width = canvas.width;
        croppedCanvas.height = Math.ceil((fragmentHeight * canvas.width) / imgWidth);
  
        croppedCtx.drawImage(
          canvas,
          0,
          currentHeight,
          canvas.width,
          croppedCanvas.height,
          0,
          0,
          croppedCanvas.width,
          croppedCanvas.height
        );
  
        const croppedImgData = croppedCanvas.toDataURL("image/png");
  
        pdf.addImage(
          croppedImgData,
          "PNG",
          margin,
          yPosition,
          imgWidth,
          fragmentHeight
        );
  
        // Agregar número de página
        pageNumbers.push({ page: currentPage, total: totalPages });
  
        heightLeft -= fragmentHeight;
        currentHeight += croppedCanvas.height;
        currentPage++;
  
        if (heightLeft > 0) {
          pdf.addPage();
          yPosition = margin;
        }
      }
  
      // Agregar numeración de páginas
      pageNumbers.forEach((page, index) => {
        pdf.setPage(index + 1);
        pdf.setFontSize(10);
        pdf.text(`${page.page} / ${page.total}`, pageWidth - margin - 10, pageHeight - margin);
      });
  
      pdf.save("service_report.pdf");
  
      // Eliminar indicador de carga
      document.body.removeChild(loadingElement);
    } catch (error) {
      console.error("Error al exportar a PDF:", error.message);
    }
  };
  
  
  
  
  
  
  const handleDownloadPdfRemission  = () => {
    const content = document.querySelector("#remission_"); // Seleccionar la sección
    if (!content) {
      console.error("No se encontró el contenido para exportar a PDF.");
      return;
    }
    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Ancho de la página PDF
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Alto de la página PDF
      const margin = 10; // Tamaño del margen en milímetros
  
      // Calcular las dimensiones de la imagen con el margen
      const imgWidth = pdfWidth - 2 * margin; // Ancho reducido por los márgenes
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantener la proporción
  
      // Posicionar la imagen centrada dentro de los márgenes
      const x = margin;
      const y = margin;
  
      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight); // Agregar imagen al PDF
      pdf.save("remission.pdf");
    });
  };
  
  

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
    setSelectedCheck,

    handleDownloadPdfEquipment,
    handleDownloadPdfCheckList, 
    handleDownloadPdfServiceReport, 
    handleDownloadPdfRemission,
  }

  return (
    <HandleFuntionsContext.Provider value={valuesHandleFunrtions} >
      {children}
    </HandleFuntionsContext.Provider>
  )
}