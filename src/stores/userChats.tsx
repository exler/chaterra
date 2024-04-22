import localForage from "localforage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

import { TextGenerationChat } from "@/types/chats";
import { createLocalForageStorage } from "@/utils/storage";

const storeInstance = localForage.createInstance({
    driver: localForage.INDEXEDDB,
    name: "userChats",
    version: 1.0
});

const storage = createJSONStorage(() => createLocalForageStorage(storeInstance));

export const useTextGenerationChatsStore = create(
    persist(
        combine(
            {
                textChats: [] as TextGenerationChat[],
                activeChatId: null as string | null
            },
            (set) => ({
                setActiveChatId: (activeChatId: string | null) => set({ activeChatId }),
                addChat: (chat: TextGenerationChat) => set((state) => ({ textChats: [...state.textChats, chat] })),
                removeChat: (chatId: string) =>
                    set((state) => ({ textChats: state.textChats.filter((chat) => chat.id !== chatId) })),
                updateChat: (chatId: string, chat: TextGenerationChat) =>
                    set((state) => ({
                        textChats: state.textChats.map((existingChat) =>
                            existingChat.id === chatId ? chat : existingChat
                        )
                    }))
            })
        ),
        {
            name: "user-text-chats",
            storage: storage
        }
    )
);
