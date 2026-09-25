import { useEffect, useState } from "react"

import api from "../services/api"

import ClienteForm from "../components/ClienteForm"

function Clientes() {

    const [clientes, setClientes] = useState([])
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(false)

    useEffect(() => {
        carregarClientes()
    }, [])

    async function carregarClientes() {
        try {
            setCarregando(true)
            setErro(false)

            const response = await api.get("/clientes")

            setClientes(response.data)

        } catch (error) {
            console.error("Erro ao carregar clientes:", error)
            setErro(true)

        } finally {
            setCarregando(false)
        }
    }

    function adicionarCliente(cliente) {
        setClientes((clientesAtuais) => [
            ...clientesAtuais,
            cliente,
        ])
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Clientes
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Gerencie os clientes da sua barbearia
                        </p>
                    </div>

                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Novo cliente
                    </button>

                </div>

                <div className="rounded-xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-5">

                        <div className="relative max-w-md">

                            <input
                                type="text"
                                placeholder="Buscar cliente..."
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                            />

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-gray-200 bg-gray-50">

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Cliente
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Telefone
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Agendamentos
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Ações
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {carregando ? (

                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Carregando clientes...
                                        </td>
                                    </tr>

                                ) : erro ? (

                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-10 text-center text-sm text-red-500"
                                        >
                                            Não foi possível carregar os clientes.
                                        </td>
                                    </tr>

                                ) : clientes.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Nenhum cliente cadastrado.
                                        </td>
                                    </tr>

                                ) : (

                                    clientes.map((cliente) => (

                                        <tr
                                            key={cliente.id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                                                        {cliente.nome.charAt(0)}
                                                    </div>

                                                    <div>

                                                        <p className="font-medium text-gray-900">
                                                            {cliente.nome}
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            Cliente #{cliente.id}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {cliente.telefone}
                                            </td>

                                            <td className="px-6 py-4">

                                                <span className="text-sm font-medium text-gray-900">
                                                    —
                                                </span>

                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="flex justify-end gap-2">

                                                    <button className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
                                                        Editar
                                                    </button>

                                                    <button className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                                                        Excluir
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                    <div className="border-t border-gray-200 px-6 py-4">

                        <p className="text-sm text-gray-500">
                            {clientes.length} clientes cadastrados
                        </p>

                    </div>

                </div>

            </div>

            {mostrarFormulario && (
                <ClienteForm
                    onClose={() => setMostrarFormulario(false)}
                    onClienteCriado={adicionarCliente}
                />
            )}

        </div>
    )
}

export default Clientes