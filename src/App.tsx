import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Scene from './components/Scene';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Scene />
      <Footer />
    </div>
  );
}

export default App;
