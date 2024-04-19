import { StateStorage } from "zustand/middleware";

export const createLocalForageStorage = (instance: LocalForage): StateStorage => {
    return {
        getItem: async (name: string) => {
            return await instance.getItem(name);
        },
        setItem: async (name: string, value: string) => {
            await instance.setItem(name, value);
        },
        removeItem: async (name: string) => {
            await instance.removeItem(name);
        }
    };
};
