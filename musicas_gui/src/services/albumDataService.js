import http from "../http-common";

class albumDataService {

    getAll() {
        return http.get(`/album`);
    }

    get(id) {
        return http.get(`/album/${id}`)
    }

    create(data) {
        return http.post(`/album`, data);
    }

    update(id, data){
        return http.put(`/album/${id}`,data);
    }

    delete(id){ 
        return http.delete(`/album/${id}`);
    }

    deleteAll(){
        return http.delete("/album");
    }
}

export default new albumDataService();