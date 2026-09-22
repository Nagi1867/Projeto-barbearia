import Sidebar from "../components/Sidebar"

function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <main className="min-w-0 flex-1 overflow-auto">
                {children}
            </main>
        </div>
    )
}

export default Layout