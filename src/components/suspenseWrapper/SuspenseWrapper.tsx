import PointLoader from "components/pointLoader";
import React, {Suspense} from "react";

const SuspenseWrapper = ({children}: {children: React.ReactElement}) => {
  return <Suspense fallback={<PointLoader scale={0.1} />}>{children}</Suspense>;
};
export default SuspenseWrapper;
