import { ClipLoader } from "react-spinners";

export default function LoadingComponent() {
  return (
    <div className="sweet-loading">
      <ClipLoader color={"#FFFFF"} loading={true} size={15} />
    </div>
  );
}
