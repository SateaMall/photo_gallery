import type { AlbumViewResponse } from "../types/types";
import { photoFileUrl } from "../api/photos";
import "./AlbumCard.css";

export function AlbumCard({ album }: { album: AlbumViewResponse }) {
  const cover = album.firstPhotoId ? photoFileUrl(album.firstPhotoId, "MEDIUM") : null;

  return (
    <article className="album-card">
      {cover ? (
        <img className="album-cover" src={cover} alt={album.title} loading="lazy" />
      ) : (
        <div className="album-cover album-cover--empty">No cover</div>
      )}

      <div className="album-meta">
        <div className="album-title">{album.title}</div>
        <div className="album-sub">
          {album.numberOfPhotos} photo{album.numberOfPhotos === 1 ? "" : "s"}
        </div>
      </div>
    </article>
  );
}
