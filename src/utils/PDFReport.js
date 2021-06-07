import React, {useState, useEffect} from 'react';
import {PDFDownloadLink, Document, Page, Text,  StyleSheet, Font } from '@react-pdf/renderer';



Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  shiftNumber: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
    color: 'red',
    fontSize: 40,
  },
  
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

// Create Document Component
const ShiftDocument = (props) => (
  <Document>
  <Page style={styles.body}>
    <Text style={styles.header} fixed>
      - Hospital San José -        
    </Text>

    <Text style={styles.title}>Sistema de Gestión de Turnos</Text>
    <Text style={styles.author}>Su turno para ser vacunado es el</Text>
    <Text style={styles.shiftNumber}>Nº {props.turnNumber}</Text>
   
    <Text style={styles.text}>
      Por favor presentarse con su documento para reespaldar la información ingresada. 
    </Text>
    <Text style={styles.text}>
      Respetar el distanciamiento social y llevar tapabocas.
    </Text>
    <Text style={styles.title}>Número de documento ingresado</Text>
    <Text style={styles.title}>{props.identification}</Text>

    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
      `Vacunación COVID-19`
    )} fixed />
  </Page>
</Document>
);

const PDFreport = (props) => {
  
  const [turnNumber, setTurnNumber] = useState(0);
  const [identification, setIdentification] = useState("");

  useEffect(() => {
    setTurnNumber(props.turnNumber);
    setIdentification(props.identification);

  }, [props.turnNumber, props.identification]);

  return (
    <>
      <div>
          <PDFDownloadLink document={<ShiftDocument {...{ turnNumber, identification}} />} fileName="comprobante_turno.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Cargando documento...' : 'Descargar comprobante'
            }
          </PDFDownloadLink>
        
      </div>
    </>
  );
};

export default PDFreport;
  
  