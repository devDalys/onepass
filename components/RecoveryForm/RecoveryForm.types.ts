interface FirstStepForm {
  email: string;
}

interface SecondStepForm {
  code: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  recovery?: {
    email: string;
    staleTime: string;
  };
}
