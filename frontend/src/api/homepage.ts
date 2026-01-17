import { httpJson } from "./http";
import type {AlbumViewResponse, PhotoResponse, Scope} from "../types/types";

export function fetchHomepageAlbums(scope: Scope) {
  return httpJson<AlbumViewResponse[]>(`/api/homepage/albums/${scope}`);
}

export function fetchHomepagePhotos(scope: Scope) {
  return httpJson<PhotoResponse[]>(`/api/homepage/photos/${scope}`);
}
