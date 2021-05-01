import axios from "axios"

class UsuarioService{

    
    async cadastrar(data){
        return axios({
            url:"http://192.168.0.124:3000/usuario/cadastrar",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {
                accept: 'application/json'
            }
        }).then((response) =>  {
            return Promise.resolve(response)
        }).catch((erro) => {
            return Promise.reject(erro)
        })
    }
    async login(data){
        return axios({
            url:"http://192.168.0.124:3000/usuario/login",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {
                accept: 'application/json'
            }
        }).then((response) =>  {
            return Promise.resolve(response)
        }).catch((erro) => {
            return Promise.reject(erro)
        })
    }
}

const usuarioService = new UsuarioService()
export default usuarioService 