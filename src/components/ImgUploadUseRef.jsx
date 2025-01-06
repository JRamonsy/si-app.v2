import { useContext } from "react";
import { ImgDataContext } from "../context/ImgDataContext";
import { useFormContext } from "react-hook-form";
import { ServiceReportContext } from "../context/ServiceReportContext";

const ImgUploadUseRef = () => {

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
	} = useContext(ImgDataContext);

	const { setDescriptionEdit } = useContext(ServiceReportContext);
	const { register, setValue } = useFormContext(); // Acceder al contexto del formulario



	return (
		<div className="flex flex-col items-center mx-4 my-2">
			<h1>Img Upload Use REf</h1>
			<section className="flex flex-col items-center gap-3">
				{/* Input para seleccionar la img */}
				<label className={`${inputLEvidenceI && 'hidden'} cursor-pointer bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-[12px]`}>
					<span>
						Adjuntar
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
				<div className={`${imgEvidenceI && 'hidden'} relative w-full flex justify-center`}>
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
					<button onClick={saveImgEvidenceI} className={`${btnSaveImgEvidenceI && 'hidden'} bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-[12px]`}>
						Guardar
					</button>
				</div>
			</section>

			<section className='recibo w-full p-1 flex justify-center flex-wrap gap-4'>
				{imagesEvidenceI
					.filter(img => img.service_report_id === ServiceReportId) // Filtra por service_report_id
					.map(img => (
						<div className="relative" key={img.id}>
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
							{/* Textarea para mostrar y editar la descripción */}
							<textarea
								

								className="border border-black rounded-[8px] text-center"
								rows="2"
								style={{ width: "70%", resize: "none" }}

							/>

						</div>
					))}
			</section>
		</div>
	);
};

export default ImgUploadUseRef;
