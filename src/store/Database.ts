import Dexie from 'dexie';

export interface TokenMetadata {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  icon?: string;
  ref?: number;
  near?: number;
  total?: number;
  amountLabel?: string;
  amount?: number;
}
class Database extends Dexie {
  public tokens: Dexie.Table<TokenMetadata>;
  public constructor() {
    super('vite-dex');
    this.version(1).stores({
      tokens:
        'id, name, symbol, decimals, icon, ref, near, total, amountLabel, amount',
    });
    this.tokens = this.table('tokens');
  }

  public allTokens() {
    return this.tokens;
  }
}

const db = new Database();
export default db;
