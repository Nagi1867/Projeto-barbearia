function StatCard({
    titulo,
    valor,
    descricao,
    descricaoClassName = "text-gray-500",
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-500">
                {titulo}
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
                {valor}
            </p>

            <p className={`mt-2 text-sm ${descricaoClassName}`}>
                {descricao}
            </p>
        </div>
    )
}

export default StatCard