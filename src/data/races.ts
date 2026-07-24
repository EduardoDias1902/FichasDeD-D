import { Race } from '../types/dnd5e';

export const RACES_DATA: Race[] = [
  {
    id: 'human',
    name: 'Humano',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    summary: 'Adaptáveis, ambiciosos e versáteis. Os humanos são a raça mais abundante dos reinos.',
    lore: 'Nos reinos de D&D, os humanos são a raça mais jovem das grandes raças, mas também a mais numerosa e dinamicamente inovadora. Eles possuem uma curiosidade incansável e grande perseverança.',
    speed: 30,
    size: 'Médio',
    darkvision: 0,
    abilityScoreBonus: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 },
    languages: ['Comum', 'Um idioma adicional à escolha'],
    traits: [
      { name: 'Versatilidade Humana', description: 'Você ganha +1 em todos os valores de habilidade e domina o idioma Comum mais um idioma à sua escolha.' },
      { name: 'Ambição Sem Limites', description: 'Humanos se adaptam rapidamente a qualquer profissão ou arte arcanas.' }
    ],
    recommendedClasses: ['fighter', 'paladin', 'cleric', 'wizard', 'rogue', 'barbarian', 'bard', 'druid', 'monk', 'ranger', 'sorcerer', 'warlock'],
    subraces: [
      {
        id: 'human-standard',
        name: 'Humano Padrão',
        lore: 'O humano tradicional dos reinos, dotado de atributos equilibrados em todas as áreas.',
        abilityScoreBonus: {},
        traits: [{ name: 'Bônus Geral', description: '+1 em todas as 6 habilidades.' }]
      }
    ]
  },
  {
    id: 'elf',
    name: 'Elfo',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    summary: 'Graciosos, longevos e magistas natos com visão aguçada no escuro e transe meditativo.',
    lore: 'Elfos são um povo mágico de graça sobrenatural, vivendo no mundo sem fazer parte inteiramente dele. Habitam florestas antigas e espirais arcanas reluzentes.',
    speed: 30,
    size: 'Médio',
    darkvision: 60,
    abilityScoreBonus: { DEX: 2 },
    languages: ['Comum', 'Élfico'],
    traits: [
      { name: 'Sentidos Aguçados', description: 'Você tem proficiência na perícia Percepção.' },
      { name: 'Ancestralidade Feérica', description: 'Você tem vantagem em testes de resistência contra ser enfeitiçado e a magia não pode colocar você para dormir.' },
      { name: 'Transe', description: 'Elfos não precisam dormir. Em vez disso, meditam profundamente por 4 horas por dia.' }
    ],
    skillProficiencies: ['Percepção'],
    recommendedClasses: ['wizard', 'rogue', 'ranger', 'sorcerer'],
    subraces: [
      {
        id: 'high-elf',
        name: 'Alto Elfo',
        lore: 'Detentores de uma mente afiada e mestria nas artes arcanas mais antigas.',
        abilityScoreBonus: { INT: 1 },
        traits: [
          { name: 'Treinamento com Armas Élficas', description: 'Proficiência com Espada Longa, Espada Curta, Arco Longo e Arco Curto.' },
          { name: 'Truque Arcano', description: 'Você conhece um truque à sua escolha da lista de magias de Mago (INT é seu atributo de conjuração).' },
          { name: 'Idioma Extra', description: 'Você pode falar, ler e escrever um idioma adicional à sua escolha.' }
        ]
      },
      {
        id: 'wood-elf',
        name: 'Elfo da Floresta',
        lore: 'Guardas das florestas virgens, rápidos e indetectáveis no meio da vegetação.',
        abilityScoreBonus: { WIS: 1 },
        traits: [
          { name: 'Pés Ligeiros', description: 'Seu deslocamento base aumenta para 35 pés.' },
          { name: 'Máscara da Natureza', description: 'Você pode tentar se esconder mesmo quando estiver apenas levemente obscurecido por folhagens, chuva ou névoa.' }
        ]
      },
      {
        id: 'drow',
        name: 'Elfo Negro (Drow)',
        lore: 'Habitantes do Subterrâneo, dotados de visão noturna superior e magia sombria.',
        abilityScoreBonus: { CHA: 1 },
        traits: [
          { name: 'Visão no Escuro Superior', description: 'Sua visão no escuro tem alcance de 120 pés.' },
          { name: 'Sensibilidade à Luz Solar', description: 'Desvantagem em ataques e testes de Percepção baseados em visão sob luz solar direta.' },
          { name: 'Magia Drow', description: 'Conhece o truque Luzes Dançantes. No nível 3 aprende Fogo das Fadas e no nível 5 Escuridão.' }
        ]
      }
    ]
  },
  {
    id: 'dwarf',
    name: 'Anão',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    summary: 'Resistentes, leais e mestres da forja. Possuem alta constituição e resistência a venenos.',
    lore: 'Reinos esculpidos nas entranhas das montanhas ecoam com o som de picaretas e forjas. Os anões valorizam honra, tradição, clã e artesanato impecável.',
    speed: 25,
    size: 'Médio',
    darkvision: 60,
    abilityScoreBonus: { CON: 2 },
    languages: ['Comum', 'Anão'],
    traits: [
      { name: 'Resistência Anã', description: 'Vantagem em testes de resistência contra veneno e resistência a dano de veneno.' },
      { name: 'Treinamento Anão com Armas', description: 'Proficiência com Machado de Batalha, Machadinha, Martelo Leve e Martelo de Guerra.' },
      { name: 'Especialização em Rochas', description: 'Vantagem em testes de História relacionados à origem de trabalho em pedra.' }
    ],
    toolProficiencies: ['Ferramentas de Ferreiro', 'Ferramentas de Cervejeiro', 'Ferramentas de Pedreiro'],
    recommendedClasses: ['fighter', 'cleric', 'barbarian', 'paladin'],
    subraces: [
      {
        id: 'hill-dwarf',
        name: 'Anão da Colina',
        lore: 'Possuem sentidos apurados, sabedoria profunda e vitalidade extraordinária.',
        abilityScoreBonus: { WIS: 1 },
        traits: [
          { name: 'Tenacidade Anã', description: 'Seu máximo de pontos de vida aumenta em 1 para cada nível que você possui.' }
        ]
      },
      {
        id: 'mountain-dwarf',
        name: 'Anão da Montanha',
        lore: 'Fortes e acostumados a vestir armaduras pesadas no combate contra monstros subterrâneos.',
        abilityScoreBonus: { STR: 2 },
        traits: [
          { name: 'Treinamento Anão com Armaduras', description: 'Proficiência com armaduras leves e médias.' }
        ]
      }
    ]
  },
  {
    id: 'halfling',
    name: 'Halfling',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    summary: 'Pequenos, ágeis e abençoados com sorte extraordinária e bravura inabalável.',
    lore: 'Os halflings apreciam confortos simples: boa comida, paz e amizade. No entanto, sua curiosidade e sorte inerente os levam a aventuras épicas.',
    speed: 25,
    size: 'Pequeno',
    darkvision: 0,
    abilityScoreBonus: { DEX: 2 },
    languages: ['Comum', 'Halfling'],
    traits: [
      { name: 'Sortudo', description: 'Quando você tirar um 1 natural em um d20 de ataque, teste de habilidade ou salvaguarda, você pode rolar novamente e usar o novo valor.' },
      { name: 'Corajoso', description: 'Vantagem em salvaguardas contra ficar amedrontado.' },
      { name: 'Agilidade Halfling', description: 'Você pode se mover pelo espaço de qualquer criatura que seja de um tamanho maior que o seu.' }
    ],
    recommendedClasses: ['rogue', 'bard', 'ranger', 'monk'],
    subraces: [
      {
        id: 'lightfoot-halfling',
        name: 'Halfling Pies-Ligeiros',
        lore: 'Furtivos e extremamente sociáveis, hábeis em se esconder atrás de aliados maiores.',
        abilityScoreBonus: { CHA: 1 },
        traits: [
          { name: 'Furtividade Natural', description: 'Você pode tentar se esconder mesmo quando estiver escondido apenas atrás de uma criatura pelo menos um tamanho maior que você.' }
        ]
      },
      {
        id: 'stout-halfling',
        name: 'Halfling Robusto',
        lore: 'Dizem ter sangue de anão correndo nas veias, tornando-os mais fortes e resistentes a toxinas.',
        abilityScoreBonus: { CON: 1 },
        traits: [
          { name: 'Resistência dos Robustos', description: 'Vantagem em salvaguardas contra veneno e resistência a dano de veneno.' }
        ]
      }
    ]
  },
  {
    id: 'dragonborn',
    name: 'Draconato',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    summary: 'Orgulhosos descendentes de dragões com sopro elementar devastador e carisma imponente.',
    lore: 'Nascidos de dragões, os draconatos andam orgulhosos por um mundo que os encara com medo e fascínio. Carregam a herança de dragões cromáticos ou metálicos.',
    speed: 30,
    size: 'Médio',
    darkvision: 0,
    abilityScoreBonus: { STR: 2, CHA: 1 },
    languages: ['Comum', 'Dracônico'],
    traits: [
      { name: 'Ancestral Dracônico', description: 'Escolha um tipo de dragão (Fogo, Gelo, Ácido, Eletricidade, Veneno) que determina o dano do seu sopro e sua resistência.' },
      { name: 'Arma de Sopro', description: 'Pode exalar energia destrutiva (Cone ou Linha) causando 2d6 de dano (escala com nível).' },
      { name: 'Resistência a Dano', description: 'Resistência ao tipo de dano associado ao seu ancestral dracônico.' }
    ],
    recommendedClasses: ['paladin', 'barbarian', 'sorcerer', 'fighter'],
    subraces: []
  },
  {
    id: 'half-orc',
    name: 'Meio-Orc',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    summary: 'Ferozes, resistentes e intimidadores. Capazes de sobreviver a golpes fatais e desferir acertos críticos devastadores.',
    lore: 'Meio-orcs combinam a força e ferocidade orc com a ambição e adaptabilidade humana. São guerreiros formidáveis que recusam a derrota.',
    speed: 30,
    size: 'Médio',
    darkvision: 60,
    abilityScoreBonus: { STR: 2, CON: 1 },
    languages: ['Comum', 'Orc'],
    traits: [
      { name: 'Ameaçador', description: 'Você ganha proficiência na perícia Intimidação.' },
      { name: 'Resistência Implacável', description: 'Quando você for reduzido a 0 pontos de vida mas não for morto instantaneamente, pode cair para 1 ponto de vida em vez disso (1/descanso longo).' },
      { name: 'Ataques Selvagens', description: 'Ao conseguir um acerto crítico com uma arma corpo-a-corpo, rola um dos dados de dano da arma adicionalmente.' }
    ],
    skillProficiencies: ['Intimidação'],
    recommendedClasses: ['barbarian', 'fighter', 'paladin'],
    subraces: []
  },
  {
    id: 'gnome',
    name: 'Gnomo',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    summary: 'Curiosos, engenhosos e dotados de astúcia mental e resistência contra magias mentais.',
    lore: 'Gnomos são inventores vibrantes e mestres do entusiasmo. Seus cérebros trabalham incansavelmente criando engenhocas ou estudando os mistérios do arcanismo.',
    speed: 25,
    size: 'Pequeno',
    darkvision: 60,
    abilityScoreBonus: { INT: 2 },
    languages: ['Comum', 'Gnomo'],
    traits: [
      { name: 'Astúcia Gnômica', description: 'Você tem vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma contra magia.' }
    ],
    recommendedClasses: ['wizard', 'rogue', 'artificer'],
    subraces: [
      {
        id: 'rock-gnome',
        name: 'Gnomo das Rochas',
        lore: 'Engenheiros natos com fascínio por inventos mecânicos e alquimia.',
        abilityScoreBonus: { CON: 1 },
        traits: [
          { name: 'Conhecimento de Engenheiro', description: 'Adiciona o dobro do bônus de proficiência em testes de História relacionados a itens mágicos, objetos alquímicos e dispositivos mecânicos.' },
          { name: 'Engenhoca', description: 'Pode construir pequenos dispositivos relógio (Isqueiro mecânico, Caixa de música, Brinquedo relógio).' }
        ]
      },
      {
        id: 'forest-gnome',
        name: 'Gnomo da Floresta',
        lore: 'Furtivos e conectados com a natureza, hábeis na ilusão e na comunicação com pequenos animais.',
        abilityScoreBonus: { DEX: 1 },
        traits: [
          { name: 'Ilusionista Nato', description: 'Conhece o truque Ilusão Menor (INT é seu atributo de conjuração).' },
          { name: 'Falar com Bestas Pequenas', description: 'Consegue comunicar ideias simples para animais de tamanho Pequeno ou Miúdo.' }
        ]
      }
    ]
  },
  {
    id: 'half-elf',
    name: 'Meio-Elfo',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    summary: 'Diplomatas versáteis que unem a graciosidade élfica com a determinação humana.',
    lore: 'Andando nos dois mundos sem pertencer verdadeiramente a nenhum, os meio-elfos combinam a inteligência e encanto dos elfos com o ímpeto dos humanos.',
    speed: 30,
    size: 'Médio',
    darkvision: 60,
    abilityScoreBonus: { CHA: 2 }, // +1 em 2 outras à escolha
    languages: ['Comum', 'Élfico', 'Um idioma adicional à escolha'],
    traits: [
      { name: 'Ancestralidade Feérica', description: 'Vantagem em salvaguardas contra ser enfeitiçado e a magia não pode colocá-lo para dormir.' },
      { name: 'Versatilidade em Perícias', description: 'Você ganha proficiência em duas perícias à sua escolha.' }
    ],
    recommendedClasses: ['bard', 'sorcerer', 'warlock', 'paladin', 'rogue'],
    subraces: []
  },
  {
    id: 'tiefling',
    name: 'Tiefling',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    summary: 'Herdeiros de pactos infernais com chifres, cauda, resistência ao fogo e magia infernal.',
    lore: 'Carregando a marca do plano infernal em suas feições, os tieflings enfrentam preconceito com autoconfiança e maestria arcana.',
    speed: 30,
    size: 'Médio',
    darkvision: 60,
    abilityScoreBonus: { CHA: 2, INT: 1 },
    languages: ['Comum', 'Infernal'],
    traits: [
      { name: 'Resistência Infernal', description: 'Resistência a dano de Fogo.' },
      { name: 'Legado Infernal', description: 'Você conhece o truque Taumaturgia. No nível 3 aprende Repreensão Infernal e no nível 5 Escuridão.' }
    ],
    recommendedClasses: ['warlock', 'sorcerer', 'bard', 'wizard', 'paladin'],
    subraces: []
  }
];
