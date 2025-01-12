import { useForm } from "react-hook-form";
import { FaCirclePlus, FaMagnifyingGlass } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { twMerge } from "tailwind-merge";

import SideMenu from "@/components/SideMenu/SideMenu";
import type { GenerationChat } from "@/types/chats";

interface ChatsMenuProps {
    className?: string;
    chats: GenerationChat[];
    setActiveChatId: (activeChatId: string | null) => void;
    removeChat: (chatId: string) => void;
    setForceChatWindow: (forceChatWindow: boolean) => void;
}

interface FormData {
    searchInput: string;
}

export default function ChatsMenu({
    className,
    chats,
    setActiveChatId,
    removeChat,
    setForceChatWindow,
}: ChatsMenuProps) {
    const { register, watch } = useForm<FormData>();

    const searchInput = watch("searchInput");

    return (
        <SideMenu className={twMerge("gap-2", className)}>
            <div className="flex flex-row">
                <label className="input input-bordered input-sm flex items-center gap-2 w-full">
                    <FaMagnifyingGlass size="0.8rem" />
                    <input
                        type="text"
                        placeholder="Search your chats..."
                        className="grow"
                        {...register("searchInput")}
                    />
                </label>
                <button
                    type="button"
                    className="btn btn-primary btn-sm ml-2"
                    onClick={() => {
                        setActiveChatId(null);
                        setForceChatWindow(true);
                    }}
                >
                    <FaCirclePlus size="0.8rem" />
                </button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-scroll h-full lg:h-[36rem]">
                {chats.map((chat) => {
                    if (searchInput && !chat.title.toLowerCase().includes(searchInput.toLowerCase())) {
                        return null;
                    }

                    return (
                        <div
                            className="card card-compact bg-neutral cursor-pointer hover:bg-gray-700"
                            key={chat.id}
                            onClick={() => setActiveChatId(chat.id)}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    setActiveChatId(chat.id);
                                }
                            }}
                        >
                            <div className="card-body flex flex-row justify-between items-center">
                                <span>{chat.title}</span>
                                <button
                                    type="button"
                                    className="text-error p-1 rounded-md hover:bg-red-900"
                                    onClick={() => removeChat(chat.id)}
                                >
                                    <TiDeleteOutline size="1rem" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SideMenu>
    );
}
