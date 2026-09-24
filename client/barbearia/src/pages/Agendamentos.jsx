import { useState } from "react"
import StatusBadge from "../components/StatusBadge"
import { agendamentos } from "../data/mockData"

function AgendamentoForm({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Novo agendamento
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Agende um novo atendimento
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl leading-none text-gray-400 transition hover:text-gray-900"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-5 p-6">

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Cliente
                            </label>

                            <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400">
                                <option>Selecione o cliente</option>
                                <option>João Silva</option>
                                <option>Pedro Santos</option>
                                <option>Gabriel Oliveira</option>
                                <option>Rafael Costa</option>
                                <option>Matheus Souza</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Barbeiro
                            </label>

                            <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400">
                                <option>Selecione o barbeiro</option>
                                <option>Lucas Oliveira</option>
                                <option>Marcos Santos</option>
                                <option>Rafael Costa</option>
                            </select>
                        </div>

                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Serviço
                        </label>

                        <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400">
                            <option>Selecione o serviço</option>
                            <option>Corte de cabelo</option>
                            <option>Barba</option>
                            <option>Corte + Barba</option>
                            <option>Sobrancelha</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Data
                            </label>

                            <input
                                type="date"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Horário
                            </label>

                            <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400">
                                <option>Selecione o horário</option>
                                <option>09:00</option>
                                <option>09:30</option>
                                <option>10:00</option>
                                <option>10:30</option>
                                <option>11:00</option>
                                <option>14:00</option>
                                <option>14:30</option>
                                <option>15:00</option>
                                <option>15:30</option>
                                <option>16:00</option>
                                <option>17:00</option>
                            </select>
                        </div>

                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Status
                        </label>

                        <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400">
                            <option>Agendado</option>
                            <option>Confirmado</option>
                            <option>Concluído</option>
                            <option>Cancelado</option>
                        </select>
                    </div>

                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                    >
                        Cancelar
                    </button>

                    <button className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
                        Criar agendamento
                    </button>

                </div>

            </div>
        </div>
    )
}

function Agendamentos() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Agendamentos
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Gerencie os atendimentos da sua barbearia
                        </p>
                    </div>

                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Novo agendamento
                    </button>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Data
                        </label>

                        <input
                            type="date"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Barbeiro
                        </label>

                        <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400">
                            <option>Todos os barbeiros</option>
                            <option>Lucas Oliveira</option>
                            <option>Marcos Santos</option>
                            <option>Rafael Costa</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Status
                        </label>

                        <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400">
                            <option>Todos os status</option>
                            <option>Agendado</option>
                            <option>Confirmado</option>
                            <option>Concluído</option>
                            <option>Cancelado</option>
                        </select>
                    </div>

                </div>

                <div className="rounded-xl border border-gray-200 bg-white">

                    <div className="overflow-x-auto">
                        <table className="w-full">

                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">

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

                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
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

                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-gray-900">
                                                {agendamento.horario}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">
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
                                            <StatusBadge
                                                status={agendamento.status}
                                            />
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
                                ))}

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
                    onClose={() => setMostrarFormulario(false)}
                />
            )}

        </div>
    )
}

export default Agendamentos