import { memo } from "react";
import ErrorView from "@/views/ErrorView";

function NotFound() {
  return (
    <ErrorView
      header="404: 존재하지 않는 페이지입니다"
    />
  );
}

export default memo(NotFound);
