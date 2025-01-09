import { useContext } from "react";
import { MaterialListContext } from "../context/MaterialListContext";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";
import { FaFileDownload } from "react-icons/fa";

const MaterialList = () => {

  const { selectedInfo } = useContext(HandleFuntionsContext);

  const { OpenCloseMaterialList, handleCloseMateriaList, handleDownloadPdf } = useContext(MaterialListContext);

  // Función para dividir el texto de diagnostico general en líneas
  const renderMaterialsAsList = (materials) => {
    if (!materials) return <p>No hay datos disponibles</p>;
    // Dividir el texto en líneas
    const materialsList = materials.split('\n');
    // Renderizar la lista
    return (
      <ul className="list-inside">
        {materialsList.map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className={` ${OpenCloseMaterialList && 'scale-0'} fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center  `} >
      
      <section className="w-2/4 bg-white rounded" >
      <section className="flex justify-center m-2 ">
        <button onClick={handleDownloadPdf} className="bg-sky-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-sky-500">
          <FaFileDownload />
        </button>
      </section>
        <section id="material-list-content"
          className="flex flex-col justify-center items-center  ">
            <div className="">
              <h3 className="text-lg font-bold my-4">Materiales Requeridos para registro: {selectedInfo?.id}</h3>
            </div>
            <div className="flex flex-col">
              <label className="my-1"><b>Remisión:</b> {selectedInfo?.customer}{selectedInfo?.id || 'datos no disponible'}</label>
              <label className="my-1"><b>Descripción Rapida:</b> {selectedInfo?.note || 'datos no disponible'}</label>
              <label ><b>Lista de Materiales:</b></label>
              <label className="my-1 max-h-[65vh] overflow-y-auto">{renderMaterialsAsList(selectedInfo?.checkList?.requiredMaterials)}</label>
            </div>
        </section>
      </section>

      <section className="flex items-center justify-center ">
        <div onClick={handleCloseMateriaList} className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/">
          X
        </div>
      </section>
      
    </div>
  )
}

export default MaterialList


