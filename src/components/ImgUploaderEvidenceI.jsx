import { useContext } from "react";
import { ImgDataContext } from "../context/ImgDataContext";
const ImgUploaderEvidenceI = () => {

	const {
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
		ServiceReportId,

		handleLoadAllDescriptions,
		handleSaveDescription,
		descriptions,
		setDescriptions,
		textarea,
		btnSaveDescriptions,
		btnShowDescriptions,
	}
		= useContext(ImgDataContext)

	return (
		<div className="flex flex-col items-center mx-4 my-2">
			<section className="flex flex-col items-center gap-3">
				{/* Input para seleccionar la img */}
				<label className={`${inputLEvidenceI && 'hidden'} cursor-pointer bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-[12px] `}>
					<span>
						Adjuntar imagen
					</span>
					<input
						hidden={true}
						className={`  `}
						onChange={inputImgEvidenceI}
						type="file"
						ref={inputImgRefEvidenceI} // Asignar la referencia al input
					/>
				</label>
				{/* Div contenedor de img */}
				<div className={`${imgEvidenceI && 'hidden'} relative w-ful flex justify-center`}>
					{btnClearImgEvidenceI && (
						<button
							onClick={clearImgEvidenceI}
							className={`absolute text-2xl text-slate-400 hover:text-slate-200`}>
							X
						</button>
					)}
					{loadingEvidenceI ? (
						<div className="w-8 h-8 border-4 border-t-transparent border-r-transparent border-l-blue-500 border-b-blue-500 rounded-full animate-spin">
						</div>
					) : (
						<img
							className="border border-black border-4 rounded-2xl w-[250px] h-[250px] object-cover"
							src={chargeImgEvidenceI()}
							alt="Imagen seleccionada"
						/>
					)}
				</div>
				{/* Button para eliminar la imagen de la base de datos img */}
				<div>
					<button onClick={saveImgEvidenceI} className={` ${btnSaveImgEvidenceI && 'hidden'} bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-[12px]`}>
						Guardar
					</button>
				</div>
			</section>
			<section className="recibo w-full p-1 flex justify-center flex-wrap gap-4">
				{/* Renderizar imágenes y textareas */}
				{imagesEvidenceI
					.filter(img => img.service_report_id === ServiceReportId) // Filtrar por service_report_id
					.map(img => (
						<div className="relative flex flex-col items-center" key={img.id}>
							<button
								className="absolute rounded-full w-6 h-6 bg-black/30 text-white/50 hover:bg-white/50 hover:text-black/50"
								onClick={(e) => deleteImgEvidenceI(img.id, e)}
							>
								X
							</button>
							<img
								className="border border-black border-1 rounded-2xl w-[150px] h-[150px] object-cover"
								src={img.imageUrl}
								alt={`Image ${img.id}`}
							/>
							<textarea
								className={` ${textarea && 'hidden'} border border-black rounded-[15px] resize-none text-center`}
								rows={2}
								name="imgDescriptionEvidenceI"
								value={descriptions[img.id] || ""} // Mostrar el valor asociado al ID o vacío
								onChange={(e) =>
									setDescriptions(prev => ({
										...prev,
										[img.id]: e.target.value, // Actualizar solo este ID
									}))
								}
							/>
						</div>
					))}
			</section>
			<div>
				{
					imagesEvidenceI.length > 0 ? (
						<button
							className={` ${btnShowDescriptions && 'hidden'} mb-4 px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600`}
							onClick={handleLoadAllDescriptions}
						>
							Ver descripciones
						</button>
					) : (
						<p>No hay imágenes</p>
					)
				}
				<button
					className={` ${btnSaveDescriptions && 'hidden'} mb-4 px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600`}
					onClick={handleSaveDescription}
				>
					Guardar descripciones
				</button>
			</div>
		</div>
	)
}

export default ImgUploaderEvidenceI
