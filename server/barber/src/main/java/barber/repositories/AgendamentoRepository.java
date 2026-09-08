package barber.repositories;

import barber.entities.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;

public interface AgendamentoRepository
        extends JpaRepository<Agendamento, Long> {

    boolean existsByBarbeiroIdAndDataAndHorario(
            Long barbeiroId,
            LocalDate data,
            LocalTime horario
    );
}