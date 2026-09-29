import { useEffect, useState } from "react"

import api from "../services/api"
import AgendamentoForm from "../components/AgendamentoForm"

function Agendamentos() {

    const [agendamentos, setAgendamentos] = useState([])
    const [clientes, setClientes] = useState([])
    const [barbeiros, setBarbeiros] = useState([])
    const [servicos, setServicos] = useState([])

    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    const [carregando, setCarregando] = useState(true)

    const [erro, setErro] = useState(false)

    useEffect(() => {
        carregarDados()
    }, [])

    async function carregarDados() {

        try {

            setCarregando(true)
            setErro(false)

            const [
                agendamentosResponse,
                clientesResponse,
                barbeirosResponse,
                servicosResponse,
            ] = await Promise.all([
                api.get("/agendamentos"),
                api.get("/clientes"),
                api.get("/barbeiros"),
                api.get("/servicos"),
            ])

            setAgendamentos(agendamentosResponse.data)
            setClientes(clientesResponse.data)
            setBarbeiros(barbeirosResponse.data)
            setServicos(servicosResponse.data)

        } catch (error) {

            console.error("Erro ao carregar agendamentos:", error)

            setErro(true)

        } finally {

            setCarregando(false)

        }
    }

    function formatarData(data) {

        if (!data) {
            return "-"
        }

        const [ano, mes, dia] = data.split("-")

        return `${dia}/${mes}/${ano}`
    }

    function formatarStatus(status) {

        const nomes = {
            AGENDADO: "Agendado",
            CONFIRMADO: "Confirmado",
            CONCLUIDO: "Concluído",
            CANCELADO: "Cancelado",
        }

        return nomes[status] || status
    }

    function statusClassName(status) {

        const estilos = {
            AGENDADO: "bg-yellow-100 text-yellow-700",
            CONFIRMADO: "bg-green-100 text-green-700",
            CONCLUIDO: "bg-blue-100 text-blue-700",
            CANCELADO: "bg-red-100 text-red-700",
        }

        return estilos[status] || "bg-gray-100 text-gray-700"
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Agendamentos
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Gerencie os agendamentos da sua barbearia
                        </p>
                    </div>

                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Novo agendamento
                    </button>

                </div>

                <div className="rounded-xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-5">

                        <div className="flex flex-wrap gap-3">

                            <input
                                type="date"
                                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400"
                            />

                            <select
                                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400"
                            >
                                <option value="">
                                    Todos os status
                                </option>

                                <option value="AGENDADO">
                                    Agendado
                                </option>

                                <option value="CONFIRMADO">
                                    Confirmado
                                </option>

                                <option value="CONCLUIDO">
                                    Concluído
                                </option>

                                <option value="CANCELADO">
                                    Cancelado
                                </option>
                            </select>

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-gray-200 bg-gray-50">

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Data
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Horário
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Cliente
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Serviço
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Barbeiro
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {carregando ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Carregando agendamentos...
                                        </td>

                                    </tr>

                                ) : erro ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-6 py-10 text-center text-sm text-red-500"
                                        >
                                            Não foi possível carregar os agendamentos.
                                        </td>

                                    </tr>

                                ) : agendamentos.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Nenhum agendamento cadastrado.
                                        </td>

                                    </tr>

                                ) : (

                                    agendamentos.map((agendamento) => (

                                        <tr
                                            key={agendamento.id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {formatarData(agendamento.data)}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {agendamento.horario}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {agendamento.cliente?.nome}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {agendamento.servico?.nome}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {agendamento.barbeiro?.nome}
                                            </td>

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusClassName(agendamento.status)}`}
                                                >
                                                    {formatarStatus(agendamento.status)}
                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                    <div className="border-t border-gray-200 px-6 py-4">

                        <p className="text-sm text-gray-500">
                            {agendamentos.length} agendamentos cadastrados
                        </p>

                    </div>

                </div>

            </div>

            {mostrarFormulario && (
                <AgendamentoForm
                    clientes={clientes}
                    barbeiros={barbeiros}
                    servicos={servicos}
                    onClose={() => setMostrarFormulario(false)}
                    onAgendamentoCriado={(agendamento) => {
                        setAgendamentos((agendamentosAtuais) => [
                            ...agendamentosAtuais,
                            agendamento,
                        ])
                    }}
                />
            )}

        </div>
    )
}

export default Agendamentos