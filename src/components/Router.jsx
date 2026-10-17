import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent'
import DeleteCoche from './DeleteCoche'

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
                </Routes>
            </BrowserRouter>
        )
    }
}