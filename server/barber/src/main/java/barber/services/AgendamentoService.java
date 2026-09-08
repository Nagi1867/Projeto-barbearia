package barber.services;

import barber.entities.Agendamento;
import barber.entities.Barbeiro;
import barber.entities.Cliente;
import barber.entities.StatusAgendamento;
import barber.repositories.AgendamentoRepository;
import barber.repositories.BarbeiroRepository;
import barber.repositories.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;
    private final BarbeiroRepository barbeiroRepository;

    public AgendamentoService(
            AgendamentoRepository agendamentoRepository,
            ClienteRepository clienteRepository,
            BarbeiroRepository barbeiroRepository) {

        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
        this.barbeiroRepository = barbeiroRepository;
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

        agendamento.setCliente(cliente);
        agendamento.setBarbeiro(barbeiro);

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

        agendamentoExistente.setCliente(cliente);
        agendamentoExistente.setBarbeiro(barbeiro);
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