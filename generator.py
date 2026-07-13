# generator.py
"""Funções de geração de personagem para o Gerador de Ficha D&D 5e."""

import random
from typing import List, Dict, Tuple

from data import (
    ABILITY_ORDER,
    STANDARD_ARRAY,
    RACES,
    CLASSES,
    CLASS_SKILLS,
    CLASS_SKILL_NUM,
    CLASS_SAVING_THROWS,
    RACE_LANGUAGES,
)

def roll_4d6_drop_lowest() -> int:
    """Rola 4d6 descarta o menor e retorna a soma."""
    rolls = [random.randint(1, 6) for _ in range(4)]
    rolls.remove(min(rolls))
    return sum(rolls)


def roll_ability(method: str = "standard") -> List[int]:
    """
    Gera seis valores de atributo conforme o método escolhido.

    Parâmetros
    ----------
    method: str
        - \"standard\": usa o Standard Array (15,14,13,12,10,8).
        * \"random\": 4d6 drop lowest para cada atributo.
        * \"point_buy\": placeholder – por enquanto usa Standard Array.

    Retorna
    -------
    List[int]
        Lista de seis inteiros na ordem FOR, DES, CON, INT, SAB, CAR.
    """
    if method == "standard":
        return STANDARD_ARRAY.copy()
    elif method == "random":
        return [roll_4d6_drop_lowest() for _ in range(6)]
    elif method == "point_buy":
        # Implementação simples: começa com todos 8 e distribui 27 pontos.
        # Para simplificar, retornamos o Standard Array; pode ser expandido.
        return STANDARD_ARRAY.copy()
    else:
        raise ValueError(f"Método de rolagem desconhecido: {method}")


def apply_race_bonus(scores: List[int], race: str) -> List[int]:
    """
    Aplica os bônus raciais aos seis atributos.

    Parâmetros
    ----------
    scores : list[int]
        Lista de seis atributos na ordem FOR, DES, CON, INT, SAB, CAR.
    race : str
        Nome da raça (deve existir em data.RACES).

    Retorna
    -------
    list[int]
        Nova lista com os bônus aplicados.
    """
    if race not in RACES:
        raise ValueError(f"Raça desconhecida: {race}")

    bonus = RACES[race]
    # Mapeia ordem de atributos para chaves do dicionário de bônus
    result = scores.copy()
    for i, ability in enumerate(ABILITY_ORDER):
        result[i] += bonus.get(ability, 0)
    return result


def modifier(score: int) -> int:
    """Calcula o modificador de atributo: floor((score - 10) / 2)."""
    return (score - 10) // 2


def calculate_hit_points(cls: str, con_mod: int) -> int:
    """
    Calcula pontos de vida no nível 1.

    Fórmula: dado de vida da classe + modificador de Constituição.
    """
    if cls not in CLASSES:
        raise ValueError(f"Classe desconhecida: {cls}")
    hit_die = CLASSES[cls]["hit_die"]
    return hit_die + con_mod


def calculate_initiative(dex_mod: int) -> int:
    """Iniciativa é simplesmente o modificador de Destreza."""
    return dex_mod


def proficiency_bonus(level: int = 1) -> int:
    """Bônus de proficiência baseado no nível (PHB)."""
    return ((level - 1) // 4) + 2


def choose_skills(cls: str, num_skills: int = None) -> List[str]:
    """
    Escolhe perícias da classe de forma aleatória (sem repetir).
    Se num_skills não for fornecido, usa CLASS_SKILL_NUM[cls].
    """
    if cls not in CLASS_SKILLS:
        return []
    if num_skills is None:
        num_skills = CLASS_SKILL_NUM.get(cls, 0)
    available = list(set(CLASS_SKILLS[cls]))  # remove duplicates
    if num_skills > len(available):
        num_skills = len(available)
    return random.sample(available, num_skills)


def choose_languages(race: str) -> List[str]:
    """Retorna os idiomas da raça (simplificado)."""
    return RACE_LANGUAGES.get(race, ["Comum"]).copy()


def build_character(
    name: str,
    race: str,
    char_class: str,
    level: int = 1,
    ability_method: str = "standard",
    skills: List[str] = None,
) -> Dict:
    """
    Monta um dicionário contendo todos os dados da ficha de personagem.

    Parâmetros
    ----------
    name : str
        Nome do personagem.
    race : str
        Raça (ex: \"Humano\", \"Elfo\", \"Anão\").
    char_class : str
        Classe (ex: \"Guerreiro\", \"Ladino\", \"Mago\").
    level : int, opcional
        Nível do personagem (padrão 1).
    ability_method : str, opcional
        Método de geração de atributos: \"standard\", \"random\" ou \"point_buy\".
    skills : list[str], opcional
        Lista de perícias já escolhidas; se None, escolha aleatória baseada na classe.

    Retorna
    -------
    dict
        Dicionário com todas as informações formatadas para exibição.
    """
    # 1. Rolagem de atributos
    raw_scores = roll_ability(ability_method)   # FOR, DES, CON, INT, SAB, CAR

    # 2. Aplicar bônus raciais
    final_scores = apply_race_bonus(raw_scores, race)

    # Mapeia atributos para dicionário legível
    ability_scores = dict(zip(ABILITY_ORDER, final_scores))
    ability_modifiers = {abil: modifier(score) for abil, score in ability_scores.items()}

    # 3. Pontos de vida
    con_mod = ability_modifiers["CON"]
    hit_points = calculate_hit_points(char_class, con_mod)

    # 4. Iniciativa
    init_mod = ability_modifiers["DES"]
    initiative = calculate_initiative(init_mod)

    # 5. Bônus de proficiência
    prof_bonus = proficiency_bonus(level)

    # 6. Perícias e idiomas
    if skills is None:
        skills = choose_skills(char_class)
    languages = choose_languages(race)

    # 7. Salvos de proficiência
    saving_throws = CLASS_SAVING_THROWS.get(char_class, [])

    # Monta o dicionário final
    character = {
        "Nome": name,
        "Raça": race,
        "Classe": char_class,
        "Nível": level,
        "Pontos de Vida": hit_points,
        "Iniciativa": initiative,
        "Bônus de Proficiência": prof_bonus,
        "Atributos": ability_scores,
        "Modificadores": ability_modifiers,
        "Perícias": skills,
        "Idiomas": languages,
        "Salvamentos": saving_throws,
        # Campos adicionais podem ser adicionados aqui (equipamento, traits, etc.)
    }
    return character


# Funções auxiliares de nome e história (simples, podem ser aprimoradas)
def random_name(race: str) -> str:
    """Retorna um nome genérico baseado na raça (muito simplificado)."""
    names = {
        "Humano": ["Aragon", "Bran", "Lydia", "Mara"],
        "Elfo": ["Legolas", "Lirien", "Thalia", "Vanyar"],
        "Anão": ["Thorin", "Dain", "Borin", "Gimli"],
    }
    return random.choice(names.get(race, ["Aventureiro"]))


def random_background() -> str:
    """Retorna um background aleatório."""
    backgrounds = ["Sábio", "Soldado", "Ladino", "Nobre", "Ermitão", "Artista"]
    return random.choice(backgrounds)


if __name__ == "__main__":
    # Teste rápido do módulo
    char = build_character(
        name=random_name("Humano"),
        race="Humano",
        char_class="Guerreiro",
        level=1,
        ability_method="standard",
    )
    print("=== Personagem de teste ===")
    for k, v in char.items():
        if isinstance(v, dict):
            print(f"{k}:")
            for sub_k, sub_v in v.items():
                print(f"  {sub_k}: {sub_v}")
        else:
            print(f"{k}: {v}")