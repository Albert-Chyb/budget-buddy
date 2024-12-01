import { createFileRoute } from '@tanstack/react-router';
import { SignUpFormSchema } from '@/sign-up/sign-up-form-schema';
import { SignUpForm } from '@/sign-up/sign-up-form.tsx';

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  function handleSubmit(value: SignUpFormSchema) {
    console.log(value);
  }

  return (
    <>
      <hgroup className='mb-4'>
        <h1 className='typography-h1 mb-2'>Załóż konto</h1>
        <p className='typography-muted'>
          Wypełnij poniższy formularz, aby założyć nowe konto w aplikacji.
        </p>
      </hgroup>

      <SignUpForm handleSubmit={handleSubmit} />
    </>
  );
}
