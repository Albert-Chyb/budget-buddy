/**
 * Interface representing a password requirement.
 */
export interface Requirement {
  /**
   * A textual description of the requirement.
   * This should provide clear guidance on what the password must adhere to
   * (e.g., "Password must include at least one uppercase letter").
   */
  description: string;

  /**
   * A function that checks if a given password meets the requirement.
   *
   * @param password - The password string to be validated.
   * @returns A boolean indicating whether the password satisfies the requirement.
   */
  check: (password: string) => boolean;
}

export const MIN_LENGTH_REQUIREMENT: Requirement = {
  description: 'Hasło musi zawierać conajmniej 8 znaków',
  check: (password: string) => password.length >= 8,
};

export const UPPERCASE_REQUIREMENT: Requirement = {
  description: 'Hasło musi zawierać przynajmniej jedną wielką literę',
  check: (password: string) => password.match(/[A-Z]/) !== null,
};

export const LOWERCASE_REQUIREMENT: Requirement = {
  description: 'Hasło musi zawierać przynajmniej jedną małą literę',
  check: (password: string) => password.match(/[a-z]/) !== null,
};

export const NUMBER_REQUIREMENT: Requirement = {
  description: 'Hasło musi zawierać przynajmniej jedną liczbę',
  check: (password: string) => password.match(/[0-9]/) !== null,
};

export const SPECIAL_CHARACTER_REQUIREMENT: Requirement = {
  description: 'Hasło musi posiadać conajmniej jeden znak specjalny',
  check: (password: string) =>
    password.match(/[!@#$%^&*(),.?":{}|<>_\-+=]/) !== null,
};

export const MINIMUM_PASSWORD_REQUIREMENTS: Requirement[] = [
  MIN_LENGTH_REQUIREMENT,
  UPPERCASE_REQUIREMENT,
  LOWERCASE_REQUIREMENT,
  NUMBER_REQUIREMENT,
  SPECIAL_CHARACTER_REQUIREMENT,
];
