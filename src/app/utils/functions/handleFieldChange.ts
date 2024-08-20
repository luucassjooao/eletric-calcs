import { InputChange } from '@/app/types/globalTypes';

export function handleFieldChange<T>(
  event: InputChange,
  setError: (error: { field: string; message: string }) => void,
  removeError: (fieldName: string) => void,
  setState: React.Dispatch<React.SetStateAction<T>>,
  fieldName: string,
  errorField: string,
  errorMessage: string
) {
  const { value } = event.target;

  if (!value) {
    setError({ field: errorField, message: errorMessage });
  } else {
    removeError(errorField);
  }

  setState((prev) => ({
    ...prev,
    [fieldName]: value,
  }));
}
