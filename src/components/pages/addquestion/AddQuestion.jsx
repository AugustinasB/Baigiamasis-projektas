import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';


const StyledAddQuestion = styled.main`
form {
    display: flex;
    flex-direction: column;
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
        margin: 10px;
        font-size: 20px;
        font-weight: 500;
        
}

label{
    margin-right: 10px;
}

input { // Title
    width: 40%;
    padding: 5px;
    margin-bottom: 20px;
    margin: 10px 0;
    border: 2px solid black;
    
  }

  textarea {
    width: 80%;
    margin: 10px 0;
    justify-content: top;
    border: 2px solid black
  }

  ul {
  list-style: none; 
}


  li {
    display: flex;

    div {
        display: flex;
        align-items: center;
    }

    span { // All Questions
        margin-right: 1000px;
        font-weight: bold;
        font-size: 30px;
    }

      a {
        color: black;
        text-decoration: none;
        padding: 10px 10px;
        margin-right: 20px;
        background-color: #FFC67D;
        border-radius: 30px;

        &.active {
          font-weight: bold;

        }
    }
}

  button { //Submit
    background-color: #4caf50; 
    color: white; 
    padding: 10px;
    margin: 50px 500px;
    border: none; 
    border-radius: 4px; 
    cursor: pointer; 
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #45a049;
  }

`;


const AddQuestion = ({ onSubmit, data }) => {
    const navigate = useNavigate();
    return (
      
          <StyledAddQuestion>
            <form action="/Add_Question.php">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" />
                <textarea name="description" id="description" rows="10" placeholder="Enter your description" />
                <button onClick={onSubmit}>Submit</button>
            </form>
        </StyledAddQuestion>
    )
};

export default AddQuestion;