import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

function Home() {
    const [servicos, setServicos] = useState([])

    useEffect(() => {
        async function carregarServicos() {
            try {
                const response = await api.get("/servicos")
                setServicos(response.data)
            } catch (error) {
                console.error("Erro ao carregar serviços:", error)
            }
        }

        carregarServicos()
    }, [])

    return (
        <div className="min-h-screen bg-white text-gray-900">

            <header className="border-b border-gray-100">

                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                    <Link
                        to="/"
                        className="text-xl font-bold tracking-tight"
                    >
                        BARBEARIA
                    </Link>

                    <Link
                        to="/agendamentos"
                        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Agendar horário
                    </Link>

                </div>

            </header>

            <main>

                <section className="border-b border-gray-100">

                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">

                        <div className="max-w-3xl">

                            <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-gray-500">
                                Atendimento simples e rápido
                            </p>

                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Seu próximo horário começa aqui.
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
                                Escolha seu serviço, barbeiro, data e horário
                                de forma rápida e fácil.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">

                                <Link
                                    to="/agendamentos"
                                    className="rounded-lg bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                                >
                                    Agendar horário
                                </Link>

                                <a
                                    href="#servicos"
                                    className="rounded-lg border border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Ver serviços
                                </a>

                            </div>

                        </div>

                    </div>

                </section>

                <section
                    id="servicos"
                    className="border-b border-gray-100"
                >

                    <div className="mx-auto max-w-7xl px-6 py-20">

                        <div className="mb-10">

                            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                                Serviços
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                Escolha o seu serviço
                            </h2>

                            <p className="mt-3 text-gray-500">
                                Encontre o serviço que deseja realizar e agende seu horário.
                            </p>

                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {servicos.map((servico) => (
                                <div
                                    key={servico.id}
                                    className="rounded-xl border border-gray-200 p-6 transition hover:border-gray-300 hover:shadow-sm"
                                >

                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {servico.nome}
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Duração: {servico.duracao} minutos
                                    </p>

                                    <p className="mt-4 text-lg font-semibold text-gray-900">
                                        R$ {Number(servico.preco).toFixed(2).replace(".", ",")}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                </section>

                <section>

                    <div className="mx-auto max-w-7xl px-6 py-20">

                        <div className="mb-10">

                            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                                Como funciona
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                Agende em poucos passos
                            </h2>

                        </div>

                        <div className="grid gap-8 md:grid-cols-4">

                            <div>

                                <span className="text-3xl font-bold text-gray-300">
                                    01
                                </span>

                                <h3 className="mt-4 font-semibold text-gray-900">
                                    Escolha o serviço
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Selecione o serviço que deseja realizar.
                                </p>

                            </div>

                            <div>

                                <span className="text-3xl font-bold text-gray-300">
                                    02
                                </span>

                                <h3 className="mt-4 font-semibold text-gray-900">
                                    Escolha o barbeiro
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Escolha o profissional de sua preferência.
                                </p>

                            </div>

                            <div>

                                <span className="text-3xl font-bold text-gray-300">
                                    03
                                </span>

                                <h3 className="mt-4 font-semibold text-gray-900">
                                    Escolha o horário
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Veja os horários disponíveis para atendimento.
                                </p>

                            </div>

                            <div>

                                <span className="text-3xl font-bold text-gray-300">
                                    04
                                </span>

                                <h3 className="mt-4 font-semibold text-gray-900">
                                    Confirme
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Confirme seus dados e finalize o agendamento.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

            <footer className="border-t border-gray-100">

                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-sm font-semibold text-gray-900">
                        BARBEARIA
                    </p>

                    <p className="text-sm text-gray-400">
                        Agende seu horário de forma simples.
                    </p>

                </div>

            </footer>

        </div>
    )
}

export default Home