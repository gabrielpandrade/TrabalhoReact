import http from "../http-common";

class musicaDataService {

    getAll() {
        return http.get(`/musica`);
    }

    get(id) {
        return http.get(`/musica/${id}`);
    }

    create(data) {
        return http.post(`/musica`, data);
    }

    update(id, data){
        return http.put(`/musica/${id}`,data);
    }

    delete(id){ 
        return http.delete(`/musica/${id}`);
    }

    deleteAll(){
        return http.delete("/musica");
    }
}

export default new musicaDataService();