import { memo } from "react";

function VesselLabel({isBold=false, children}) {

  return (<span>
    <span className="me-1">[</span>
    <span className={isBold ? 'fw-bold' : ''}>{children}</span>
      
    <span className="ms-1">]</span>
  </span>);

}

export default memo(VesselLabel);