import { useContext } from "react";
import { ImgDataContext } from "../context/ImgDataContext";

const ImgUploaderDiagnosis = () => {

  const {    
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
	ServiceReportId
  } 
   = useContext(ImgDataContext)

  return (
		<div className="flex flex-col items-center mx-4 my-2">
		<section className="flex flex-col items-center gap-3">
			{/* Input para seleccionar la img */}
			<label className={`${inputLDiagnosis && 'hidden'} cursor-pointer bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-[12px] `}>
				<span>
					Adjuntar imagen
				</span>
				<input
					hidden={true}
					className={`  `}
					onChange={inputImgDiagnosis}
					type="file"
					ref={inputImgRefDiagnosis} // Asignar la referencia al input
				/>
			</label>
			{/* Div contenedor de img */}
			<div className={`${imgDiagnosis && 'hidden'} relative w-ful flex justify-center`}>
			{btnClearImgDiagnosis && (
				<button 
						onClick={clearImgDiagnosis} 
						className={`absolute text-2xl text-slate-400 hover:text-slate-200`}>
						X
				</button>
			)}
				{loadingDiagnosis ? (
					<div className="w-8 h-8 border-4 border-t-transparent border-r-transparent border-l-blue-500 border-b-blue-500 rounded-full animate-spin">
					</div>
				) : (
					<img
						className="border border-black border-4 rounded-2xl w-[250px] h-[250px] object-cover"
						src={chargeImgDiagnosis()}
						alt="Imagen seleccionada"
					/>
				)}
			</div>
			{/* Button para eliminar la imagen de la base de datos img */}
			<div>
				<button onClick={saveImgDiagnosis} className={` ${btnSaveImgDiagnosis && 'hidden'} bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-[12px]`}>
					Guardar
				</button>
			</div>
		</section>
		<section className='recibo w-full p-1 w-full flex justify-center flex-wrap gap-4' >
			{imagesDiagnosis
				.filter(img => img.service_report_id === ServiceReportId) // Filtra por service_report_id
				.map(img => ( // Mapea los elementos filtrados para renderizarlos
					<div className="relative " key={img.id}>
						<button className="absolute rounded-full w-6 h-6 bg-black/30 text-white/50 hover:bg-white/50 hover:text-black/50" onClick={(e) => deleteImgDiagnosis(img.id, e)}>
							X
						</button>
						<img className="border border-black border-1 rounded-2xl w-[150px] h-[150px] object-cover" src={img.imageUrl} alt={`Image ${img.id}`} />
					</div>
				))}
		</section>
	</div>

  )
}

export default ImgUploaderDiagnosis
