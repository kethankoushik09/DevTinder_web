import React from 'react'
import EditPage from './EditPage.jsx'
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
       {user && <EditPage user={user}/>}
    </div>
  )
}

export default ProfilePage
