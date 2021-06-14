import styled from "styled-components";

const StyledPage = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  padding-bottom: 88px;
  background-image: url("/bg-pattern.svg");
  background-repeat: no-repeat;
  text-align: center;
  font-family: 'Manrope', sans-serif;
  background-size: 100vw 50vh;

  @media (min-width: 768px) {
    padding-bottom: unset;
  }

`;


export default function Page(props){
  return (
    <StyledPage>
      {props.children}
    </StyledPage>
  );
}