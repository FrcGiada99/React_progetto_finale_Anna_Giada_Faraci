/* eslint-disable react/prop-types */
import RealtimeChat from "./RealtimeChat";
import { toast } from "sonner";
import supabase from "../../../supabase/client";
import { TextField, Button, Paper } from "@mui/material";

export default function Chat({ game, session }) {
  async function handleMessageSubmit(event) {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));
    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase
        .from("messages")
        .insert([
          {
            profile_id: session.user.id,
            profile_username: session.user.user_metadata.username,
            game_id: game.id,
            content: message,
          },
        ])
        .select();
      if (error) {
        toast.error("Invio sbagliato");
        console.log(error);
      } else {
        inputMessage.reset();
      }
    }
  }

  return (
    <>
      <div className="chat_game_container"></div>
      <Paper sx={{ padding: 2, maxWidth: 400, margin: "auto", marginTop: 2 }}>
        <h1>Chat</h1>
        <div
          style={{
            height: 300,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            marginBottom: "12px",
          }}
        >
          <RealtimeChat game={game} />
        </div>

        <form onSubmit={handleMessageSubmit}>
          <fieldset role="group">
            <TextField
              name="message"
              label="Scrivi un messaggio..."
              variant="outlined"
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Invia
            </Button>
          </fieldset>
        </form>
      </Paper>
    </>
  );
}
