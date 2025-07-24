// import { create } from 'zustand';
// import i18n from '../../public/i18next/i18n'; // Importe sua configuração do i18next

// type LanguageState = {
//     language: string;
//     setLanguage: (lng: string) => void;
//     t: (key: string) => string; // Função de tradução (opcional)
// };

// export const useLanguageStore = create<LanguageState>((set) => ({
//     language: 'pt', // Idioma padrão
//     setLanguage: (lng) => {
//         i18n.changeLanguage(lng); // Altera o idioma no i18next
//         set({ language: lng }); // Atualiza o estado no Zustand
//     },
//     t: (key: string) => i18n.t(key), // Encapsula a função `t` do i18next
// }));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../../public/i18next/i18n';

type LanguageState = {
    language: string;
    setLanguage: (lng: string) => void;
    t: (key: string) => string;
};

export const useLanguageStore = create(
    persist<LanguageState>(
        (set) => ({
            language: 'pt',
            setLanguage: (lng) => {
                i18n.changeLanguage(lng);
                set({ language: lng });
            },
            t: (key: string) => i18n.t(key),
        }),
        {
            name: 'i18n-language',
            migrate: (persistedState: unknown, version: number): LanguageState => {
                // Se não houver estado persistido, retorne o estado inicial
                if (!persistedState) {
                    return {
                        language: 'pt',
                        setLanguage: () => { },
                        t: (key: string) => key, // Função fallback
                    };
                }

                // Type guard para verificar se o estado persistido é válido
                if (typeof persistedState === 'object' && persistedState !== null) {
                    const state = persistedState as Partial<LanguageState>;
                    return {
                        language: state.language || 'pt',
                        setLanguage: state.setLanguage || (() => { }),
                        t: state.t || ((key: string) => key),
                    };
                }

                // Fallback completo se a migração falhar
                return {
                    language: 'pt',
                    setLanguage: () => { },
                    t: (key: string) => key,
                };
            },
        }
    )
);