import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  MIN_AMOUNT,
} from '@/database/transactions/transaction-schema.ts';
import { formatCharacterCountUnit } from '@/helpers/format-character-count-unit.ts';

export const AMOUNT_TOO_SMALL_MSG = `Kwota transakcji musi być większa niż ${MIN_AMOUNT.toString()}`;
export const CATEGORY_REQUIRED_MSG = 'Transakcja musi posiadać kategorię';
export const WALLET_REQUIRED_MSG = 'Transakcja musi posiadać portfel';
export const DESCRIPTION_TOO_SMALL_MSG = `Opis musi mieć przynajmniej ${DESCRIPTION_MIN_LENGTH} ${formatCharacterCountUnit(DESCRIPTION_MIN_LENGTH)}`;
export const DESCRIPTION_TOO_BIG_MSG = `Opis nie może być dłuższy niż ${DESCRIPTION_MAX_LENGTH} ${formatCharacterCountUnit(DESCRIPTION_MAX_LENGTH)}`;
