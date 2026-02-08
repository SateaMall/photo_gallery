import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMainPhoto } from "../../api/photoBrowse";
import type { MainPhotoResponse } from "../../types/types";
import { PhotosGrid } from "../../components/PhotosGrid";



export default function  PhotoPage () {
    const {photoId} = useParams<{photoId: string}>();
    const [mainPhoto, setMainPhoto]= useState <MainPhotoResponse| null>(null);

    useEffect(() => {
      if (!photoId) return;
      (async () => {
        const [photo] = await Promise.all([
                fetchMainPhoto(photoId)
                ]);
        setMainPhoto(photo);
  
      })();
    }, [photoId]);


    return (
    
    <>
      <div>photoId: {mainPhoto?.id}</div>
      <div>
        mainPhoto title: {mainPhoto ? mainPhoto?.title : "(mainPhoto is null because not loaded / no photoId)"}
      </div> 
      
        <PhotosGrid photoId= {photoId}/>
    </>
    );
}