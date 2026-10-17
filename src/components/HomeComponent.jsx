import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import ServiceCoches from '../services/ServiceCoches';

export default class HomeComponent extends Component {
    service = new ServiceCoches();
    state = {
        coches: [],
        status: false
    }

    deleteCoche = (coche) => {
        this.service.deleteCoche(coche.idCoche).then((result) => {
            this.loadCoches();
        })
    }

    loadCoches = () => {
        this.service.getCoches().then((datos) => {
            this.setState({
                coches: datos,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadCoches();
    }

    render() {
        if (this.state.status == true) {
            return (
                <main className="mx-auto max-w-5xl px-4 py-10">
                    <h1 className="mb-6 text-3xl font-bold text-slate-900">Nuestros coches</h1>
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900 text-sm uppercase tracking-wider text-slate-300">
                                <tr>
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3">Marca</th>
                                    <th className="px-4 py-3">Modelo</th>
                                    <th className="px-4 py-3">Conductor</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {
                                    this.state.coches.map((coche, index) => {
                                        return (<tr key={index} className="transition hover:bg-amber-50">
                                            <td className="px-4 py-3">
                                                <img src={coche.imagen} alt={coche.modelo}
                                                    className="h-12 w-20 rounded-md object-cover" />
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-slate-900">{coche.marca}</td>
                                            <td className="px-4 py-3 text-slate-700">{coche.modelo}</td>
                                            <td className="px-4 py-3 text-slate-500">{coche.conductor}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <NavLink to={"/details/" + coche.idCoche}
                                                        className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700">
                                                        Detalles
                                                    </NavLink>
                                                    <NavLink to={"/update/" + coche.idCoche}
                                                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                                                        Edit
                                                    </NavLink>
                                                    <button onClick={() => {
                                                        this.deleteCoche(coche)
                                                    }}
                                                        className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </main>
            )
        } else {
            return (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-amber-400"></div>
                </div>
            )
        }
    }
}