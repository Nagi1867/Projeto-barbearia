import { NavLink } from "react-router-dom"

function Sidebar() {
    const links = [
        {
            name: "Dashboard",
            path: "/",
        },
        {
            name: "Agendamentos",
            path: "/agendamentos",
        },
        {
            name: "Clientes",
            path: "/clientes",
        },
        {
            name: "Barbeiros",
            path: "/barbeiros",
        },
        {
            name: "Serviços",
            path: "/servicos",
        },
        {
            name: "Horários",
            path: "/horarios",
        },
    ]

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">

            <div className="flex h-20 items-center border-b border-gray-200 px-6">
                <h1 className="text-xl font-bold text-gray-900">
                    Barbearia
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6">

                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Menu
                </p>

                <div className="space-y-1">

                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `block rounded-lg px-3 py-3 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}

                </div>
            </nav>

            <div className="border-t border-gray-200 p-4">

                <div className="flex items-center gap-3 rounded-lg px-3 py-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                        A
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                            Administrador
                        </p>

                        <p className="truncate text-xs text-gray-500">
                            Administrador
                        </p>
                    </div>

                </div>

            </div>

        </aside>
    )
}

export default Sidebar