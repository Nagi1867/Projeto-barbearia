function Dashboard() {
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

                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <p className="text-sm font-medium text-gray-500">
                            Agendamentos hoje
                        </p>

                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            8
                        </p>

                        <p className="mt-2 text-sm text-green-600">
                            +2 comparado a ontem
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <p className="text-sm font-medium text-gray-500">
                            Clientes
                        </p>

                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            124
                        </p>

                        <p className="mt-2 text-sm text-green-600">
                            +8 este mês
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <p className="text-sm font-medium text-gray-500">
                            Barbeiros
                        </p>

                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            4
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Todos ativos
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <p className="text-sm font-medium text-gray-500">
                            Faturamento hoje
                        </p>

                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            R$ 320
                        </p>

                        <p className="mt-2 text-sm text-green-600">
                            +12% este mês
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">

                        <div className="mb-6 flex items-center justify-between">
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

                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        João Silva
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Corte de cabelo · Lucas
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                        14:30
                                    </p>

                                    <span className="mt-1 inline-block rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                                        Confirmado
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Pedro Santos
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Barba · Marcos
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                        15:15
                                    </p>

                                    <span className="mt-1 inline-block rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700">
                                        Aguardando
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Gabriel Oliveira
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Corte + Barba · Lucas
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                        16:00
                                    </p>

                                    <span className="mt-1 inline-block rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                                        Confirmado
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Rafael Costa
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Corte de cabelo · Marcos
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                        17:00
                                    </p>

                                    <span className="mt-1 inline-block rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700">
                                        Aguardando
                                    </span>
                                </div>
                            </div>

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