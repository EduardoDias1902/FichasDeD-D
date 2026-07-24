import { DndClass, ClassLevelProgression } from '../types/dnd5e';

const createGenericProgression = (isCaster: boolean, cantrips: number[] = [], slots: number[][] = []): ClassLevelProgression[] => {
  const table: ClassLevelProgression[] = [];
  for (let lvl = 1; lvl <= 20; lvl++) {
    const pb = Math.ceil(1 + lvl / 4);
    const features: string[] = [];
    if (lvl === 1) features.push('Características Iniciais de Classe');
    if (lvl === 2) features.push('Habilidade de Nível 2');
    if (lvl === 3) features.push('Escolha de Subclasse / Arquétipo');
    if (lvl === 4) features.push('Aumento no Valor de Habilidade (ASI) / Talentos');
    if (lvl === 5) features.push(isCaster ? 'Magias de 3º Nível' : 'Ataque Extra');
    if (lvl === 8) features.push('Aumento no Valor de Habilidade (ASI) / Talentos');
    if (lvl === 11) features.push('Característica de Nível Superior');
    if (lvl === 12) features.push('Aumento no Valor de Habilidade (ASI) / Talentos');
    if (lvl === 16) features.push('Aumento no Valor de Habilidade (ASI) / Talentos');
    if (lvl === 19) features.push('Aumento no Valor de Habilidade (ASI) / Talentos');
    if (lvl === 20) features.push('Habilidade Épica de Nível 20 (Ápice)');

    table.push({
      level: lvl,
      proficiencyBonus: pb,
      features,
      cantripsKnown: cantrips[lvl - 1] || undefined,
      spellSlots: slots[lvl - 1] || undefined
    });
  }
  return table;
};

// Spell slot table for full casters (Wizard, Cleric, Druid, Bard, Sorcerer)
const FULL_CASTER_SLOTS: number[][] = [
  [2],             // 1
  [3],             // 2
  [4, 2],          // 3
  [4, 3],          // 4
  [4, 3, 2],       // 5
  [4, 3, 3],       // 6
  [4, 3, 3, 1],    // 7
  [4, 3, 3, 2],    // 8
  [4, 3, 3, 3, 1], // 9
  [4, 3, 3, 3, 2], // 10
  [4, 3, 3, 3, 2, 1], // 11
  [4, 3, 3, 3, 2, 1], // 12
  [4, 3, 3, 3, 2, 1, 1], // 13
  [4, 3, 3, 3, 2, 1, 1], // 14
  [4, 3, 3, 3, 2, 1, 1, 1], // 15
  [4, 3, 3, 3, 2, 1, 1, 1], // 16
  [4, 3, 3, 3, 2, 1, 1, 1, 1], // 17
  [4, 3, 3, 3, 3, 1, 1, 1, 1], // 18
  [4, 3, 3, 3, 3, 2, 1, 1, 1], // 19
  [4, 3, 3, 3, 3, 2, 2, 1, 1]  // 20
];

export const CLASSES_DATA: DndClass[] = [
  {
    id: 'fighter',
    name: 'Guerreiro',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    description: 'Mestre inigualável do combate armado, perito em todas as armas e armaduras.',
    lore: 'Seja um cavaleiro em armadura reluzente, um arqueiro veterano ou um mercenário calejado, guerreiros combinam treinamento rigoroso com dominância física nas linhas de frente.',
    difficulty: 'Fácil',
    playstyle: 'Combate Corpo a Corpo ou À Distância / Alta CA e Dano Consistente',
    role: 'Tanque / Dano Principal (DPS)',
    hitDie: 10,
    primaryAbility: ['STR', 'DEX'],
    savingThrows: ['STR', 'CON'],
    armorProficiencies: ['Todas as Armaduras (Leves, Médias, Pesadas)', 'Escudos'],
    weaponProficiencies: ['Armas Simples', 'Armas Marciais'],
    toolProficiencies: ['Nenhuma por padrão'],
    skillChoiceCount: 2,
    skillOptions: ['Acrobacia', 'Atletismo', 'História', 'Intimidação', 'Intuição', 'Lidar com Animais', 'Medicina', 'Percepção', 'Sobrevivência'],
    level1Features: [
      { name: 'Estilo de Luta', description: 'Escolha uma especialização (Arquearia, Defesa, Duelismo, Armas Grandes, Proteção, Combate com Duas Armas).' },
      { name: 'Retomar o Fôlego', description: 'Você possui uma reserva de energia de 1d10 + nível de guerreiro para recuperar PV com uma Ação Bônus (1/descanso curto).' }
    ],
    progressionTable: createGenericProgression(false),
    subclassUnlockLevel: 3,
    subclasses: [
      {
        id: 'champion',
        name: 'Campeão',
        lore: 'Focado no aprimoramento puro do poder físico e ataques críticos mortais.',
        features: [{ name: 'Crítico Aprimorado', description: 'Seus ataques com arma conseguem acerto crítico em rolagens de 19 ou 20.' }]
      },
      {
        id: 'battle-master',
        name: 'Mestre da Batalha',
        lore: 'Tático brilhante que estuda a arte da guerra e emprega manobras estratégicas.',
        features: [{ name: 'Superioridade Tática', description: 'Ganha dados de superioridade para executar manobras (Empurrão, Desarme, Provocação, etc.).' }]
      },
      {
        id: 'eldritch-knight',
        name: 'Cavaleiro Arcano',
        lore: 'Combina maestria com espadas com a magia de abjuração e evocação.',
        features: [{ name: 'Conjuração', description: 'Aprende magias da lista de Mago focadas em abjuração e evocação.' }]
      }
    ],
    isSpellcaster: false
  },
  {
    id: 'wizard',
    name: 'Mago',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80',
    description: 'Mestre erudito das artes arcanas, capaz de manipular a realidade através do seu grimório.',
    lore: 'Magos são estudiosos supremos da urdida mágica. Através de anos de leitura intensa e experimentos minuciosos, aprendem a lançar magias devastadoras e utilitárias.',
    difficulty: 'Difícil',
    playstyle: 'Conjuração Versátil / Controle de Grupo / Dano em Área',
    role: 'Suporte Arcano / Controle / Dano Em Área',
    hitDie: 6,
    primaryAbility: ['INT'],
    savingThrows: ['INT', 'WIS'],
    armorProficiencies: ['Nenhuma'],
    weaponProficiencies: ['Adagas', 'Dardos', 'Fundas', 'Bordões', 'Brestas Leves'],
    toolProficiencies: ['Nenhuma'],
    skillChoiceCount: 2,
    skillOptions: ['Arcanismo', 'História', 'Investigação', 'Intuição', 'Medicina', 'Religião'],
    level1Features: [
      { name: 'Conjuração', description: 'Você conjura magias preparadas a partir do seu Grimório usando Inteligência.' },
      { name: 'Recuperação Arcana', description: 'Uma vez por dia após um descanso curto, você pode recuperar espaços de magia cuja soma dos níveis seja igual a metade do seu nível de mago.' }
    ],
    progressionTable: createGenericProgression(true, [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], FULL_CASTER_SLOTS),
    subclassUnlockLevel: 2,
    subclasses: [
      {
        id: 'evocation',
        name: 'Escola de Evocação',
        lore: 'Especialistas em manipular energias elementares para criar explosões devastadoras.',
        features: [{ name: 'Esculpir Magias', description: 'Você pode criar áreas seguras para aliados quando lança magias de evocação em área.' }]
      },
      {
        id: 'abjuration',
        name: 'Escola de Abjuração',
        lore: 'Mestres da proteção e negação de magia inimiga.',
        features: [{ name: 'Proteção Arcana', description: 'Ganha um escudo mágico invisível que absorve dano direcionado a você.' }]
      },
      {
        id: 'necromancy',
        name: 'Escola de Necromancia',
        lore: 'Estudiosos dos mistérios da vida, morte e manipulação de mortos-vivos.',
        features: [{ name: 'Colheita Sombria', description: 'Recupera pontos de vida sempre que mata uma criatura com uma magia.' }]
      }
    ],
    isSpellcaster: true,
    spellcastingAbility: 'INT'
  },
  {
    id: 'rogue',
    name: 'Ladino',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    description: 'Especialista em furtividade, desarmar armadilhas e desferir ataques furtivos letais.',
    lore: 'Ladinos contam com astúcia, agilidade e precisão anatômica para vencer desafios. Sejam assassinos, batedores ou ladrões de tesouros, atacam onde mais dói.',
    difficulty: 'Fácil',
    playstyle: 'Furtividade / Mobilidade / Explosão de Dano Único (Ataque Furtivo)',
    role: 'Explorador / Dano Furtivo / Utilidade',
    hitDie: 8,
    primaryAbility: ['DEX'],
    savingThrows: ['DEX', 'INT'],
    armorProficiencies: ['Armaduras Leves'],
    weaponProficiencies: ['Armas Simples', 'Besta Leve', 'Espada Curta', 'Espada Longa', 'Rapieira'],
    toolProficiencies: ['Ferramentas de Ladrão'],
    skillChoiceCount: 4,
    skillOptions: ['Acrobacia', 'Atletismo', 'Atuação', 'Enganação', 'Furtividade', 'Intimidação', 'Intuição', 'Investigação', 'Percepção', 'Prestidigitação', 'Persuasão'],
    level1Features: [
      { name: 'Especialização (Expertise)', description: 'Escolha duas perícias com as quais tem proficiência; seu bônus de proficiência é dobrado nesses testes.' },
      { name: 'Ataque Furtivo', description: 'Causa 1d6 de dano extra por turno a uma criatura atingida quando tem vantagem ou um aliado a 5 pés do alvo.' },
      { name: 'Gíria de Ladrão', description: 'Linguagem secreta e códigos de comunicação do submundo.' }
    ],
    progressionTable: createGenericProgression(false),
    subclassUnlockLevel: 3,
    subclasses: [
      {
        id: 'thief',
        name: 'Ladrão',
        lore: 'Perito em acrobacia, arrombamento e uso de objetos complexos no combate.',
        features: [{ name: 'Mãos Rápidas', description: 'Pode usar Ação Bônus para fazer testes de Prestidigitação, desarmar armadilhas ou usar objetos.' }]
      },
      {
        id: 'assassin',
        name: 'Assassino',
        lore: 'Mestre da emboscada e de venenos letais.',
        features: [{ name: 'Assassinato', description: 'Vantagem contra criaturas que ainda não agiram no combate e acerto crítico automático em surpresa.' }]
      },
      {
        id: 'arcane-trickster',
        name: 'Trapaceiro Arcano',
        lore: 'Combina furtividade e truques com magias de ilusão e encantamento.',
        features: [{ name: 'Mão Mágica Aprimorada', description: 'Sua Mão Mágica é invisível e pode realizar tarefas de ladino à distância.' }]
      }
    ],
    isSpellcaster: false
  },
  {
    id: 'cleric',
    name: 'Clérigo',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    description: 'Campeão divino que canaliza a força das divindades para curar aliados e punir os ímpios.',
    lore: 'Clérigos são intermediários entre o plano mortal e o plano dos deuses. Através de sua fé inabalável, realizam milagres, purificam malefícios e lideram na batalha.',
    difficulty: 'Médio',
    playstyle: 'Cura / Buffs Divinos / Suporte Pesado e Tanque Divino',
    role: 'Curador Principal / Suporte Divino / Tanque',
    hitDie: 8,
    primaryAbility: ['WIS', 'STR', 'CON'],
    savingThrows: ['WIS', 'CHA'],
    armorProficiencies: ['Armaduras Leves', 'Armaduras Médias', 'Escudos'],
    weaponProficiencies: ['Todas as Armas Simples'],
    toolProficiencies: ['Nenhuma por padrão'],
    skillChoiceCount: 2,
    skillOptions: ['História', 'Intuição', 'Medicina', 'Persuasão', 'Religião'],
    level1Features: [
      { name: 'Conjuração Divina', description: 'Prepara e conjura magias divinas baseadas em Sabedoria.' },
      { name: 'Domínio Divino', description: 'Escolha um Domínio no Nível 1 (Vida, Guerra, Luz, Enganação, etc.) que concede magias adicionais e proficiências.' }
    ],
    progressionTable: createGenericProgression(true, [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], FULL_CASTER_SLOTS),
    subclassUnlockLevel: 1,
    subclasses: [
      {
        id: 'life-domain',
        name: 'Domínio da Vida',
        lore: 'Focado na restauração de pontos de vida e preservação da vitalidade.',
        features: [{ name: 'Discípulo da Vida', description: 'Suas magias de cura restauram 2 + nível da magia a mais de PV.' }]
      },
      {
        id: 'war-domain',
        name: 'Domínio da Guerra',
        lore: 'Inspira guerreiros na batalha e empunha armas com ferocidade sagrada.',
        features: [{ name: 'Sacerdote da Guerra', description: 'Ganha proficiência com armaduras pesadas e armas marciais, e ataques bônus extras.' }]
      },
      {
        id: 'light-domain',
        name: 'Domínio da Luz',
        lore: 'Canaliza o fogo radiante e o brilho solar para cegar e incinerar o mal.',
        features: [{ name: 'Brilho Protetor', description: 'Impõe desvantagem no ataque de um inimigo contra você usando luz divinal.' }]
      }
    ],
    isSpellcaster: true,
    spellcastingAbility: 'WIS'
  },
  {
    id: 'barbarian',
    name: 'Bárbaro',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    description: 'Guerreiro selvagem movido pela fúria primordial, capaz de suportar danos massivos.',
    lore: 'Bárbaros vêm das terras selvagens. Ao entrar em fúria, transcendem os limites normais da carne, tornando-se imparáveis no campo de batalha.',
    difficulty: 'Fácil',
    playstyle: 'Tanque Bruto / Dano Massivo Corpo a Corpo',
    role: 'Tanque Principal / Linha de Frente (Frontline)',
    hitDie: 12,
    primaryAbility: ['STR', 'CON'],
    savingThrows: ['STR', 'CON'],
    armorProficiencies: ['Armaduras Leves', 'Armaduras Médias', 'Escudos'],
    weaponProficiencies: ['Armas Simples', 'Armas Marciais'],
    toolProficiencies: ['Nenhuma'],
    skillChoiceCount: 2,
    skillOptions: ['Atletismo', 'Intimidação', 'Lidar com Animais', 'Natureza', 'Percepção', 'Sobrevivência'],
    level1Features: [
      { name: 'Fúria', description: 'Como Ação Bônus, entra em fúria ganhando vantagem em testes de FOR, bônus no dano corpo a corpo e resistência a dano concussão, cortante e perfurante.' },
      { name: 'Defesa Sem Armadura', description: 'Quando não usa armadura, sua Classe de Armadura é igual a 10 + Mod. DES + Mod. CON (+ Mod. Escudo se equipado).' }
    ],
    progressionTable: createGenericProgression(false),
    subclassUnlockLevel: 3,
    subclasses: [
      {
        id: 'berserker',
        name: 'Caminho do Berserker',
        lore: 'Entrega-se completamente ao frenesi de sangue durante a batalha.',
        features: [{ name: 'Frenesi', description: 'Pode realizar um ataque corpo a corpo adicional como Ação Bônus em cada turno de fúria.' }]
      },
      {
        id: 'totem-warrior',
        name: 'Caminho do Guerreiro Totêmico',
        lore: 'Conecta-se com os espíritos animais (Urso, Águia, Lobo) para ganhar habilidades místicas.',
        features: [{ name: 'Espírito Totêmico (Urso)', description: 'Ganha resistência a TODOS os tipos de dano (exceto psíquico) enquanto em fúria.' }]
      }
    ],
    isSpellcaster: false
  },
  {
    id: 'bard',
    name: 'Bardo',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Artista cativante e versátil que usa música e palavras para tecer magias poderosas.',
    lore: 'Bardos são mestres da canção, da oratória e do saber arcano. Eles inspiram aliados, confundem inimigos e conseguem realizar praticamente qualquer tarefa com graciosidade.',
    difficulty: 'Médio',
    playstyle: 'Suporte Cativante / Versatilidade de Magia e Perícias / Controle',
    role: 'Suporte Geral / Coringa (Jack of All Trades)',
    hitDie: 8,
    primaryAbility: ['CHA', 'DEX'],
    savingThrows: ['DEX', 'CHA'],
    armorProficiencies: ['Armaduras Leves'],
    weaponProficiencies: ['Armas Simples', 'Besta Leve', 'Espada Curta', 'Espada Longa', 'Rapieira'],
    toolProficiencies: ['Três instrumentos musicais à sua escolha'],
    skillChoiceCount: 3,
    skillOptions: ['Acrobacia', 'Atletismo', 'Arcanismo', 'Atuação', 'Enganação', 'Furtividade', 'História', 'Intimidação', 'Intuição', 'Investigação', 'Lidar com Animais', 'Medicina', 'Natureza', 'Percepção', 'Prestidigitação', 'Persuasão', 'Religião', 'Sobrevivência'],
    level1Features: [
      { name: 'Inspiração Bárdica', description: 'Concede um dado (d6) a um aliado como Ação Bônus para adicionar a um teste de habilidade, ataque ou salvaguarda.' },
      { name: 'Conjuração', description: 'Conjura magias bárdicas baseadas em Carisma.' }
    ],
    progressionTable: createGenericProgression(true, [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], FULL_CASTER_SLOTS),
    subclassUnlockLevel: 3,
    subclasses: [
      {
        id: 'college-of-lore',
        name: 'Colégio do Saber',
        lore: 'Buscadores de verdades antigas que dominam perícias e magias de qualquer classe.',
        features: [{ name: 'Palavras Cortantes', description: 'Usa a Inspiração Bárdica para subtrair do ataque ou dano do inimigo.' }]
      },
      {
        id: 'college-of-valor',
        name: 'Colégio do Valor',
        lore: 'Contadores de sagas heróicas que lutam na linha de frente ao lado dos guerreiros.',
        features: [{ name: 'Inspiração de Combate', description: 'Aliados podem usar a Inspiração Bárdica para aumentar o dano ou a Classe de Armadura.' }]
      }
    ],
    isSpellcaster: true,
    spellcastingAbility: 'CHA'
  },
  {
    id: 'paladin',
    name: 'Paladino',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    description: 'Guardião sagrado vinculado a um juramento solene, combinando combate pesado e destruição divina.',
    lore: 'Paladinos são jurados a causas sagradas. Sua devoção é tão intensa que lhes concede a capacidade de canalizar a energia divina para curar feridos e infligir o Destruição Divina (Smite).',
    difficulty: 'Médio',
    playstyle: 'Tanque Sagrado / Explosão de Dano Divino (Smite) / Auras de Proteção',
    role: 'Tanque / Dano Principal / Suporte de Aura',
    hitDie: 10,
    primaryAbility: ['STR', 'CHA'],
    savingThrows: ['WIS', 'CHA'],
    armorProficiencies: ['Todas as Armaduras', 'Escudos'],
    weaponProficiencies: ['Armas Simples', 'Armas Marciais'],
    toolProficiencies: ['Nenhuma'],
    skillChoiceCount: 2,
    skillOptions: ['Atletismo', 'Intimidação', 'Intuição', 'Medicina', 'Persuasão', 'Religião'],
    level1Features: [
      { name: 'Sentido Divino', description: 'Sente a presença de celestiais, demônios ou mortos-vivos a até 60 pés.' },
      { name: 'Impor as Mãos', description: 'Possui uma reserva de cura igual a 5 x Nível de Paladino para distribuir por toque.' }
    ],
    progressionTable: createGenericProgression(true),
    subclassUnlockLevel: 3,
    subclasses: [
      {
        id: 'oath-of-devotion',
        name: 'Juramento de Devoção',
        lore: 'O cavaleiro de armadura reluzente defensor da justiça, honra e compaixão.',
        features: [{ name: 'Arma Sagrada', description: 'Adiciona seu modificador de Carisma às rolagens de ataque com uma arma.' }]
      },
      {
        id: 'oath-of-vengeance',
        name: 'Juramento de Vingança',
        lore: 'Caçador implacável que pune os malfeitores a qualquer custo.',
        features: [{ name: 'Voto de Inimizade', description: 'Ganha vantagem nas rolagens de ataque contra um alvo escolhido por 1 minuto.' }]
      }
    ],
    isSpellcaster: true,
    spellcastingAbility: 'CHA'
  },
  {
    id: 'druid',
    name: 'Druida',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: 'Guardião da natureza capaz de se transformar em feras selvagens e conjurar a fúria dos elementos.',
    lore: 'Druidas veneram a natureza acima de tudo. Eles canalizam o poder bruto das tempestades, plantas e feras para manter o equilíbrio primordial.',
    difficulty: 'Difícil',
    playstyle: 'Metamorfose (Forma Selvagem) / Controle de Campo / Magia Elementar',
    role: 'Tanque de Forma Selvagem / Controle / Suporte',
    hitDie: 8,
    primaryAbility: ['WIS'],
    savingThrows: ['INT', 'WIS'],
    armorProficiencies: ['Armaduras Leves (não metálicas)', 'Armaduras Médias (não metálicas)', 'Escudos (não metálicos)'],
    weaponProficiencies: ['Adagas', 'Dardos', 'Bordões', 'Cimitarras', 'Fundas', 'Lanças'],
    toolProficiencies: ['Kit de Herbalismo'],
    skillChoiceCount: 2,
    skillOptions: ['Arcanismo', 'Intuição', 'Lidar com Animais', 'Medicina', 'Natureza', 'Percepção', 'Religião', 'Sobrevivência'],
    level1Features: [
      { name: 'Druídico', description: 'Linguagem secreta dos druidas e habilidade de deixar mensagens ocultas na natureza.' },
      { name: 'Conjuração', description: 'Conjura magias da natureza preparadas diariamente baseadas em Sabedoria.' }
    ],
    progressionTable: createGenericProgression(true, [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], FULL_CASTER_SLOTS),
    subclassUnlockLevel: 2,
    subclasses: [
      {
        id: 'circle-of-the-moon',
        name: 'Círculo da Lua',
        lore: 'Mestres da Forma Selvagem que se transformam em feras de grande desafio em batalha.',
        features: [{ name: 'Forma Selvagem de Combate', description: 'Pode se transformar em feras mais fortes usando Ação Bônus.' }]
      },
      {
        id: 'circle-of-the-land',
        name: 'Círculo da Terra',
        lore: 'Focado na conjuração de magias elementares e recuperação de poder mágico.',
        features: [{ name: 'Recuperação Natural', description: 'Recupera espaços de magia durante um descanso curto.' }]
      }
    ],
    isSpellcaster: true,
    spellcastingAbility: 'WIS'
  },
  {
    id: 'monk',
    name: 'Monge',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    description: 'Mestre das artes marciais que canaliza o Ki para realizar proezas físicas incríveis.',
    lore: 'Monges treinam corpo e mente em monastérios isolados. Eles canalizam o Ki corporal para desferir golpes ultrarrápidos, desviar de projéteis e andar em paredes.',
    difficulty: 'Médio',
    playstyle: 'Artes Marciais Velocíssimas / Controle por Ki / Alta Mobilidade',
    role: 'Atacante Ágil / Atordoador (Stunner)',
    hitDie: 8,
    primaryAbility: ['DEX', 'WIS'],
    savingThrows: ['STR', 'DEX'],
    armorProficiencies: ['Nenhuma'],
    weaponProficiencies: ['Armas Simples', 'Espadas Curtas'],
    toolProficiencies: ['Um tipo de ferramenta de artesão ou um instrumento musical'],
    skillChoiceCount: 2,
    skillOptions: ['Acrobacia', 'Atletismo', 'História', 'Intuição', 'Religião', 'Furtividade'],
    level1Features: [
      { name: 'Defesa Sem Armadura', description: 'Sua CA é igual a 10 + Mod. DES + Mod. SAB quando não veste armadura.' },
      { name: 'Artes Marciais', description: 'Pode usar DES para ataques desarmados e armas de monge, causando dado especial de dano + ataque bônus desarmado.' }
    ],
    progressionTable: createGenericProgression(false),
    subclassUnlockLevel: 3,
    subclasses: [
      {
        id: 'way-of-open-hand',
        name: 'Caminho da Mão Aberta',
        lore: 'Mestres supremos do combate desarmado que derrubam e empurram inimigos.',
        features: [{ name: 'Técnica da Mão Aberta', description: 'Impõe efeitos (derrubar, empurrar, negar reações) com Golpes das Rajadas.' }]
      },
      {
        id: 'way-of-shadow',
        name: 'Caminho da Sombra',
        lore: 'Ninjas místicos que usam o Ki para se teleportar através das sombras.',
        features: [{ name: 'Artes da Sombra', description: 'Usa Ki para conjurar Escuridão, Furtividade Passos Sem Pegadas e Visão Noturna.' }]
      }
    ],
    isSpellcaster: false
  },
  {
    id: 'ranger',
    name: 'Patrulheiro',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: 'Mestre da sobrevivência e caça, perito em combater inimigos específicos nas terras selvagens.',
    lore: 'Patrulheiros protegem as fronteiras da civilização contra os perigos da natureza e monstros selvagens. São caçadores imbatíveis que conhecem o terreno.',
    difficulty: 'Fácil',
    playstyle: 'Combate à Distância / Rastreamento / Magia de Sobrevivência',
    role: 'Atirador de Elite / Rastreador / Dano Sustentado',
    hitDie: 10,
    primaryAbility: ['DEX', 'WIS'],
    savingThrows: ['STR', 'DEX'],
    armorProficiencies: ['Armaduras Leves', 'Armaduras Médias', 'Escudos'],
    weaponProficiencies: ['Armas Simples', 'Armas Marciais'],
    toolProficiencies: ['Nenhuma'],
    skillChoiceCount: 3,
    skillOptions: ['Acrobacia', 'Atletismo', 'Furtividade', 'Intuição', 'Investigação', 'Lidar com Animais', 'Natureza', 'Percepção', 'Sobrevivência'],
    level1Features: [
      { name: 'Inimigo Favorito', description: 'Vantagem em testes de Sobrevivência para rastrear e Sabedoria para lembrar informações sobre um tipo de criatura.' },
      { name: 'Explorador Natural', description: 'Ignora terreno difícil e ganha benefícios de viagem no seu tipo de terreno favorito.' }
    ],
    progressionTable: createGenericProgression(true),
    subclassUnlockLevel: 3,
    subclasses: [
      {
        id: 'hunter',
        name: 'Caçador',
        lore: 'Especialista em táticas de combate contra hordas ou presas gigantescas.',
        features: [{ name: 'Presa do Caçador', description: 'Causa 1d8 de dano extra contra alvos feridos.' }]
      },
      {
        id: 'beast-master',
        name: 'Mestre das Feras',
        lore: 'Forja um vínculo mágico inquebrável com um companheiro animal leal.',
        features: [{ name: 'Companheiro do Patrulheiro', description: 'Ganha um companheiro animal que luta ao seu lado.' }]
      }
    ],
    isSpellcaster: true,
    spellcastingAbility: 'WIS'
  },
  {
    id: 'sorcerer',
    name: 'Feiticeiro',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80',
    description: 'Conjurador nato cuja magia flui do seu sangue, ancestralidade ou dom caótico.',
    lore: 'Ao contrário dos magos que estudam, os feiticeiros nascem com o dom arcano na própria alma. Eles moldam e alteram a magia crua usando a Metamagia.',
    difficulty: 'Médio',
    playstyle: 'Metamagia / Modificação Mágica / Conjuração Espontânea',
    role: 'Dano de Explosão Arcano / Suporte de Metamagia',
    hitDie: 6,
    primaryAbility: ['CHA'],
    savingThrows: ['CON', 'CHA'],
    armorProficiencies: ['Nenhuma'],
    weaponProficiencies: ['Adagas', 'Dardos', 'Fundas', 'Bordões', 'Brestas Leves'],
    toolProficiencies: ['Nenhuma'],
    skillChoiceCount: 2,
    skillOptions: ['Arcanismo', 'Enganação', 'Intimidação', 'Intuição', 'Persuasão', 'Religião'],
    level1Features: [
      { name: 'Origem Feiticeira', description: 'Escolha a fonte do seu poder (Linha de Sangue Dracônica ou Magia Selvagem) no Nível 1.' },
      { name: 'Conjuração Feiticeira', description: 'Conjura magias de feiticeiro conhecidas usando Carisma.' }
    ],
    progressionTable: createGenericProgression(true, [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], FULL_CASTER_SLOTS),
    subclassUnlockLevel: 1,
    subclasses: [
      {
        id: 'draconic-bloodline',
        name: 'Linha de Sangue Dracônica',
        lore: 'A magia dos dragões corre nas suas veias, concedendo escamas e vitalidade.',
        features: [{ name: 'Resiliência Dracônica', description: 'Sua CA sem armadura é 13 + Mod. DES e seu PV máximo aumenta em 1 por nível.' }]
      },
      {
        id: 'wild-magic',
        name: 'Magia Selvagem',
        lore: 'Sua magia vem do Caos Puro, podendo provocar ondas imprevisíveis de poder.',
        features: [{ name: 'Surto de Magia Selvagem', description: 'Ao conjurar uma magia, pode desencadear um efeito aleatório da tabela de caos.' }]
      }
    ],
    isSpellcaster: true,
    spellcastingAbility: 'CHA'
  },
  {
    id: 'warlock',
    name: 'Bruxo',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    description: 'Buscador de segredos proibidos que fez um pacto místico com um patrono extraplanar.',
    lore: 'Bruxos forjam pactos com seres de poder sobrenatural em troca de magia devastadora (Disparo Místico), invocações místicas e patronato de demônios, fadas ou seres antigos.',
    difficulty: 'Médio',
    playstyle: 'Magia de Pacto (Slots curtos) / Disparo Místico / Invocações Customizáveis',
    role: 'Atirador Arcano / Utilitário de Pacto',
    hitDie: 8,
    primaryAbility: ['CHA'],
    savingThrows: ['WIS', 'CHA'],
    armorProficiencies: ['Armaduras Leves'],
    weaponProficiencies: ['Todas as Armas Simples'],
    toolProficiencies: ['Nenhuma'],
    skillChoiceCount: 2,
    skillOptions: ['Arcanismo', 'Enganação', 'História', 'Intimidação', 'Investigação', 'Natureza', 'Religião'],
    level1Features: [
      { name: 'Patrono Extraplanar', description: 'Escolha seu patrono no Nível 1 (O Corruptor, A Feérica ou O Grande Antigo).' },
      { name: 'Magia de Pacto', description: 'Seus espaços de magia de bruxo são sempre no maior nível possível e se recuperam em Descanso Curto.' }
    ],
    progressionTable: createGenericProgression(true, [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]),
    subclassUnlockLevel: 1,
    subclasses: [
      {
        id: 'the-fiend',
        name: 'O Corruptor (Fiend)',
        lore: 'Pacto selado com um diabo ou demônio dos Infernos ou do Abismo.',
        features: [{ name: 'Bênção do Corruptor', description: 'Ganhe PV temporários ao reduzir um inimigo a 0 PV.' }]
      },
      {
        id: 'the-archfey',
        name: 'A Feérica (Archfey)',
        lore: 'Pacto selado com uma criatura lendária da Agrestia Feérica.',
        features: [{ name: 'Presença Feérica', description: 'Encante ou amedronte criaturas ao seu redor por 1 turno.' }]
      },
      {
        id: 'the-great-old-one',
        name: 'O Grande Antigo (Great Old One)',
        lore: 'Pacto com um ser alienígena dos limites da existência (Cthulhu-esque).',
        features: [{ name: 'Mente Despertada', description: 'Comunique-se telepatica e abertamente com qualquer criatura a até 30 pés.' }]
      }
    ],
    isSpellcaster: true,
    spellcastingAbility: 'CHA'
  }
];
