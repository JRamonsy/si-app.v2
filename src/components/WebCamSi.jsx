import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const WebCamSi = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState('user'); // 'user' para cámara frontal, 'environment' para cámara trasera
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImageSrc(imageSrc);
    setIsCameraOn(false); // Apagar la cámara después de tomar la foto
  }, [webcamRef]);

  const toggleCamera = () => {
    setFacingMode(prevFacingMode => (prevFacingMode === 'user' ? 'environment' : 'user'));
  };

  return (
    <div className='flex flex-col items-center' >
      {isCameraOn && (
        <Webcam
          audio={false}
          width={250}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode }}
        />
      )}
      <button className='bg-teal-500 hover:bg-teal-400 rounded px-1 my-2' onClick={() => setIsCameraOn(!isCameraOn)}>
        {isCameraOn ? 'Apagar Cámara' : 'Encender Cámara'}
      </button>
      {isCameraOn && (
        <button className='bg-teal-500 hover:bg-teal-400 rounded px-1 my-2' onClick={capture}>Tomar Foto</button>
      )}
      {imageSrc && <img src={imageSrc} alt="Foto" />}
      <button className='bg-teal-500 hover:bg-teal-400 rounded px-1 my-2' onClick={toggleCamera}>
        Cambiar a {facingMode === 'user' ? 'Cámara Trasera' : 'Cámara Frontal'}
      </button>
    </div>
  );
};

export default WebCamSi;
