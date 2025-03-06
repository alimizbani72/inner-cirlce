import type { FC } from 'react';
import type icons from './icons';

export type IconNames = keyof typeof icons;

export type IconProps = FC<{ fill: string; stroke: string }>;
