import { useEffect, useState } from "react"

import api from "../services/api"

import BarbeiroForm from "../components/BarbeiroForm"

function Barbeiros() {

    const [barbeiros, setBarbeiros] = useState([])

    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    const [barbeiroEditando, setBarbeiroEditando] = useState(null)

    const [carregando, setCarregando] = useState(true)

    const [erro, setErro] = useState(false)

    useEffect(() => {

        carregarBarbeiros()

    }, [])

    async function carregarBarbeiros() {

        try {

            setCarregando(true)
            setErro(false)

            const response = await api.get("/barbeiros")

            setBarbeiros(response.data)

        } catch (error) {

            console.error("Erro ao carregar barbeiros:", error)

            setErro(true)

        } finally {

            setCarregando(false)

        }
    }

    function adicionarBarbeiro(barbeiro) {

        setBarbeiros((barbeirosAtuais) => [
            ...barbeirosAtuais,
            barbeiro,
        ])
    }

    function editarBarbeiro(barbeiro) {

        setBarbeiroEditando(barbeiro)
    }

    function atualizarBarbeiro(barbeiroAtualizado) {

        setBarbeiros((barbeirosAtuais) =>
            barbeirosAtuais.map((barbeiro) =>
                barbeiro.id === barbeiroAtualizado.id
                    ? barbeiroAtualizado
                    : barbeiro
            )
        )

        setBarbeiroEditando(null)
    }

    async function excluirBarbeiro(id) {

        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este barbeiro?"
        )

        if (!confirmar) {
            return
        }

        try {

            await api.delete(`/barbeiros/${id}`)

            setBarbeiros((barbeirosAtuais) =>
                barbeirosAtuais.filter(
                    (barbeiro) => barbeiro.id !== id
                )
            )

        } catch (error) {

            console.error("Erro ao excluir barbeiro:", error)

            setErro(true)

        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Barbeiros
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Gerencie os barbeiros da sua barbearia
                        </p>
                    </div>

                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Novo barbeiro
                    </button>

                </div>

                <div className="rounded-xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-5">

                        <div className="relative max-w-md">

                            <input
                                type="text"
                                placeholder="Buscar barbeiro..."
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                            />

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-gray-200 bg-gray-50">

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Barbeiro
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Telefone
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
                                            colSpan="3"
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Carregando barbeiros...
                                        </td>

                                    </tr>

                                ) : erro ? (

                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="px-6 py-10 text-center text-sm text-red-500"
                                        >
                                            Não foi possível carregar os barbeiros.
                                        </td>

                                    </tr>

                                ) : barbeiros.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Nenhum barbeiro cadastrado.
                                        </td>

                                    </tr>

                                ) : (

                                    barbeiros.map((barbeiro) => (

                                        <tr
                                            key={barbeiro.id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                                                        {barbeiro.nome.charAt(0)}
                                                    </div>

                                                    <div>

                                                        <p className="font-medium text-gray-900">
                                                            {barbeiro.nome}
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            Barbeiro #{barbeiro.id}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {barbeiro.telefone}
                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        onClick={() => editarBarbeiro(barbeiro)}
                                                        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        onClick={() => excluirBarbeiro(barbeiro.id)}
                                                        className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                                    >
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
                            {barbeiros.length} barbeiros cadastrados
                        </p>

                    </div>

                </div>

            </div>

            {mostrarFormulario && (
                <BarbeiroForm
                    onClose={() => setMostrarFormulario(false)}
                    onBarbeiroCriado={adicionarBarbeiro}
                />
            )}

            {barbeiroEditando && (
                <BarbeiroForm
                    barbeiro={barbeiroEditando}
                    onClose={() => setBarbeiroEditando(null)}
                    onBarbeiroAtualizado={atualizarBarbeiro}
                />
            )}

        </div>
    )
}

export default Barbeiros