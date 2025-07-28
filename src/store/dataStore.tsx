import { create } from 'zustand';
import { returnData } from '../../public/assets/data/utils/data-utils';
import { useLanguageStore } from './languageStore'; // Importe seu store de idioma

type DataState = {
    data: any;
    updateData: (newData: any) => void;
    refreshData: () => void; // Nova função para recarregar dados
};

export const useDataStore = create<DataState>((set, get) => ({
    data: returnData(useLanguageStore.getState().language), // Inicializa com idioma atual

    updateData: (newData) => set({ data: newData }),

    refreshData: () => {
        const currentLanguage = useLanguageStore.getState().language;
        set({ data: returnData(currentLanguage) });
    },

    // subscribe: (store: any) => {
    //     const unsubscribe = useLanguageStore.subscribe(
    //         (language) => store.getState().refreshData()
    //     );
    //     return unsubscribe;
    // }
}));