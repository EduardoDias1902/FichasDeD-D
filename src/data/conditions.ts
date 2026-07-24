import { RuleCondition } from '../types/dnd5e';

export const CONDITIONS_DATA: RuleCondition[] = [
  {
    id: 'blinded',
    name: 'Cego (Blinded)',
    description: 'A criatura cega não enxerga nada e falha automaticamente em qualquer teste que exija visão. Ataques contra a criatura têm Vantagem; ataques da criatura têm Desvantagem.'
  },
  {
    id: 'charmed',
    name: 'Enfeitiçado (Charmed)',
    description: 'A criatura enfeitiçada não pode atacar o encantador ou alvejá-lo com habilidades nocivas. O encantador tem vantagem em testes de habilidade para interagir socialmente com a criatura.'
  },
  {
    id: 'deafened',
    name: 'Surdo (Deafened)',
    description: 'A criatura surda não ouve nada e falha automaticamente em qualquer teste de habilidade que exija audição.'
  },
  {
    id: 'frightened',
    name: 'Amedrontado (Frightened)',
    description: 'A criatura amedrontada sofre desvantagem em testes de habilidade e ataques enquanto a fonte do seu medo estiver dentro de sua linha de visão. A criatura não pode se aproximar voluntariamente da fonte de medo.'
  },
  {
    id: 'grappled',
    name: 'Agarrado (Grappled)',
    description: 'O deslocamento da criatura agarrada se torna 0 e ela não pode se beneficiar de nenhum bônus de velocidade.'
  },
  {
    id: 'incapacitated',
    name: 'Incapacitado (Incapacitated)',
    description: 'Uma criatura incapacitada não pode realizar Ações nem Reações.'
  },
  {
    id: 'invisible',
    name: 'Invisível (Invisible)',
    description: 'Uma criatura invisível é impossível de ser vista sem ajuda de magia ou sentidos especiais. Ataques contra ela têm desvantagem; ataques dela têm vantagem.'
  },
  {
    id: 'paralyzed',
    name: 'Paralisado (Paralyzed)',
    description: 'A criatura está incapacitada e não pode se mover nem falar. Falha automaticamente em salvaguardas de Força e Destreza. Ataques contra ela têm vantagem e qualquer ataque que atingir a até 5 pés é um acerto crítico automático.'
  },
  {
    id: 'petrified',
    name: 'Petrificado (Petrified)',
    description: 'Transformado em substância sólida inerte (pedra). Sua massa aumenta em 10 vezes e ela deixa de envelhecer. Ganha resistência a todos os danos e imunidade a venenos.'
  },
  {
    id: 'poisoned',
    name: 'Envenenado (Poisoned)',
    description: 'A criatura envenenada sofre desvantagem em jogadas de ataque e testes de habilidade.'
  },
  {
    id: 'prone',
    name: 'Caído (Prone)',
    description: 'A única opção de movimento é rastejar. A criatura sofre desvantagem em ataques. Ataques contra ela têm vantagem se o atacante estiver a 5 pés; caso contrário, têm desvantagem.'
  },
  {
    id: 'restrained',
    name: 'Restringido (Restrained)',
    description: 'Deslocamento se torna 0. Jogadas de ataque contra ela têm vantagem; ataques dela têm desvantagem. Sofre desvantagem em salvaguardas de Destreza.'
  },
  {
    id: 'stunned',
    name: 'Atordoado (Stunned)',
    description: 'A criatura está incapacitada, não pode se mover e fala apenas hesitantemente. Falha automaticamente em salvaguardas de Força e Destreza. Ataques contra ela têm vantagem.'
  },
  {
    id: 'unconscious',
    name: 'Inconsciente (Unconscious)',
    description: 'A criatura está incapacitada, cai no chão se estiver de pé e larga o que estiver segurando. Falha automaticamente em salvaguardas de FOR e DES. Ataques contra ela têm vantagem e ataques a 5 pés são acertos críticos automáticos.'
  }
];
