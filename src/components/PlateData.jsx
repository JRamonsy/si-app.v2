import { useForm } from "react-hook-form";
import { useEffect, useRef, useContext } from "react";
import { PlateDataContext } from "../context/PlateDataContext";
import { HandleFuntionsContext } from "../context/HandleFunctionsContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const PlateData = ({}) => {

  const {getInfos, createInfos, updateInfos, createImages, deleteImages, infosEdit,  imagesEdit, setImagesEdit} = useContext(PlateDataContext);

  const {imageFile, setImageFile, showHideA, setShowHideA, showHideX, setShowHideX, hideImage, setHideImage, btnDeleteImage, setBtnDeleteImage, handleX, newService, setNewService} = useContext(HandleFuntionsContext);

  const info = infosEdit

  const handlenewServiceClose = () => {
    setNewService(true);
    resetForm()
    setShowHideA(true)
    setHideImage(true)
    
  }

  const {handleSubmit, register, reset} = useForm()
    const fileInputRef = useRef(null); // Referencia para el input de archivo
    
    const Submit = async (data) => {
      try {
        // Verificar si es un nuevo registro (cuando infosEdit no está definido)
        if (!infosEdit) {
          // Validar si los campos requeridos están vacíos
          if (!data.receivedDate || !data.finalDate || !data.customer) {
            window.alert("Por favor, complete todos los campos requeridos: fecha de recibo, fecha final y cliente.");
            return; // Detener la ejecución si los campos están vacíos
          }
    
          // Creación de un nuevo registro
          const newPlate = await createInfos('/plate_datas/', data);
    
          if (newPlate && newPlate.id) {
            if (imageFile) {
              // Si hay una nueva imagen en el formulario, se crea
              const formData = new FormData();
              formData.append('image', imageFile);
              formData.append('plateId', newPlate.id);
              await createImages('/image_datas/', formData);
              handlenewServiceClose()
            } else {
              console.log("No se subió ninguna imagen para el nuevo registro.");
            }
    
            resetForm();
            console.log(await getInfos('/plate_datas/'));
            //swet alert se creo un nuevo registro
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Nuevo Registro Creado"
            });
          } else {
            console.error("Error: No se pudo obtener el ID del nuevo registro de plate.");
          }
        } else {
          const imageId = infosEdit.image && infosEdit.image.length > 0 ? infosEdit.image[0].id : null;
    
          if (infosEdit.id) {
            // Actualiza la información del registro
            await updateInfos('/plate_datas/', infosEdit.id, data);
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Registro Actualizado"
            });
    
            if (imageFile) {
              // Si hay una nueva imagen en el formulario, se procesa
              const formData = new FormData();
              formData.append('image', imageFile);
              formData.append('plateId', infosEdit.id);
    
              if (imageId) {
                // Si hay una imagen existente en la base de datos, se elimina y se crea la nueva
                await deleteImages('/image_datas/', imageId);
                await createImages('/image_datas/', formData);
              } else {
                // No hay imagen existente, se crea una nueva
                await createImages('/image_datas/', formData);
              }
            } else {
              // No hay imagen nueva en el formulario
              if (imageId) {
                console.log("La imagen existente se mantiene sin cambios.");
              } else {
                console.log("No hay imagen existente y no se subió ninguna nueva.");
              }
            }
            setNewService(true)
    
            resetForm();
            console.log(await getInfos('/plate_datas/'));
          } else {
            console.error("Error: infosEdit.id no está definido");
            return;
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
    
    
    
  const resetForm = () => {
    reset({
      receivedDate: '',
      finalDate: '',
      customer: '',
      cat: '',
      user: '',
      hp: '',
      spec: '',
      frame: '',
      serie: '',
      volts: '',
      catalog: '',
      equipment: '',
      power: '',
      brand: '',
      remissionNum: '',
      note: '',
      quote: ''
    });
  
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
      setImageFile(null);
      setImagesEdit(null); // Añadir esto para asegurar que se resetea imagesEdit

      setShowHideA(true);
      setHideImage(true); // Añadir esto para asegurar que se resetea hideImage
    };
    
    

  const handleImage = (e) => { //SELECCIONADOR DE LA IMAGEN 
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
        setImageFile(file);
        setShowHideX(false)
        setShowHideA(false);
        setHideImage(false)
        // setBtnDeleteImage(false);
        console.log(e.target.files[0])
    }
  };


    const showImg = () => { // MUESTRA LA IMAGEN SELECCIOANDA INPUT FILE o HANDLEIMAGE
      if (imageFile instanceof File) {
          return URL.createObjectURL(imageFile);
      }else if (imagesEdit) {
        return imagesEdit; // Mostrar la URL de la imagen editada si está disponible
      }
      return null;
    };

    useEffect(() => {
     reset(infosEdit)
    }, [infosEdit])

 
    const handleDeleteImage = async (e) => {  //ELIMINA LA IMAGEN DE LA BASE DE DATOS
      e.preventDefault();
      if (info && info.image && info.image[0] && window.confirm('¿Está seguro de eliminar la imagen?')) {
        await deleteImages('/image_datas/', info.image[0].id);
        setImageFile(null);
        setBtnDeleteImage(true)
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        // Actualiza los datos
        await getInfos('/plate_datas/');
        setShowHideA(true)
        setHideImage(true)
      } else {
        console.error("No se pudo encontrar la imagen para eliminar");
      }
    };

    // const handleCancel = (e) => { //RESETEA EN FORMULARIO
    //   e.preventDefault();
    //   resetForm()
    //   setShowHideA(true)
    //   setHideImage(true)
    // }

 


  return (
    <div>
      <section className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center 
    ${newService && 'scale-0'} transform transition-transform duration-200 ease`}>
        <section className="m-5" >
          <div className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
            <h2 >✔</h2>
          </div>
        </section>
        <form onSubmit={handleSubmit(Submit)} className='w-full max-w-2xl p-5 rounded-lg bg-white h-[90vh] overflow-y-auto '>
          <div className="flex justify-between items-center mb-5 bg-white ">
            <img
              alt="Logo de Suministros Industriales con texto y un símbolo gráfico"
              className="w-52 h-auto"
              src="public\logo suministros industriales.png"
            />
            <h1 className='text-lg font-bold bg-white'>INFORMACION DEL EQUIPO</h1>
          </div>

          <div className="flex justify-between mb-2.5">
            <label className="flex-1 bg-white">FECHA DE RECIBO:</label>
            <input {...register('receivedDate')} className="flex-2 border-0 border-b border-black bg-white" type="date"/>
            <label className="flex-1 bg-white">FECHA DE TERMINO:</label>
            <input {...register('finalDate')} className="flex-2 border-0 border-b border-black bg-white" type="date" />
          </div>

          <div className="flex justify-between mb-2.5">
            <label className="flex-1 bg-white" >CLIENTE:</label>
            <input {...register('customer')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
            <label className="flex-1 bg-white" >CAT. N°</label>
            <input {...register('cat')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
          </div>

          <div className="flex justify-between mb-2.5">
            <label className="flex-1 bg-white" >USUARIO</label>
            <input {...register('user')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
            <label className="flex-1 bg-white" >HP</label>
            <input {...register('hp')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
          </div>

          <div className="flex justify-between mb-2.5">
            <label className="flex-1 bg-white" >SPEC:</label>
            <input {...register('spec')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
            <label className="flex-1 bg-white" >FRAME</label>
            <input {...register('frame')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
          </div>

          <div className="flex justify-between mb-2.5">
            <label className="flex-1 bg-white" >N° SERIE</label>
            <input {...register('serie')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
            <label className="flex-1 bg-white" >VOLTS</label>
            <input {...register('volts')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
          </div>

          <div className="flex justify-between mb-2.5">
            <label className="flex-1 bg-white" >CATALAGO N°:</label>
            <input {...register('catalog')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
            <label className="flex-1 bg-white" >EQUIPO:</label>
            <input {...register('equipment')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
          </div>
          <div className="flex justify-between mb-2.5">
            <label className="flex-1 bg-white" >POTENCIA:</label>
            <input {...register('power')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
            <label className="flex-1 bg-white" >MARCA:</label>
            <input {...register('brand')} className="flex-2 border-0 border-b border-black bg-white" type="text" />
          </div>
          <div className=" m-5 flex justify-center">
            <hr className="w-5/6" />
          </div>
          <div>
            <h2 className='text-lg font-bold bg-white text-center' >EVIDENCIA DE PLACA</h2>
          </div>
          <section>
          <div className={`${hideImage && 'hidden'} relative w-ful flex justify-center` }>
            <button onClick={handleX} className={` ${showHideX && 'scale-0'} absolute text-2xl hover:text-white`} >Cambiar Imagen</button>

            <img className="  border rounded-2xl w-[250px] h-[250px] items-center justify-center object-cover" src={showImg()} alt="" />
          </div>
            <input 
            className={` ${showHideA ? '' : 'hidden'} `} 
            onChange={handleImage} 
            type="file" 
            ref={fileInputRef} // Asignar la referencia al input
            />
            <button onClick={handleDeleteImage} className={` ${btnDeleteImage && 'hidden'} border border-black m-2 p-1 hover:bg-white`} >eliminar imagen</button>
          </section>


          <div className="m-5 flex justify-center">
            <hr className="w-5/6" />
          </div>
          <section>
          <h2 className='text-lg font-bold bg-white text-center'>OTROS DATOS</h2>
            <div className="flex flex-col">
              <div>
                <label className="bg-white" >REMISIÓN:</label>
                <input {...register('remissionNum')} className="border-0 border-b border-black bg-white" type="text" />
              </div>
              <div>
                <label className="bg-white" >NOTA:</label>
                <input {...register('note')} className="border-0 border-b border-black bg-white" type="text" />
              </div>
              <div>
                <label className="bg-white" >COTIZACIÓN:</label>
                <input {...register('quote')} className="border-0 border-b border-black bg-white" type="text" />
              </div>
            </div>
          </section>


          <button className="w-full my-5 px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600">GUARDAR</button>

        </form>
        <section className="m-5" >
          <div onClick={handlenewServiceClose} className="cursor-pointer bg-black/30 rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 text-white/50  hover:text-black/30">
            <h2 >X</h2>
          </div>
        </section>
      </section>
    </div>
  )
}

export default PlateData
