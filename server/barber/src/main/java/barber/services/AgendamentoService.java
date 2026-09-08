package barber.services;

import barber.entities.Agendamento;
import barber.repositories.AgendamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
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

        if (agendamento.getStatus() == null) {
            agendamento.setStatus(
                    barber.entities.StatusAgendamento.AGENDADO
            );
        }

        return agendamentoRepository.save(agendamento);
    }

    public Agendamento update(Long id, Agendamento agendamento) {

        Agendamento agendamentoExistente = findById(id);

        agendamentoExistente.setCliente(agendamento.getCliente());
        agendamentoExistente.setBarbeiro(agendamento.getBarbeiro());
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