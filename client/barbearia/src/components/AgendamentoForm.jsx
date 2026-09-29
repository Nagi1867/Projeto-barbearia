import { useEffect, useState } from "react"

import api from "../services/api"

function AgendamentoForm({
    clientes,
    barbeiros,
    servicos,
    onClose,
    onAgendamentoCriado,
}) {

    const [clienteId, setClienteId] = useState("")
    const [barbeiroId, setBarbeiroId] = useState("")
    const [servicoId, setServicoId] = useState("")
    const [data, setData] = useState("")
    const [horario, setHorario] = useState("")
    const [status, setStatus] = useState("AGENDADO")

    const [salvando, setSalvando] = useState(false)
    const [erro, setErro] = useState("")

    useEffect(() => {
        setErro("")
    }, [clienteId, barbeiroId, servicoId, data, horario, status])

    async function salvarAgendamento(event) {

        event.preventDefault()

        if (
            !clienteId ||
            !barbeiroId ||
            !servicoId ||
            !data ||
            !horario
        ) {
            setErro("Preencha todos os campos.")
            return
        }

        try {

            setSalvando(true)
            setErro("")

            const dados = {
                cliente: {
                    id: Number(clienteId),
                },
                barbeiro: {
                    id: Number(barbeiroId),
                },
                servico: {
                    id: Number(servicoId),
                },
                data,
                horario: `${horario}:00`,
                status,
            }

            const response = await api.post(
                "/agendamentos",
                dados
            )

            onAgendamentoCriado(response.data)

            onClose()

        } catch (error) {

            console.error(
                "Erro ao criar agendamento:",
                error
            )

            if (error.response?.data?.message) {
                setErro(error.response.data.message)
            } else {
                setErro(
                    "Não foi possível criar o agendamento."
                )
            }

        } finally {

            setSalvando(false)

        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Novo agendamento
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Cadastre um novo horário
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-400 transition hover:text-gray-700"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={salvarAgendamento}
                    className="space-y-5 p-6"
                >

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Cliente
                        </label>

                        <select
                            value={clienteId}
                            onChange={(event) =>
                                setClienteId(event.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                        >

                            <option value="">
                                Selecione um cliente
                            </option>

                            {clientes.map((cliente) => (
                                <option
                                    key={cliente.id}
                                    value={cliente.id}
                                >
                                    {cliente.nome}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Barbeiro
                        </label>

                        <select
                            value={barbeiroId}
                            onChange={(event) =>
                                setBarbeiroId(event.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                        >

                            <option value="">
                                Selecione um barbeiro
                            </option>

                            {barbeiros.map((barbeiro) => (
                                <option
                                    key={barbeiro.id}
                                    value={barbeiro.id}
                                >
                                    {barbeiro.nome}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Serviço
                        </label>

                        <select
                            value={servicoId}
                            onChange={(event) =>
                                setServicoId(event.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                        >

                            <option value="">
                                Selecione um serviço
                            </option>

                            {servicos.map((servico) => (
                                <option
                                    key={servico.id}
                                    value={servico.id}
                                >
                                    {servico.nome}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Data
                            </label>

                            <input
                                type="date"
                                value={data}
                                onChange={(event) =>
                                    setData(event.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Horário
                            </label>

                            <input
                                type="time"
                                value={horario}
                                onChange={(event) =>
                                    setHorario(event.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(event) =>
                                setStatus(event.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                        >

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

                    {erro && (
                        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {erro}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={salvando}
                            className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {salvando
                                ? "Salvando..."
                                : "Criar agendamento"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default AgendamentoForm