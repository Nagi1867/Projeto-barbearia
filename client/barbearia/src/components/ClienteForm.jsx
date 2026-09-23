import { useState } from "react"

function ClienteForm({ onClose }) {
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")

    function handleSubmit(event) {
        event.preventDefault()

        console.log({
            nome,
            telefone,
        })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Novo cliente
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Cadastre um novo cliente
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl leading-none text-gray-400 transition hover:text-gray-900"
                    >
                        ×
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="space-y-5 p-6">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nome
                            </label>

                            <input
                                type="text"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                placeholder="Digite o nome do cliente"
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Telefone
                            </label>

                            <input
                                type="tel"
                                value={telefone}
                                onChange={(event) => setTelefone(event.target.value)}
                                placeholder="(17) 99999-9999"
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Cadastrar cliente
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default ClienteForm