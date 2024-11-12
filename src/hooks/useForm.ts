import { useState } from 'react';

interface FormState {
  [key: string]: string;
}

interface useFormProps {
  initialValues: FormState;
  onSubmit: (values: FormState) => void;
}

const useForm = ({ initialValues, onSubmit }: useFormProps) => {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
