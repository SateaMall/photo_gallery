import { useEffect, useState,useRef } from "react";
import { fetchAlbums, fetchPhotos} from "../../api/homepage";
import type { AlbumViewResponse } from "../../types/types";
import {AlbumsRow} from "../../components/AlbumsRow"
import { PhotoCard } from "../../components/PhotoCard";
import "./HomePage.css";
import { useParams } from "react-router-dom";
import type { PhotoResponse } from "../../types/types";
import { SocialBioSection } from "./SocialBioSection";


export default function Homepage() {

const { context } = useParams(); // "satea" | "alexis" | "shared"
const scope = context?.toUpperCase() as "SATEA" | "ALEXIS" | "SHARED";
const [error, setError] = useState<string | null>(null);



/**** **** **** **** PHOTOS **** **** **** ****/
  const PAGE_SIZE = 20;
  const FIRST_VISIBLE = 12;
  const [photos, setPhotos] = useState<PhotoResponse[]>([]);
  const [page, setPage] = useState(0); // backend page index
  const [visibleCount, setVisibleCount] = useState(FIRST_VISIBLE);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [initialRevealDone, setInitialRevealDone] = useState(false);
  const hasHiddenInCurrent =
  !initialRevealDone && visibleCount < photos.length;
  const restoreScrollYRef = useRef<number | null>(null);
  const [photosLoading, setPhotosLoading] = useState(false);


// Context can change (via routing), we need to reset when that happens
useEffect(() => {
  setPhotos([]);
  setPage(0);
  setVisibleCount(FIRST_VISIBLE);
  setHasMorePages(true);
}, [context]);

useEffect(() => {
  if (initialRevealDone) {
    setVisibleCount(photos.length);
  }
 }, [photos.length, initialRevealDone]);

// Fetch photos when page or scope changes
useEffect(() => {
  setPhotosLoading(true);
  fetchPhotos(scope, page, PAGE_SIZE)
    .then((res) => {
      setPhotos((prev) => {
        // 🔒 prevent duplicate pages
        const existingIds = new Set(prev.map(p => p.id));
        const newPhotos = res.content.filter(p => !existingIds.has(p.id));
        return [...prev, ...newPhotos];
      });

      setHasMorePages(!res.last);
    })
    .catch((e) => setError(e.message))
    .finally(() => setPhotosLoading(false));
}, [scope, page]);

useEffect(() => {
  if (restoreScrollYRef.current == null) return;

  // wait for DOM paint + layout
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: restoreScrollYRef.current!, behavior: "auto" });
      restoreScrollYRef.current = null;
    });
  });
}, [photos.length]);


function revealHidden() {
  setVisibleCount(photos.length);
    setInitialRevealDone(true); 
}

function loadMore() {
  restoreScrollYRef.current = window.scrollY;
  setPage((p) => p + 1); // triggers API
}

/**** **** **** **** ALBUMS **** **** **** ****/

  const [albums, setAlbums] = useState<AlbumViewResponse[]>([]);
  const [albumsLoading, setAlbumsLoading] = useState(false);

  useEffect(() => {
     setAlbumsLoading(true);
    fetchAlbums(context?.toUpperCase() as "SATEA" | "ALEXIS" | "SHARED")
      .then(setAlbums)
      .catch((e) => setError(e.message))
      .finally(() => setAlbumsLoading(false));
  }, [context]);






  
  if (error) return <div className="hp hp-error">{error}</div>;


return (
  <div className="homepage font-copperplate">
        <section className="hp-section" id="contact">
      <SocialBioSection />
    </section>

      {/* Albums */}
    <section className="hp-section"  id="albums">
      <header className="hp-head">
        <h1 className="hp-title">Albums</h1>
      </header>
      {albumsLoading && (<div className="hp">Albums Loading…</div>)}
       <AlbumsRow albums={albums} />
    </section>

    {/* Photos */}
    <section className="hp-section"  id="photos">
      <header className="hp-head">
        <h1 className="hp-title ">Photos</h1>
      </header>
{photosLoading && (<div className="hp">Photos Loading…</div>)}
     <div className={`photos-preview ${hasHiddenInCurrent ? "is-clamped" : ""}`}>
    <div className="photos-masonry">
      {photos.slice(0, visibleCount).map((p) => (
        <PhotoCard key={p.id} photo={p} />
      ))}
    </div>

    {/* FIRST SEE MORE (fade reveal) */}
    {hasHiddenInCurrent && (
      <>
        <div className="photos-fade" />
        <div className="photos-more">
          <button className="hp-more-btn" onClick={revealHidden}>
            See more
          </button>
        </div>
      </>
    )}
  </div>

  {/* SECOND SEE MORE (pagination) */}
  {!hasHiddenInCurrent && hasMorePages && (
    <div style={{ textAlign: "center", marginTop: 20 }} >
      <button className="hp-more-btn" onClick={loadMore}>
        Load more photos
      </button>
    </div>
  )}
</section>

  </div>
);

}
