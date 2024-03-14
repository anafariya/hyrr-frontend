import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../UserContext";

function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const userName = userInfo?.username;

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3001/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
      setUserInfo({ username: null });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="flex mb-50 justify-between">
      <h1 className="font-bold text-2xl logo">
        Hyrr
      </h1>
      <nav className="flex gap-15">
        {!userName && <Link to="/signin">Log-in</Link>}
        {userName && (
          <>
            <h2 className='italic mr-5 font-semibold text-gray-800'>
              Hey {userName.toUpperCase()}!!
            </h2>
            <Link to="/logout" onClick={handleLogout} >Log-out</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
