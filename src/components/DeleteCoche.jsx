import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import ServiceCoches from '../services/ServiceCoches';

export default class DeleteCoche extends Component {
    service = new ServiceCoches();
    state = {
        coche: null,
        status: false
    }

    //AL RECIBIR EL ID (PROPS) BUSCAMOS EL COCHE PARA MOSTRARLO
    componentDidMount = () => {
        this.service.findCoche(this.props.idcoche)
            .then((result) => {
                this.setState({
                    coche: result
                })
            })
    }

    //CANCELAR: NO HACEMOS NADA, SOLO VOLVEMOS A HOME
    cancelar = () => {
        this.setState({ status: true });
    }

    //ELIMINAR: BORRAMOS Y DESPUES VOLVEMOS A HOME
    eliminar = () => {
        this.service.deleteCoche(this.props.idcoche)
            .then(() => {
                this.setState({ status: true });
            })
    }

    render() {
        //AL NAVEGAR A "/" HOME SE VUELVE A MONTAR Y
        //SU componentDidMount RECARGA LOS COCHES
        if (this.state.status == true) {
            return (<Navigate to="/" />)
        }
        if (this.state.coche == null) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-amber-400"></div>
                </div>
            )
        }
        return (
            <main className="mx-auto max-w-lg px-4 py-12">
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                    <img src={this.state.coche.imagen}
                        alt={this.state.coche.marca + " " + this.state.coche.modelo}
                        className="aspect-video w-full object-cover" />
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-slate-900">Eliminar coche</h1>
                        <p className="mt-1 text-slate-500">¿Seguro que quieres eliminar este coche?</p>
                        <ul className="mt-4 divide-y divide-slate-100 rounded-lg ring-1 ring-slate-200">
                            <li className="flex justify-between px-4 py-2">
                                <span className="font-semibold text-slate-700">Id</span>
                                <span className="text-slate-600">{this.state.coche.idCoche}</span>
                            </li>
                            <li className="flex justify-between px-4 py-2">
                                <span className="font-semibold text-slate-700">Marca</span>
                                <span className="text-slate-600">{this.state.coche.marca}</span>
                            </li>
                            <li className="flex justify-between px-4 py-2">
                                <span className="font-semibold text-slate-700">Modelo</span>
                                <span className="text-slate-600">{this.state.coche.modelo}</span>
                            </li>
                            <li className="flex justify-between px-4 py-2">
                                <span className="font-semibold text-slate-700">Conductor</span>
                                <span className="text-slate-600">{this.state.coche.conductor}</span>
                            </li>
                        </ul>
                        <div className="mt-6 flex gap-3">
                            <button onClick={this.cancelar}
                                className="flex-1 rounded-lg bg-slate-100 px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-200">
                                Cancelar
                            </button>
                            <button onClick={this.eliminar}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-500">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}