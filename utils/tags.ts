type TagDictionary = Record<string, string>;

const tagsDictionary: TagDictionary = {
  'ciudadania porteña': 'ciudadania-porteña',
  'la nacion': 'la-nacion',
  'nuestra comunidad': 'comunity', // COTO
  'supervielle': 'supervielle',
  'tarjeta de crédito': 'credit',
  'tarjeta de débito': 'debit',
  'tarjeta naranja': 'tarjeta-naranja',
  'todos los medios de pago': 'payment-all',
  amex: 'amex',
  anses: 'anses',
  cabal: 'cabal',
  columbia: 'columbia',
  comafi: 'comafi',
  crédito: 'credit',
  débito: 'debit',
  dni: 'dni',
  galicia: 'galicia',
  icbc: 'icbc',
  jubilados: 'retired',
  mastercard: 'mastercard',
  pensionados: 'pension',
  santanderwomen: 'santander-women',
  tci: 'tci',
  ualá: 'uala',
  uala: 'uala',
  visa: 'visa',
};

/**
 * Match dictionary words in a string.
 *
 * @export
 * @param {string} html
 * @return {*}  {string[]}
 */
export function matchDictionaryWords(html: string): string[] {
    const matches: string[] = [];

    if (!html) return matches;

    html = html.toLowerCase().trim();

    // Loop through the dictionary and check if the word exists in the text
    for (const [word, tag] of Object.entries(tagsDictionary)) {
        // Check if the word exists in the textContent (case-sensitive)
        if (html.includes(word))matches.push(tag);
    }

    return matches;
}