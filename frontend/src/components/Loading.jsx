import { ThreeDot } from "react-loading-indicators";

export function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <ThreeDot color="#0062DB" size="medium" text="" textColor="" />
    </div>
  );
}
