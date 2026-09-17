package barber.controllers;

import barber.entities.HorarioFuncionamento;
import barber.services.HorarioFuncionamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;

@RestController
@RequestMapping("/horarios-funcionamento")
public class HorarioFuncionamentoController {

    private final HorarioFuncionamentoService service;

    public HorarioFuncionamentoController(
            HorarioFuncionamentoService service) {

        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<HorarioFuncionamento>> findAll() {

        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{diaSemana}")
    public ResponseEntity<HorarioFuncionamento> findByDia(
            @PathVariable DayOfWeek diaSemana) {

        return ResponseEntity.ok(
                service.findByDia(diaSemana)
        );
    }

    @PostMapping
    public ResponseEntity<HorarioFuncionamento> create(
            @RequestBody HorarioFuncionamento horario) {

        HorarioFuncionamento criado =
                service.create(horario);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(criado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HorarioFuncionamento> update(
            @PathVariable Long id,
            @RequestBody HorarioFuncionamento horario) {

        HorarioFuncionamento atualizado =
                service.update(id, horario);

        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}