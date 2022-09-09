import './App.css';
import Container from './components/Container/Container';
import { FormContextProvider } from './context/FormContext';
// import Footer from './components/Footer/Footer';
// import Navbar from './components/Navbar/Navbar';
import { PupUpProvider } from "./context/PopUpContext"

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <PupUpProvider>
        <FormContextProvider>
          <Container />
        </FormContextProvider>
      </PupUpProvider>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
