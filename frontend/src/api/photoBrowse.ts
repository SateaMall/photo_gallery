import type { AlbumViewResponse ,AlbumPhotoItem, MainPhotoResponse, PhotoResponse} from "../types/types";
import { httpJson, logger } from "./http";


export async function fetchAlbumInfo (albumId: string) {
    const data = await httpJson<AlbumViewResponse>(`/api/Photobrowser/albumDetails/${albumId}`);
    logger(data, "Album Info");
    return data;
}

export async function fetchAlbumItems (albumId: string) {
    const data = await httpJson<AlbumPhotoItem[]>(`/api/Photobrowser/albumItems/${albumId}`);
    logger(data, "Album Items");
    return data;
}

export async function fetchMainPhoto (photoId: string){
    const data = await httpJson<MainPhotoResponse>(`/api/Photobrowser/albumMainPhoto/${photoId}`)
    logger(data, "Main Photo");
    return data;
}

export async function fetchPhotoSuggestions (photoId: string){
    const data = await httpJson<PhotoResponse[]>(`/api/Photobrowser/photoSuggestions/${photoId}`)
    logger(data, "Suggestion Photos");
    return data;
}


