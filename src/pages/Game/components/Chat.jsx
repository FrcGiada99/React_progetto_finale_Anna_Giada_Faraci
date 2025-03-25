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
      <Paper
        sx={{
          padding: 3,
          maxWidth: 500,
          margin: "auto",
          marginTop: 3,
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Chat</h1>

        <div
          style={{
            height: 300,
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "16px",
            backgroundColor: "#f9f9f9",
            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <RealtimeChat game={game} />
        </div>

        <form onSubmit={handleMessageSubmit}>
          <fieldset
            role="group"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              name="message"
              label="Scrivi un messaggio..."
              variant="outlined"
              fullWidth
              required
              sx={{
                marginBottom: 2,
                borderRadius: 1,
                backgroundColor: "#fff",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: 1,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Invia
            </Button>
          </fieldset>
        </form>
      </Paper>
    </>
  );
}
