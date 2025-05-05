import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Scene from './components/Scene';

function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Header />
      <div className="relative">
        <Scene />
      </div>
      <Footer />
    </div>
  );
}

export default App;
