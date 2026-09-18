package barber.services;

import barber.entities.*;
import barber.repositories.*;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;
    private final BarbeiroRepository barbeiroRepository;
    private final ServicoRepository servicoRepository;
    private final HorarioFuncionamentoRepository horarioFuncionamentoRepository;

    public AgendamentoService(
            AgendamentoRepository agendamentoRepository,
            ClienteRepository clienteRepository,
            BarbeiroRepository barbeiroRepository,
            ServicoRepository servicoRepository,
            HorarioFuncionamentoRepository horarioFuncionamentoRepository) {

        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
        this.barbeiroRepository = barbeiroRepository;
        this.servicoRepository = servicoRepository;
        this.horarioFuncionamentoRepository =
                horarioFuncionamentoRepository;
    }

    public List<Agendamento> findAll() {
        return agendamentoRepository.findAll();
    }

    public Agendamento findById(Long id) {
        return agendamentoRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Agendamento não encontrado"
                        ));
    }

    public Agendamento create(Agendamento agendamento) {

        Cliente cliente = clienteRepository.findById(
                agendamento.getCliente().getId()
        ).orElseThrow(() ->
                new RuntimeException("Cliente não encontrado"));

        Barbeiro barbeiro = barbeiroRepository.findById(
                agendamento.getBarbeiro().getId()
        ).orElseThrow(() ->
                new RuntimeException("Barbeiro não encontrado"));

        Servico servico = servicoRepository.findById(
                agendamento.getServico().getId()
        ).orElseThrow(() ->
                new RuntimeException("Serviço não encontrado"));

        validarDataEHorario(
                agendamento.getData(),
                agendamento.getHorario()
        );

        validarHorarioFuncionamento(
                agendamento.getData(),
                agendamento.getHorario(),
                servico.getDuracao()
        );

        agendamento.setCliente(cliente);
        agendamento.setBarbeiro(barbeiro);
        agendamento.setServico(servico);

        if (agendamento.getStatus() == null) {
            agendamento.setStatus(StatusAgendamento.AGENDADO);
        }

        if (existeConflito(agendamento, null)) {
            throw new BusinessException(
                    "O barbeiro já possui um agendamento nesse período"
            );
        }

        LocalDate hoje = LocalDate.now();
        LocalTime agora = LocalTime.now();

        if (agendamento.getData().isBefore(hoje)) {
            throw new BusinessException(
                    "Não é possível realizar um agendamento em uma data passada"
            );
        }

        if (agendamento.getData().equals(hoje)
                && agendamento.getHorario().isBefore(agora)) {

            throw new BusinessException(
                    "Não é possível realizar um agendamento em um horário passado"
            );
        }

        LocalTime fimAgendamento =
                agendamento.getHorario()
                        .plusMinutes(servico.getDuracao());


        return agendamentoRepository.save(agendamento);
    }

    public Agendamento update(
            Long id,
            Agendamento agendamento) {

        Agendamento existente =
                agendamentoRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Agendamento não encontrado"
                                ));

        Cliente cliente =
                clienteRepository.findById(
                        agendamento.getCliente().getId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cliente não encontrado"
                        ));

        Barbeiro barbeiro =
                barbeiroRepository.findById(
                        agendamento.getBarbeiro().getId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Barbeiro não encontrado"
                        ));

        Servico servico =
                servicoRepository.findById(
                        agendamento.getServico().getId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Serviço não encontrado"
                        ));

        validarDataEHorario(
                agendamento.getData(),
                agendamento.getHorario()
        );

        validarHorarioFuncionamento(
                agendamento.getData(),
                agendamento.getHorario(),
                servico.getDuracao()
        );

        existente.setCliente(cliente);
        existente.setBarbeiro(barbeiro);
        existente.setServico(servico);
        existente.setData(agendamento.getData());
        existente.setHorario(agendamento.getHorario());
        existente.setStatus(agendamento.getStatus());

        if (existeConflito(existente, id)) {
            throw new BusinessException(
                    "Já existe um agendamento neste horário"
            );
        }

        return agendamentoRepository.save(existente);
    }

    public void delete(Long id) {

        Agendamento agendamentoExistente = findById(id);

        agendamentoRepository.delete(agendamentoExistente);
    }

    private boolean existeConflito(
            Agendamento novoAgendamento,
            Long idIgnorar) {

        List<Agendamento> agendamentos =
                agendamentoRepository.findByBarbeiroIdAndData(
                        novoAgendamento.getBarbeiro().getId(),
                        novoAgendamento.getData()
                );

        LocalTime novoInicio =
                novoAgendamento.getHorario();

        LocalTime novoFim =
                novoInicio.plusMinutes(
                        novoAgendamento.getServico().getDuracao()
                );

        for (Agendamento existente : agendamentos) {

            if (idIgnorar != null &&
                    existente.getId().equals(idIgnorar)) {
                continue;
            }

            if (existente.getStatus() ==
                    StatusAgendamento.CANCELADO) {
                continue;
            }

            LocalTime inicioExistente =
                    existente.getHorario();

            LocalTime fimExistente =
                    inicioExistente.plusMinutes(
                            existente.getServico().getDuracao()
                    );

            boolean conflito =
                    novoInicio.isBefore(fimExistente)
                            && novoFim.isAfter(inicioExistente);

            if (conflito) {
                return true;
            }
        }

        return false;
    }

    public List<LocalTime> horariosDisponiveis(
            Long barbeiroId,
            LocalDate data,
            Long servicoId) {

        Barbeiro barbeiro = barbeiroRepository.findById(barbeiroId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Barbeiro não encontrado"
                        ));

        Servico servico = servicoRepository.findById(servicoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Serviço não encontrado"
                        ));

        HorarioFuncionamento funcionamento =
                horarioFuncionamentoRepository
                        .findByDiaSemana(data.getDayOfWeek())
                        .orElseThrow(() ->
                                new BusinessException(
                                        "Horário de funcionamento não configurado para este dia"
                                ));

        if (!funcionamento.isAberto()) {
            return new ArrayList<>();
        }

        List<Agendamento> agendamentos =
                agendamentoRepository.findByBarbeiroIdAndData(
                        barbeiro.getId(),
                        data
                );

        List<LocalTime> horariosDisponiveis =
                new ArrayList<>();

        LocalDate hoje = LocalDate.now();
        LocalTime agora = LocalTime.now();

        LocalTime inicioFuncionamento =
                funcionamento.getHorarioAbertura();

        LocalTime fimFuncionamento =
                funcionamento.getHorarioFechamento();

        LocalTime inicioIntervalo =
                funcionamento.getInicioIntervalo();

        LocalTime fimIntervalo =
                funcionamento.getFimIntervalo();

        for (
                LocalTime horario = inicioFuncionamento;
                horario.isBefore(fimFuncionamento);
                horario = horario.plusMinutes(15)
        ) {

            LocalTime fimNovoAgendamento =
                    horario.plusMinutes(servico.getDuracao());

            if (fimNovoAgendamento.isAfter(fimFuncionamento)) {
                continue;
            }

            if (inicioIntervalo != null &&
                    fimIntervalo != null) {

                boolean conflitoIntervalo =
                        horario.isBefore(fimIntervalo)
                                && fimNovoAgendamento.isAfter(inicioIntervalo);

                if (conflitoIntervalo) {
                    continue;
                }
            }

            boolean conflitoAgendamento = false;

            for (Agendamento existente : agendamentos) {

                if (existente.getStatus() ==
                        StatusAgendamento.CANCELADO) {
                    continue;
                }

                LocalTime inicioExistente =
                        existente.getHorario();

                LocalTime fimExistente =
                        inicioExistente.plusMinutes(
                                existente.getServico().getDuracao()
                        );

                if (data.equals(hoje) && horario.isBefore(agora)) {
                    continue;
                }

                boolean conflito =
                        horario.isBefore(fimExistente)
                                && fimNovoAgendamento.isAfter(inicioExistente);

                if (conflito) {
                    conflitoAgendamento = true;
                    break;
                }
            }

            if (!conflitoAgendamento) {
                horariosDisponiveis.add(horario);
            }
        }

        return horariosDisponiveis;
    }

    private void validarHorarioFuncionamento(
            LocalDate data,
            LocalTime horario,
            Integer duracao) {

        DayOfWeek diaSemana = data.getDayOfWeek();

        HorarioFuncionamento funcionamento =
                horarioFuncionamentoRepository
                        .findByDiaSemana(diaSemana)
                        .orElseThrow(() ->
                                new BusinessException(
                                        "Horário de funcionamento não configurado para este dia"
                                ));

        if (!funcionamento.isAberto()) {
            throw new BusinessException(
                    "A barbearia não funciona neste dia"
            );
        }

        LocalTime fimAgendamento =
                horario.plusMinutes(duracao);

        if (horario.isBefore(
                funcionamento.getHorarioAbertura())) {

            throw new BusinessException(
                    "O horário está antes da abertura da barbearia"
            );
        }

        if (fimAgendamento.isAfter(
                funcionamento.getHorarioFechamento())) {

            throw new BusinessException(
                    "O serviço ultrapassa o horário de funcionamento"
            );
        }

        LocalTime inicioIntervalo =
                funcionamento.getInicioIntervalo();

        LocalTime fimIntervalo =
                funcionamento.getFimIntervalo();

        if (inicioIntervalo != null && fimIntervalo != null) {

            boolean conflitoIntervalo =
                    horario.isBefore(fimIntervalo)
                            && fimAgendamento.isAfter(inicioIntervalo);

            if (conflitoIntervalo) {
                throw new BusinessException(
                        "O horário escolhido está dentro do intervalo da barbearia"
                );
            }
        }
    }

    private void validarDataEHorario(
            LocalDate data,
            LocalTime horario) {

        LocalDate hoje = LocalDate.now();
        LocalTime agora = LocalTime.now();

        if (data.isBefore(hoje)) {
            throw new BusinessException(
                    "Não é possível realizar um agendamento em uma data passada"
            );
        }

        if (data.equals(hoje) && horario.isBefore(agora)) {
            throw new BusinessException(
                    "Não é possível realizar um agendamento em um horário passado"
            );
        }
    }
}