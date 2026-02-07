import { useEffect, useState,useRef } from "react";
import { fetchAlbums} from "../../api/homepage";
import type { AlbumViewResponse } from "../../types/types";
import {AlbumsRow} from "./components/AlbumsRow"
import "./HomePage.css";
import { useParams } from "react-router-dom";
import { SocialBioSection } from "./components/SocialBioSection";
import { PhotosGrid } from "./components/PhotosGrid";

export default function Homepage() {

const { context } = useParams(); // "satea" | "alexis" | "shared"
const scope = context?.toUpperCase() as "SATEA" | "ALEXIS" | "SHARED";
const [error, setError] = useState<string | null>(null);




/**** **** **** **** ALBUMS **** **** **** ****/

  const [albums, setAlbums] = useState<AlbumViewResponse[]>([]);
  const [albumsLoading, setAlbumsLoading] = useState(false);

  useEffect(() => {
     setAlbumsLoading(true);
    fetchAlbums(scope)
      .then(setAlbums)
      .catch((e) => setError(e.message))
      .finally(() => setAlbumsLoading(false));
  }, [context]);






  
  if (error) return <div className="hp hp-error">{error}</div>;


return (
  <div className="homepage font-copperplate">


      {/* Albums */}
    {albums.length!==0 && (
      <section className="hp-section"  id="albums">
      <header className="hp-head">
        <h1 className="hp-title">Albums</h1>
      </header>
      {albumsLoading && (<div className="hp">Albums Loading…</div>)}
       <AlbumsRow albums={albums} />
    </section> 
    )}

    {/* Photos */}
    <section className="hp-section"  id="photos">
      <header className="hp-head">
        <h1 className="hp-title ">Photos</h1>
      </header>
    <PhotosGrid/>
</section>

        <section className="hp-section" id="contact">
      <SocialBioSection />
    </section>

  </div>
);

}
