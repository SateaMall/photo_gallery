import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMainPhoto } from "../../api/photoBrowse";
import type { MainPhotoResponse } from "../../types/types";
import { PhotosGrid } from "../../components/PhotosGrid";
import { photoFileUrl } from "../../api/photos";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "./PhotoPage.css"
function formatDate(value?: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value; // fallback if backend sends non-ISO
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function joinList(v?: string[] | null) {
  if (!v || v.length === 0) return "—";
  return v.join(", ");
}

export default function PhotoPage() {
  const { photoId } = useParams<{ photoId: string }>();
  const [mainPhoto, setMainPhoto] = useState<MainPhotoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const image = photoFileUrl(photoId);
  
  useEffect(() => {
    if (!photoId) return;

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const photo = await fetchMainPhoto(photoId);
        setMainPhoto(photo);
      } catch (e) {
        setError("Failed to load photo.");
      } finally {
        setLoading(false);
      }
    })();
  }, [photoId]);

  const title = mainPhoto?.title?.trim() || "Untitled";
  const description = (mainPhoto as any)?.description?.trim?.() || (mainPhoto as any)?.description || "—";
  const owner = (mainPhoto as any)?.owner ?? (mainPhoto as any)?.ownerId ?? "—";
  const themes = (mainPhoto as any)?.themes ?? (mainPhoto as any)?.themeNames ?? [];
  const location = (mainPhoto as any)?.location ?? (mainPhoto as any)?.place ?? "—";
  const captureDate = (mainPhoto as any)?.captureDate ?? (mainPhoto as any)?.takenAt ?? (mainPhoto as any)?.createdAt ?? null;

  if (!photoId) return null;

  return (
    <section className="photo-page">
      {loading && <div className="photo-page__status">Loading…</div>}
      {error && <div className="photo-page__status photo-page__status--error">{error}</div>}

      {!loading && !error && mainPhoto && (
        <>
          {/* Main viewer + metadata */}
          <div className="photo-page__hero">
            <div className="photo-page__viewer">
              <PhotoProvider>
                <PhotoView src={image}>
                  <button type="button" className="photo-page__imageBtn" aria-label="Open viewer">
                    <img
                      className="photo-page__image"
                      src={image}
                      alt={title}
                      loading="eager"
                      decoding="async"
                    />
                    <div className="photo-page__hint">
                      Click to zoom / fullscreen
                    </div>
                  </button>
                </PhotoView>
              </PhotoProvider>
            </div>

            <aside className="photo-page__meta" aria-label="Photo details">
              <h1 className="photo-page__title">{title}</h1>
              <p className="photo-page__desc">{description}</p>

              <dl className="photo-page__dl">
                <div className="photo-page__row">
                  <dt>Owner</dt>
                  <dd>{String(owner)}</dd>
                </div>

                <div className="photo-page__row">
                  <dt>Themes</dt>
                  <dd>
                    {Array.isArray(themes) && themes.length > 0 ? (
                      <div className="photo-page__chips">
                        {themes.map((t: string) => (
                          <span key={t} className="photo-page__chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </dd>
                </div>

                <div className="photo-page__row">
                  <dt>Location</dt>
                  <dd>{String(location)}</dd>
                </div>

                <div className="photo-page__row">
                  <dt>Capture date</dt>
                  <dd>{formatDate(captureDate)}</dd>
                </div>
              </dl>
            </aside>
          </div>

          {/* Related suggestions */}
          <div className="photo-page__related">
            <h2 className="photo-page__h2">Related photos</h2>
            <PhotosGrid photoId={photoId} />
          </div>
        </>
      )}
    </section>
  );
}
