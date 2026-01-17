import type {PhotoResponse } from "../types/types";
import { photoFileUrl } from "../api/photos";
import "./AlbumCard.css";

export function PhotoCard({ photo }: { photo: PhotoResponse }) {
  const image =  photoFileUrl(photo.id) ;

  return (
    <article className="photo-card">
        <img className="image" src={image} alt={photo.title} loading="lazy" />

    </article>
  );
}
