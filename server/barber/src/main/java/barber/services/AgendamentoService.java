package barber.services;

import barber.entities.*;
import barber.repositories.AgendamentoRepository;
import barber.repositories.BarbeiroRepository;
import barber.repositories.ClienteRepository;
import barber.repositories.ServicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;
    private final BarbeiroRepository barbeiroRepository;
    private final ServicoRepository servicoRepository;

    public AgendamentoService(
            AgendamentoRepository agendamentoRepository,
            ClienteRepository clienteRepository,
            BarbeiroRepository barbeiroRepository,
            ServicoRepository servicoRepository) {

        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
        this.barbeiroRepository = barbeiroRepository;
        this.servicoRepository = servicoRepository;
    }

    public List<Agendamento> findAll() {
        return agendamentoRepository.findAll();
    }

    public Agendamento findById(Long id) {
        return agendamentoRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Agendamento não encontrado"));
    }

    public Agendamento create(Agendamento agendamento) {

        Cliente cliente = clienteRepository.findById(
                agendamento.getCliente().getId()
        ).orElseThrow(() ->
                new RuntimeException("Cliente não encontrado"));

        Barbeiro barbeiro = barbeiroRepository.findById(
                agendamento.getBarbeiro().getId()
        ).orElseThrow(() ->
                new RuntimeException("Barbeiro não encontrado"));

        Servico servico = servicoRepository.findById(
                agendamento.getServico().getId()
        ).orElseThrow(() ->
                new RuntimeException("Serviço não encontrado"));

        boolean horarioOcupado =
                agendamentoRepository.existsByBarbeiroIdAndDataAndHorario(
                        barbeiro.getId(),
                        agendamento.getData(),
                        agendamento.getHorario()
                );

        if (horarioOcupado) {
            throw new RuntimeException(
                    "Este barbeiro já possui um agendamento neste horário"
            );
        }

        agendamento.setCliente(cliente);
        agendamento.setBarbeiro(barbeiro);
        agendamento.setServico(servico);

        if (agendamento.getStatus() == null) {
            agendamento.setStatus(StatusAgendamento.AGENDADO);
        }

        return agendamentoRepository.save(agendamento);
    }

    public Agendamento update(Long id, Agendamento agendamento) {

        Agendamento agendamentoExistente = findById(id);

        Cliente cliente = clienteRepository.findById(
                agendamento.getCliente().getId()
        ).orElseThrow(() ->
                new RuntimeException("Cliente não encontrado"));

        Barbeiro barbeiro = barbeiroRepository.findById(
                agendamento.getBarbeiro().getId()
        ).orElseThrow(() ->
                new RuntimeException("Barbeiro não encontrado"));

        Servico servico = servicoRepository.findById(
                agendamento.getServico().getId()
        ).orElseThrow(() ->
                new RuntimeException("Serviço não encontrado"));

        agendamentoExistente.setCliente(cliente);
        agendamentoExistente.setBarbeiro(barbeiro);
        agendamentoExistente.setServico(servico);
        agendamentoExistente.setData(agendamento.getData());
        agendamentoExistente.setHorario(agendamento.getHorario());
        agendamentoExistente.setStatus(agendamento.getStatus());

        return agendamentoRepository.save(agendamentoExistente);
    }

    public void delete(Long id) {

        Agendamento agendamentoExistente = findById(id);

        agendamentoRepository.delete(agendamentoExistente);
    }
}