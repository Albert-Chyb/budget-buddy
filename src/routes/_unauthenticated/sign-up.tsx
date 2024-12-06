import { createFileRoute } from '@tanstack/react-router'
import { SignUpFormSchema } from '@/auth/sign-up/sign-up-form-schema'
import { SignUpForm } from '@/auth/sign-up/sign-up-form.tsx'
import { useSignUpMutation } from '@/auth/sign-up/sign-up-mutation.ts'
import { convertSignUpErrorToFormError } from '@/auth/sign-up/convert-sign-up-error-to-form-error.ts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx'
import { SignInSuggestion } from '@/auth/sign-in/sign-in-suggestion.tsx'
import { AuthSuggestions } from '@/auth/auth-suggestions.tsx'
import { ResetPasswordSuggestion } from '@/auth/reset-password/reset-password-suggestion.tsx'

export const Route = createFileRoute('/_unauthenticated/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    mutate: signUp,
    error: signUpError,
    isPending: isSignUpPending,
  } = useSignUpMutation()

  function handleSubmit({ email, password }: SignUpFormSchema) {
    signUp({ email, password })
  }

  const formErrors = convertSignUpErrorToFormError(signUpError)

  return (
    <Card className="max-w-screen-sm mx-auto">
      <CardHeader>
        <CardTitle>
          <h1>Załóż konto</h1>
        </CardTitle>
        <CardDescription>
          <p>
            Wypełnij poniższy formularz, aby założyć nowe konto w aplikacji.
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignUpForm
          onSubmit={handleSubmit}
          errors={formErrors}
          isPending={isSignUpPending}
        />
      </CardContent>

      <CardFooter className="justify-center">
        <AuthSuggestions>
          <SignInSuggestion />
          <ResetPasswordSuggestion />
        </AuthSuggestions>
      </CardFooter>
    </Card>
  )
}
