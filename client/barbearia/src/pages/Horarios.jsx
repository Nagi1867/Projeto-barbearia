import { useEffect, useState } from "react"
import api from "../services/api"

const diasSemana = [
    {
        diaSemana: "MONDAY",
        nome: "Segunda-feira",
    },
    {
        diaSemana: "TUESDAY",
        nome: "Terça-feira",
    },
    {
        diaSemana: "WEDNESDAY",
        nome: "Quarta-feira",
    },
    {
        diaSemana: "THURSDAY",
        nome: "Quinta-feira",
    },
    {
        diaSemana: "FRIDAY",
        nome: "Sexta-feira",
    },
    {
        diaSemana: "SATURDAY",
        nome: "Sábado",
    },
    {
        diaSemana: "SUNDAY",
        nome: "Domingo",
    },
]

function criarHorarioVazio(diaSemana, nome) {
    return {
        id: null,
        diaSemana,
        nome,
        aberto: false,
        horarioAbertura: "",
        inicioIntervalo: "",
        fimIntervalo: "",
        horarioFechamento: "",
    }
}

function Horarios() {
    const [horarios, setHorarios] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [salvando, setSalvando] = useState(false)
    const [erro, setErro] = useState("")
    const [sucesso, setSucesso] = useState(false)

    useEffect(() => {
        carregarHorarios()
    }, [])

    async function carregarHorarios() {
        try {
            setCarregando(true)
            setErro("")

            const response = await api.get(
                "/horarios-funcionamento"
            )

            const horariosDoBanco = response.data

            const horariosCompletos = diasSemana.map((dia) => {

                const horarioExistente =
                    horariosDoBanco.find(
                        (horario) =>
                            horario.diaSemana === dia.diaSemana
                    )

                if (horarioExistente) {
                    return {
                        ...horarioExistente,
                        nome: dia.nome,
                        horarioAbertura:
                            horarioExistente.horarioAbertura || "",
                        inicioIntervalo:
                            horarioExistente.inicioIntervalo || "",
                        fimIntervalo:
                            horarioExistente.fimIntervalo || "",
                        horarioFechamento:
                            horarioExistente.horarioFechamento || "",
                    }
                }

                return criarHorarioVazio(
                    dia.diaSemana,
                    dia.nome
                )
            })

            setHorarios(horariosCompletos)

        } catch (error) {
            console.error(
                "Erro ao carregar horários:",
                error
            )

            setErro(
                "Não foi possível carregar os horários."
            )
        } finally {
            setCarregando(false)
        }
    }

    function alterarHorario(id, diaSemana, campo, valor) {
        setHorarios((horariosAtuais) =>
            horariosAtuais.map((horario) => {

                if (
                    horario.id === id &&
                    id !== null
                ) {
                    return {
                        ...horario,
                        [campo]: valor,
                    }
                }

                if (
                    horario.id === null &&
                    horario.diaSemana === diaSemana
                ) {
                    return {
                        ...horario,
                        [campo]: valor,
                    }
                }

                return horario
            })
        )

        setSucesso(false)
        setErro("")
    }

    function alterarAberto(diaSemana, aberto) {
        setHorarios((horariosAtuais) =>
            horariosAtuais.map((horario) =>
                horario.diaSemana === diaSemana
                    ? {
                        ...horario,
                        aberto,
                    }
                    : horario
            )
        )

        setSucesso(false)
        setErro("")
    }

    async function salvarHorario(horario) {
        const dados = {
            diaSemana: horario.diaSemana,
            aberto: horario.aberto,
            horarioAbertura:
                horario.aberto &&
                horario.horarioAbertura
                    ? horario.horarioAbertura
                    : null,
            inicioIntervalo:
                horario.aberto &&
                horario.inicioIntervalo
                    ? horario.inicioIntervalo
                    : null,
            fimIntervalo:
                horario.aberto &&
                horario.fimIntervalo
                    ? horario.fimIntervalo
                    : null,
            horarioFechamento:
                horario.aberto &&
                horario.horarioFechamento
                    ? horario.horarioFechamento
                    : null,
        }

        if (horario.id) {
            const response = await api.put(
                `/horarios-funcionamento/${horario.id}`,
                dados
            )

            return response.data
        }

        const response = await api.post(
            "/horarios-funcionamento",
            dados
        )

        return response.data
    }

    async function salvarAlteracoes() {
        try {
            setSalvando(true)
            setErro("")
            setSucesso(false)

            const horariosSalvos = await Promise.all(
                horarios.map((horario) =>
                    salvarHorario(horario)
                )
            )

            const horariosAtualizados =
                horariosSalvos.map((horario) => {

                    const dia = diasSemana.find(
                        (item) =>
                            item.diaSemana ===
                            horario.diaSemana
                    )

                    return {
                        ...horario,
                        nome: dia?.nome || "",
                        horarioAbertura:
                            horario.horarioAbertura || "",
                        inicioIntervalo:
                            horario.inicioIntervalo || "",
                        fimIntervalo:
                            horario.fimIntervalo || "",
                        horarioFechamento:
                            horario.horarioFechamento || "",
                    }
                })

            setHorarios(horariosAtualizados)
            setSucesso(true)

        } catch (error) {
            console.error(
                "Erro ao salvar horários:",
                error
            )

            setErro(
                error.response?.data?.message ||
                "Não foi possível salvar os horários."
            )
        } finally {
            setSalvando(false)
        }
    }

    if (carregando) {
        return (
            <div className="p-8">
                <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                    Carregando horários...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Horários de funcionamento
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Defina os horários de funcionamento de cada dia
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={salvarAlteracoes}
                        disabled={salvando}
                        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {salvando
                            ? "Salvando..."
                            : "Salvar alterações"}
                    </button>

                </div>

                {erro && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {erro}
                    </div>
                )}

                {sucesso && (
                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        Horários salvos com sucesso.
                    </div>
                )}

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 px-6 py-5">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Semana
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Configure cada dia individualmente.
                        </p>

                    </div>

                    <div className="divide-y divide-gray-100">

                        {horarios.map((horario) => (

                            <div
                                key={horario.diaSemana}
                                className="px-6 py-6"
                            >

                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[180px_100px_1fr] lg:items-center">

                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {horario.nome}
                                        </p>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                alterarAberto(
                                                    horario.diaSemana,
                                                    !horario.aberto
                                                )
                                            }
                                            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                                                horario.aberto
                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                            }`}
                                        >
                                            {horario.aberto
                                                ? "Aberto"
                                                : "Fechado"}
                                        </button>
                                    </div>

                                    {horario.aberto ? (

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                                            <div>
                                                <label className="mb-2 block text-xs font-medium text-gray-500">
                                                    Abertura
                                                </label>

                                                <input
                                                    type="time"
                                                    value={
                                                        horario.horarioAbertura
                                                    }
                                                    onChange={(event) =>
                                                        alterarHorario(
                                                            horario.id,
                                                            horario.diaSemana,
                                                            "horarioAbertura",
                                                            event.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-xs font-medium text-gray-500">
                                                    Intervalo
                                                </label>

                                                <div className="grid grid-cols-2 gap-2">

                                                    <input
                                                        type="time"
                                                        value={
                                                            horario.inicioIntervalo
                                                        }
                                                        onChange={(event) =>
                                                            alterarHorario(
                                                                horario.id,
                                                                horario.diaSemana,
                                                                "inicioIntervalo",
                                                                event.target.value
                                                            )
                                                        }
                                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                                    />

                                                    <input
                                                        type="time"
                                                        value={
                                                            horario.fimIntervalo
                                                        }
                                                        onChange={(event) =>
                                                            alterarHorario(
                                                                horario.id,
                                                                horario.diaSemana,
                                                                "fimIntervalo",
                                                                event.target.value
                                                            )
                                                        }
                                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                                    />

                                                </div>
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-xs font-medium text-gray-500">
                                                    Fechamento
                                                </label>

                                                <input
                                                    type="time"
                                                    value={
                                                        horario.horarioFechamento
                                                    }
                                                    onChange={(event) =>
                                                        alterarHorario(
                                                            horario.id,
                                                            horario.diaSemana,
                                                            "horarioFechamento",
                                                            event.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                                />
                                            </div>

                                        </div>

                                    ) : (

                                        <div className="text-sm text-gray-400">
                                            A barbearia não funciona neste dia
                                        </div>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Horarios