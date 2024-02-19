import { memo } from "react";

function PageTitle({children}) {
  return <h1 className="my-3">{children}</h1>
} 

// Using memo will cause React to skip rendering a component if its props have not changed.
export default memo(PageTitle);