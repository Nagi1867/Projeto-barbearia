package barber.controllers;

import barber.entities.Servico;
import barber.services.ServicoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicos")
public class ServicoController {

    private final ServicoService servicoService;

    public ServicoController(ServicoService servicoService) {
        this.servicoService = servicoService;
    }

    @GetMapping
    public ResponseEntity<List<Servico>> findAll() {

        List<Servico> servicos =
                servicoService.findAll();

        return ResponseEntity.ok(servicos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> findById(
            @PathVariable Long id) {

        Servico servico =
                servicoService.findById(id);

        return ResponseEntity.ok(servico);
    }

    @PostMapping
    public ResponseEntity<Servico> create(
            @RequestBody Servico servico) {

        Servico servicoCriado =
                servicoService.create(servico);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(servicoCriado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> update(
            @PathVariable Long id,
            @RequestBody Servico servico) {

        Servico servicoAtualizado =
                servicoService.update(id, servico);

        return ResponseEntity.ok(servicoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        servicoService.delete(id);

        return ResponseEntity.noContent().build();
    }
}