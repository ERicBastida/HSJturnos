import ShiftInformation from '../components/ShiftInformation';
import UserInformation from './UserInformation';
import { db } from "../config/firebase";
import {useState, useEffect} from 'react'
import STATE from '../enums/StateApplication';
import ModalInfo from './Modal';
import SHOW_TOAST from '../config/config';
import {  toast } from 'react-toastify';
const ShiftForm = () => {

    const [infoType, setInfoType] = useState(STATE.INFO_HOSPITAL);
    const [turnNumber, setTurnNumber] = useState(0);
    const [identification, setIdentification] = useState("");
    
    
    const getTurnNumber = async (id) => {
        
       
        const turnUserResponse = await db.collection('turns').doc(id).get();
        const turnUser = turnUserResponse.data();
                        
        return turnUser === undefined ? 0 : turnUser.turnNumber;
            
    };

    const addNewTurn = async (turnUserObject) => {    
        try {

            await db.collection("turns").doc(turnUserObject.documentID).set({
                turnNumber: turnUserObject.turnNumber,
                age: turnUserObject.age,
                name : turnUserObject.name
            });
            
            toast("Se ha generado correctamente su turno.", { type: "success", autoClose: SHOW_TOAST.TIME  });
            
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setInfoType(STATE.BLOCK_PAGE);
    }, []);

    return (
        <div>
            <div className="container hq-template">
                <div className="row">
                    <ShiftInformation {...{infoType, turnNumber, identification}}/>
                    <UserInformation  {...{ addNewTurn, getTurnNumber, setInfoType, setTurnNumber, setIdentification }} />
                </div>
            </div>
                <div className="copyright">
                <a href="https://www.linkedin.com/in/ericbastida/" target="_blank" rel="noreferrer">Desarrollado por Ing. Bastida Eric @ Copyright 2021</a>
                <br/>
            </div> 
            <ModalInfo></ModalInfo>
        </div>
    )
}

export default ShiftForm;