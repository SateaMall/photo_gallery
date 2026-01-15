import { httpJson } from "./http";
import type { AlbumViewResponse } from "../types/homepage";

export function fetchHomepageAlbums() {
  return httpJson<AlbumViewResponse[]>("/api/homepage/albums");
}
