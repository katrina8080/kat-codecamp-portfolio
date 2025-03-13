import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sign?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'password', ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : type}
          className={cn(
            'flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
            props.disabled && 'bg-gray-200 border-slate-400',
            className,
          )}
          ref={ref}
          {...props}
        />

        <div className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <EyeOff className="text-gray-400 h-5 w-5" /> : <Eye className="text-gray-400 h-5 w-5" />}
          </button>
        </div>
      </div>
    );
  },
);
InputPassword.displayName = 'InputPassword';

const InputSign = React.forwardRef<HTMLInputElement, InputProps>(({ sign, className, type, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
          props.disabled && 'bg-gray-200 border-slate-400',
          className,
        )}
        ref={ref}
        {...props}
      />
      <div className="absolute inset-y-0 right-0">
        <div
          className={cn(
            'px-4 border border-slate-300 h-full flex items-center rounded-r-md bg-gray-200 font-medium text-gray-600',
            props.disabled && 'bg-gray-100 border-slate-300',
          )}
        >
          {sign}
        </div>
      </div>
    </div>
  );
});
InputSign.displayName = 'InputSign';

export { Input, InputPassword, InputSign };
