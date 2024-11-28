import React, { useState } from "react";

const ImageUploader = ({ title }) => {
  const [images, setImages] = useState([]);
  // console.log(images)

  const changeInput = (e) => {
    let indexImg;

    if (images.length > 0) {
      indexImg = images[images.length - 1].index + 1;
    } else {
      indexImg = 0;
    }

    let newImgsToState = readmultifiles(e, indexImg);
    let newImgsState = [...images, ...newImgsToState];
    setImages(newImgsState);
  };

  const readmultifiles = (e, indexInicial) => {
    const files = e.currentTarget.files;
    const arrayImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];
      let url = URL.createObjectURL(file);

      arrayImages.push({
        index: indexInicial,
        name: file.name,
        url,
        file,
      });

      indexInicial++;
    });

    return arrayImages;
  };

  const deleteImg = (indice) => {
    const newImgs = images.filter((element) => element.index !== indice);
    setImages(newImgs);
  };
  


  return (
    <div className="image-uploader w-full p-1">
      <h3 className="text-center font-bold">{title}</h3>
      <div className="flex justify-center m-2">
        <label className="bg-blue-600 text-white hover:bg-blue-500 py-1 px-2">
          <span>Adjuntar </span>
          <input hidden type="file" multiple onChange={changeInput}></input>
        </label>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {images.map((imagen) => (
          <div
            className="w-1/2 sm:w-1/3 lg:w-1/4 relative border border-black after:block after:content-['*'] after:pb-[100%] after:float-left"
            key={imagen.index}
          >
            <div className="absolute w-[100%] h-[100%] bg-[#1f1f1f] border border-white flex">
              <button
                className="absolute rounded-full w-6 h-6 bg-black/30 text-white/50 hover:bg-white/50 hover:text-black/50"
                onClick={() => deleteImg(imagen.index)}
              >
                X
              </button>
              <img
                alt="algo"
                src={imagen.url}
                className="h-full w-full object-cover"
              ></img>
            </div>
            {/* <input
              className="input-description absolute bottom-0 w-full px-2"
              type="text"
              placeholder="breve descripción de la imagen"
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
