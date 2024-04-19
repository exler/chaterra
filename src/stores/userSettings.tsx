import localForage from "localforage";
import { create } from "zustand";
import { combine, createJSONStorage, persist, StateStorage } from "zustand/middleware";

const storeInstance = localForage.createInstance({
    driver: localForage.INDEXEDDB,
    name: "userSettings",
    version: 1.0
});

const localForageStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        return await storeInstance.getItem(name);
    },
    setItem: async (name: string, value: string): Promise<void> => {
        await storeInstance.setItem(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
        await storeInstance.removeItem(name);
    }
};

export const useUserSettingsStore = create(
    persist(
        combine(
            {
                openAIApiKey: ""
            },
            (set) => ({
                setOpenAIApiKey: (openAIApiKey: string) => set({ openAIApiKey })
            })
        ),
        {
            name: "user-settings",
            storage: createJSONStorage(() => localForageStorage)
        }
    )
);
