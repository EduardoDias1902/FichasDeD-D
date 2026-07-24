import { Item } from '../types/dnd5e';

export const EQUIPMENT_DATA: Item[] = [
  // ARMAS
  {
    id: 'longsword',
    name: 'Espada Longa',
    category: 'Armas',
    costInGp: 15,
    weight: 3,
    description: 'Espada versátil de lâmina reta, arma clássica de cavaleiros e guerreiros.',
    properties: ['Versátil (1d10)'],
    damage: '1d8',
    damageType: 'Cortante'
  },
  {
    id: 'shortsword',
    name: 'Espada Curta',
    category: 'Armas',
    costInGp: 10,
    weight: 2,
    description: 'Espada leve e ágil usada para ataques rápidos ou combate com duas armas.',
    properties: ['Acuidade', 'Leve'],
    damage: '1d6',
    damageType: 'Perfurante'
  },
  {
    id: 'dagger',
    name: 'Adaga',
    category: 'Armas',
    costInGp: 2,
    weight: 1,
    description: 'Lâmina curta ocultável ideal para arremesso ou ataques furtivos de emergência.',
    properties: ['Acuidade', 'Leve', 'Arremesso (distância 20/60)'],
    damage: '1d4',
    damageType: 'Perfurante'
  },
  {
    id: 'greataxe',
    name: 'Machado Grande',
    category: 'Armas',
    costInGp: 30,
    weight: 7,
    description: 'Machado pesado de duas mãos capaz de dividir inimigos ao meio.',
    properties: ['Pesada', 'Duas Mãos'],
    damage: '1d12',
    damageType: 'Cortante'
  },
  {
    id: 'longbow',
    name: 'Arco Longo',
    category: 'Armas',
    costInGp: 50,
    weight: 2,
    description: 'Arco alto de grande alcance feito para arqueiros experientes.',
    properties: ['Munição (distância 150/600)', 'Pesada', 'Duas Mãos'],
    damage: '1d8',
    damageType: 'Perfurante'
  },
  {
    id: 'rapier',
    name: 'Rapieira',
    category: 'Armas',
    costInGp: 25,
    weight: 2,
    description: 'Espada fina e elegante projetada para estocadas precisas.',
    properties: ['Acuidade'],
    damage: '1d8',
    damageType: 'Perfurante'
  },

  // ARMADURAS
  {
    id: 'leather-armor',
    name: 'Armadura de Couro',
    category: 'Armaduras',
    costInGp: 10,
    weight: 10,
    description: 'Armadura leve feita de couro curtido, oferecendo proteção sem prejudicar a agilidade.',
    armorClassBonus: 11, // + Dex
  },
  {
    id: 'studded-leather',
    name: 'Couro Batido',
    category: 'Armaduras',
    costInGp: 45,
    weight: 13,
    description: 'Armadura de couro reforçada com rebites de metal e tachas.',
    armorClassBonus: 12, // + Dex
  },
  {
    id: 'chain-shirt',
    name: 'Camisão de Malha',
    category: 'Armaduras',
    costInGp: 50,
    weight: 20,
    description: 'Camisa feita de anéis de metal entrelaçados vestida entre camadas de tecido.',
    armorClassBonus: 13, // + Dex (max 2)
  },
  {
    id: 'plate-armor',
    name: 'Armadura Completa (Placas)',
    category: 'Armaduras',
    costInGp: 1500,
    weight: 65,
    description: 'Placas de aço moldadas e encaixadas cobrindo o corpo inteiro.',
    armorClassBonus: 18, // Fixed
    stealthDisadvantage: true
  },
  {
    id: 'shield',
    name: 'Escudo',
    category: 'Armaduras',
    costInGp: 10,
    weight: 6,
    description: 'Escudo de madeira ou metal empunhado na mão livre concedendo +2 na CA.',
    armorClassBonus: 2,
  },

  // POÇÕES & CONSUMÍVEIS
  {
    id: 'potion-healing',
    name: 'Poção de Cura',
    category: 'Poções',
    costInGp: 50,
    weight: 0.5,
    description: 'Líquido vermelho brilhante que recupera 2d4 + 2 pontos de vida ao ser ingerido.',
  },
  {
    id: 'scroll-fireball',
    name: 'Pergaminho Mágico (Bola de Fogo)',
    category: 'Pergaminhos',
    costInGp: 200,
    weight: 0.1,
    description: 'Pergaminho contendo os incantamentos arcanos para conjurar Bola de Fogo sem gastar espaço de magia.',
  },

  // FERRAMENTAS & DIVERSOS
  {
    id: 'thieves-tools',
    name: 'Ferramentas de Ladrão',
    category: 'Ferramentas',
    costInGp: 25,
    weight: 1,
    description: 'Conjunto de gazuas, espelhos minúsculos e tesouras para desarmar armadilhas e abrir fechaduras.',
  },
  {
    id: 'backpack',
    name: 'Mochila de Aventureiro',
    category: 'Diversos',
    costInGp: 2,
    weight: 5,
    description: 'Mochila resistente capaz de carregar até 30 libras de equipamento.',
  },
  {
    id: 'rope-hempen',
    name: 'Corda de Cânhamo (50 pés)',
    category: 'Diversos',
    costInGp: 1,
    weight: 10,
    description: 'Corda trançada de alta resistência para escaladas e amarras.',
  }
];
