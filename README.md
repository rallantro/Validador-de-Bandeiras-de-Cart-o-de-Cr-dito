# Documentação - Desafio | Validador de Bandeiras de Cartão de Crédito
Projeto para o Desafio: DIO - Trilha .NET - GITHUB COPILOT.

Este projeto tem como objetivo desenvolver uma aplicação simples capaz de identificar a bandeira de um cartão de crédito (como Visa, MasterCard, etc.) com base no número do cartão. Utilizando o GitHub Copilot como assistente de codificação, exploramos como a inteligência artificial pode acelerar o desenvolvimento, sugerir trechos de código e melhorar a produtividade.

## Visão Geral

Este módulo (`index.js`) implementa um validador completo de cartões de crédito que realiza duas operações principais:
1. **Validação de autenticidade** usando o algoritmo de Luhn
2. **Identificação da bandeira** (Visa, MasterCard, American Express, etc.)

## Funções Principais

### 1. `normalize(number)`
**Descrição:** Remove todos os caracteres não numéricos de uma string.

**Parâmetros:**
- `number` (string): Número do cartão com possíveis formatações

**Retorno:**
- (string): Apenas os dígitos numéricos

**Exemplo:** `"4216 0986 3990 3518"` → `"42160986399035018"`

---

### 2. `luhnCheck(number)`
**Descrição:** Implementa o algoritmo de Luhn para validar a autenticidade de um número de cartão.

**Funcionamento:**
1. Normaliza o número (remove caracteres não numéricos)
2. Inverte a sequência de dígitos
3. Para cada dígito em posição par (índice):
    - Multiplica por 2
    - Se o resultado for maior que 9, subtrai 9
4. Soma todos os dígitos processados
5. Retorna verdadeiro se a soma é divisível por 10

**Parâmetros:**
- `number` (string): Número do cartão

**Retorno:**
- (boolean): `true` se passa na validação de Luhn, `false` caso contrário

---

### 3. `getCardBrand(number)`
**Descrição:** Identifica a bandeira do cartão analisando os primeiros dígitos.

**Regras de Identificação:**
| Bandeira | Prefixo(s) |
|----------|-----------|
| Visa | Começa com 4 |
| MasterCard | 51–55 ou 2221–2720 |
| American Express | 34 ou 37 |
| Diners Club | 300–305, 36–38 |
| Discover | 6011, 65 ou 644–649 |
| Hipercard | 6062 |
| JCB | 3528–3589 |
| enRoute | 2014, 2149 |
| Voyager | 8699 |
| Aura | 50 |
| Elo | 4011, 4312, 4389, 4514, 4576, 5041, 506–508, 6277, 636, 650, 6516, 6550 |
| Unknown | Nenhum padrão identificado |

**Parâmetros:**
- `number` (string): Número do cartão

**Retorno:**
- (string): Nome da bandeira ou "Unknown"

---

### 4. `validateCard(number)`
**Descrição:** Função principal que combina validação de Luhn e identificação de bandeira.

**Parâmetros:**
- `number` (string): Número do cartão

**Retorno:**
- (object): Objeto contendo:
  - `valid` (boolean): Resultado da validação de Luhn
  - `brand` (string): Bandeira identificada
