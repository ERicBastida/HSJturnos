import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import STATE from "../enums/StateApplication";
import AGE_RANGE from '../enums/AgeRange';
import SHOW_TOAST from '../config/config';

const UserInformation = (props) => {

    const initialStateValues = 
    {
      documentID : '',
      age: '',
      turnNumber : '',
      name : ''
    };

    const [values, setValues] = useState(initialStateValues);
    const [canEdit, setCanEdit] = useState(false);

    const handleInputChange = (e) => {    
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const isInRangeAge = (strAge) => {

        var numberAge = parseInt(strAge);
        var result =  ( AGE_RANGE.MIN_AGE  <= numberAge) && (numberAge <= AGE_RANGE.MAX_AGE);
        return result;      
    };
    const onlyNumber = (str ) => {
        
        const hasOnlyNumbers = !(String(str).includes('.') || String(str).includes(','))
        
        return hasOnlyNumbers;

    };

    const getNextTurnNumber = async () => {
        var nextTurnNumber = 0;
        const response = await db.collection('turns').orderBy('turnNumber','desc').limit(1).get();
    
        
        response.forEach( res => 
          {
            nextTurnNumber = res.data().turnNumber +1 ;        
          },this)
        
        return nextTurnNumber;
       
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        window.scrollTo(0,0);
        if(values.age === "" || values.documentID === "" ){
            
            toast("Ingrese información", { type: "error", autoClose: SHOW_TOAST.TIME });
            return;
        }
        
        if(!onlyNumber(values.documentID)){            
            toast("Por favor, ingrese un documento sin puntos ni comas.", { type: "error", autoClose: SHOW_TOAST.TIME  });
            return;
        }

        if(!onlyNumber(values.age)){
            toast("Por favor, ingrese una edad sin puntos ni comas.", { type: "error", autoClose: SHOW_TOAST.TIME  });
            return;
        }
        

        if(canEdit === false){
            setCanEdit(true);
            //Dejamos los datos como estaba antes
            setValues({ ...initialStateValues });
            props.setInfoType(STATE.INFO_HOSPITAL);
            return;
        }else{
            setCanEdit(false);
        }
        

        if(!isInRangeAge(values.age)){
            props.setInfoType(STATE.WARNING_AGE)
            return;
        }else{
            
            props.setInfoType(STATE.LOADING);
        }
    
                  
        values.turnNumber  = await props.getTurnNumber(values.documentID);
        
        if(values.turnNumber === 0){
          
          props.setInfoType(STATE.BLOCK_PAGE); 
          return
          values.turnNumber = await getNextTurnNumber();
          
          props.addNewTurn(values);      
    
        }
        props.setTurnNumber(values.turnNumber);         
        props.setIdentification(values.documentID)       
        props.setInfoType(STATE.INFO_SHIFT);
   

      };

      useEffect(() => {          
        setValues(initialStateValues);
        setCanEdit(true);
      }, []);

 
    

    return (
        <div className="col-lg-8 col-md-8 col-sm-12 col-12 register-form">
            <h1>{canEdit ? "Ingrese sus datos:": "Tus datos son:"}</h1>
            <form onSubmit={handleSubmit}>            
                <div className="form-group">
                    <input 
                        disabled={!canEdit}
                        type="text" 
                        className="form-control register-input" 
                        placeholder="NOMBRE Y APELLIDO" 
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}/>

                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                </div>
                <div className="form-group">
                    <input 
                        disabled={!canEdit}
                        type="number" 
                        required={true}
                        className="form-control register-input" 
                        value={values.age}
                        name="age"
                        placeholder="EDAD"
                        onChange={handleInputChange}/>
                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" className="svg-inline--fa fa-clock fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path></svg>
                </div>
                <div className="form-group">
                    <input  
                        disabled={!canEdit}
                        required={true}
                        type="number" 
                        className="form-control register-input" 
                        placeholder="NÚMERO DE DOCUMENTO"
                        value={values.documentID}    
                        name="documentID"
                        onChange={handleInputChange}/>

                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" aria-hidden="true" focusable="false" data-prefix="far" data-icon="address-card" className="svg-inline--fa fa-address-card fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H48V80h480v352zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2zM360 320h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8z"></path></svg>
                </div>
                <div className="register-login-btn">
                <input
                    className="btn btn-primary register-btn"
                    type='submit'
                    value={canEdit  ? "Sacar turno" : "Volver"}
                    />                    
                </div>
            </form>
        </div>
    );
}

export default UserInformation;