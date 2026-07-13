# utils.py
"""Utilitários de formatação e salvamento para o Gerador de Ficha D&D 5e."""

from typing import Dict
import os
import unicodedata
from datetime import datetime


def remove_accents(text: str) -> str:
    """Remove acentos de uma string, retornando apenas caracteres ASCII."""
    return ''.join(
        c for c in unicodedata.normalize('NFD', text)
        if unicodedata.category(c) != 'Mn'
    )


def format_ability_block(abilities: dict) -> str:
    """Formata os seis atributos em duas colunas (como na ficha oficial)."""
    ordem = ["FOR", "DES", "CON", "INT", "SAB", "CAR"]
    lines = []
    for i in range(0, 6, 2):
        left = ordem[i]
        right = ordem[i + 1] if i + 1 < 6 else ""
        left_str = f"{left}: {abilities.get(left, 0):>2}"
        right_str = f"{right}: {abilities.get(right, 0):>2}" if right else ""
        lines.append(f"{left_str:<12} {right_str}")
    return "\n".join(lines)


def format_modifier_block(modifiers: dict) -> str:
    """Formata os modificadores com sinal de + quando positivo."""
    ordem = ["FOR", "DES", "CON", "INT", "SAB", "CAR"]
    lines = []
    for i in range(0, 6, 2):
        left = ordem[i]
        right = ordem[i + 1] if i + 1 < 6 else ""
        left_val = modifiers.get(left, 0)
        right_val = modifiers.get(right, 0)
        left_str = f"{left}: {left_val:+2}"
        right_str = f"{right}: {right_val:+2}" if right else ""
        lines.append(f"{left_str:<12} {right_str}")
    return "\n".join(lines)


def format_skill_list(skills: list) -> str:
    if not skills:
        return "Nenhuma"
    # Remove acentos para melhor exibição no console
    cleaned = [remove_accents(s) for s in skills]
    return ", ".join(cleaned)


def format_language_list(langs: list) -> str:
    if not langs:
        return "Nenhum"
    cleaned = [remove_accents(l) for l in langs]
    return ", ".join(cleaned)


def format_saving_throw_list(saves: list) -> str:
    if not saves:
        return "Nenhum"
    # Saves are ability abbreviations, no accents needed
    return ", ".join(saves)


def format_sheet(character: dict) -> str:
    """
    Gera uma ficha de personagem em formato de texto legível (sem bordas ASCII complexas).
    Pode ser facilmente convertido para Markdown envolvendo em triple backticks.
    """
    lines = []
    lines.append("=" * 40)
    lines.append(f"Personagem: {character.get('Nome', 'Sem nome')}")
    # Use sem acentos nos rótulos para garantir compatibilidade de terminal
    lines.append(
        f"Raca: {remove_accents(character.get('Raça', '?'))}   "
        f"Classe: {character.get('Classe', '?')}   "
        f"Nivel: {remove_accents(str(character.get('Nível', 1)))}"
    )
    lines.append("=" * 40)
    lines.append("")
    lines.append("ATRIBUTOS")
    lines.append(format_ability_block(character.get("Atributos", {})))
    lines.append("")
    lines.append("MODIFICADORES")
    lines.append(format_modifier_block(character.get("Modificadores", {})))
    lines.append("")
    lines.append(f"PONTOS DE VIDA: {character.get('Pontos de Vida', 0)}")
    lines.append(f"INICIATIVA: {character.get('Iniciativa', 0):+2}")
    lines.append(f"BONUS DE PROFICIENCIA: +{character.get('Bônus de Proficiência', 2)}")
    lines.append("")
    # Salvações
    saves = character.get("Salvamentos", [])
    lines.append(f"SALVAMENTOS: {format_saving_throw_list(saves)}")
    lines.append("")
    lines.append("PERICIAS: " + format_skill_list(character.get("Perícias", [])))
    lines.append("")
    lines.append("IDIOMAS: " + format_language_list(character.get("Idiomas", [])))
    lines.append("")
    lines.append("=" * 40)
    lines.append(f"Gerado em: {datetime.now():%d/%m/%Y %H:%M}")
    lines.append("=" * 40)
    return "\n".join(lines)


def save_to_file(content: str, folder: str = "fichas", filename: str = None, ext: str = "txt") -> str:
    """
    Salva o conteúdo em um arquivo dentro da pasta especificada.
    Retorna o caminho completo do arquivo salvo.
    """
    if not os.path.isdir(folder):
        os.makedirs(folder, exist_ok=True)
    if filename is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"ficha_{timestamp}"
    # garantir extensão correta
    if not filename.endswith(f".{ext}"):
        filename = f"{filename}.{ext}"
    path = os.path.join(folder, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return path


if __name__ == "__main__":
    # Teste rápido
    from generator import build_character, random_name
    char = build_character(
        name=random_name("Elfo"),
        race="Elfo",
        char_class="Mago",
        level=1,
        ability_method="standard",
    )
    sheet = format_sheet(char)
    print(sheet)
    saved = save_to_file(sheet, ext="md")
    print(f"\nSalvo em: {saved}")