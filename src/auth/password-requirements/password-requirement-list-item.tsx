import { Requirement } from '@/auth/password-requirements/minimum-password-requirements.ts';
import { useFormContext } from 'react-hook-form';

export interface PasswordRequirementListItemProps {
  requirement: Requirement;
  password: string;
}

export function PasswordRequirementListItem(
  props: PasswordRequirementListItemProps,
) {
  const { requirement, password } = props;
  const {
    formState: { isSubmitted },
  } = useFormContext();
  const { description, check } = requirement;
  const fulfilledStyles = 'text-green-500';
  const unfulfilledStyles = isSubmitted ? 'text-destructive' : '';

  return (
    <li className={`${check(password) ? fulfilledStyles : unfulfilledStyles}`}>
      {description}
    </li>
  );
}
