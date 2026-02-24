// util.js
// Funções para validar e identificar a bandeira de um cartão de crédito

/**
 * Retira caracteres não numéricos da string e retorna apenas os dígitos.
 * @param {string} number
 * @returns {string}
 */
function normalize(number) {
  return number.replace(/\D/g, '');
}

/**
 * Verifica se o número do cartão passa no algoritmo de Luhn.
 * @param {string} number
 * @returns {boolean}
 */
function luhnCheck(number) {
  const digits = normalize(number).split('').reverse().map(d => parseInt(d, 10));
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    if (i % 2 === 1) { // posições pares no cálculo (considerando índice 0)
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

/**
 * Retorna a bandeira (nome) do cartão baseado nos primeiros dígitos.
 * Se não conseguir identificar, devolve "Unknown".
 *
 * Regras baseadas na imagem fornecida:
 *   - Visa: começa com 4
 *   - MasterCard: 51–55 ou 2221–2720
 *   - Elo: vários intervalos (ex.: 4011, 4312, 4389, ...)
 *   - American Express: começa com 34 ou 37
 *   - Discover: começa com 6011, 65 ou 644–649
 *   - Hipercard: geralmente começa com 6062
 *
 * @param {string} number
 * @returns {string}
 */
function getCardBrand(number) {
  const num = normalize(number);
  if (!num) return 'Unknown';

  // Visa
  if (/^4/.test(num)) return 'Visa';

  // MasterCard
  // prefixo 51-55
  if (/^5[1-5]/.test(num)) return 'MasterCard';
  // prefixo 2221-2720
  const firstSix = parseInt(num.slice(0, 6), 10);
  if (firstSix >= 222100 && firstSix <= 272099) return 'MasterCard';

  // American Express
  if (/^3[47]/.test(num)) return 'American Express';

  // Diners Club
  if (/^30[0-5]/.test(num) || /^3[6-8]/.test(num)) return 'Diners Club';

  // Discover
  if (/^6011/.test(num) || /^65/.test(num) || /^64[4-9]/.test(num)) return 'Discover';

  // Hipercard
  if (/^6062/.test(num)) return 'Hipercard';

  // JCB
  if (/^35(2[8-9]|[3-8]\d|9[0-9])/.test(num)) return 'JCB';

  // enRoute
  if (/^2[014|149]/.test(num)) return 'enRoute';

  // Voyager
  if (/^8699/.test(num)) return 'Voyager';

  // Aura
  if (/^50/.test(num)) return 'Aura';

  // Elo (lista parcial de prefixos conhecidos)
  const eloPrefixes = [
    '4011', '4312', '4389', '4514', '4576',
    '5041', '506', '507', '508', '6277',
    '636', '650', '6516', '6550'
  ];
  if (eloPrefixes.some(pref => num.startsWith(pref))) return 'Elo';

  return 'Unknown';
}

/**
 * Valida um número de cartão: verifica Luhn e retorna a bandeira.
 * @param {string} number
 * @returns {{valid:boolean,brand:string}}
 */
function validateCard(number) {
  const brand = getCardBrand(number);
  const valid = luhnCheck(number);
  return { valid, brand };
}

// Teste para múltiplos cartões (apenas para demonstração, pode ser removido em produção)
if (require.main === module) {
  const tests = [
    '4111 1111 1111 1111', // Visa
    '3002 806982 6654', // Diners Club
    '2149 6066271 1545', // enRoute
    '8699 5458 1465 5687', // Voyager
    '5015 6976 8964 6227', // Aura
    '3555 4317 2489 9117', // JBC
    '5114 7949 3584 6519', // MasterCard
    '343855548414989',     // Amex
    '6011004693943850',    // Discover
    '6062825624254001',    // Hipercard/Elo
    '6621 5678 9012 3456'  // inválido
  ];

  tests.forEach(n => {
    const { valid, brand } = validateCard(n);
    console.log(`${n} → ${brand} (${valid ? 'válido' : 'inválido'})`);
  });
}

module.exports = {
  normalize,
  luhnCheck,
  getCardBrand,
  validateCard
};
