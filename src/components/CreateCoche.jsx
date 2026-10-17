import React, { Component } from 'react'
import ServiceCoches from '../services/ServiceCoches'
import { Navigate } from 'react-router-dom';

export default class CreateCoche extends Component {
    service = new ServiceCoches();
    cajaIdcoche = React.createRef();
    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();

    state = {
        mensaje: null,
        status: false,
        imagen: ""
    }

    //PARA LA VISTA PREVIA DE LA IMAGEN
    cambiarImagen = () => {
        this.setState({
            imagen: this.cajaImagen.current.value
        })
    }

    insertCoche = (event) => {
        event.preventDefault();
        //CREAMOS EL OBJETO COCHE
        let coche = {
            idCoche: parseInt(this.cajaIdcoche.current.value),
            marca: this.cajaMarca.current.value,
            modelo: this.cajaModelo.current.value,
            conductor: this.cajaConductor.current.value,
            imagen: this.cajaImagen.current.value
        }
        //LOS ERRORES SE CAPTURAN IGUAL EN UNA PROMESA (then...catch)
        this.service.insertCoche(coche)
            .then((result) => {
                //CAMBIAMOS EL ESTADO PARA LA NAVEGACION
                this.setState({
                    status: true
                })
            }).catch((error) => {
                this.setState({
                    mensaje: error.message
                })
            })
    }

    render() {
        if (this.state.status == true) {
            return (<Navigate to="/" />)
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
                                : (<span className="text-sm text-slate-400">Vista previa de la imagen</span>)
                        }
                    </div>

                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-slate-900">Nuevo coche</h1>
                        {
                            this.state.mensaje &&
                            (<p className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                                {this.state.mensaje}
                            </p>)
                        }
                        <form className="mt-4 space-y-4">
                            <div>
                                <label className={label}>Id coche</label>
                                <input type="number" className={input} ref={this.cajaIdcoche} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={label}>Marca</label>
                                    <input type="text" className={input} ref={this.cajaMarca} />
                                </div>
                                <div>
                                    <label className={label}>Modelo</label>
                                    <input type="text" className={input} ref={this.cajaModelo} />
                                </div>
                            </div>
                            <div>
                                <label className={label}>Conductor</label>
                                <input type="text" className={input} ref={this.cajaConductor} />
                            </div>
                            <div>
                                <label className={label}>URL de la imagen</label>
                                <input type="text" className={input} ref={this.cajaImagen}
                                    onChange={this.cambiarImagen} placeholder="https://..." />
                            </div>
                            <button onClick={this.insertCoche}
                                className="w-full rounded-lg bg-amber-400 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-amber-300">
                                Insertar
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        )
    }
}