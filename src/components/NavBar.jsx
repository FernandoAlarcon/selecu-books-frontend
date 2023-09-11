import * as React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar (){

    return(
        <div> 
            <div id="js-preloader" className="js-preloader">
                <div className="preloader-inner">
                    <span className="dot"></span>
                    <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div> 
 
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav"> 
                                <Link to="/" className="logo">
                                    <img src="https://www.selecu.net/assets/images/logo.png" alt="" />
                                </Link> 
                            
                                <ul className="nav">
                                    <li><Link to="/" className="active">Libreria</Link></li>
                                    <li><Link to="/newBooks">Nuevos Libros</Link></li>
                                </ul>   
                                {/* <a className='menu-trigger' href="#">
                                    <span>Menu</span>
                                </a>  */}
                            </nav>
                        </div>
                    </div>
                </div>
            </header> 
        </div>
    )
}