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

    const getRepeteadTurns = () => {
        const MIN = 1;
        const MAX = 50000;

        db.collection("turns")
        .where("turnNumber", ">=",MIN)
        .where("turnNumber", "<=", MAX)
        .orderBy("turnNumber", "asc")
        .get()
        .then((querySnapshot) => {
            var dataString = "";
            var countRepeted = 0;
            var backTurn = -1;
            querySnapshot.forEach((doc) => {
                const userTurn = doc.data();
                var data = `${userTurn.turnNumber}, ${doc.id}, ${userTurn.name}, ${userTurn.age}  \n `;
                dataString = dataString + data;
                if(backTurn === userTurn.turnNumber){
                    countRepeted = countRepeted + 1;
                }else{
                    backTurn = userTurn.turnNumber;
                }
                console.log(data)                
            },this);
            download("Informe.txt",dataString)
            alert(`Los repetidos son entre los turnos [${MIN} - ${MAX}] son: ${countRepeted}`)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
    }

    const download = (filename, text) =>{
        var blob = new Blob([text], {type: "text/plain"});
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      }
      
      

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
            {/* <button onClick= {getRepeteadTurns}></button> */}
        </div>
    )
}

export default ShiftForm;