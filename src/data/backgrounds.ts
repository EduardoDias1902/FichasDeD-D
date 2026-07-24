import { Background } from '../types/dnd5e';

export const BACKGROUNDS_DATA: Background[] = [
  {
    id: 'acolyte',
    name: 'Acólito',
    lore: 'Você passou sua vida a serviço de um templo dedicado a um deus ou panteão. Atua como intermediário entre o mundo dos deuses e o dos mortais.',
    skillProficiencies: ['Intuição', 'Religião'],
    toolProficiencies: [],
    languageCount: 2,
    startingEquipment: ['Símbolo Sagrado', 'Livro de Orações', '5 Varetas de Incenso', 'Vestimentas de Templo', '15 po'],
    feature: {
      name: 'Abrigo dos Féis',
      description: 'Como acólito, você comanda o respeito daqueles que compartilham da sua fé. Você e seus companheiros podem receber cura e cuidados gratuitos em templos da sua divindade.'
    },
    suggestedTraits: ['Idolatro meu deus com zelo inabalável.', 'Cito textos sagrados em quase todas as conversas.'],
    suggestedIdeals: ['Tradição: As tradições do templo devem ser mantidas.', 'Caridade: Sempre ajudo os necessitados.'],
    suggestedBonds: ['Eu faria qualquer coisa para proteger meu templo natal.', 'Busco uma relíquia sagrada perdida.'],
    suggestedFlaws: ['Julgo os outros severamente por suas fraquezas morais.', 'Confio cegamente na hierarquia do templo.']
  },
  {
    id: 'criminal',
    name: 'Criminoso',
    lore: 'Você tem um histórico de quebrar leis e viveu no submundo. Seja ladrão, contrabandista ou assassino, aprendeu a sobreviver nas sombras.',
    skillProficiencies: ['Enganação', 'Furtividade'],
    toolProficiencies: ['Ferramentas de Ladrão', 'Um tipo de jogo de azar'],
    languageCount: 0,
    startingEquipment: ['Pé de Cabra', 'Roupas Escuras com Capuz', '15 po'],
    feature: {
      name: 'Contato no Submundo',
      description: 'Você possui um contato confiável que atua como seu elo com a rede de criminosos locais.'
    },
    suggestedTraits: ['Sempre tenho um plano de fuga preparado.', 'Não confio facilmente em ninguém.'],
    suggestedIdeals: ['Liberdade: Ninguém me diz o que fazer.', 'Lealdade: Não entrego meus parceiros.'],
    suggestedBonds: ['Tenho uma dívida de sangue a quitar.', 'Estou juntando dinheiro para aposentar minha família.'],
    suggestedFlaws: ['Quando vejo algo valioso, sinto o impulso irracional de roubar.', 'Fujo ao primeiro sinal de perigo real.']
  },
  {
    id: 'folk-hero',
    name: 'Herói do Povo',
    lore: 'Você veio de origens humildes, mas se levantou para defender o povo simples contra tiranos ou monstros assustadores.',
    skillProficiencies: ['Lidar com Animais', 'Sobrevivência'],
    toolProficiencies: ['Um tipo de ferramenta de artesão', 'Veículos Terrestres'],
    languageCount: 0,
    startingEquipment: ['Ferramentas de Artesão', 'Pá', 'Vaso de Cerâmica', 'Roupas Comuns', '10 po'],
    feature: {
      name: 'Hospitalidade Rústica',
      description: 'Pessoas comuns fornecem abrigo, comida e refúgio para você e seus aliados contra perseguidores.'
    },
    suggestedTraits: ['Julgo as pessoas por suas ações, não por seus títulos.', 'Defendo quem não pode se defender.'],
    suggestedIdeals: ['Justiça: Ninguém está acima da lei ou da retidão.', 'Sinceridade: Falo sempre a verdade.'],
    suggestedBonds: ['Minha vila natal é o lugar mais precioso para mim.', 'Protejo os fracos contra os opressores.'],
    suggestedFlaws: ['Tenho dificuldade em confiar em nobres ou autoridades.', 'Minha bravura faz com que eu tome riscos inconsequentes.']
  },
  {
    id: 'noble',
    name: 'Nobre',
    lore: 'Você nasceu em uma família aristocrática com títulos, riqueza e privilégios. Acostumado ao respeito e à alta sociedade.',
    skillProficiencies: ['História', 'Persuasão'],
    toolProficiencies: ['Um tipo de jogo de azar'],
    languageCount: 1,
    startingEquipment: ['Traje Fino', 'Anel de Selo Familiar', 'Pergaminho de Linhagem', '25 po'],
    feature: {
      name: 'Posição de Privilégio',
      description: 'Graças ao seu título, as pessoas assumem que você pertence à alta sociedade. Você é bem-vindo na alta nobreza e pode conseguir audiências.'
    },
    suggestedTraits: ['Comportamento impecável e postura aristocrática.', 'Acredito que meu sangue me torna destinado à grandeza.'],
    suggestedIdeals: ['Nobreza Obriga: É meu dever proteger os cidadãos comuns.', 'Poder: A posição social concede autoridade.'],
    suggestedBonds: ['A honra da minha família deve permanecer imaculada.', 'Desejo restaurar o prestígio perdido da minha casa.'],
    suggestedFlaws: ['Olho com desdém para a sujeira das classes mais baixas.', 'Acredito que todos devem me obedecer.']
  },
  {
    id: 'sage',
    name: 'Sábio',
    lore: 'Você passou anos estudando tomos antigos, mapas e mistérios acadêmicos em bibliotecas ou academias arcanas.',
    skillProficiencies: ['Arcanismo', 'História'],
    toolProficiencies: [],
    languageCount: 2,
    startingEquipment: ['Tinteiro', 'Pena', 'Faca Pequena', 'Carta de um Colega Acadêmico', 'Roupas Comuns', '10 po'],
    feature: {
      name: 'Pesquisador',
      description: 'Quando tenta aprender ou recordar uma informação que não sabe, você geralmente sabe onde e com quem encontrá-la.'
    },
    suggestedTraits: ['Uso palavras difíceis para demonstrar minha erudição.', 'Fico fascinado por tomos velhos e poeirentos.'],
    suggestedIdeals: ['Conhecimento: O conhecimento é a chave para o progresso.', 'Curiosidade: Não há mistério que não possa ser desvendado.'],
    suggestedBonds: ['Trabalho há anos para decifrar um enigma antigo.', 'Devo proteger minha biblioteca a todo custo.'],
    suggestedFlaws: ['Me distraio facilmente por teorias acadêmicas durante o perigo.', 'Sou condescendente com quem não tem educação.']
  },
  {
    id: 'soldier',
    name: 'Soldado',
    lore: 'A guerra foi sua vida. Você serviu em uma milícia, exército oficial ou companhia mercenária, vivenciando o rigor da disciplina militar.',
    skillProficiencies: ['Atletismo', 'Intimidação'],
    toolProficiencies: ['Um tipo de jogo de azar', 'Veículos Terrestres'],
    languageCount: 0,
    startingEquipment: ['Insígnia de Posto Militar', 'Troféu de Inimigo Derrotado', 'Conjunto de Dados', 'Roupas Comuns', '10 po'],
    feature: {
      name: 'Patente Militar',
      description: 'Soldados e oficiais da sua antiga organização reconhecem sua autoridade e concedem acesso a acampamentos militares.'
    },
    suggestedTraits: ['Posso dormir em qualquer lugar sob qualquer ruído.', 'Respeito a hierarquia e obedeço a ordens.'],
    suggestedIdeals: ['Camaradagem: Meus companheiros de armas são meus irmãos.', 'Dever: Cumpro minha missão sem vacilar.'],
    suggestedBonds: ['Daria minha vida por quem lutou ao meu lado.', 'Nunca esquecerei a batalha em que perdi meus amigos.'],
    suggestedFlaws: ['Sofro de pesadelos com os horrores da guerra.', 'Acredito que a força bruta resolve a maioria dos problemas.']
  }
];
