package barber.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import barber.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{
}
