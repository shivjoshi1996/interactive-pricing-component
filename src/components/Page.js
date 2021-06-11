import styled from "styled-components";

const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("/bg-pattern.svg");
  background-repeat: no-repeat;
  text-align: center;
  font-family: 'Manrope', sans-serif;
`;


export default function Page(props){
  return (
    <StyledPage>
      {props.children}
    </StyledPage>
  );
}