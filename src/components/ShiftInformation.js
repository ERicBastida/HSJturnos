import covidVaccineIMG from '../assests/covid-vaccine-logo.png'
import printerIMG from '../assests/print.png';
import PDFreport from '../utils/PDFReport';
import {useEffect, useState} from 'react';
import STATE from '../enums/StateApplication';


const ShiftInformation = (props) => {
    

    var initialShiftInfo = {
        turnNumber : 0,
        identification : ""
    }
    
    const [values, setValues] = useState(STATE.INFO_HOSPITAL);
    const [shiftInfo, setShiftInfo] = useState(initialShiftInfo);
    
    useEffect(() => {
        setValues(props.infoType)

        var shiftInfo = {
            turnNumber : props.turnNumber,
            identification : props.identification,
        }
        setShiftInfo(shiftInfo)

    }, [props.infoType, props.turnNumber, props.identification]);
  

    return (
        
        <div className="col-lg-4 col-md-4 panel-info">
            { values === STATE.INFO_HOSPITAL  && (             
            <div>
                <h1>Hospital San José</h1>
                <img width="200"  src={covidVaccineIMG} alt="Vacunación COVID-19"/>
                <h2>PROGRAMA DE VACUNACION</h2>
                <h2>2021</h2>
            </div>)}
        { values === STATE.INFO_SHIFT  && (             
        <div>
                <h1>SU TURNO ES EL Nº</h1>
                <p>{props.turnNumber}</p>
                <img className="print-btn" src={printerIMG} alt="Descargar comprobante"/>
                <PDFreport {...shiftInfo}></PDFreport> 
        </div>)}
        { values === STATE.LOADING  && (             
        <div>
            <h1>CARGANDO...</h1>
        </div>)}


        </div>  
    );
}
export default ShiftInformation;

