import {createContext, useEffect, useState } from "react";
import useCrud from "../hooks/useCrud";


// lo que tenemos que consumir
export const PlateDataContext = createContext(false);

// el que provee acceso a context
export function PlateDataProvider({children}){

  const BASE_URL = 'https://si-api-test.onrender.com'
  
  const [infos, getInfos, createInfos, deleteInfos, updateInfos] = useCrud(BASE_URL)
  const [images, getImages, createImages, deleteImages, updateImages] = useCrud(BASE_URL)
  // const [checks, getCheck, createCheck, deleteCheck, updateCheck] = useCrud(BASE_URL)
  // const [service, getService, createService, deleteService, updateService] = useCrud(BASE_URL)

  const [infosEdit, setInfosEdit] = useState()
  const [imagesEdit, setImagesEdit] = useState()
  // const [checksEdit, setChecksEdit] = useState()
  // const [serviceEdit, setServiceEdit] = useState()

  useEffect(() => {
    getInfos('/plate_datas/');
  }, [])

  useEffect(() => {
    getImages('/image_datas/')
  }, [])

  // useEffect(() => {
  //   getCheck('/checklist_datas/')
  // }, [])

  // useEffect(() => {
  //   getService('/report_datas/')
  // }, [])

  console.log(infos)
  // console.log(images)
  // console.log(checks)
  // console.log(service)

  const handleRefresh = () => {
    window.location.reload();
  };

  const valuesPlateData = {
    BASE_URL,


    infos,
    getInfos,
    createInfos,
    deleteInfos,
    updateInfos,
    images,
    getImages,
    createImages,
    deleteImages,
    updateImages,
    infosEdit,
    setInfosEdit,
    imagesEdit,
    setImagesEdit,

    // checks,
    //  getCheck,
    //   createCheck, 
    //   deleteCheck, 
    //   updateCheck,
    //    checksEdit,
    //     setChecksEdit

    handleRefresh
  }

  return (
  <PlateDataContext.Provider value={valuesPlateData} >
    {children}
  </PlateDataContext.Provider>
  )
}