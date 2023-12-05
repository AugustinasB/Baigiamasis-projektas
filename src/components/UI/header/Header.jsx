import styled from "styled-components";

const StyledHeader = styled.header`
    justify-content: left;
`

const Header = () => {
    return (
        <StyledHeader>
            <div>
                Logo
            </div>
            <nav>
                <ul>
                    <li><Link to ="/">Log in</Link></li>
                    <li><Link to ="/">Sign Up</Link></li>
                </ul>
            </nav>
        </StyledHeader>
    );
}

export default Header;