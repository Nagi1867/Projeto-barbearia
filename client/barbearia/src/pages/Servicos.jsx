import { useState } from "react"
import { servicos } from "../data/mockData"
import ServicoForm from "../components/ServicoForm"

function Servicos() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Serviços
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Gerencie os serviços oferecidos pela barbearia
                        </p>
                    </div>

                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Novo serviço
                    </button>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-5">
                        <div className="max-w-md">

                            <input
                                type="text"
                                placeholder="Buscar serviço..."
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                            />

                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">

                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Serviço
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Duração
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Preço
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

                                {servicos.map((servico) => (
                                    <tr
                                        key={servico.id}
                                        className="transition hover:bg-gray-50"
                                    >

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-700">
                                                    {servico.nome.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {servico.nome}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        Serviço #{servico.id}
                                                    </p>
                                                </div>

                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {servico.duracao} minutos
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-gray-900">
                                                R$ {servico.preco.toFixed(2).replace(".", ",")}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    servico.status === "ATIVO"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {servico.status === "ATIVO"
                                                    ? "Ativo"
                                                    : "Inativo"}
                                            </span>

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
                            {servicos.length} serviços cadastrados
                        </p>
                    </div>

                </div>

            </div>

            {mostrarFormulario && (
                <ServicoForm
                    onClose={() => setMostrarFormulario(false)}
                />
            )}

        </div>
    )
}

export default Servicos