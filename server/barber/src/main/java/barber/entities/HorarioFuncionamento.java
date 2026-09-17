package barber.entities;

import jakarta.persistence.*;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
@Table(name = "horarios_funcionamento")
public class HorarioFuncionamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private DayOfWeek diaSemana;

    @Column(nullable = false)
    private boolean aberto;

    @Column
    private LocalTime horarioAbertura;

    @Column
    private LocalTime inicioIntervalo;

    @Column
    private LocalTime fimIntervalo;

    @Column
    private LocalTime horarioFechamento;

    public HorarioFuncionamento() {
    }

    public HorarioFuncionamento(
            DayOfWeek diaSemana,
            boolean aberto,
            LocalTime horarioAbertura,
            LocalTime inicioIntervalo,
            LocalTime fimIntervalo,
            LocalTime horarioFechamento) {

        this.diaSemana = diaSemana;
        this.aberto = aberto;
        this.horarioAbertura = horarioAbertura;
        this.inicioIntervalo = inicioIntervalo;
        this.fimIntervalo = fimIntervalo;
        this.horarioFechamento = horarioFechamento;
    }

    public Long getId() {
        return id;
    }

    public DayOfWeek getDiaSemana() {
        return diaSemana;
    }

    public void setDiaSemana(DayOfWeek diaSemana) {
        this.diaSemana = diaSemana;
    }

    public boolean isAberto() {
        return aberto;
    }

    public void setAberto(boolean aberto) {
        this.aberto = aberto;
    }

    public LocalTime getHorarioAbertura() {
        return horarioAbertura;
    }

    public void setHorarioAbertura(LocalTime horarioAbertura) {
        this.horarioAbertura = horarioAbertura;
    }

    public LocalTime getInicioIntervalo() {
        return inicioIntervalo;
    }

    public void setInicioIntervalo(LocalTime inicioIntervalo) {
        this.inicioIntervalo = inicioIntervalo;
    }

    public LocalTime getFimIntervalo() {
        return fimIntervalo;
    }

    public void setFimIntervalo(LocalTime fimIntervalo) {
        this.fimIntervalo = fimIntervalo;
    }

    public LocalTime getHorarioFechamento() {
        return horarioFechamento;
    }

    public void setHorarioFechamento(LocalTime horarioFechamento) {
        this.horarioFechamento = horarioFechamento;
    }
}