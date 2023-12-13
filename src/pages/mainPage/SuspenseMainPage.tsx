import SuspenseWrapper from "components/suspenseWrapper";
import React from "react";

const MainPage = React.lazy(() => import("./MainPage"));

const SuspenseMainPage = () => {
  return (
    <SuspenseWrapper>
      <MainPage />
    </SuspenseWrapper>
  );
};
export default SuspenseMainPage;
