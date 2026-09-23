import StatusBadge from "./StatusBadge"

function AppointmentRow({ agendamento }) {
    return (
        <div className="flex items-center justify-between py-4">

            <div>
                <p className="font-medium text-gray-900">
                    {agendamento.cliente}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    {agendamento.servico} · {agendamento.barbeiro}
                </p>
            </div>

            <div className="text-right">
                <p className="font-semibold text-gray-900">
                    {agendamento.horario}
                </p>

                <div className="mt-1">
                    <StatusBadge status={agendamento.status} />
                </div>
            </div>

        </div>
    )
}

export default AppointmentRow