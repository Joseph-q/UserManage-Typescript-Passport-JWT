import passport, { type Strategy } from 'passport';

export function PassportUse<T extends Strategy, U, X>(
  name: string,
  Strategy: new (params: U, callback: X) => T,
  params: U,
  callback: X
): void {
  passport.use(name, new Strategy(params, callback));
}
