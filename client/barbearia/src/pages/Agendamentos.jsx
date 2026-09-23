import { agendamentos } from "../data/mockData"

function Agendamentos() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Agendamentos
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Gerencie os agendamentos da barbearia
                        </p>
                    </div>

                    <button className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
                        Novo agendamento
                    </button>
                </div>

                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Data
                            </label>

                            <input
                                type="date"
                                defaultValue="2026-09-21"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Barbeiro
                            </label>

                            <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-900">
                                <option>Todos os barbeiros</option>
                                <option>Lucas</option>
                                <option>Marcos</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Status
                            </label>

                            <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-900">
                                <option>Todos os status</option>
                                <option>Agendado</option>
                                <option>Confirmado</option>
                                <option>Concluído</option>
                                <option>Cancelado</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 px-6 py-5">
                        <h2 className="font-semibold text-gray-900">
                            Agendamentos do dia
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            6 agendamentos encontrados
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">

                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Horário
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Cliente
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Serviço
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Barbeiro
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {agendamentos.map((agendamento) => (
                                    <tr
                                        key={agendamento.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="font-semibold text-gray-900">
                                                {agendamento.horario}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-900">
                                                {agendamento.cliente}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {agendamento.servico}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {agendamento.barbeiro}
                                        </td>

                                        <td className="px-6 py-4">
                                            {agendamento.status === "CONFIRMADO" && (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                    Confirmado
                                                </span>
                                            )}

                                            {agendamento.status === "AGENDADO" && (
                                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                                    Agendado
                                                </span>
                                            )}

                                            {agendamento.status === "CONCLUÍDO" && (
                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                    Concluído
                                                </span>
                                            )}

                                            {agendamento.status === "CANCELADO" && (
                                                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                                    Cancelado
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-right">
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
                                ))}

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Agendamentos