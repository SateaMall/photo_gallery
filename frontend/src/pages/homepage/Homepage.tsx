import { useEffect, useState } from "react";
import { fetchHomepageAlbums, fetchHomepagePhotos} from "../../api/homepage";
import type { AlbumViewResponse } from "../../types/types";
import { AlbumCard } from "../../components/AlbumCard";
import { PhotoCard } from "../../components/PhotoCard";
import "./HomePage.css";
import { useParams } from "react-router-dom";
import type { PhotoResponse } from "../../types/types";

export default function Homepage() {
  const { context } = useParams(); // "satea" | "alexis" | "shared"
  const [albums, setAlbums] = useState<AlbumViewResponse[]>([]);
  const [photos, setPhotos] = useState<PhotoResponse[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomepageAlbums(context?.toUpperCase() as "SATEA" | "ALEXIS" | "SHARED")
      .then(setAlbums)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchHomepagePhotos(context?.toUpperCase() as "SATEA" | "ALEXIS" | "SHARED")
      .then(setPhotos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))},
       []);
  if (loading) return <div className="hp">Loading…</div>;
  if (error) return <div className="hp hp-error">{error}</div>;

return (
  <div className="homepage">
    {/* Photos */}
    <section className="hp-section">
      <header className="hp-head">
        <h1 className="hp-title">Photos</h1>
        <a className="hp-link" href={`/${context}/photos`}>See more →</a>
      </header>

      <div className="photos-masonry">
        {photos.map((p) => (
          <PhotoCard key={p.id} photo={p} />
        ))}
      </div>
    </section>

    {/* Albums */}
    <section className="hp-section">
      <header className="hp-head">
        <h1 className="hp-title">Albums</h1>
        <a className="hp-link" href={`/${context}/albums`}>See more →</a>
      </header>

      <div className="albums-grid">
        {albums.map((a) => (
          <AlbumCard key={a.albumId} album={a} />
        ))}
      </div>
    </section>
  </div>
);

}
