package barber.repositories;

import barber.entities.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoRepository
        extends JpaRepository<Servico, Long> {
}