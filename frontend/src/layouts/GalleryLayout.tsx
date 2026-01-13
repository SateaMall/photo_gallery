import { Navigate, Outlet, useParams } from "react-router-dom";

const ALLOWED = new Set(["satea", "alexis", "shared"]);

export default function GalleryLayout() {
  const { context } = useParams();

  if (!context || !ALLOWED.has(context)) {
    return <Navigate to="/profiles" replace />;
  }

  return (
    <>
      {/* gallery specific layout */}
      <Outlet />
    </>
  );
}
