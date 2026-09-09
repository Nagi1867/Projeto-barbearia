package barber.services;

import barber.entities.Barbeiro;
import barber.repositories.BarbeiroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BarbeiroService {

    private final BarbeiroRepository barbeiroRepository;

    public BarbeiroService(BarbeiroRepository barbeiroRepository) {
        this.barbeiroRepository = barbeiroRepository;
    }

    public List<Barbeiro> findAll() {
        return barbeiroRepository.findAll();
    }

    public Barbeiro findById(Long id) {
        return barbeiroRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Barbeiro não encontrado"));
    }

    public Barbeiro create(Barbeiro barbeiro) {
        return barbeiroRepository.save(barbeiro);
    }

    public Barbeiro update(Long id, Barbeiro barbeiro) {

        Barbeiro barbeiroExistente = findById(id);

        barbeiroExistente.setNome(barbeiro.getNome());
        barbeiroExistente.setTelefone(barbeiro.getTelefone());

        return barbeiroRepository.save(barbeiroExistente);
    }

    public void delete(Long id) {

        Barbeiro barbeiroExistente = findById(id);

        barbeiroRepository.delete(barbeiroExistente);
    }
}