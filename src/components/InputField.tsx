import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean
};

export const InputField: React.FC<InputFieldProps> = ({label, size: _, textarea, ...props}) => {
  let InputorTextarea = Input
  if (textarea) {
    InputorTextarea = Textarea
  }
  // hook
  const [field, {error}] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputorTextarea 
        {...field}
        {...props} 
        id={field.name} 
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null }
    </FormControl>
  );
}