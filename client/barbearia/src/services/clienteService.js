import api from "./api"

export const listarClientes = () => {
    return api.get("/clientes")
}

export const buscarCliente = (id) => {
    return api.get(`/clientes/${id}`)
}

export const criarCliente = (cliente) => {
    return api.post("/clientes", cliente)
}

export const atualizarCliente = (id, cliente) => {
    return api.put(`/clientes/${id}`, cliente)
}

export const excluirCliente = (id) => {
    return api.delete(`/clientes/${id}`)
}