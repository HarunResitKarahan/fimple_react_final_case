import './App.css';
import Container from './components/Container/Container';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container />
      <Footer/>
    </div>
  );
}

export default App;
