
import './App.css'
import './index.css';
import HeaderFollowUp from './components/HeaderFollowUp';
import PlateData from './components/PlateData';
import LogInPage from './components/LogInPage';
import { PlateDataProvider } from './context/PlateDataContext';
import { HandleFunctionsProvider } from './context/HandleFunctionsContext';
import { CheckListProvider } from './context/CheckListContext';
import { ServiceReportProvider } from './context/ServiceReportContext';
import { RemissionProvider } from './context/RemissionContext';


function App() {  
  
  return (
    <div >
      <PlateDataProvider>
      <HandleFunctionsProvider>
      <CheckListProvider>
      <ServiceReportProvider>
      <RemissionProvider>
        

        <LogInPage/>
        <HeaderFollowUp/>
        <PlateData/>   
        

      </RemissionProvider>
      </ServiceReportProvider>
      </CheckListProvider>
      </HandleFunctionsProvider>    
      </PlateDataProvider>
    </div>  
  )
}

export default App
