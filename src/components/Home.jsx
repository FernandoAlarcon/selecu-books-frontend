import React, { useState, useEffect } from 'react';
import InfoBook from './InfoBook';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/home.css';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const URL_BASE = 'http://localhost:8000';




function Home (){

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        getLibros();
    },[]);

    const [dataLibros, setdataLibros]               = useState([]);
    const [searchDataLibros, setSearchDataLibros]   = useState('');
    const [open, setOpen] = useState(false);

    const [DataBook, setDataBook] = useState({
        id: "",
        titulo: "",
        descripcion: "",
        autor: "",
        genero: "",
        cantidades: "",
        url_foto:""
    });

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 950,
        bgcolor: 'black',
        border: '2px solid #000',
        boxShadow: 30,
        p: 4,
    };
    
    const handleClose = () =>{ 
        setOpen(false);
    }

    const handleOpen = (data) => {
 

        setOpen(true);
        setDataBook({
            id: data.id,
            titulo: data.titulo,
            descripcion: data.descripcion,
            autor: data.autor,
            genero: data.genero,
            cantidades: data.cantidades,
            url_foto:data.url_foto
        });
    }
    
    const getLibros = async () => {
        try {
            await axios.get(`${URL_BASE}/libros`,{params:{data:searchDataLibros}}).then( res => {
                 
                setdataLibros(res.data)
            })
        } catch (error) {
            
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: error
            })
        }
    }
    
    const DeleteLibro = (row) => { 

        try {
            
              Swal.fire({
                title: 'Seguro que quieres elimnar?', 
                showCancelButton: true
              }).then( async (result)  => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    
                    await axios.delete(`${URL_BASE}/libros/${row.id}`).then( res => {

                        if( res.data.status ==  true ){

                            getLibros();
                            Swal.fire('Eliminado!', '', 'success')

                        }

                    }); //end axios

                } else if (result.isDenied) {
                  //Swal.fire('Changes are not saved', '', 'info')
                }
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: error
            })
        }

    }

    return <div className="">
                            
                            <div className="main-banner">
                                <div className="row">
                                <div className="col-lg-7">
                                    <div className="header-text">
                                    <h6>Bienvenido </h6>
                                    <h4><em>Selecu</em> Books</h4>
                                    <div className="main-button">
                                        <a href="#search">Busca tu libro</a>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <div className="most-popular">
                                <div className="row">
                                <div className="col-lg-12">
                                    <div className="heading-section">
                                    <h4><em>Nuestra </em> Biblioteca</h4>
                                    </div>
                                    <div className="row">
                                        <div className="search-input col-lg-4">
                                            <div id="search" action="#">
                                                <input  type="text" className='form-control' 
                                                        placeholder="Escribe algo" id='searchText' 
                                                        name="searchDataLibros"
                                                        onChange={ (event) => {
                                                            setSearchDataLibros(event.target.value)
                                                            getLibros();
                                                        }} />
                                                <i className="fa fa-search"></i>
                                            </div>
                                        </div><br/>  
                                    </div>
                                    <div className="row libros-div">
                                    {
                                        dataLibros.map( data => (
                                            <div className="col-lg-3 col-sm-6 ">
                                                <div className="item div-libro">
                                                    <img src={data.url_foto} className='img-libro' alt=""/>
                                                    <h4 className='title-book' >    {data.titulo.substr(0,45)} ... <br/>
                                                            <span> {data.descripcion.substr(0,20) } ... </span>
                                                    </h4>
                                                    <ul>
                                                        <li><i className="fa fa-star"></i> 4.8</li>
                                                        <li title='Unidades disponibles' ><i className="fa fa-book"></i> {data.cantidades} U</li>
                                                        <li title='Eliminar libro' className='eliminar-libro' onClick={() => DeleteLibro(data)} ><i className="fa fa-trash"></i> </li>
                                                        <li title='Editar libro' className='editar-libro' onClick={() => handleOpen(data) } ><i className="fa fa-pencil"></i> </li>
                                                    </ul>
                                                    <span>
                                                        <b>Autor  : </b> {data.autor} <br/>
                                                        <b>Genero : </b> {data.genero} <br/>
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                   
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <div> 
                                <Modal
                                    className='modal-book'
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                    backdrop: {
                                        timeout: 500,
                                    },
                                    }}
                                >   
                                    <Box  className='modal-edit-book' sx={style}>

                                        <InfoBook dataBook={DataBook} handleClose={() => handleClose()}  getLibros={getLibros} />
                                    
                                    </Box>
                                </Modal>
                            </div>
            </div>
}
  
export default Home;