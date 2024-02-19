import Placeholder from 'react-bootstrap/Placeholder';
import { memo } from "react";

function PlaceholderBlock ({times = 1}) {
  // return(
  //   <div className='mt-4'>
  //   <Placeholder as="p" animation="glow">
  //       <Placeholder xs={9} />
  //     </Placeholder>
  //   </div>
  // )

  const placeholders = Array.from({ length: times }, (_, index) => (
    <div key={index}>
      <Placeholder as="p" animation="glow" className="my-1">
        <Placeholder xs={9} />
      </Placeholder>
    </div>
  ));

  return <div className='mt-4'>{placeholders}</div>;

}

export default memo(PlaceholderBlock);