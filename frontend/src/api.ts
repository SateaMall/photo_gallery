export type Owner = "Satea" | "Alexis" ;

export type PhotoResponse = {
  id: string;
  owner: Owner;
  albumId: string | null;
  contentType: string;
  sizeBytes: number;
  createdAt: string; // ISO string
  fileUrl: string;   // "/api/photos/<id>/file"
};
// async is for functions with promises (needed for fetch)
// await is for waiting for a promise to resolve, so to wait for the response
export async function uploadPhoto(file: File, owner: Owner, albumId?: string) {
  const form = new FormData();
  form.append("file", file);
  // backend uses @RequestParam Owner owner => must be query param OR form field? We used @RequestParam, so use query param.
  const params = new URLSearchParams({ owner });
  if (albumId) params.set("albumId", albumId);

  const res = await fetch(`/api/admin/photos?${params.toString()}`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.error ?? `Upload failed (${res.status})`);
  }
  return (await res.json()) as PhotoResponse;
}

export async function listPhotos(owner: Owner): Promise<PhotoResponse[]> {
  // Backend returns Page<PhotoResponse>. We'll read content.
  const res = await fetch(`/api/photos?owner=${owner}&size=50&sort=createdAt,desc`);
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err?.error ?? `List failed (${res.status})`);
  }
  const data = await res.json();
  return (data.content ?? []) as PhotoResponse[];
}

async function safeJson(res: Response): Promise<any | null> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
