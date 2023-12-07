import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext.jsx';

const StyledHeader = styled.header`
  padding: 0 20px;
  height: 80px;

  display: flex;
  justify-content: space-between;
  background-color: #0014a8;
  align-items: center;
  gap: 10px;

  > div.logo {
    display: flex;
    align-items: center;

    > img {
      height: 60px;
    }

    > span {
      font-family: system-ui, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
      font-size: 3rem;
      font-weight: bold;
      color: #00aae4;
    }
  }

  > nav {
    display: flex;
    align-items: center;

    > ul {
      list-style-type: none;

      > li {
        > a {
          font-weight: bold;
          margin-right: 20px;
          color: orange;
          text-decoration: none;
          font-family: system-ui, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
        }
      }
    }

  > div.userInfo{
    display: flex;
    align-items: center;
    gap: 20px;

    > a{
      display: flex;
      align-items: center;
      gap: 10px;

      text-decoration: none;
      color: unset;

      > img{
        height: 60px;
      }

      > span{
        font-size: 1.3rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
        color: white;
        }
      }
    }
    

    > div.search {
      
      
      > input {
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 7px;

      }

      > button {
        background-color: #00aae4;
        color: white;
        border: none;
        padding: 8px 16px;
        font-size: 1rem;
        cursor: pointer;
        
      }
    }
  }
`;

const StyledLogoutButton = styled.button`
  background-color: #ff6347; 
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f; 
  }
`;

const Header = ({ searchTerm, onInputChange, onSearch }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <div className="logo">
        <img src="https://png.pngtree.com/png-vector/20230410/ourmid/pngtree-letter-e-logo-vector-png-image_6699445.png" alt="Logo" />
        <span>Eivom</span>
      </div>
      <nav>
                <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={onInputChange}
          />
          <button onClick={onSearch}>Search</button>
        </div>
        <ul>
          <li>
            <NavLink to="/user/login" className={({ isActive }) => isActive ? 'active' : ''}>Sign In</NavLink>
          </li>
          <li>
            <NavLink to="/user/register" className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink>
          </li>
        </ul>

        {loggedInUser && (
          <div className="userInfo">
            {loggedInUser.role === "admin" && <Link to="/user/manage">Manage Users</Link>}
            <Link to="/user/page">
              <img
                src={loggedInUser.profilePicture}
                alt={`${loggedInUser.userName} profile picture`}
              />
              <span>{loggedInUser.userName}</span>
            </Link>
            <StyledLogoutButton
              onClick={() => {
                setLoggedInUser('');
                navigate('/');
              }}
            >
              LogOut
            </StyledLogoutButton>
          </div>
        )}
      </nav>
    </StyledHeader>
  );
};


export default Header;