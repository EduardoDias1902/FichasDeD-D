import { AbilityScore, SkillName, SynergyRating } from '../types/dnd5e';
import { CLASSES_DATA } from '../data/classes';
import { RACES_DATA } from '../data/races';

export const getAbilityScoreRecommendation = (
  classId: string,
  stat: AbilityScore,
  val: number
): SynergyRating => {
  const dndClass = CLASSES_DATA.find(c => c.id === classId);
  if (!dndClass) {
    return { stars: 3, title: 'Boa', reason: 'Atributo equilibrado.' };
  }

  const isPrimary = dndClass.primaryAbility.includes(stat);
  const isCon = stat === 'CON';

  if (isPrimary) {
    if (val >= 14) {
      return {
        stars: 5,
        title: 'Excelente Sinergia',
        reason: `Valor alto (${val}) no atributo principal (${stat}) da classe ${dndClass.name}. Maximiza ataques, magias e sobrevivência.`
      };
    } else if (val >= 12) {
      return {
        stars: 4,
        title: 'Muito Boa',
        reason: `Bom valor em ${stat}, que é fundamental para ${dndClass.name}.`
      };
    } else {
      return {
        stars: 2,
        title: 'Baixa Sinergia',
        reason: `Como ${dndClass.name}, recomenda-se investir mais em ${stat} para otimizar suas habilidades principais.`
      };
    }
  }

  if (isCon) {
    if (val >= 14) return { stars: 5, title: 'Excelente', reason: 'Alta Constituição concede mais Pontos de Vida cruciais para qualquer herói.' };
    if (val >= 12) return { stars: 4, title: 'Muito Boa', reason: 'Boa reserva de vida.' };
    return { stars: 3, title: 'Boa', reason: 'Garante vida adequada.' };
  }

  // Non-primary stats
  if (val >= 14) {
    return {
      stars: 3,
      title: 'Versátil / Fora do Comum',
      reason: `Um ${dndClass.name} com ${stat} alto (${val}) não é comum, mas traz capacidades únicas e ótimas opções de interpretação e roleplay!`
    };
  }

  return { stars: 3, title: 'Adequado', reason: 'Valor funcional.' };
};

export const getRaceClassSynergy = (raceId: string, classId: string): SynergyRating => {
  const race = RACES_DATA.find(r => r.id === raceId);
  const dndClass = CLASSES_DATA.find(c => c.id === classId);

  if (!race || !dndClass) return { stars: 3, title: 'Validade Total', reason: 'Combinação permitida e funcional.' };

  const isRecommended = race.recommendedClasses.includes(classId);

  // Check stat overlaps
  const primaryStats = dndClass.primaryAbility;
  const raceBonusStats = Object.keys(race.abilityScoreBonus) as AbilityScore[];
  const hasStatOverlap = raceBonusStats.some(s => primaryStats.includes(s));

  if (isRecommended || hasStatOverlap) {
    return {
      stars: 5,
      title: 'Sinergia Recomendada ⭐⭐⭐⭐⭐',
      reason: `${race.name} concede bônus diretos nos atributos principais de ${dndClass.name} (${primaryStats.join('/')}).`
    };
  }

  return {
    stars: 3,
    title: 'Combinação Criativa ⭐⭐⭐',
    reason: `Não é uma escolha tradicional para ${dndClass.name}, mas é 100% permitida pelo sistema! Traz características raciais únicas como ${race.traits[0]?.name || 'traços raciais'}.`
  };
};

export const getSkillRecommendation = (classId: string, skillName: SkillName): SynergyRating => {
  const dndClass = CLASSES_DATA.find(c => c.id === classId);

  if (dndClass && dndClass.skillOptions.includes(skillName)) {
    if (['Percepção', 'Atletismo', 'Furtividade', 'Arcanismo', 'Medicina'].includes(skillName)) {
      return {
        stars: 5,
        title: 'Excelente Escolha',
        reason: `${skillName} é uma das perícias mais úteis para a função de ${dndClass.name}.`
      };
    }
    return {
      stars: 4,
      title: 'Muito Boa',
      reason: `Perícia oficial de classe com alta utilidade.`
    };
  }

  return {
    stars: 2,
    title: 'Pouco Comum',
    reason: `${skillName} não faz parte da lista tradicional de ${dndClass?.name || 'classe'}, mas o sistema permite total liberdade para pegar via antecedente ou traço racial!`
  };
};
