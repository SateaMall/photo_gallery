import { httpJson,logger } from "./http";
import type {AlbumViewResponse, PhotoResponse, Scope} from "../types/types";
import type { PageResponse } from "../types/types";

export async function fetchAlbums(scope: Scope) {
  const data = await httpJson<AlbumViewResponse[]>(`/api/homepage/albums/${scope}`);
  logger(data, "Albums");
  return data;
}

export async function fetchPhotos(scope: Scope, page = 0, size = 20) {
  const data = await httpJson<PageResponse<PhotoResponse>>( `/api/homepage/photos/${scope}?page=${page}&size=${size}`);
  logger(data, "Photos");
  return data;
}
