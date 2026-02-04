import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import type { MainPhotoResponse, AlbumPhotoItem, PhotoResponse, AlbumViewResponse } from "../../types/types";
import { fetchAlbumInfo, fetchAlbumItems, fetchMainPhoto } from "../../api/photoBrowse";

export default function AlbumPage() {

  const { albumId, photoId } = useParams<{ albumId: string; photoId?: string }>();

  const [photos, setPhotos] = useState<AlbumPhotoItem[]> ([]) ;
  const [mainPhoto, setMainPhoto]= useState <MainPhotoResponse| null>(null);
  const [album, setAlbum] = useState <AlbumViewResponse| null>(null);

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

useEffect(() => {
  if (!albumId) return;

  const idToFetch = photoId ?? album?.firstPhotoId;
  if (!idToFetch) return; 
  (async () => {
    setMainPhoto(await fetchMainPhoto(idToFetch));
  })();
}, [albumId, photoId, album]);

  return (
    <>
      <div>albumId: {albumId}</div>
      <div>photoId: {mainPhoto?.id}</div>

      <div>photos count: {photos.length}</div>

      <div>
        mainPhoto title: {mainPhoto ? mainPhoto.title : "(mainPhoto is null because not loaded / no photoId)"}
      </div>
    </>
  );
}