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
		ServiceReportId,

		handleLoadAllDescriptionsF,
		handleSaveDescriptionF,
		descriptionsF,
		setDescriptionsF,
		textareaF,
		btnSaveDescriptionsF,
		btnShowDescriptionsF,
	}
		= useContext(ImgDataContext)

	return (
		<div className="flex flex-col items-center mx-4 my-2">
			<section className="flex flex-col items-center gap-3">
				{/* Input para seleccionar la img */}
				<label className={`${inputLEvidenceF && 'hidden'} cursor-pointer bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-[12px] `}>
					<span>
						Adjuntar imagen
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
				{/* Renderizar imágenes y textareas */}
				{imagesEvidenceF
					.filter(img => img.service_report_id === ServiceReportId) // Filtra por service_report_id
					.map(img => ( // Mapea los elementos filtrados para renderizarlos
						<div className="relative " key={img.id}>
							<button
								className="absolute right-4 rounded-full w-6 h-6 bg-black/30 text-white/50 hover:bg-white/50 hover:text-black/50"
								onClick={(e) => deleteImgEvidenceF(img.id, e)}
							>
								X
							</button>
							<img
								className="border border-black border-1 rounded-2xl w-[150px] h-[150px] object-cover"
								src={img.imageUrl}
								alt={`Image ${img.id}`}
							/>
							<textarea
								className={` ${textareaF && 'hidden'} border border-black rounded-[15px] resize-none text-center`}
								rows={2}
								name="imgDescriptionEvidenceI"
								value={descriptionsF[img.id] || ""} // Mostrar el valor asociado al ID o vacío
								onChange={(e) =>
									setDescriptionsF(prev => ({
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
					imagesEvidenceF.length > 0 ? (
						<button
							className={` ${btnShowDescriptionsF && 'hidden'} mb-4 px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600`}
							onClick={handleLoadAllDescriptionsF}
						>
							Ver descripciones
						</button>
					) : (
						<p>No hay imágenes</p>
					)
				}
				<button
					className={` ${btnSaveDescriptionsF && 'hidden'} mb-4 px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600`}
					onClick={handleSaveDescriptionF}
				>
					Guardar descripciones
				</button>
			</div>
		</div>
	)
}

export default ImgUploaderEvidenceF
