package barber.services;

import barber.entities.Servico;
import barber.repositories.ServicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {

    private final ServicoRepository servicoRepository;

    public ServicoService(ServicoRepository servicoRepository) {
        this.servicoRepository = servicoRepository;
    }

    public List<Servico> findAll() {
        return servicoRepository.findAll();
    }

    public Servico findById(Long id) {
        return servicoRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Serviço não encontrado"));
    }

    public Servico create(Servico servico) {
        return servicoRepository.save(servico);
    }

    public Servico update(Long id, Servico servico) {

        Servico servicoExistente = findById(id);

        servicoExistente.setNome(servico.getNome());
        servicoExistente.setDuracao(servico.getDuracao());
        servicoExistente.setPreco(servico.getPreco());

        return servicoRepository.save(servicoExistente);
    }

    public void delete(Long id) {

        Servico servicoExistente = findById(id);

        servicoRepository.delete(servicoExistente);
    }
}