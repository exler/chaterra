const MAX_CHAT_TITLE_LENGTH = 30;

export const getChatTitleFromMessage = (message: string) => {
    const title = message.split("\n")[0].trim();
    if (title.length > MAX_CHAT_TITLE_LENGTH) {
        return title.slice(0, MAX_CHAT_TITLE_LENGTH) + "...";
    }
    return title;
};
