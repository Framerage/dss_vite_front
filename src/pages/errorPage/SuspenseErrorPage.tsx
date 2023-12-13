import SuspenseWrapper from "components/suspenseWrapper";
import React from "react";

const Content = React.lazy(() => import("./ErrorPage"));

const SuspenseErrorPage = () => {
  return (
    <SuspenseWrapper>
      <Content />
    </SuspenseWrapper>
  );
};
export default SuspenseErrorPage;
