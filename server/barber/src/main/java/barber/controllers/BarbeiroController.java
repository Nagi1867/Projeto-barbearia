package barber.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import barber.entities.Barbeiro;
import barber.services.BarbeiroService;

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