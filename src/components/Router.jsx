import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent'
import DeleteCoche from './DeleteCoche'
  import CreateCoche from './CreateCoche'
    import UpdateCoche from './UpdateCoche'
    import DetallesCoche from './DetallesCoche'

function DetallesCocheElement() {
    let { idcoche } = useParams();
    return <DetallesCoche idcoche={idcoche}/>
}

  function UpdateCocheElement() {
      let { idcoche } = useParams();
      return <UpdateCoche idcoche={idcoche}/>
  }

function DeleteCocheElement() {
    let { idcoche } = useParams();
    return <DeleteCoche idcoche={idcoche}/>
}

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <MenuComponent/>
                <Routes>
                    <Route path="/" element={<HomeComponent/>}/>
                    <Route path="/delete/:idcoche" element={<DeleteCocheElement/>}/>
                    <Route path="/create" element={<CreateCoche/>}/>
                    <Route path="/update/:idcoche" element={<UpdateCocheElement/>}/>
                    <Route path="/details/:idcoche" element={<DetallesCocheElement/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}