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
    <div className={` ${OpenCloseMaterialList && 'scale-0'} fixed inset-0 bg-black/20 backdrop-blur-sm`} >
      <section className="flex justify-center m-5">
        <div onClick={handleCloseMateriaList} className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
          <h2 >X</h2>
        </div>
      </section>
      <section id="material-list-content"
        // ID para identificar la sección
        className="flex flex-col justify-center items-center m-5">
        <div className="w-1/2 border rounded-[15px] px-5 bg-white">
          <div className="m-5">
            <h3 className="text-lg font-bold">Materiales Requeridos para registro: {selectedInfo?.id}</h3>
          </div>
          <div className="flex flex-col">
            <label className="my-2"><b>Remisión:</b> {selectedInfo?.customer}{selectedInfo?.id || 'datos no disponible'}</label>
            <label className="my-2"><b>Descripción Rapida:</b> {selectedInfo?.note || 'datos no disponible'}</label>
            <label className="my-2"><b>Lista de Materiales:</b>{renderMaterialsAsList(selectedInfo?.checkList?.requiredMaterials)}</label>
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <button onClick={handleDownloadPdf} className="bg-sky-600 text-white p-1 border-0 rounded-[8px] cursor-pointer m-0.5 hover:bg-sky-500">
          <FaFileDownload />
        </button>
      </section>
    </div>
  )
}

export default MaterialList


