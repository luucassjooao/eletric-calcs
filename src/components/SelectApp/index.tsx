import { Command as CommandPrimitive } from 'cmdk';
import { XIcon } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

import { Badge } from '../ui/Badge';
import { cn } from '@/app/libs/utils';

export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

interface IMultiSelectProps {
  disabled?: boolean;
  placeholder?: string;
  options?: Option[];
  creatable?: boolean;
  className?: string;
  onChange?: (selectedOptions: string[]) => void;
  value?: string[];
  id?: string;
}

export function MultiSelect({
  disabled,
  placeholder,
  options = [],
  creatable,
  className,
  onChange,
  value = [],
  id,
}: IMultiSelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const unselectedOptions = useMemo(
    () => options.filter(item => !selectedOptions.includes(item.value)),
    [options, selectedOptions],
  );

  const isDropdownVisible =
    isInputFocused &&
    !disabled &&
    (unselectedOptions.length > 0 || (creatable && inputValue.length > 0));

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (
      (event.key === 'Delete' || event.key === 'Backspace') &&
      inputValue === ''
    ) {
      setSelectedOptions(prevState => {
        const newState = [...prevState];
        newState.pop();

        onChange?.(newState);
        return newState;
      });
    }

    if (event.key === 'Escape') {
      inputRef.current?.blur();
    }
  }

  function handleInputBlur() {
    setIsInputFocused(false);
    setInputValue('');
  }

  function handleSelectOption(value: string) {
    setInputValue('');
    setSelectedOptions(prevState => {
      const newState = prevState.concat(value);

      onChange?.(newState);
      return newState;
    });
  }

  function handleCreateOption(value: string) {
    setInputValue('');

    const trimmedValue = value.trim();

    if (!selectedOptions.includes(trimmedValue)) {
      setSelectedOptions(prevState => {
        const newState = prevState.concat(trimmedValue);

        onChange?.(newState);
        return newState;
      });
    }
  }

  function handleUnselectOption(
    event: React.MouseEvent,
    removingOption: string,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setSelectedOptions(prevState => {
      const newState = prevState.filter(option => option !== removingOption);

      onChange?.(newState);
      return newState;
    });
    inputRef.current?.focus();
  }

  return (
    <CommandPrimitive
      onKeyDown={handleKeyDown}
      className="h-auto overflow-visible"
    >
      {/*
       * This hidden input is a workaround to focus on CommandPrimitive.Input
       * when an associated Label (by the "id" prop) is clicked
       */}
      <input
        id={id}
        onFocus={() => inputRef.current?.focus()}
        className="sr-only pointer-events-none absolute"
        tabIndex={-1}
        disabled={disabled}
      />

      <div
        role="button"
        tabIndex={0}
        className={cn(
          'flex min-h-10 w-full cursor-text flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          disabled && 'pointer-events-none opacity-50',
          className,
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {selectedOptions.map(selectedOption => (
          <Badge key={selectedOption} variant="secondary" className="gap-1.5">
            <span>
              {options.find(opt => opt.value === selectedOption)?.label ??
                selectedOption}
            </span>

            <span
              role="button"
              tabIndex={0}
              className="flex size-4 items-center justify-center rounded-full bg-foreground p-px transition-all hover:bg-foreground/80"
              onClick={event => handleUnselectOption(event, selectedOption)}
            >
              <XIcon className="size-3 text-background" />
            </span>
          </Badge>
        ))}

        <CommandPrimitive.Input
          ref={inputRef}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none ring-0 placeholder:text-muted-foreground disabled:pointer-events-none"
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onFocus={() => setIsInputFocused(true)}
          onBlur={handleInputBlur}
        />
      </div>

      {isDropdownVisible && (
        <div className="relative">
          <CommandPrimitive.List className="absolute z-50 mt-2 w-full overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
            <CommandPrimitive.Empty className="w-full cursor-default select-none py-1.5 text-center text-sm outline-none">
              No results found.
            </CommandPrimitive.Empty>

            {unselectedOptions.map(option => (
              <CommandPrimitive.Item
                key={option.value}
                value={option.value}
                onSelect={handleSelectOption}
                disabled={option.disabled}
                className="w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onMouseDown={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <span>{option.label}</span>
              </CommandPrimitive.Item>
            ))}

            {creatable && inputValue.length > 0 && (
              <CommandPrimitive.Item
                value={inputValue}
                onSelect={() => handleCreateOption(inputValue)}
                className="w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onMouseDown={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <span>Create &quot;{inputValue}&quot;</span>
              </CommandPrimitive.Item>
            )}
          </CommandPrimitive.List>
        </div>
      )}
    </CommandPrimitive>
  );
}
