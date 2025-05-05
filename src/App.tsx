import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Scene from './components/Scene';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 relative">
        <Scene />
      </main>
      <Footer />
    </div>
  );
}

export default App;
