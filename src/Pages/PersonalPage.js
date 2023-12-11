import React from 'react';
import { useUser } from '../Components/UserContext';

function UserProfile() {
  const { user } = useUser();
  console.log('User Data:', user);

  return (
    <div>
      <h2>User Profile</h2>
      {user.fullName && <p>Full Name: {user.fullName}</p>}
      {user.email && <p>Email: {user.email}</p>}
    </div>
  );
}

export default UserProfile;