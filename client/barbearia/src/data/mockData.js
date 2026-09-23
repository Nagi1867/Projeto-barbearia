export const agendamentos = [
    {
        id: 1,
        horario: "09:00",
        cliente: "João Silva",
        servico: "Corte de cabelo",
        barbeiro: "Lucas",
        status: "CONFIRMADO",
    },
    {
        id: 2,
        horario: "10:00",
        cliente: "Pedro Santos",
        servico: "Barba",
        barbeiro: "Marcos",
        status: "AGENDADO",
    },
    {
        id: 3,
        horario: "11:30",
        cliente: "Gabriel Oliveira",
        servico: "Corte + Barba",
        barbeiro: "Lucas",
        status: "CONCLUÍDO",
    },
]

export const clientes = [
    {
        id: 1,
        nome: "João Silva",
        telefone: "(17) 99999-1111",
        agendamentos: 8,
    },
    {
        id: 2,
        nome: "Pedro Santos",
        telefone: "(17) 99999-2222",
        agendamentos: 5,
    },
    {
        id: 3,
        nome: "Gabriel Oliveira",
        telefone: "(17) 99999-3333",
        agendamentos: 12,
    },
    {
        id: 4,
        nome: "Rafael Costa",
        telefone: "(17) 99999-4444",
        agendamentos: 3,
    },
    {
        id: 5,
        nome: "Matheus Souza",
        telefone: "(17) 99999-5555",
        agendamentos: 7,
    },
    {
        id: 6,
        nome: "Felipe Almeida",
        telefone: "(17) 99999-6666",
        agendamentos: 4,
    },
]

export const barbeiros = [
    {
        id: 1,
        nome: "Lucas Oliveira",
        telefone: "(17) 99999-1111",
        agendamentos: 24,
        status: "ATIVO",
    },
    {
        id: 2,
        nome: "Marcos Santos",
        telefone: "(17) 99999-2222",
        agendamentos: 19,
        status: "ATIVO",
    },
    {
        id: 3,
        nome: "Rafael Costa",
        telefone: "(17) 99999-3333",
        agendamentos: 16,
        status: "ATIVO",
    },
    {
        id: 4,
        nome: "Felipe Almeida",
        telefone: "(17) 99999-4444",
        agendamentos: 11,
        status: "INATIVO",
    },
]