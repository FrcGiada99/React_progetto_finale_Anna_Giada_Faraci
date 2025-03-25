/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import supabase from "../../../supabase/client";

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
      setAvatarUrl(null);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="avatar-container" style={{ textAlign: "center" }}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar-image"
          style={{
            height: size,
            width: size,
            borderRadius: "50%",
            boxShadow: "3px 3px 8px rgba(0,0,0,0.5)",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          className="avatar-placeholder"
          style={{
            height: size,
            width: size,
            borderRadius: "50%",
            backgroundColor: "#ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            color: "#888",
          }}
        >
          <span>No Image</span>
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          style={{ margin: "10px 0" }}
        />
      </div>
    </div>
  );
}
