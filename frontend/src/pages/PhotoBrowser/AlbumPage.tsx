import { useParams } from "react-router-dom";

 export default function AlbumPage() {

  const { albumId, photoId } = useParams<{ albumId: string; photoId?: string }>();

  return(
   <>
   {albumId} , {photoId}
   </>
   );
}