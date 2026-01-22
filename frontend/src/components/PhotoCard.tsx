import type {PhotoResponse } from "../types/types";
import { photoFileUrl } from "../api/photos";
import "./AlbumCard.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export function PhotoCard({ photo }: { photo: PhotoResponse }) {
  const navigate = useNavigate();
  const image = photoFileUrl(photo.id);
  const context = useParams().context; // "satea" | "alexis" | "shared"
  function onPickPhoto(photoId: string) {
    navigate(`/${context}/photos/${photoId}`); // adjust path to YOUR router
  }

  return (
    <article
      className="photo-card"
      role="button"
      tabIndex={0}
      onClick={() => onPickPhoto(photo.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onPickPhoto(photo.id);
      }}
    >
      <img className="photo-img" src={image} alt={photo.title} 
        loading="lazy"
        decoding="async"
        fetchPriority="low" />
    </article>
  );
}
