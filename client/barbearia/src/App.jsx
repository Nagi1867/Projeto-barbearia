import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./layouts/Layout"

import Dashboard from "./pages/Dashboard"
import Agendamentos from "./pages/Agendamentos"
import Clientes from "./pages/Clientes"
import Barbeiros from "./pages/Barbeiros"
import Servicos from "./pages/Servicos"
import Horarios from "./pages/Horarios"

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/agendamentos" element={<Agendamentos />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/barbeiros" element={<Barbeiros />} />
                    <Route path="/servicos" element={<Servicos />} />
                    <Route path="/horarios" element={<Horarios />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App