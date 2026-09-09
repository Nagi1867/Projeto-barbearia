package barber.services;


import org.springframework.stereotype.Service;

import barber.entities.Cliente;
import barber.repositories.ClienteRepository;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Buscar todos os clientes
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    // Buscar cliente por ID
    public Cliente findById(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cliente não encontrado"));
    }

    // Criar cliente
    public Cliente create(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // Atualizar cliente
    public Cliente update(Long id, Cliente cliente) {

        Cliente clienteExistente = findById(id);

        clienteExistente.setNome(cliente.getNome());
        clienteExistente.setTelefone(cliente.getTelefone());

        return clienteRepository.save(clienteExistente);
    }

    // Deletar cliente
    public void delete(Long id) {

        Cliente clienteExistente = findById(id);

        clienteRepository.delete(clienteExistente);
    }
}
