import type { AlbumDetailsResponse,AlbumPhotoItem } from "../types/types";
import { httpJson } from "./http";


export async function fetchAlbumInfo (albumId: string) {
    const data = await httpJson<AlbumDetailsResponse>(`/api/Photobrowser/albumDetails/${albumId}`);
    console.log("albums:", data);
    console.log("albums json:", JSON.stringify(data));
    return data;
}

export async function fetchAlbumItems (albumId: string) {
    const data = await httpJson<AlbumPhotoItem[]>(`/api/Photobrowser/albumItems/${albumId}`);
    console.log("albums:", data);
    console.log("albums json:", JSON.stringify(data));
    return data;
}


