import { horariosFuncionamento } from "../data/mockData"

function Horarios() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Horários de funcionamento
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Configure os horários de atendimento da sua barbearia
                        </p>
                    </div>

                    <button className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
                        Salvar alterações
                    </button>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 px-6 py-5">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Horários semanais
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Defina quando a barbearia estará disponível para agendamentos
                        </p>
                    </div>

                    <div className="divide-y divide-gray-100">

                        {horariosFuncionamento.map((horario) => (
                            <div
                                key={horario.diaSemana}
                                className="px-6 py-6"
                            >
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[180px_100px_1fr] lg:items-center">

                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {horario.dia}
                                        </p>
                                    </div>

                                    <div>
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                                horario.aberto
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            {horario.aberto ? "Aberto" : "Fechado"}
                                        </span>
                                    </div>

                                    {horario.aberto ? (
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                                            <div>
                                                <label className="mb-2 block text-xs font-medium text-gray-500">
                                                    Abertura
                                                </label>

                                                <input
                                                    type="time"
                                                    defaultValue={horario.abertura}
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-xs font-medium text-gray-500">
                                                    Intervalo
                                                </label>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <input
                                                        type="time"
                                                        defaultValue={horario.inicioIntervalo}
                                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                                                    />

                                                    <input
                                                        type="time"
                                                        defaultValue={horario.fimIntervalo}
                                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-xs font-medium text-gray-500">
                                                    Fechamento
                                                </label>

                                                <input
                                                    type="time"
                                                    defaultValue={horario.fechamento}
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                                                />
                                            </div>

                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400">
                                            A barbearia não funciona neste dia
                                        </p>
                                    )}

                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Horarios