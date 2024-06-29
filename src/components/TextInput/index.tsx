import React, { ReactNode } from 'react';
import { Input } from '../ui/Input';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

export default function TextInput({ children, ...props }: IProps) {
  return (
    <div>
      <Input className='max-w-64' {...props} />
      {children}
    </div>
  );
}
