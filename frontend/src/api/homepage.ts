import { httpJson } from "./http";
import type {AlbumViewResponse, PhotoResponse, Scope} from "../types/types";

export async function fetchHomepageAlbums(scope: Scope) {
  const data = await httpJson<AlbumViewResponse[]>(`/api/homepage/albums/${scope}`);
  console.log("albums:", data);
  console.log("albums json:", JSON.stringify(data));
  return data;
}

export async function fetchHomepagePhotos(scope: Scope) {
  const data = await httpJson<PhotoResponse[]>(`/api/homepage/photos/${scope}`);
  console.log("photos:", data);
  console.log("photos json:", JSON.stringify(data));
  return data;
}
