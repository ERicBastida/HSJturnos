import './App.css';
import ShiftForm from './components/ShiftForm';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
        <ShiftForm></ShiftForm>
        <ToastContainer />
    </div>
  );
}

export default App;
