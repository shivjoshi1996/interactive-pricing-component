import styled from 'styled-components';

const StyledHeadingContainer = styled.div`
  height: 145px;
  background-image: url('/pattern-circles.svg');
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 57px;
  padding-bottom: 57px;
`;

const StyledHeading = styled.h1`
  font-size: 20px;
  color: #293356;
  font-weight: 900;
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const StyledSubHeading = styled.p`
  font-size: 13px;
  color: #848ead;
  line-height: 1.2rem;
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

export default function Heading() {
  return (
    <StyledHeadingContainer>
      <StyledHeading>Simple, traffic-based pricing</StyledHeading>
      <StyledSubHeading>
        Sign up for our 30-day trial. <br /> No credit card required
      </StyledSubHeading>
    </StyledHeadingContainer>
  );
}
