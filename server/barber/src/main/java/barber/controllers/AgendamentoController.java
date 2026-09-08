package barber.controllers;

import barber.entities.Agendamento;
import barber.services.AgendamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @GetMapping
    public ResponseEntity<List<Agendamento>> findAll() {

        List<Agendamento> agendamentos =
                agendamentoService.findAll();

        return ResponseEntity.ok(agendamentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> findById(
            @PathVariable Long id) {

        Agendamento agendamento =
                agendamentoService.findById(id);

        return ResponseEntity.ok(agendamento);
    }

    @PostMapping
    public ResponseEntity<Agendamento> create(
            @RequestBody Agendamento agendamento) {

        Agendamento agendamentoCriado =
                agendamentoService.create(agendamento);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(agendamentoCriado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> update(
            @PathVariable Long id,
            @RequestBody Agendamento agendamento) {

        Agendamento agendamentoAtualizado =
                agendamentoService.update(id, agendamento);

        return ResponseEntity.ok(agendamentoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        agendamentoService.delete(id);

        return ResponseEntity.noContent().build();
    }
}