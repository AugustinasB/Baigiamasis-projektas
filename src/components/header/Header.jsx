import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext.jsx";


const StyledHeader = styled.header`
  padding: 0 20px;
  height: 80px;

  display: flex;
  justify-content: space-between;
  background-color: #5353c3;
  align-items: center;
  gap: 10px;
  

> div.logo{
  display: flex;
  align-items: center;

  > img{
    height: 60px;
  }
  > span{
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
      font-size: 3rem;
      font-weight: bold;
      padding-left: 15px;
  }
}

>nav{
  > ul{
    list-style-type: none;

  > li{
    >a{
      font-weight: bold;
    }
    }
  }
  }

  > ul{
    list-style-type: none;

    > li > a{
      display: block;
      background-color: orange;
      font-family: 'Lucida Sans', 'Lucida Sans Regular',
      'Lucida Grande', 'Lucida Sans Unicode', Geneva,
      Verdana, sans-serif;
      font-weight: bold;
      text-decoration: none;
      border: 3px solid black;
      padding: 2px 5px
    }
  }
`;



const Header = () => {

  const { loggedInUser } = useContext(UsersContext);

  return (
    <StyledHeader>
    <div className="logo">
      <img src="https://ih1.redbubble.net/image.1657697057.1291/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt="Logo" />
      <span>Eivom</span>
    </div>
    {
      !loggedInUser ?
        <ul>
          <li><NavLink to="/user/login"
            className={({ isActive })=> isActive ? 'active' : ''}
          >Sign In</NavLink></li>
          <li><NavLink to="/user/login"
            className={({ isActive })=> isActive ? 'active' : ''}
          >Sign Up</NavLink></li>
          </ul> :
          <div className="userInfo"></div>
    }
    </StyledHeader>
  );
}

export default Header;
