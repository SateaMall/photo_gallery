import { API_BASE } from "./http";

export function photoFileUrl(photoId: string) {
  return `${API_BASE}/api/photos/${photoId}/file`;
}
