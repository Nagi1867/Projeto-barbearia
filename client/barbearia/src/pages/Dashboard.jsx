import StatCard from "../components/StatCard"
import AppointmentRow from "../components/AppointmentRow"
import { agendamentos } from "../data/mockData"

function Dashboard() {
    const proximosAgendamentos = agendamentos.slice(0, 4)

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Dashboard
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Visão geral da sua barbearia
                        </p>
                    </div>

                    <button className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
                        Novo agendamento
                    </button>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <StatCard
                        titulo="Agendamentos hoje"
                        valor="8"
                        descricao="+2 comparado a ontem"
                        descricaoClassName="text-green-600"
                    />

                    <StatCard
                        titulo="Clientes"
                        valor="124"
                        descricao="+8 este mês"
                        descricaoClassName="text-green-600"
                    />

                    <StatCard
                        titulo="Barbeiros"
                        valor="4"
                        descricao="Todos ativos"
                    />

                    <StatCard
                        titulo="Faturamento hoje"
                        valor="R$ 320"
                        descricao="+12% este mês"
                        descricaoClassName="text-green-600"
                    />

                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">

                        <div className="mb-2 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Próximos agendamentos
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Agendamentos de hoje
                                </p>
                            </div>

                            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                Ver todos
                            </button>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {proximosAgendamentos.map((agendamento) => (
                                <AppointmentRow
                                    key={agendamento.id}
                                    agendamento={agendamento}
                                />
                            ))}
                        </div>

                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Status dos agendamentos
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Resumo de hoje
                        </p>

                        <div className="mt-6 space-y-5">

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Confirmados
                                </span>

                                <span className="font-semibold text-gray-900">
                                    5
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Aguardando
                                </span>

                                <span className="font-semibold text-gray-900">
                                    2
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Concluídos
                                </span>

                                <span className="font-semibold text-gray-900">
                                    6
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    Cancelados
                                </span>

                                <span className="font-semibold text-gray-900">
                                    1
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard