import { useEffect, useState } from "react"

import api from "../services/api"

function ServicoForm({
    servico,
    onClose,
    onServicoCriado,
    onServicoAtualizado,
}) {

    const [nome, setNome] = useState("")
    const [duracao, setDuracao] = useState("")
    const [preco, setPreco] = useState("")
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState("")

    const editando = !!servico

    useEffect(() => {

        if (servico) {
            setNome(servico.nome)
            setDuracao(String(servico.duracao))
            setPreco(String(servico.preco))
        }

    }, [servico])

    async function salvarServico(event) {

        event.preventDefault()

        try {

            setCarregando(true)
            setErro("")

            const dados = {
                nome,
                duracao: Number(duracao),
                preco: Number(preco),
            }

            if (editando) {

                const response = await api.put(
                    `/servicos/${servico.id}`,
                    dados
                )

                onServicoAtualizado(response.data)

            } else {

                const response = await api.post(
                    "/servicos",
                    dados
                )

                onServicoCriado(response.data)

            }

            onClose()

        } catch (error) {

            console.error("Erro ao salvar serviço:", error)

            setErro("Não foi possível salvar o serviço.")

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
                            {editando ? "Editar serviço" : "Novo serviço"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {editando
                                ? "Altere os dados do serviço"
                                : "Cadastre um novo serviço"
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

                <form onSubmit={salvarServico}>

                    <div className="space-y-5 px-6 py-6">

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nome
                            </label>

                            <input
                                type="text"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                placeholder="Ex: Corte masculino"
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Duração
                            </label>

                            <select
                                value={duracao}
                                onChange={(event) => setDuracao(event.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
                            >
                                <option value="">
                                    Selecione a duração
                                </option>

                                <option value="15">
                                    15 minutos
                                </option>

                                <option value="30">
                                    30 minutos
                                </option>

                                <option value="45">
                                    45 minutos
                                </option>

                                <option value="60">
                                    60 minutos
                                </option>

                                <option value="90">
                                    90 minutos
                                </option>

                                <option value="120">
                                    120 minutos
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Preço
                            </label>

                            <input
                                type="number"
                                value={preco}
                                onChange={(event) => setPreco(event.target.value)}
                                placeholder="0,00"
                                min="0"
                                step="0.01"
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
                                    : "Cadastrar serviço"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default ServicoForm