import { NavLink } from 'react-router-dom';
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
      letter-spacing: px;
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
          color: orange
        }
      }
    }

    > div.search {
      display: flex;
      align-items: center;
      margin-left: auto;

      > input {
        margin-right: 10px;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 8px;
        width: 200px;
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

const Header = ({ searchTerm, onInputChange, onSearch }) => {
  const { loggedInUser } = useContext(UsersContext);

  return (
    <StyledHeader>
      <div className="logo">
        <img src="https://png.pngtree.com/png-vector/20230410/ourmid/pngtree-letter-e-logo-vector-png-image_6699445.png" alt="Logo" />
        <span>ivom</span>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/user/login" className={({ isActive }) => isActive ? 'active' : ''}>Sign In</NavLink>
          </li>
          <li>
            <NavLink to="/user/login" className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink>
          </li>
        </ul>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={onInputChange}
          />
          <button onClick={onSearch}>Search</button>
        </div>
      </nav>
      {loggedInUser ? <div className="userInfo"></div> : null}
    </StyledHeader>
  );
};

export default Header;
