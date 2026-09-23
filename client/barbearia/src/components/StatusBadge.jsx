function StatusBadge({ status }) {
    const estilos = {
        CONFIRMADO: "bg-green-100 text-green-700",
        AGENDADO: "bg-yellow-100 text-yellow-700",
        "CONCLUÍDO": "bg-blue-100 text-blue-700",
        CANCELADO: "bg-red-100 text-red-700",
    }

    const nomes = {
        CONFIRMADO: "Confirmado",
        AGENDADO: "Agendado",
        "CONCLUÍDO": "Concluído",
        CANCELADO: "Cancelado",
    }

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${estilos[status]}`}
        >
            {nomes[status]}
        </span>
    )
}

export default StatusBadge