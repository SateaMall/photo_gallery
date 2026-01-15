import { useEffect, useState } from "react";
import { fetchHomepageAlbums } from "../../api/homepage";
import type { AlbumViewResponse } from "../../types/homepage";
import { AlbumCard } from "../../components/AlbumCard";
import "./HomePage.css";

export default function Homepage() {
  const [albums, setAlbums] = useState<AlbumViewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomepageAlbums()
      .then(setAlbums)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="hp">Loading…</div>;
  if (error) return <div className="hp hp-error">{error}</div>;

  return (
    <div className="hp">
      <h1 className="hp-title">Albums</h1>

      <div className="hp-grid">
        {albums.map((a) => (
          <AlbumCard key={a.albumId} album={a} />
        ))}
      </div>
    </div>
  );
}
