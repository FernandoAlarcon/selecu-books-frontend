import './App.css';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home';
import Footer from './components/Footer.jsx';
import InfoBook from './components/InfoBook'; 
 


import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="">
          <NavBar/>
          <div className="container" > 
            <div className="row">
              <div className="col-lg-12">
                <div className="page-content">
                      <Routes  >
                          <Route exact path='/' element={< Home />}></Route>
                          <Route exact path='/newBooks' element={< InfoBook />}></Route> 
                      </Routes>
                </div>
              </div>
            </div>
          </div>
          <Footer/>    
        </div>
    </Router>
  );
}

export default App;
