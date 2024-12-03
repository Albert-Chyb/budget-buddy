import { FieldValues, Path, useWatch } from 'react-hook-form';
import { MINIMUM_PASSWORD_REQUIREMENTS } from '@/auth/password-requirements/minimum-password-requirements.ts';
import { PasswordRequirementListItem } from '@/auth/password-requirements/password-requirement-list-item.tsx';

export interface PasswordRequirementsListProps<T extends FieldValues> {
  name: Path<T>;
}

export function PasswordRequirementsList<T extends FieldValues>(
  props: PasswordRequirementsListProps<T>,
) {
  const { name } = props;
  const password = useWatch<T>({ name });

  return (
    <ul className='typography-list'>
      {MINIMUM_PASSWORD_REQUIREMENTS.map((requirement, index) => (
        <PasswordRequirementListItem
          key={index}
          requirement={requirement}
          password={password}
        />
      ))}
    </ul>
  );
}
