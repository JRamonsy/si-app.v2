import { useState } from "react";


const FollowUp = ({handleCheckListOpen, handleRemission, handleServiceReport, handleDataSheet}) => {

  const [changeStatus, setChangeStatus] = useState(0)  
 
  const bgCelda = changeStatus
  const bgColors = {
    1: 'bg-lime-500',
    2: 'bg-red-600',
    3: 'bg-yellow-500',
    4: 'bg-blue-500'
  }
  const bgColorDefault = 'bg-slate-400'
  const changeColor = bgColors[bgCelda]
  ? bgColors[bgCelda]
  : bgColorDefault

  const handleInputChange = (e) => {
    const number = parseInt(e.target.value);
    if (number >= 0 && number <= 4) {
      setChangeStatus(number);
    } else {
      setChangeStatus(bgColorDefault); 
    }
  };

  const [selectedOption, setSelectedOption] = useState("");

  const bgColors2 = {
    save: 'bg-lime-500',
    process: 'bg-red-600',
    wait: 'bg-yellow-500',
    finish: 'bg-blue-500'
  }
  const bgColorDefault2 = 'bg-slate-400'

  const changeColor2 = bgColors2[selectedOption] || bgColorDefault2;

  const handleInputChange2 = (e2) => {
    const newSelection = e2.target.value;
    setSelectedOption(newSelection); 
  };



  return (
    <div className='w-full flex flex-col justify-center'>
      <table className='w-full border-collapse'>
          <thead>
            <tr className='flex'>
              <th className={`border border-solid border-black ${changeColor2} text-black p-1 text-sm basis-1/12`}>
                <select className={`${changeColor2}`} 
                  value={selectedOption}
                  onChange={handleInputChange2} 
                  name="status">
                  <option className="" value="defaul">elige una opción</option>
                  <option value="save">sin reparación/equipo guardado</option>
                  <option value="process">servicios en proceso</option>
                  <option value="wait">esperando indicaciones del usuario</option>
                  <option value="finish">servicios finalizados</option>
                </select>
              </th>
              <th className={`border border-solid border-black ${changeColor} text-white p-1 text-sm text-center basis-1/12`}>
              <input className={`w-full ${changeColor} text-center`}
                type="number" 
                value={changeStatus}
                onChange={handleInputChange}
                min="0" 
                max="4"/></th>
              <th className='border border-solid border-black bg-white text-black p-1 text-sm text-center basis-1/12' ></th>
              <th className='border border-solid border-black bg-white text-black p-1 text-sm text-center basis-1/12' ></th>
              <th className='border border-solid border-black bg-white text-black p-1 text-sm text-center basis-2/12' ></th>
              <th className='border border-solid border-black bg-white text-black p-1 text-sm text-center basis-1/12' ></th>
              <th className='border border-solid border-black bg-white text-black p-1 text-sm text-center basis-5/12' >
                <section className="flex justify-center" >
              </section>
              </th>
            </tr>
          </thead>
        </table>  

      
    </div>
  );
};

export default FollowUp;
