import axios from 'axios';
import Global from '../Global';

export default class ServiceCoches {
    async getCoches() {
        let response = await axios.get(Global.urlCoches + "api/Coches");
        return response.data;
    }

    async findCoche(idcoche) {
        let response = await axios.get(Global.urlCoches + "api/Coches/FindCoche/" + idcoche);
        return response.data;
    }

    async insertCoche(coche) {
        let response = await axios.post(Global.urlCoches + "api/Coches/InsertCoche", coche);
        return response.data;
    }

    async updateCoche(coche) {
        await axios.put(Global.urlCoches + "api/Coches/UpdateCoche", coche);
    }

    async deleteCoche(idcoche) {
        await axios.delete(Global.urlCoches + "api/Coches/DeleteCoche/" + idcoche);
    }
}