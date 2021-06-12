import covidVaccineIMG from '../assests/covid-vaccine-logo.png'
import printerIMG from '../assests/print.png';
import warningIMG from '../assests/warning.png';
import federacionLogo from '../assests/federacion.png';
import PDFreport from '../utils/PDFReport';
import {useEffect,  useState} from 'react';
import STATE from '../enums/StateApplication';
import AGE_RANGE from '../enums/AgeRange';
import React from 'react';
import { Ring } from 'react-awesome-spinners'



const VaccineLogo = {
    width : 'inherit'
}
const PrinterLogo = {
    width : '6em',
    height : '6em'
}

const WarningLogo = {
    marginTop: '2em',
    width: '6em'
}

const TextWarning = {
    marginButtom: '0.5em',

}

const TextAgeWarning = {
    fontSize: '3em',
    color: '#1e7e34',
    fontWeight: 'bold'

}

const loadingStyle = {
    marginTop: '8em'

}
const FederacionLogo = {
    marginTop: '8.5em',
    width: '8em'

}
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
        
        <>
            { values === STATE.INFO_HOSPITAL  && (             
            <div className="col-lg-4 col-md-4 panel-info">
                <h1>Hospital San José</h1>
                <img  src={covidVaccineIMG} alt="Vacunación COVID-19" style={VaccineLogo} alt="Vacunación COVID"/>
                <h2>PROGRAMA DE VACUNACIÓN</h2>
                <h2>2021</h2>
            </div>)}
            { values === STATE.INFO_SHIFT  && (             
            <div className="col-lg-4 col-md-4 panel-info">
                    <h1>SU TURNO ES EL Nº</h1>
                    <p>{props.turnNumber}</p>
                    <img className="print-btn" src={printerIMG} alt="Descargar comprobante" style={PrinterLogo}/>
                    <PDFreport {...shiftInfo}></PDFreport> 
            </div>)}
            { values === STATE.LOADING  && (             
            <div className="col-lg-4 col-md-4 panel-info">
                <h1>Generando su turno...</h1>
                <div style={loadingStyle}>
                    <Ring />
                </div>
                <img src={federacionLogo} style={FederacionLogo} alt="Federación Te enamora"/>
                
            </div>)}
            { values === STATE.WARNING_AGE  && (             
            <div className="col-lg-4 col-md-4 panel-info">
                    <img className="print-btn" src={warningIMG} style={WarningLogo} alt="Atención"/>
                    <h2 style={TextWarning}>Por cuestiones de seguridad y aglomeración de personas, para esta oportunidad solo se aceptan personas en el rango de edad de</h2>
                    <h3 style={TextAgeWarning}>{AGE_RANGE.MIN_AGE} - {AGE_RANGE.MAX_AGE} años</h3>                
            </div>)}
        </>

    );
}
export default ShiftInformation;

