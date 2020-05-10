import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000'

//
// Lo mas seguro es que lo integre con los componentes de una vez porque es la 
// misma cantidad de lineas de codigo y bueno, lel
//

export class ApiService {

    constructor(){ }

    getAll(collection) {
        const url = `${API_URL}/api/${collection}/`;
        return axios.get(url).then(response => response.data)
    }

    get(collection, id) {
        const url = `${API_URL}/api/${collection}/${id}/`;
        return axios.get(url).then(response => response.data);
    }

    delete(collection, data) {
        const url = `${API_URL}/api/${collection}/${data.id}/`;
        return axios.delete(url);
    }

    create(collection, data) {
        const url = `${API_URL}/api/${collection}/`;
        return axios.post(url, data);
    }

    update(collection, data) {
        const url = `${API_URL}/api/${collection}/${data.id}/`;
        return axios.put(url, movie);
    }

}

export default ApiService
