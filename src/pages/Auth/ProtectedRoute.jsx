import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import PageTitle from '../_shared/PageTitle';

import { Button } from 'react-bootstrap';

const ProtectedRoute = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  // console.log('ProtectedRoute userInfo', userInfo);

  // show unauthorized screen if no user is found in redux store
  
  if (!userInfo) {
    return (<>

    <PageTitle>Unauthorized</PageTitle>

      <div>
        You do not have enough privileges to access this page.
      </div>

      <div className='mt-4'>
        <Button as={Link} to="/" className="me-2" variant="outline-primary">Home</Button>
        <Button as={Link} to="/login" className="me-2" variant="primary">Log In</Button>
      </div>

    </>)
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute