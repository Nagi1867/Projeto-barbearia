package barber.repositories;

import barber.entities.HorarioFuncionamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.util.Optional;

public interface HorarioFuncionamentoRepository
        extends JpaRepository<HorarioFuncionamento, Long> {

    Optional<HorarioFuncionamento> findByDiaSemana(
            DayOfWeek diaSemana
    );
}