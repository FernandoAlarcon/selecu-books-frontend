import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/infobook.css';

const URL_BASE = 'http://localhost:8000';


function InfoBook (props) {

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        checkInfo();
    },[]);

    const [editBook, setEditBook] = useState(false);
    const [DataBook, setDataBook] = useState({
        id: "",
        titulo: "",
        descripcion: "",
        autor: "",
        genero: "",
        cantidades: "",
        url_foto:""

    });

    const checkInfo = () => {
        if(props.dataBook){

            let data = props.dataBook;
            setEditBook(true);
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
    }

    const handleChange = (event) => { 
        setDataBook({
            ...DataBook,
            [event.target.name]: event.target.value
        });
    };

    const CleanForm = () => {
        setDataBook({
            id: "",
            titulo: "",
            descripcion: "",
            autor: "",
            genero: "",
            cantidades: "",
            url_foto:""
        });
    }//CleanForm

    const NuevoLibro = async () => {

        try {   
            
            if( DataBook.titulo !== "" || 
                DataBook.descripcion !== "" || 
                DataBook.autor !== "" || 
                DataBook.genero !== "" || 
                Number(DataBook.cantidades) > 1 || 
                DataBook.url_foto !== ""){
 
             //handleClose() 
 
             let DataGo = {
                 'titulo': DataBook.titulo,
                 'descripcion': DataBook.descripcion,
                 'autor': DataBook.autor,
                 'genero': DataBook.genero,
                 'cantidades': DataBook.cantidades,
                 'url_foto': DataBook.url_foto
             }

             console.log(DataGo);
 
             await axios.post(`${URL_BASE}/libros`, DataGo).then( res => {
                 
                 console.log(res)
 
                 if(res.data.status == true){
                     Swal.fire({
                         icon: 'success',
                         title: 'Buen trabajo...',
                         text: res.data.message
                        })                    
                        CleanForm();
                 }else{
                     Swal.fire({
                         icon: 'error',
                         title: 'Error Form',
                         text: res.data.message
                     })
                }
             })
            }else{
             Swal.fire({
                 icon: 'warning',
                 title: 'Error Form',
                 text: 'Deben estar todos lo campos llenos...'
             })
            }
 
         } catch (error) {
             
             Swal.fire({
                 icon: 'error',
                 title: 'error...',
                 text: error
             })
         }

    }

    const EditarLibro = async () => {
        try {                

            await axios.put(`${URL_BASE}/libros/${DataBook.id}`, DataBook).then( res => {
               if(res.data.status === true ){
                    CleanForm();
                    props.getLibros();
                    props.handleClose();
                    setEditBook(true);

                    Swal.fire({
                        icon: 'success',
                        title: 'Buen trabajo...',
                        text: res.data.message
                    })
               }else{

                Swal.fire({
                    icon: 'error',
                    title: 'Error Form',
                    text: res.data.message
                })

               }/// end if
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
                <div className="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="main-profile ">
                                {   editBook === false ?
                                        <h4>Añade nuevos libros</h4>  
                                    :
                                        <h4>Editar libros</h4> 
                                }
                                <br/>
                                <div class="row">
                                
                                <div class="col-lg-4 align-self-center">
                                    {
                                        DataBook.url_foto == "" ?
                                          <img src="https://static6.depositphotos.com/1007919/580/i/600/depositphotos_5801183-stock-photo-generic-book.jpg" className='foto-book' alt=""  />
                                        :
                                          <img src={DataBook.url_foto} alt="" className='foto-book' />
                                    }
                                    <div class="main-info header-text"><br/>
                                        <p>                                             
                                            <b>Unidades  - </b> {DataBook.cantidades} <br/>
                                            <b>Autor   - </b> {DataBook.autor} <br/>
                                            <b>Genero  - </b> {DataBook.genero} <br/>                                             
                                        </p><hr/>
                                        {/* <span>Offline</span> */}
                                        <h4>{ DataBook.titulo }</h4>
                                        <p> { DataBook.descripcion } </p> <br/>
                                        
                                        
                                    </div>
                                </div>
                                <div class="col-lg-4  ">
                                    <ul>
                                        <li>
                                            <input  type="text" className='form-control' 
                                                            placeholder="Titulo" id='titulo' 
                                                            name="titulo"
                                                            value={DataBook.titulo}
                                                            onChange={handleChange} />
                                        </li>
                                        <li>
                                            <input  type="text" className='form-control' 
                                                            placeholder="autor" id='autor' 
                                                            name="autor"
                                                            value={DataBook.autor}
                                                            onChange={handleChange} />
                                        </li>
                                        <li>
                                            <input  type="text" className='form-control' 
                                                            placeholder="genero" id='genero' 
                                                            name="genero"
                                                            value={DataBook.genero}
                                                            onChange={handleChange} />
                                        </li>
                                        <li>
                                            <input  type="text" className='form-control' 
                                                            placeholder="cantidades" id='cantidades' 
                                                            name="cantidades"
                                                            value={DataBook.cantidades}
                                                            onChange={handleChange} />
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-lg-4  ">
                                    <ul>
                                        <li>
                                            <input  type="text" className='form-control' 
                                                            placeholder="url foto" id='url_foto' 
                                                            name="url_foto"
                                                            value={DataBook.url_foto}
                                                            onChange={handleChange} />
                                        </li>
                                        <li>
                                            <div class="form-group">
                                                <label for="descripcion">Descripcion libro</label>
                                                <textarea className="form-control"
                                                          id="descripcion"
                                                          name="descripcion"
                                                          value={DataBook.descripcion}
                                                          onChange={handleChange}
                                                          placeholder='Descripcion' rows="3"></textarea>
                                            </div>
                                        </li>
                                        <div class="main-border-button">
                                        {   editBook === false ?
                                                <button className='btn btn-primary' onClick={NuevoLibro} > Agregar libro </button>
                                            :
                                                <button className='btn btn-warning' onClick={EditarLibro} > Guardar Cambios </button>
                                        }
                                        </div>
                                    </ul>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    

}

export default InfoBook;