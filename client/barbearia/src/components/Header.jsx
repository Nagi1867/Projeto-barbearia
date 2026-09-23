function Header() {
    return (
        <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">

            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Administração
                </h2>

                <p className="text-sm text-gray-500">
                    Gerencie sua barbearia
                </p>
            </div>

            <div className="flex items-center gap-4">

                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-900">
                    <span>🔔</span>
                </button>

                <div className="h-8 w-px bg-gray-200" />

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                        A
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">
                            Administrador
                        </p>

                        <p className="text-xs text-gray-500">
                            Conta administrativa
                        </p>
                    </div>
                </div>

            </div>

        </header>
    )
}

export default Header