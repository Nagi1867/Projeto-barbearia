package barber.controllers;

public class DashboardResponse {

    private long agendamentosHoje;
    private long agendamentosConfirmados;
    private long agendamentosConcluidos;
    private long agendamentosCancelados;
    private long clientes;
    private long barbeiros;
    private long servicos;

    public DashboardResponse(
            long agendamentosHoje,
            long agendamentosConfirmados,
            long agendamentosConcluidos,
            long agendamentosCancelados,
            long clientes,
            long barbeiros,
            long servicos) {

        this.agendamentosHoje = agendamentosHoje;
        this.agendamentosConfirmados = agendamentosConfirmados;
        this.agendamentosConcluidos = agendamentosConcluidos;
        this.agendamentosCancelados = agendamentosCancelados;
        this.clientes = clientes;
        this.barbeiros = barbeiros;
        this.servicos = servicos;
    }

    public long getAgendamentosHoje() {
        return agendamentosHoje;
    }

    public long getAgendamentosConfirmados() {
        return agendamentosConfirmados;
    }

    public long getAgendamentosConcluidos() {
        return agendamentosConcluidos;
    }

    public long getAgendamentosCancelados() {
        return agendamentosCancelados;
    }

    public long getClientes() {
        return clientes;
    }

    public long getBarbeiros() {
        return barbeiros;
    }

    public long getServicos() {
        return servicos;
    }
}