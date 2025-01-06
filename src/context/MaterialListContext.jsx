import { createContext, useState, useContext } from "react";
import { PlateDataContext } from './PlateDataContext';
import { HandleFuntionsContext } from "./HandleFunctionsContext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const MaterialListContext = createContext(false);

export function MaterialListProvider({ children }) {

	const { infos } = useContext(PlateDataContext) 
	const { setSelectedInfo } = useContext(HandleFuntionsContext)

	const [OpenCloseMaterialList, setOpenCloseMaterialList] = useState(true)

		const handleOpenMateriaList = (info) => {
			if (!infos) {
				console.warn('No se han cargado los datos aún.');
				return;
			}
			const foundData = infos.find(item => item.id === info.id);
			if (foundData) {
				setOpenCloseMaterialList(false)	
				// setOpenClosePdf(false)
				setSelectedInfo(foundData);
				console.log(`Abriendo lista de Materiales de Registro con ID: ${foundData.id}`);
			}else {
				console.warn('No se encontró el registro con ese ID');
			}
		}

		const handleCloseMateriaList = () => {
			setOpenCloseMaterialList(true)
		}

		const handleDownloadPdf = () => {
			const content = document.querySelector("#material-list-content"); // Seleccionar la sección
			if (!content) {
				console.error("No se encontró el contenido para exportar a PDF.");
				return;
			}
		
			html2canvas(content, { scale: 2 }).then((canvas) => {
				const imgData = canvas.toDataURL("image/png");
				const pdf = new jsPDF("p", "mm", "a4");
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
		
				pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
				pdf.save("Lista_de_Materiales.pdf");
				console.log("Descargando Lista de materiales en Pdf")
			});
		};
		



  const valuesMaterialListFunrtions = {
		OpenCloseMaterialList, setOpenCloseMaterialList,
		handleOpenMateriaList, handleCloseMateriaList,
		

		handleDownloadPdf,

  }

  return (
    <MaterialListContext.Provider value={valuesMaterialListFunrtions} >
      {children}
    </MaterialListContext.Provider>
  )
}