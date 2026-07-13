# data.py
"""Dados fixos para o Gerador de Ficha D&D 5e."""

from typing import Dict, List

# Ordem fixa dos seis atributos usados nas listas/vetores.
ABILITY_ORDER: List[str] = ["FOR", "DES", "CON", "INT", "SAB", "CAR"]

# Padrão de rolagem de atributos "Standard Array" (PHB)
STANDARD_ARRAY: List[int] = [15, 14, 13, 12, 10, 8]

# Bônus raciais (PHB - incluindo sub-raças comuns)
RACES: Dict[str, Dict[str, int]] = {
    # Humanos (variante: +1 em todos os atributos)
    "Humano": {
        "FOR": 1,
        "DES": 1,
        "CON": 1,
        "INT": 1,
        "SAB": 1,
        "CAR": 1,
    },
    # Elfos
    "Elfo Alto": {
        "DES": 2,
        "INT": 1,
    },
    "Elfo da Floresta": {
        "DES": 2,
        "SAB": 1,
    },
    "Elfo Negro (Drow)": {
        "DES": 2,
        "CAR": 1,
    },
    # Anões
    "Anão Montanhês": {
        "FOR": 2,
        "CON": 2,
    },
    "Anão Colinar": {
        "CON": 2,
        "SAB": 1,
    },
    # Halflings
    "Halfling Pé-Leve": {
        "DES": 2,
        "SAB": 1,
    },
    # Draconatos
    "Draconato": {
        "FOR": 2,
        "CAR": 1,
    },
    # Gnomes
    "Gnome da Floresta": {
        "INT": 2,
        "DES": 1,
    },
    # Meio-elfos
    "Meio-Elfo": {
        "CAR": 2,
        # Jogador escolhe dois outros atributos +1 cada; simplificamos com FOR e DES
        "FOR": 1,
        "DES": 1,
    },
    # Meio-orcos
    "Meio-Orc": {
        "FOR": 2,
        "CON": 1,
    },
    # Tieflings
    "Tiefling": {
        "CAR": 2,
        "INT": 1,
    },
}

# Idiomas por raça
RACE_LANGUAGES: Dict[str, List[str]] = {
    "Humano": ["Comum"],
    "Elfo Alto": ["Comum", "elfico"],
    "Elfo da Floresta": ["Comum", "elfico"],
    "Elfo Negro (Drow)": ["Comum", "elfico", "subterrâneo"],
    "Anão Montanhês": ["Comum", "anhao"],
    "Anão Colinar": ["Comum", "anhao"],
    "Halfling Pé-Leve": ["Comum", "halflin"],
    "Draconato": ["Comum", "draconico"],
    "Gnome da Floresta": ["Comum", "gnomico"],
    "Meio-Elfo": ["Comum", "elfico"],
    "Meio-Orc": ["Comum", "orca"],
    "Tiefling": ["Comum", "infernal"],
}

# Dados de vida (Hit Die) por classe (PHB)
CLASSES: Dict[str, Dict[str, int]] = {
    "Bárbaro": {"hit_die": 12, "primary_ability": "FOR"},
    "Bard": {"hit_die": 8, "primary_ability": "CAR"},
    "Clérigo": {"hit_die": 8, "primary_ability": "SAB"},
    "Druida": {"hit_die": 8, "primary_ability": "SAB"},
    "Guerreiro": {"hit_die": 10, "primary_ability": "FOR"},
    "Monge": {"hit_die": 10, "primary_ability": "DES"},
    "Paladino": {"hit_die": 10, "primary_ability": "CAR"},
    "Ranger": {"hit_die": 10, "primary_ability": "DES"},
    "Ladino": {"hit_die": 8, "primary_ability": "DES"},
    "Feiticeiro": {"hit_die": 6, "primary_ability": "CAR"},
    "Bruxo": {"hit_die": 8, "primary_ability": "CAR"},
    "Mago": {"hit_die": 6, "primary_ability": "INT"},
}

# Perícias por classe (listas completas do PHB)
CLASS_SKILLS: Dict[str, List[str]] = {
    "Bárbaro": ["Atletismo", "Sobrevivência"],
    "Bard": [
        "Acrobacias",
        "Blefe",
        "Diplomacia",
        "História",
        "Intuição",
        "Intimidação",
        "Investigação",
        "Percepção",
        "Performance",
        "Persuasão",
        "Religião",
        "Furtividade",
    ],
    "Clérigo": ["História", "Intuição", "Medicina", "Persuasão", "Religião"],
    "Druida": [
        "Arcanismo",
        "Intuição",
        "Medicina",
        "Natureza",
        "Percepção",
        "Religião",
        "Sobrevivência",
    ],
    "Guerreiro": [
        "Acrobacias",
        "Cuidado com Animais",
        "Atletismo",
        "História",
        "Intuição",
        "Intimidação",
        "Percepção",
        "Sobrevivência",
    ],
    "Monge": ["Acrobacias", "Atletismo", "História", "Intuição", "Religião", "Furtividade"],
    "Paladino": ["Atletismo", "Intuição", "Medicina", "Intimidação", "Persuasão", "Religião"],
    "Ranger": [
        "Acrobacias",
        "Adestrar Animais",
        "Atletismo",
        "Sobrevivência",
        "Percepção",
        "Natureza",
    ],
    "Ladino": [
        "Acrobacias",
        "Atletismo",
        "Blefe",
        "Disfarce",
        "Furtividade",
        "Investigação",
        "Percepção",
        "Performance",
        "Persuasão",
        "Prestidigitação",
    ],
    "Feiticeiro": ["Arcanismo", "Enganação", "Intimidação", "Persuasão"],
    "Bruxo": ["Arcanismo", "Enganação", "Intimidação", "Investigação", "Natureza", "Religião"],
    "Mago": ["Arcanismo", "História", "Investigação", "Medicina", "Religião"],
}

# Number of skill proficiencies granted by class (from PHB)
CLASS_SKILL_NUM: Dict[str, int] = {
    "Bárbaro": 2,
    "Bard": 3,
    "Clérigo": 2,
    "Druida": 2,
    "Guerreiro": 2,
    "Monge": 2,
    "Paladino": 2,
    "Ranger": 3,
    "Ladino": 4,
    "Feiticeiro": 2,
    "Bruxo": 2,
    "Mago": 2,
}

# Saving throw proficiencies by class (list of two abilities)
CLASS_SAVING_THROWS: Dict[str, List[str]] = {
    "Bárbaro": ["FOR", "CON"],
    "Bard": ["DES", "CAR"],
    "Clérigo": ["SAB", "CAR"],
    "Druida": ["INT", "SAB"],
    "Guerreiro": ["FOR", "CON"],
    "Monge": ["DES", "SAB"],
    "Paladino": ["SAB", "CAR"],
    "Ranger": ["FOR", "DES"],
    "Ladino": ["DES", "INT"],
    "Feiticeiro": ["CON", "CAR"],
    "Bruxo": ["SAB", "CAR"],
    "Mago": ["INT", "SAB"],
}