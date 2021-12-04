export interface Token {
  readonly contract: string;
  readonly owner_id: string;
  readonly spec: string;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
}
