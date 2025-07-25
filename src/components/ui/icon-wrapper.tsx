// utils/getLucideIcon.ts
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { ReactNode } from 'react';

type IconComponent = (props: LucideProps) => ReactNode;

export function getLucideIcon(name: string): IconComponent {
  const Icon = Icons[name as keyof typeof Icons];

  if (
    (Icon as any)?.render !== undefined
  ) {
    return Icon as IconComponent;
  }

  return Icons.HelpCircle; // fallback
}
