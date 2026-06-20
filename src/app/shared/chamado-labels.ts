/**
 * Rótulos e funções utilitárias compartilhadas relacionadas a
 * prioridade, nível de atendimento (escalonamento) e status de SLA
 * dos chamados. Mantém a UI consistente com as regras do backend
 * (ChamadoPro - SlaService).
 */

export const PRIORIDADE_LABELS: Record<string, string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
  CRITICA: 'Crítica',
};

export const PRIORIDADE_OPCOES = ['BAIXA', 'MEDIA', 'ALTA', 'CRITICA'];

export const NIVEL_LABELS: Record<string, string> = {
  N1: 'N1',
  N2: 'N2',
  N3: 'N3',
};

export const STATUS_SLA_LABELS: Record<string, string> = {
  NO_PRAZO: 'No prazo',
  EM_RISCO: 'Em risco',
  ESTOURADO: 'Estourado',
  CUMPRIDO: 'Cumprido',
};

/**
 * Sugestão automática de prioridade com base na categoria do problema,
 * espelhando SlaService.sugerirPrioridade no backend. O usuário pode
 * alterar essa sugestão antes de enviar o chamado.
 */
export function sugerirPrioridade(categoria?: string | null): string {
  switch (categoria) {
    case 'REDE':
      return 'CRITICA';
    case 'SOFTWARE':
      return 'ALTA';
    case 'HARDWARE':
      return 'MEDIA';
    case 'IMPRESSORA':
      return 'BAIXA';
    case 'OUTROS':
    default:
      return 'MEDIA';
  }
}

/**
 * Próximo nível de escalonamento (N1 -> N2 -> N3 -> N3).
 */
export function proximoNivel(nivelAtual?: string | null): string {
  switch (nivelAtual) {
    case 'N1':
      return 'N2';
    case 'N2':
      return 'N3';
    default:
      return 'N3';
  }
}

export function podeEscalonar(nivelAtual?: string | null): boolean {
  return nivelAtual !== 'N3';
}
