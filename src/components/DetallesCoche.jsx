import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import ServiceCoches from '../services/ServiceCoches';

export default class DetallesCoche extends Component {
    service = new ServiceCoches();

    state = {
        coche: null
    }

    //AL RECIBIR EL ID (PROPS) BUSCAMOS EL COCHE PARA MOSTRARLO
    componentDidMount = () => {
        this.service.findCoche(this.props.idcoche).then((result) => {
            this.setState({
                coche: result
            })
        })
    }

    render() {
        if (this.state.coche == null) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-amber-400"></div>
                </div>
            )
        }

        return (
            <main className="mx-auto max-w-4xl px-4 py-10">
                <NavLink to="/"
                    className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-900">
                    ← Volver a la lista
                </NavLink>

                <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 md:grid md:grid-cols-2">
                    {/* FOTO */}
                    <div className="aspect-video bg-slate-100 md:aspect-auto">
                        <img src={this.state.coche.imagen}
                            alt={this.state.coche.marca + " " + this.state.coche.modelo}
                            className="h-full w-full object-cover" />
                    </div>

                    {/* DATOS */}
                    <div className="flex flex-col p-8">
                        <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                            {this.state.coche.marca}
                        </p>
                        <h1 className="mt-1 text-4xl font-bold text-slate-900">
                            {this.state.coche.modelo}
                        </h1>

                        <dl className="mt-8 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <dt className="text-sm text-slate-500">Id</dt>
                                <dd className="font-medium text-slate-900">{this.state.coche.idCoche}</dd>
                            </div>
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <dt className="text-sm text-slate-500">Marca</dt>
                                <dd className="font-medium text-slate-900">{this.state.coche.marca}</dd>
                            </div>
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <dt className="text-sm text-slate-500">Modelo</dt>
                                <dd className="font-medium text-slate-900">{this.state.coche.modelo}</dd>
                            </div>
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <dt className="text-sm text-slate-500">Conductor</dt>
                                <dd className="font-medium text-slate-900">{this.state.coche.conductor}</dd>
                            </div>
                        </dl>

                        <div className="mt-auto flex gap-3 pt-8">
                            <NavLink to={"/update/" + this.state.coche.idCoche}
                                className="flex-1 rounded-lg bg-amber-400 px-4 py-2.5 text-center font-semibold text-slate-900 transition hover:bg-amber-300">
                                Editar
                            </NavLink>
                            <NavLink to={"/delete/" + this.state.coche.idCoche}
                                className="flex-1 rounded-lg bg-red-50 px-4 py-2.5 text-center font-semibold text-red-600 transition hover:bg-red-100">
                                Eliminar
                            </NavLink>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}