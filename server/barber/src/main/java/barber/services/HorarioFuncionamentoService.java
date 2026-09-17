package barber.services;

import barber.entities.HorarioFuncionamento;
import barber.repositories.HorarioFuncionamentoRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;

@Service
public class HorarioFuncionamentoService {

    private final HorarioFuncionamentoRepository repository;

    public HorarioFuncionamentoService(
            HorarioFuncionamentoRepository repository) {

        this.repository = repository;
    }

    public List<HorarioFuncionamento> findAll() {
        return repository.findAll();
    }

    public HorarioFuncionamento findByDia(DayOfWeek diaSemana) {
        return repository.findByDiaSemana(diaSemana)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Horário de funcionamento não encontrado"
                        ));
    }

    public HorarioFuncionamento create(
            HorarioFuncionamento horario) {

        return repository.save(horario);
    }

    public HorarioFuncionamento update(
            Long id,
            HorarioFuncionamento horario) {

        HorarioFuncionamento existente =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Horário de funcionamento não encontrado"
                                ));

        existente.setDiaSemana(horario.getDiaSemana());
        existente.setAberto(horario.isAberto());
        existente.setHorarioAbertura(
                horario.getHorarioAbertura()
        );
        existente.setInicioIntervalo(
                horario.getInicioIntervalo()
        );
        existente.setFimIntervalo(
                horario.getFimIntervalo()
        );
        existente.setHorarioFechamento(
                horario.getHorarioFechamento()
        );

        return repository.save(existente);
    }

    public void delete(Long id) {

        HorarioFuncionamento existente =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Horário de funcionamento não encontrado"
                                ));

        repository.delete(existente);
    }


}