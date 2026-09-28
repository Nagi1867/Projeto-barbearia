import { useEffect, useState } from "react"

import api from "../services/api"

function BarbeiroForm({
    barbeiro,
    onClose,
    onBarbeiroCriado,
    onBarbeiroAtualizado,
}) {

    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState("")

    const editando = !!barbeiro

    useEffect(() => {

        if (barbeiro) {
            setNome(barbeiro.nome)
            setTelefone(barbeiro.telefone)
        }

    }, [barbeiro])

    async function salvarBarbeiro(event) {

        event.preventDefault()

        try {

            setCarregando(true)
            setErro("")

            if (editando) {

                const response = await api.put(`/barbeiros/${barbeiro.id}`, {
                    nome,
                    telefone,
                })

                onBarbeiroAtualizado(response.data)

            } else {

                const response = await api.post("/barbeiros", {
                    nome,
                    telefone,
                })

                onBarbeiroCriado(response.data)

            }

            onClose()

        } catch (error) {

            console.error("Erro ao salvar barbeiro:", error)

            setErro("Não foi possível salvar o barbeiro.")

        } finally {

            setCarregando(false)

        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                    <div>

                        <h2 className="text-lg font-semibold text-gray-900">
                            {editando ? "Editar barbeiro" : "Novo barbeiro"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {editando
                                ? "Altere os dados do barbeiro"
                                : "Cadastre um novo barbeiro"
                            }
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl text-gray-400 transition hover:text-gray-700"
                    >
                        ×
                    </button>

                </div>

                <form onSubmit={salvarBarbeiro}>

                    <div className="space-y-5 px-6 py-6">

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nome
                            </label>

                            <input
                                type="text"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                placeholder="Nome do barbeiro"
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Telefone
                            </label>

                            <input
                                type="text"
                                value={telefone}
                                onChange={(event) => setTelefone(event.target.value)}
                                placeholder="(00) 00000-0000"
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
                            />

                        </div>

                        {erro && (
                            <p className="text-sm text-red-500">
                                {erro}
                            </p>
                        )}

                    </div>

                    <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={carregando}
                            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {carregando
                                ? "Salvando..."
                                : editando
                                    ? "Salvar alterações"
                                    : "Cadastrar barbeiro"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default BarbeiroForm