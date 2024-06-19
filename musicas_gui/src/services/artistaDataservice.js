import http from "../http-common";

class artistaDataService {

    getAll() {
        return http.get(`/artista`);
    }

    get(id) {
        return http.get(`/artista/${id}`);
    }

    create(data) {
        return http.post(`/artista`, data);
    }

    update(id, data){
        return http.put(`/artista/${id}`,data);
    }

    delete(id){ 
        return http.delete(`/artista/${id}`);
    }

    deleteAll(){
        return http.delete("/artista");
    }
}

export default new artistaDataService();