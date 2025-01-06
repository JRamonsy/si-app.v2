import {createContext, useEffect, useState, useContext } from "react";
import useCrud from "../hooks/useCrud";
import { PlateDataContext } from './PlateDataContext';

export const ImgDescriptionContext = createContext(false);
export function ImgDescriptionProvider({ children }) {

    const { BASE_URL } = useContext(PlateDataContext) 
   
    const [descInitial, getDescInitial, createDescInitial, deleteDescInitial, updateDescInitial] = useCrud(BASE_URL)
    const [descFinal, getDescFinal, createDescFinal, deleteDescFinal, updateDescFinal] = useCrud(BASE_URL)

    const [infosEdit, setInfosEdit] = useState()
  
    // useEffect(() => {
    //   getDescInitial('/evidence_initial/')
    //   getDescFinal('/evidence_final/')
    // }, [])
  
    // console.log(descInitial)
    // console.log(descFinal)


    
    const valuesImgDescriptionFunrtions = {

        createDescInitial
  
  
    }

  
    return (
      <ImgDescriptionContext.Provider value={valuesImgDescriptionFunrtions} >
        {children}
      </ImgDescriptionContext.Provider>
    )
  }