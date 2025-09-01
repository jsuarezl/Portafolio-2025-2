import Lara from '@primeuix/themes/lara';
import {definePreset} from "@primeuix/styled";

const stylePreset = definePreset(Lara, {
    semantic: {
        primary: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
            950: '#431407'
        },
        secondary: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
            950: '#3b0764'
        },
        accent: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '#fafafa',
                    100: '#f4f4f5',
                    200: '#e4e4e7',
                    300: '#d4d4d8',
                    400: '#a1a1aa',
                    500: '#71717a',
                    600: '#52525b',
                    700: '#3f3f46',
                    800: '#27272a',
                    900: '#18181b',
                    950: '#09090b'
                }
            },
            dark: {
                primary: {
                    color: '{primary.400}',
                    contrastColor: '{surface.900}',
                    hoverColor: '{primary.300}',
                    activeColor: '{primary.200}',
                },
                content: {
                    borderColor: '{surface.700}',
                    hoverBackground: '{surface.800}',
                    hoverColor: '{surface.0}',
                },
                highlight: {
                    background: 'color-mix(in srgb, var(--p-primary-400), transparent 84%)',
                    color: 'rgba(255, 255, 255, 0.87)',
                    focusBackground: 'color-mix(in srgb, var(--p-primary-400), transparent 76%)',
                    focusColor: 'rgba(255, 255, 255, 0.87)',
                },
                text: {
                    color: '{surface.0}',
                    hoverColor: '{surface.0}',
                    mutedColor: '{surface.400}',
                    hoverMutedColor: '{surface.300}',
                }
            }
        }
    }
});

export default {
    preset: stylePreset,
    options: {
        cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities'
        },
        darkModeSelector: '.dark',
    }
}
