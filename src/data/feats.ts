import { Feat } from '../types/dnd5e';

export const FEATS_DATA: Feat[] = [
  {
    id: 'war-caster',
    name: 'Conjurador de Guerra (War Caster)',
    prerequisite: 'Capacidade de conjurar ao menos uma magia',
    description: 'Você tem vantagem em salvaguardas de CON para manter concentração em magias quando sofre dano. Pode realizar os componentes somáticos com as mãos ocupadas por armas/escudos e pode lançar uma magia como ataque de oportunidade.'
  },
  {
    id: 'great-weapon-master',
    name: 'Mestre em Armas Grandes (Great Weapon Master)',
    description: 'Ao conseguir um acerto crítico ou reduzir uma criatura a 0 PV com arma corpo a corpo, você pode fazer um ataque bônus. Além disso, antes de atacar com arma pesada, pode aceitar -5 no teste de ataque para causar +10 no dano.'
  },
  {
    id: 'sharpshooter',
    name: 'Atirador de Elite (Sharpshooter)',
    description: 'Seus ataques à distância ignoram cobertura parcial e meia cobertura e não sofrem desvantagem no alcance longo. Antes de fazer um ataque à distância, pode aceitar -5 no teste de ataque para causar +10 no dano.'
  },
  {
    id: 'sentinel',
    name: 'Sentinela (Sentinel)',
    description: 'Quando atinge um inimigo com um ataque de oportunidade, o deslocamento dele se torna 0 pelo resto do turno. Inimigos provocam ataques de oportunidade de você mesmo se usarem a ação Desengajar.'
  },
  {
    id: 'alert',
    name: 'Alerta (Alert)',
    description: 'Você ganha +5 de bônus em testes de Iniciativa, não pode ser surpreendido enquanto estiver consciente e outras criaturas não ganham vantagem nos ataques contra você por estarem escondidas.'
  },
  {
    id: 'resilient',
    name: 'Resiliente (Resilient)',
    description: 'Escolha um valor de habilidade. Aumente esse valor em 1 e ganhe proficiência nos testes de resistência com esse atributo.',
  },
  {
    id: 'lucky',
    name: 'Sortudo (Lucky)',
    description: 'Você possui 3 pontos de sorte por dia. Sempre que rolar um d20 para um ataque, teste de habilidade ou salvaguarda, pode gastar 1 ponto para rolar um d20 adicional e escolher qual resultado usar.'
  }
];
