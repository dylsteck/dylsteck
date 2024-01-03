import { ReactNode } from 'react';
import { withHeadingId } from './utils';

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-2xl font-bold dark:text-gray-100">
      {withHeadingId(children)}
    </h1>
  );
}