import { useState,useEffect, useMemo,useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { MainPhotoResponse, AlbumPhotoItem, AlbumViewResponse } from "../../types/types";
import { fetchAlbumInfo, fetchAlbumItems, fetchMainPhoto } from "../../api/photoBrowse";
import { photoFileUrl } from "../../api/photos";
import useEmblaCarousel from "embla-carousel-react";
import "./AlbumPage.css"

export default function AlbumPage() {
  const navigate = useNavigate();
  const { context, albumId, photoId } = useParams<{ context:string, albumId: string; photoId?: string }>();

  const [photos, setPhotos] = useState<AlbumPhotoItem[]> ([]) ;
  const [album, setAlbum] = useState <AlbumViewResponse| null>(null);
  const [mainPhoto, setMainPhoto]= useState <MainPhotoResponse| null>(null);
  const [mainLoading, setMainLoading] = useState(false);

// Embla 
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    dragFree: true,
    containScroll: "trimSnaps"
  })

  //Loading album itmes
  useEffect (() => {
    if (!albumId) return;
    (async () =>{
        const [items, albumInfo] = await Promise.all([
        fetchAlbumItems(albumId),
        fetchAlbumInfo(albumId),
        ]);
        setPhotos(items);
        setAlbum(albumInfo)

    })();
  }, [albumId])

    const selectedPhotoId = useMemo(() => {
    return photoId ?? album?.firstPhotoId ?? photos[0]?.photoId ?? null;
  }, [photoId, album?.firstPhotoId, photos]);
  // Fetch main photo ONLY when selectedPhotoId changes
  useEffect(() => {
    if (!selectedPhotoId) return;

    let cancelled = false;
    (async () => {
      try {
        setMainLoading(true);
        const mp = await fetchMainPhoto(selectedPhotoId);
        if (!cancelled) setMainPhoto(mp);
      } finally {
        if (!cancelled) setMainLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedPhotoId]);


  const selectedIndex = useMemo(() => {
    if (!selectedPhotoId) return -1;
    return photos.findIndex((p) => p.photoId === selectedPhotoId);
  }, [photos, selectedPhotoId]);

  // Keep the selected item visible in the thumbnail list
  useEffect(() => {
    if (!emblaApi) return;
    if (selectedIndex < 0) return;
    emblaApi.scrollTo(selectedIndex);
  }, [emblaApi, selectedIndex]);

  const onPickPhoto = useCallback(
    (id: string) => {
      if (!context || !albumId) return;
      navigate(`/${context}/album/${albumId}/${id}`);
    },
    [context, albumId, navigate]
  );

  const mainImageUrl = mainPhoto ? photoFileUrl(mainPhoto.id) : "";

  const locationText = useMemo(() => {
    if (!mainPhoto) return "";
    const parts = [mainPhoto.city, mainPhoto.country].filter(Boolean);
    return parts.join(", ");
  }, [mainPhoto]);

  return (
    <div className="album-page">
      <div className="album-shell">
        {/* MAIN VIEWER */}
        <section className="album-main" aria-label="Main photo">
          <div className="album-main-media">
            {mainPhoto && (
              <img
                className="album-main-img"
                src={mainImageUrl}
                alt={mainPhoto.title ?? ""}
                decoding="async"
                fetchPriority="high"
              />
            )}

            {!mainPhoto && (
              <div className="album-main-placeholder">
                {mainLoading ? "Loading..." : "No photo selected"}
              </div>
            )}
          </div>
        </section>

        {/* RIGHT THUMB LIST */}
        <aside className="album-sidebar" aria-label="Album thumbnails">
          <div className="thumb-embla" ref={emblaRef}>
            <div className="thumb-embla__container">
              {photos.map((p) => {
                const isSelected = p.photoId === selectedPhotoId;
                const thumbUrl = photoFileUrl(p.photoId);

                // NOTE: your type says "Owner" with capital O — if your API actually returns "owner",
                // change p.Owner to p.owner everywhere.
                const ownerAny = (p as unknown as { Owner?: any; owner?: any }).Owner ?? (p as any).owner;
                const ownerLabel = ownerAny?.toString?.() ?? "";

                const metaLine = [p.city, p.country, p.captureYear].filter(Boolean).join(" • ");

                return (
                  <button
                    key={p.photoId}
                    type="button"
                    className={`thumb-card ${isSelected ? "is-selected" : ""}`}
                    onClick={() => onPickPhoto(p.photoId)}
                    aria-current={isSelected ? "true" : undefined}
                  >
                    <img className="thumb-img" src={thumbUrl} alt={p.title ?? ""} loading="lazy" decoding="async" />

                    <div className="thumb-meta">
                      <div className="thumb-title">{p.title ?? "Untitled"}</div>
                      {p.description && <div className="thumb-desc">{p.description}</div>}
                      <div className="thumb-sub">
                        {metaLine || ownerLabel ? (
                          <>
                            {metaLine}
                            {metaLine && ownerLabel ? " — " : ""}
                            {ownerLabel}
                          </>
                        ) : (
                          <span className="thumb-sub-empty"> </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* BOTTOM INFO BAR */}
        <footer className="album-footer" aria-label="Photo and album info">
          <div className="footer-left">
            <div className="footer-title">{mainPhoto?.title ?? ""}</div>
            {mainPhoto?.description && <div className="footer-desc">{mainPhoto.description}</div>}
            {album && (
              <div className="footer-album">
                <span className="footer-album-name">{album.title}</span>
                {album.description ? <span className="footer-album-desc"> — {album.description}</span> : null}
              </div>
            )}
          </div>

          <div className="footer-center">
            {/* placeholders for your icons */}
            <button className="footer-icon" type="button" aria-label="Like">♡</button>
            <button className="footer-icon" type="button" aria-label="Zoom">＋</button>
            <button className="footer-icon" type="button" aria-label="Fullscreen">⛶</button>
          </div>

          <div className="footer-right">
            {locationText && <div className="footer-meta">{locationText}</div>}
            {mainPhoto?.captureYear != null && <div className="footer-meta">{mainPhoto.captureYear}</div>}
            {mainPhoto?.themes?.length ? (
              <div className="footer-meta footer-themes">
                {mainPhoto.themes.map((t) => String(t)).join(", ")}
              </div>
            ) : null}
          </div>
        </footer>
      </div>
    </div>
  );
}