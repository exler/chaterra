import { useForm } from "react-hook-form";
import { FaCirclePlus, FaMagnifyingGlass } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";

import SiteLogo from "@/assets/logo.png";
import { GenerationChat } from "@/types/chats";

interface ChatsMenuProps {
    chats: GenerationChat[];
    setActiveChatId: (activeChatId: string | null) => void;
    removeChat: (chatId: string) => void;
}

interface FormData {
    searchInput: string;
}

export default function ChatsMenu({ chats, setActiveChatId, removeChat }: ChatsMenuProps) {
    const { register, watch } = useForm<FormData>();

    const searchInput = watch("searchInput");

    return (
        <div className="flex flex-col gap-2">
            <div className="mx-auto">
                <img src={SiteLogo} alt="Chaterra" height={50} width={160} />
            </div>
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
                <button type="button" className="btn btn-primary btn-sm ml-2" onClick={() => setActiveChatId(null)}>
                    <FaCirclePlus size="0.8rem" />
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {chats.map((chat) => {
                    if (searchInput && !chat.title.toLowerCase().includes(searchInput.toLowerCase())) {
                        return null;
                    }

                    return (
                        <div
                            className="card card-compact bg-neutral cursor-pointer hover:bg-gray-700"
                            key={chat.id}
                            onClick={() => setActiveChatId(chat.id)}
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
        </div>
    );
}
