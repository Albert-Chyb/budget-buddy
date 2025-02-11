import {
  BALANCE_MIN,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@/database/wallets/wallet-schema.ts';
import { formatCharacterCountUnit } from '@/helpers/format-character-count-unit.ts';

export const NAME_TOO_SMALL_MSG = `Nazwa nie może być mniejsza niż ${NAME_MIN_LENGTH} ${formatCharacterCountUnit(NAME_MIN_LENGTH)}`;
export const NAME_TOO_BIG_MSG = `Nazwa nie może być dłuższa niż ${NAME_MAX_LENGTH} ${formatCharacterCountUnit(NAME_MAX_LENGTH)}`;
export const BALANCE_TOO_SMALL_MSG = `Balans nie może być mniejszy niż ${BALANCE_MIN.toString()}`;
export const BALANCE_INVALID_SYNTAX_MSG =
  'Balans nie jest poprawnie sformatowany';
export const BALANCE_REQUIRED_MSG = 'Balans jest wymagany';
