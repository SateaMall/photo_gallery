// src/router.tsx
import { Navigate, createBrowserRouter } from "react-router-dom";

import ProfilesPage from "./pages/ProfilesPage/ProfilesPage.tsx";
import GalleryLayout from "./layouts/GalleryLayout";
import RootLayout from "./layouts/RootLayout.tsx";
import Homepage from "./pages/homepage/Homepage.tsx";
import AlbumPage from "./pages/PhotoBrowser/AlbumPage.tsx";
import PhotoPage from "./pages/PhotoBrowser/PhotoPage.tsx";
import NotFound from "./pages/NotFound";
import AdminPage from "./AdminSection/admin_upload";
import { GalleryShell } from "./layouts/GalleryShell.tsx";
function DebugMount({ name }: { name: string }) {
  console.log("MOUNT:", name);
  return null;
}

export const router = createBrowserRouter([
  { path: "/",  element: <RootLayout />, children: [
  { index : true, element: <Navigate to="/profiles" /> },
  { path: "admin", element: <AdminPage /> },
  { path: "profiles", element: <ProfilesPage /> },

{
  path: ":context/*",
  element: (
  <><DebugMount name=":context route element (GalleryLayout wrapper)" />
  <GalleryLayout /></>),
  children: [
     { path: "*", element: <GalleryShell /> }
    /*{ index: true, element: <Homepage /> },
    { path: "album/:albumId/:photoId?", element: <AlbumPage /> },
    { path: "photo/:photoId", element: <PhotoPage /> },*/
  ],
},
  { path: "*", element: <NotFound /> } 
] },
]);
