package barber.controllers;

import barber.entities.Barbeiro;
import barber.services.BarbeiroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/barbeiros")
public class BarbeiroController {

    private final BarbeiroService barbeiroService;

    public BarbeiroController(BarbeiroService barbeiroService) {
        this.barbeiroService = barbeiroService;
    }

    @GetMapping
    public ResponseEntity<List<Barbeiro>> findAll() {

        List<Barbeiro> barbeiros = barbeiroService.findAll();

        return ResponseEntity.ok(barbeiros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbeiro> findById(@PathVariable Long id) {

        Barbeiro barbeiro = barbeiroService.findById(id);

        return ResponseEntity.ok(barbeiro);
    }

    @PostMapping
    public ResponseEntity<Barbeiro> create(
            @RequestBody Barbeiro barbeiro) {

        Barbeiro barbeiroCriado = barbeiroService.create(barbeiro);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(barbeiroCriado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Barbeiro> update(
            @PathVariable Long id,
            @RequestBody Barbeiro barbeiro) {

        Barbeiro barbeiroAtualizado =
                barbeiroService.update(id, barbeiro);

        return ResponseEntity.ok(barbeiroAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        barbeiroService.delete(id);

        return ResponseEntity.noContent().build();
    }
}