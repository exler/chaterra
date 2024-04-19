import localForage from "localforage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

import { createLocalForageStorage } from "@/utils/storage";

const storeInstance = localForage.createInstance({
    driver: localForage.INDEXEDDB,
    name: "userSettings",
    version: 1.0
});

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
            storage: createJSONStorage(() => createLocalForageStorage(storeInstance))
        }
    )
);
