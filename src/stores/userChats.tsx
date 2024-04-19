import localForage from "localforage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

import { Chat } from "@/types/chat";
import { createLocalForageStorage } from "@/utils/storage";

const storeInstance = localForage.createInstance({
    driver: localForage.INDEXEDDB,
    name: "userChats",
    version: 1.0
});

export const useUseChatsStore = create(
    persist(
        combine(
            {
                chats: [] as Chat[],
                activeChatId: null as string | null
            },
            (set) => ({
                setActiveChatId: (activeChatId: string | null) => set({ activeChatId }),
                addChat: (chat: Chat) => set((state) => ({ chats: [...state.chats, chat] })),
                removeChat: (chatId: string) =>
                    set((state) => ({ chats: state.chats.filter((chat) => chat.id !== chatId) })),
                updateChat: (chatId: string, chat: Chat) =>
                    set((state) => ({
                        chats: state.chats.map((existingChat) => (existingChat.id === chatId ? chat : existingChat))
                    }))
            })
        ),
        {
            name: "user-chats",
            storage: createJSONStorage(() => createLocalForageStorage(storeInstance))
        }
    )
);
