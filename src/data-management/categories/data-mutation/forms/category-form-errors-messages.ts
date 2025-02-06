import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@/database/categories/category-schema.ts';
import { formatCharacterCountUnit } from '@/helpers/format-character-count-unit.ts';

export const NAME_TOO_SHORT_MSG = `Nazwa nie może być krótsza niż ${NAME_MIN_LENGTH} ${formatCharacterCountUnit(NAME_MIN_LENGTH)}`;
export const NAME_TOO_BIG_MSG = `Nazwa nie może być dłuższa niż ${NAME_MAX_LENGTH} ${formatCharacterCountUnit(NAME_MAX_LENGTH)}`;
export const TYPE_ID_REQUIRED_MSG = 'Wybierz typ transakcji';