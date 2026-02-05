import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMainPhoto, fetchPhotoSuggestions } from "../../api/photoBrowse";
import type { PhotoResponse, MainPhotoResponse } from "../../types/types";



export default function  PhotoPage () {
    const {photoId} = useParams();
    const [photos, setPhotos] = useState<PhotoResponse[]> ([]) ;
    const [mainPhoto, setMainPhoto]= useState <MainPhotoResponse| null>(null);

    useEffect(() => {
      if (!photoId) return;
      (async () => {
        const [photo, suggestions] = await Promise.all([
                fetchMainPhoto(photoId),
                fetchPhotoSuggestions(photoId)
                ]);
        setMainPhoto(photo);
        setPhotos(suggestions);
      })();
    }, [photoId]);


    return (
    
    <>
      <div>photoId: {mainPhoto?.id}</div>

      <div>photos count: {photos.length}</div>

      <div>
        mainPhoto title: {mainPhoto ? mainPhoto?.title : "(mainPhoto is null because not loaded / no photoId)"}
      </div>
    </>
    );
}