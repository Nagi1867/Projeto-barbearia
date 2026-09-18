package barber.services;

import barber.controllers.DashboardResponse;
import barber.entities.StatusAgendamento;
import barber.repositories.AgendamentoRepository;
import barber.repositories.BarbeiroRepository;
import barber.repositories.ClienteRepository;
import barber.repositories.ServicoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardService {

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;
    private final BarbeiroRepository barbeiroRepository;
    private final ServicoRepository servicoRepository;

    public DashboardService(
            AgendamentoRepository agendamentoRepository,
            ClienteRepository clienteRepository,
            BarbeiroRepository barbeiroRepository,
            ServicoRepository servicoRepository) {

        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
        this.barbeiroRepository = barbeiroRepository;
        this.servicoRepository = servicoRepository;
    }

    public DashboardResponse obterDashboard() {

        LocalDate hoje = LocalDate.now();

        long agendamentosHoje =
                agendamentoRepository.countByData(hoje);

        long agendamentosConfirmados =
                agendamentoRepository.countByStatus(
                        StatusAgendamento.CONFIRMADO
                );

        long agendamentosConcluidos =
                agendamentoRepository.countByStatus(
                        StatusAgendamento.CONCLUIDO
                );

        long agendamentosCancelados =
                agendamentoRepository.countByStatus(
                        StatusAgendamento.CANCELADO
                );

        long clientes = clienteRepository.count();

        long barbeiros = barbeiroRepository.count();

        long servicos = servicoRepository.count();

        return new DashboardResponse(
                agendamentosHoje,
                agendamentosConfirmados,
                agendamentosConcluidos,
                agendamentosCancelados,
                clientes,
                barbeiros,
                servicos
        );
    }
}