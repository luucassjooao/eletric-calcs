import React from 'react';
import { Button } from '../ui/Button';
import { cn } from '@/app/libs/utils';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  choices: string[];
  valueSelected?: string;
  indexObj?: number;
  handleUpdateValue: (value: string, indexObj: number) => void;
  gridCols?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export default function ChooseButton({ choices, indexObj = 0, handleUpdateValue, gridCols = 2, valueSelected, ...props }: IProps) {
  return (
    <div className={`grid grid-cols-${gridCols}`} >
      {choices.map((item, index) => (
        <Button
        {...props}
        className={cn('m-2', valueSelected === item ? 'bg-blue-800 hover:bg-blue-900' : null)}
        key={index}
        onClick={() => handleUpdateValue(item, indexObj)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
