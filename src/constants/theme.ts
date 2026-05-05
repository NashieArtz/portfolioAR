// src/constants/theme.ts
//
// Constantes de design de l'application.
// Pas de système light/dark — juste des valeurs fixes.
// En PHP : define('NEON_PINK', '#E91E8C');

import { Platform } from 'react-native';

// ─── Couleurs ───────────────────────────────────────────────────────────────
export const Colors = {
    // Fonds
    background:        '#0A0A0F',
    backgroundSurface: 'rgba(18, 18, 28, 0.95)',
    backgroundCard:    'rgba(255, 255, 255, 0.05)',

    // Accents néon
    neonPink:  '#E91E8C',
    neonGold:  '#C9A84C',
    neonBlue:  '#00D4FF',

    // Texte
    text:        '#FFFFFF',
    textDim:     'rgba(255, 255, 255, 0.45)',
    textDisabled:'rgba(255, 255, 255, 0.20)',
} as const;

// ─── Espacements ────────────────────────────────────────────────────────────
// En PHP : define('SPACING_SM', 8);
export const Spacing = {
    xs:  4,
    sm:  8,
    md:  16,
    lg:  24,
    xl:  32,
    xxl: 64,
} as const;

// ─── Typographie ────────────────────────────────────────────────────────────
export const Fonts = Platform.select({
    ios: {
        mono: 'ui-monospace',
        sans: 'system-ui',
    },
    default: {
        mono: 'monospace',
        sans: 'normal',
    },
    web: {
        mono: 'monospace',
        sans: 'system-ui',
    },
});

// ─── Divers ─────────────────────────────────────────────────────────────────
export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 20,
    full: 999,
} as const;
