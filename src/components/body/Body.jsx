import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBody = styled.div`
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    ul > li {
        padding: 20px;
        display: flex; 
    }

    ul > li > span {
        font-weight: bold;
        font-size: 30px;
    }

    a {
        color: black;
        text-decoration: none;
        padding: 20px;
        margin-left: 500px;
        background-color: #FFC67D;
        border-radius: 30px;

        &.active {
            font-weight: bold;
        }
    }
`;

const Body = () => {
    const navigate = useNavigate();


    return (
    <StyledBody>
        <ul>
            <li>
            <span>All Questions</span>
            <NavLink to="/AddQuestion" activeClassName="activeclassname">Add Question</NavLink>
            </li>
        </ul>

    </StyledBody>
    );
};

export default Body;