function ServicoForm({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Novo serviço
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Cadastre um novo serviço
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl leading-none text-gray-400 transition hover:text-gray-900"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-5 p-6">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nome do serviço
                        </label>

                        <input
                            type="text"
                            placeholder="Ex: Corte de cabelo"
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Duração
                            </label>

                            <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400">
                                <option>15 minutos</option>
                                <option>30 minutos</option>
                                <option>45 minutos</option>
                                <option>60 minutos</option>
                                <option>90 minutos</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Preço
                            </label>

                            <div className="flex">
                                <span className="flex items-center rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
                                    R$
                                </span>

                                <input
                                    type="number"
                                    placeholder="0,00"
                                    className="w-full rounded-r-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                                />
                            </div>
                        </div>

                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Status
                        </label>

                        <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400">
                            <option>Ativo</option>
                            <option>Inativo</option>
                        </select>
                    </div>

                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                    >
                        Cancelar
                    </button>

                    <button className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
                        Cadastrar serviço
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ServicoForm