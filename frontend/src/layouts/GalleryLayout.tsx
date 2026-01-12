import { Outlet } from "react-router-dom";

export default function GalleryLayout() {
  return (
    <div>
      {/* navbar / background etc */}
      <Outlet />
    </div>
  );
}
