import { memo } from "react";

function PageSubTitle({children}) {
  return <strong  className="my-2">{children}</strong >
} 

// Using memo will cause React to skip rendering a component if its props have not changed.
export default memo(PageSubTitle);