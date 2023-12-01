import Logo from '../components/Logo';
import Header from '../components/Header';
import { BrowserRouter as Router } from "react-router-dom";
import Footer from '../components/Footer';
import ScrollButton from '../components/ScrollButton';
import '../styles/App.css';
import AnimatedRoutes from '../components/AnimatedRoutes';
import { Suspense } from 'react';
function App() {


  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="spinner">
          </div>
        }
      >
        <Router>
          <Logo />
          <Header />
          <AnimatedRoutes />
          <ScrollButton />
          <Footer />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
