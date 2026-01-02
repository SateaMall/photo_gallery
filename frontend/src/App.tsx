import { useEffect, useMemo, useState } from "react";
import "./App.css";
import type { Owner, PhotoResponse } from "./api";
import { listPhotos, uploadPhoto } from "./api";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

export default function App() {
  const [owner, setOwner] = useState<Owner>("Satea");
  const [photos, setPhotos] = useState<PhotoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sorted = useMemo(() => photos, [photos]);

  async function refresh() {
    setError(null);
    setLoading(true);
    try {
      const items = await listPhotos(owner);
      setPhotos(items);
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner]);

  async function onUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      // upload sequentially to keep it simple
      for (const file of Array.from(files)) {
        await uploadPhoto(file, owner);
      }
      await refresh();
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Photo Gallery (Local Test)</h1>

        <div className="controls">
          <label>
            Section (owner)
            <select value={owner} onChange={(e) => setOwner(e.target.value as Owner)}>
              <option value="Satea">Satea</option>
              <option value="Alexis">Alexis</option>
            </select>
          </label>

          <label className="uploadBtn">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={uploading}
              onChange={(e) => onUpload(e.target.files)}
            />
            {uploading ? "Uploading..." : "Upload photos"}
          </label>

          <button onClick={refresh} disabled={loading || uploading}>
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {error && <div className="error">Error: {error}</div>}
      </header>

      <main>
        {loading ? (
          <p>Loading...</p>
        ) : sorted.length === 0 ? (
          <p>No photos yet for {owner}.</p>
        ) : (
          <div className="grid">
            {sorted.map((p) => (
              <figure className="card" key={p.id}>
                <img src={p.fileUrl} alt={p.id} loading="lazy" />
                <figcaption>
                  <div className="metaRow">
                    <span className="pill">{p.owner}</span>
                    <span>{formatBytes(p.sizeBytes)}</span>
                  </div>
                  <div className="small">
                    {new Date(p.createdAt).toLocaleString()}
                  </div>
                  <div className="small mono">{p.id}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
