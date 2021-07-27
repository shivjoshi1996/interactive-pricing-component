import styled from 'styled-components';

const StyledButton = styled.button`
  height: 41px;
  width: 170px;
  border-radius: 20.5px;
  background-color: #293356;
  border: none;
  cursor: pointer;

  &:hover > p {
    color: white;
  }

  > p {
    font-size: 12px;
    color: #becdff;
    font-weight: 800;
  }
`;

export default function Button({ children }) {
  return (
    <StyledButton>
      <p>{children}</p>
    </StyledButton>
  );
}
