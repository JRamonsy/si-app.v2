import { useContext } from "react";
import { ImgDataContext } from "../context/ImgDataContext";
const ImgUploaderEvidenceF = () => {

	const {    
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
	  ServiceReportId
  } 
   = useContext(ImgDataContext)

  return (
		<div className="flex flex-col items-center mx-4 my-2">
		<section className="flex flex-col items-center gap-3">
			{/* Input para seleccionar la img */}
			<label className={`${inputLEvidenceF && 'hidden'} cursor-pointer bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-[12px] `}>
				<span>
					Adjuntar
				</span>
				<input
					hidden={true}
					className={`  `}
					onChange={inputImgEvidenceF}
					type="file"
					ref={inputImgRefEvidenceF} // Asignar la referencia al input
				/>
			</label>
			{/* Div contenedor de img */}
			<div className={`${imgEvidenceF && 'hidden'} relative w-ful flex justify-center`}>
				{btnClearImgEvidenceF && (
					<button
						onClick={clearImgEvidenceF}
						className={`absolute text-2xl text-slate-400 hover:text-slate-200`}>
						X
					</button>
				)}
				{loadingEvidenceF ? (
					<div className="w-8 h-8 border-4 border-t-transparent border-r-transparent border-l-blue-500 border-b-blue-500 rounded-full animate-spin">
					</div>
				) : (
					<img
						className="border border-black border-4 rounded-2xl w-[250px] h-[250px] object-cover"
						src={chargeImgEvidenceF()}
						alt="Imagen seleccionada"
					/>
				)}
			</div>
			{/* Button para eliminar la imagen de la base de datos img */}
			<div>
				<button onClick={saveImgEvidenceF} className={` ${btnSaveImgEvidenceF && 'hidden'} bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-[12px]`}>
					Guardar
				</button>
			</div>
		</section>
		<section className='recibo w-full p-1 w-full flex justify-center flex-wrap gap-3' >
			{imagesEvidenceF
				.filter(img => img.service_report_id === ServiceReportId) // Filtra por service_report_id
				.map(img => ( // Mapea los elementos filtrados para renderizarlos
					<div className="relative " key={img.id}>
						<button className="absolute right-4 rounded-full w-6 h-6 bg-black/30 text-white/50 hover:bg-white/50 hover:text-black/50" onClick={(e) => deleteImgEvidenceF(img.id, e)}>
							X
						</button>
						<div className="flex flex-col items-center" >
							<img className="border border-black border-1 rounded-2xl w-[150px] h-[150px] object-cover" src={img.imageUrl} alt={`Image ${img.id}`} />
						</div>
					</div>
				))}
		</section>
	</div>
  )
}

export default ImgUploaderEvidenceF
