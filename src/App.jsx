
import './App.css'
import './index.css';
import HeaderFollowUp from './components/HeaderFollowUp';
import PlateData from './components/PlateData';
import LogInPage from './pages/LogInPage';
import { PlateDataProvider } from './context/PlateDataContext';
import { HandleFunctionsProvider } from './context/HandleFunctionsContext';
import { CheckListProvider } from './context/CheckListContext';
import { ServiceReportProvider } from './context/ServiceReportContext';
import { RemissionProvider } from './context/RemissionContext';
import { MaterialListProvider } from './context/MaterialListContext';
import { ImgDataProvider } from './context/ImgDataContext';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { ImgDescriptionProvider } from './context/ImgDescriptionContext';


function App() {  
  
  return (
    <div >     
      <PlateDataProvider>
      <HandleFunctionsProvider>
      <CheckListProvider>
      <ServiceReportProvider>
      <RemissionProvider>
      <MaterialListProvider>
      <ImgDataProvider>
      <ImgDescriptionProvider>
      
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/" element={<PrivateRoute />}>
        <Route index element={
          <>
            <HeaderFollowUp/>
            <PlateData/>
          </>
          }>
        </Route> 
        </Route> 
        <Route path="*" element={<h1>Pagina no encontrada</h1>} />
      </Routes>

      </ImgDescriptionProvider>
      </ImgDataProvider>  
      </MaterialListProvider>     
      </RemissionProvider>
      </ServiceReportProvider>
      </CheckListProvider>
      </HandleFunctionsProvider>    
      </PlateDataProvider>
    </div>  
  )
}

export default App
