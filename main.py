# main.py
"""Interface de linha de comando para o Gerador de Ficha D&D 5e."""

import random
from generator import build_character, random_name, random_background
from utils import format_sheet, save_to_file
from data import RACES, CLASSES, CLASS_SKILLS, CLASS_SKILL_NUM
import sys

def pedir_escolha(mensagem, opcoes):
    """Exibe opções numeradas e retorna a escolha do usuário."""
    print(mensagem)
    for i, opc in enumerate(opcoes, 1):
        print(f"  {i}. {opc}")
    while True:
        try:
            escolha = int(input("Escolha o número: ").strip())
            if 1 <= escolha <= len(opcoes):
                return opcoes[escolha - 1]
            else:
                print("Número fora do intervalo.")
        except ValueError:
            print("Digite um número válido.")

def escolher_pericias(classe):
    """Permite ao usuário escolher as perícias da classe, mostrando as recomendadas."""
    pericias_disponiveis = list(set(CLASS_SKILLS[classe]))  # remove duplicatas
    limite = CLASS_SKILL_NUM.get(classe, 0)
    print(f"\nPara a classe {classe}, você pode escolher {limite} perícias.")
    print("Perícias disponíveis (recomendadas para esta classe):")
    for i, pericia in enumerate(pericias_disponiveis, 1):
        print(f"  {i}. {pericia}")
    print("\nDigite os números das perícias desejados, separados por vírgula (ex: 1,3,5).")
    print("Ou digite 'aleatorio' para escolher aleatoriamente.")
    while True:
        entrada = input("Sua escolha: ").strip().lower()
        if entrada == "aleatorio":
            return random.sample(pericias_disponiveis, min(limite, len(pericias_disponiveis)))
        # parse numbers
        try:
            partes = [p.strip() for p in entrada.split(",") if p.strip() != ""]
            indices = [int(p) for p in partes]
        except ValueError:
            print("Entrada inválida. Digite números separados por vírgula ou 'aleatorio'.")
            continue
        # validate range
        invalidos = [i for i in indices if i < 1 or i > len(pericias_disponiveis)]
        if invalidos:
            print(f"Número(s) fora do intervalo: {', '.join(map(str, invalidos))}. Tente novamente.")
            continue
        # remove duplicates
        indices = list(dict.fromkeys(indices))
        if len(indices) > limite:
            print(f"Você escolheu {len(indices)} perícias, mas o limite é {limite}. Limitando às primeiras {limite} escolhidas.")
            indices = indices[:limite]
        if len(indices) < limite:
            # preencher aleatoriamente com as restantes
            ja_escolhidas = set(pericias_disponiveis[i-1] for i in indices)
            restantes = [p for p in pericias_disponiveis if p not in ja_escolhidas]
            necessarios = limite - len(indices)
            adicionais = random.sample(restantes, min(necessarios, len(restantes)))
            indices = indices + [pericias_disponiveis.index(p)+1 for p in adicionais]
            print(f"Preenchendo com escolhas aleatórias: {', '.join(adicionais)}")
        # now we have exactly limite indices
        selecionadas = [pericias_disponiveis[i-1] for i in indices]
        return selecionadas

def main():
    print("=== Gerador de Ficha de Personagem D&D 5e ===\n")
    # Nome
    nome = input("Nome do personagem (deixe vazio para aleatório): ").strip()
    if not nome:
        # escolher raça primeiro para gerar nome adequado (opcional)
        print("Gerando nome aleatório...")
        nome = random_name("Humano")  # padrão, pode ser ajustado depois
    # Raça
    raza = pedir_escolha("Escolha a raça:", list(RACES.keys()))
    # Classe
    classe = pedir_escolha("Escolha a classe:", list(CLASSES.keys()))
    # Nível
    while True:
        try:
            nivel = int(input("Nível do personagem (padrão 1): ").strip() or "1")
            if nivel > 0:
                break
            else:
                print("Nível deve ser positivo.")
        except ValueError:
            print("Digite um número inteiro válido.")
    # Método de atributos
    metodo = pedir_escolha("Método de geração de atributos:", [
        "padrão (15,14,13,12,10,8)",
        "rolar 4d6 descartar o menor",
        "compra de pontos (27 pts)",
    ])
    metodo_map = {
        "padrão (15,14,13,12,10,8)": "standard",
        "rolar 4d6 descartar o menor": "random",
        "compra de pontos (27 pts)": "point_buy",
    }
    metodo_interno = metodo_map[metodo]
    # Perícias
    pericias_escolhidas = escolher_pericias(classe)
    # Gerar personagem
    print("\nGerando personagem...")
    personagem = build_character(
        name=nome,
        race=raza,
        char_class=classe,
        level=nivel,
        ability_method=metodo_interno,
        skills=pericias_escolhidas,
    )
    # Format
    fichatexto = format_sheet(personagem)
    print("\n" + "="*40)
    print(fichatexto)
    print("="*40)
    # Perguntar se deseja salvar
    salvar = input("\nDeseja salvar a ficha em arquivo? (s/n): ").strip().lower()
    if salvar == "s":
        pasta = input("Pasta para salvar (padrão: 'fichas'): ").strip()
        if not pasta:
            pasta = "fichas"
        ext = input("Extensão do arquivo (txt ou md, padrão txt): ").strip().lower()
        if ext not in ("txt", "md"):
            ext = "txt"
        nome_arquivo = input("Nome do arquivo (deixe vazio para automático): ").strip()
        if not nome_arquivo:
            nome_arquivo = None
        caminho = save_to_file(fichatexto, folder=pasta, filename=nome_arquivo, ext=ext)
        print(f"Ficha salva em: {caminho}")
    else:
        print("Ficha não salva.")
    print("\nBoa aventura!")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nOperação cancelada pelo usuário.")
        sys.exit(0)