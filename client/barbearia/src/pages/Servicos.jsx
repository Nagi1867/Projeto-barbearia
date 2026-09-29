import { useEffect, useState } from "react"

import api from "../services/api"

import ServicoForm from "../components/ServicoForm"

function Servicos() {

    const [servicos, setServicos] = useState([])

    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    const [servicoEditando, setServicoEditando] = useState(null)

    const [carregando, setCarregando] = useState(true)

    const [erro, setErro] = useState(false)

    useEffect(() => {
        carregarServicos()
    }, [])

    async function carregarServicos() {

        try {

            setCarregando(true)
            setErro(false)

            const response = await api.get("/servicos")

            setServicos(response.data)

        } catch (error) {

            console.error("Erro ao carregar serviços:", error)

            setErro(true)

        } finally {

            setCarregando(false)

        }
    }

    function adicionarServico(servico) {

        setServicos((servicosAtuais) => [
            ...servicosAtuais,
            servico,
        ])
    }

    function editarServico(servico) {

        setServicoEditando(servico)
    }

    function atualizarServico(servicoAtualizado) {

        setServicos((servicosAtuais) =>
            servicosAtuais.map((servico) =>
                servico.id === servicoAtualizado.id
                    ? servicoAtualizado
                    : servico
            )
        )

        setServicoEditando(null)
    }

    async function excluirServico(id) {

        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este serviço?"
        )

        if (!confirmar) {
            return
        }

        try {

            await api.delete(`/servicos/${id}`)

            setServicos((servicosAtuais) =>
                servicosAtuais.filter(
                    (servico) => servico.id !== id
                )
            )

        } catch (error) {

            console.error("Erro ao excluir serviço:", error)

            setErro(true)

        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Serviços
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Gerencie os serviços da sua barbearia
                        </p>
                    </div>

                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Novo serviço
                    </button>

                </div>

                <div className="rounded-xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-5">

                        <div className="relative max-w-md">

                            <input
                                type="text"
                                placeholder="Buscar serviço..."
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                            />

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-gray-200 bg-gray-50">

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Serviço
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Duração
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Preço
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
                                            Carregando serviços...
                                        </td>

                                    </tr>

                                ) : erro ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="px-6 py-10 text-center text-sm text-red-500"
                                        >
                                            Não foi possível carregar os serviços.
                                        </td>

                                    </tr>

                                ) : servicos.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Nenhum serviço cadastrado.
                                        </td>

                                    </tr>

                                ) : (

                                    servicos.map((servico) => (

                                        <tr
                                            key={servico.id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
                                                        {servico.nome.charAt(0)}
                                                    </div>

                                                    <div>

                                                        <p className="font-medium text-gray-900">
                                                            {servico.nome}
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            Serviço #{servico.id}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {servico.duracao} min
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                R$ {Number(servico.preco).toFixed(2).replace(".", ",")}
                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        onClick={() => editarServico(servico)}
                                                        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        onClick={() => excluirServico(servico.id)}
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
                            {servicos.length} serviços cadastrados
                        </p>

                    </div>

                </div>

            </div>

            {mostrarFormulario && (
                <ServicoForm
                    onClose={() => setMostrarFormulario(false)}
                    onServicoCriado={adicionarServico}
                />
            )}

            {servicoEditando && (
                <ServicoForm
                    servico={servicoEditando}
                    onClose={() => setServicoEditando(null)}
                    onServicoAtualizado={atualizarServico}
                />
            )}

        </div>
    )
}

export default Servicos