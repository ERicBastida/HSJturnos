import {useState} from 'react'
import {Modal,Button} from 'react-bootstrap'
function ModalInfo() {
    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
  
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header >
            <Modal.Title>Información importante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Antes de generar un turno para el programa de vacunación, usted deberá registrarse previamente en la página  
             Vacunación Argentina haciendo <a href="https://vacunacion.argentina.gob.ar/vacunacion/inscripcion/AR-E">click acá</a>.
          </Modal.Body>
          <Modal.Footer>          
            <Button variant="success" onClick={handleClose}>Ya me inscribi</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
   
  export default ModalInfo;