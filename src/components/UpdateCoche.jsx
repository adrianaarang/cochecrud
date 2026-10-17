import React, { Component } from 'react'
import ServiceCoches from '../services/ServiceCoches';
import { Navigate } from 'react-router-dom';

export default class UpdateCoche extends Component {
    service = new ServiceCoches();
    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();

    state = {
        coche: null,
        status: false,
        imagen: ""
    }

    //SOLO RECIBIMOS EL ID: BUSCAMOS EL COCHE PARA MOSTRARLO
    componentDidMount = () => {
        this.service.findCoche(this.props.idcoche).then((result) => {
            this.setState({
                coche: result,
                imagen: result.imagen
            })
        })
    }

    //PARA LA VISTA PREVIA DE LA IMAGEN
    cambiarImagen = () => {
        this.setState({
            imagen: this.cajaImagen.current.value
        })
    }

    updateCoche = (event) => {
        event.preventDefault();
        let coche = {
            idCoche: this.state.coche.idCoche,
            marca: this.cajaMarca.current.value,
            modelo: this.cajaModelo.current.value,
            conductor: this.cajaConductor.current.value,
            imagen: this.cajaImagen.current.value
        }
        this.service.updateCoche(coche).then((result) => {
            this.setState({
                status: true
            })
        })
    }

    render() {
        if (this.state.status == true) {
            return (<Navigate to="/" />)
        }

        //HASTA QUE NO LLEGA EL COCHE NO PINTAMOS EL FORMULARIO
        if (this.state.coche == null) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-amber-400"></div>
                </div>
            )
        }

        let input = "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200";
        let label = "block text-sm font-medium text-slate-700";

        return (
            <main className="mx-auto max-w-lg px-4 py-12">
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                    {/* VISTA PREVIA */}
                    <div className="flex aspect-video items-center justify-center bg-slate-100">
                        {
                            this.state.imagen
                                ? (<img src={this.state.imagen} alt="Vista previa"
                                    className="h-full w-full object-cover" />)
                                : (<span className="text-sm text-slate-400">Sin imagen</span>)
                        }
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-slate-900">Editar coche</h1>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                                Id {this.state.coche.idCoche}
                            </span>
                        </div>
                        <form className="mt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={label}>Marca</label>
                                    <input type="text" className={input} ref={this.cajaMarca}
                                        defaultValue={this.state.coche.marca} />
                                </div>
                                <div>
                                    <label className={label}>Modelo</label>
                                    <input type="text" className={input} ref={this.cajaModelo}
                                        defaultValue={this.state.coche.modelo} />
                                </div>
                            </div>
                            <div>
                                <label className={label}>Conductor</label>
                                <input type="text" className={input} ref={this.cajaConductor}
                                    defaultValue={this.state.coche.conductor} />
                            </div>
                            <div>
                                <label className={label}>URL de la imagen</label>
                                <input type="text" className={input} ref={this.cajaImagen}
                                    defaultValue={this.state.coche.imagen}
                                    onChange={this.cambiarImagen} />
                            </div>
                            <button onClick={this.updateCoche}
                                className="w-full rounded-lg bg-amber-400 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-amber-300">
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        )
    }
}