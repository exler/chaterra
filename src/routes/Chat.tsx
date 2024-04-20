import { Grid } from "@radix-ui/themes";

import ChatsMenu from "@/components/ChatsMenu/ChatsMenu";
import ChatWindow from "@/components/ChatWindow/ChatWindow";

export default function Chat() {
    return (
        <Grid columns="1fr 4fr">
            <ChatsMenu />
            <ChatWindow />
        </Grid>
    );
}
