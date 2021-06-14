import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const StyledPricingContainer = styled.div`
  min-height: 400px;
  width: 90vw;
  max-width: 540px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 20px 30px -5px rgba(127, 137, 185, 0.152073);
  padding-top: 34px;
  padding-bottom:  32px; 
`

const StyledPricingInput = styled.input`
  -webkit-appearance: none;
  width: 80%;
  border-radius: 50px;
  height: 8px;
  background: #F1F5FE;
  outline: none;
  -webkit-transition: .2s;
  transition: opacity .2s;
  margin-top: 40px;
  margin-bottom: 40px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 40px;
    height: 40px;
    border-radius: 100px;
    background: #10D8C4;
    cursor: pointer;
    background-image: url("/icon-slider.svg");
    background-repeat: no-repeat;
    background-size: 25px 15px;
    background-position: center;
    box-shadow: 0px 15px 30px rgba(0, 255, 231, 0.6);
  }
`;

const StyledPageViews = styled.p`
  font-size: 10px;
  color: #848EAD;
  text-transform: uppercase;
  font-weight: 800;
  line-height: 16px;
  letter-spacing: 2px;
`;

const StyledMonthlyPrice = styled.p`
  font-size: 14px;
  color: #848EAD;
  padding-bottom: 34px;

  span {
    color: #293356;
    font-size: 32px;
    font-weight: 800;
  }
`;

// -------------- TODO: Refactor toggle into its own component -------------------

const StyledToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    color: #848EAD;
    font-size: 12px;
    margin-right: 10px;
    margin-left: 10px;

    span {
      color: #FF8D68;
      font-size: 10px;
      background-color: #FEEDE8;
      border-radius: 50px;
      padding: 2px 5px;
      margin-left: 5px;
    }
  }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 43px;
  height: 22px;

  > input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: #10D8C4;
    }

    &:focus + span {
      box-shadow: 0 0 1px #10D8C4;
    }

    &:checked + span::before {
      transform: translateX(21px);
    }

  }

  > span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #CFD8EF;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;

    &::before {
      position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
    }
  }
`;

const StyledHr = styled.hr`
  margin-top: 38px;
  height: 1px;
  background-color: #ECF0FB;
  border: none;
`;

const StyledBottomContainer = styled.div`
  margin-top: 24px;

  @media (min-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
`;

const StyledUnorderedList = styled.ul`
  list-style-image: url('/icon-check.svg');
  list-style-type: circle;
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 32px;
  list-style-position: inside;

  @media (min-width: 768px) {
    
  }
`;

const StyledListItem = styled.li`
  color: #848EAD;
  font-size: 12px;
  margin-bottom: 10px;
`;

export default function Pricing() {

  const [sliderValue, setSliderValue] = useState(500000);
  const [pageViews, setPageViews] = useState("500K");
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);
  const [billingCost, setBillingCost] = useState(24);

  function handleChange(e){
    const {value} = e.currentTarget;
    setSliderValue(value);
  }

  function handleCheckBoxChange(e) {
    setIsYearlyBilling(e.currentTarget.checked);
  }

  
  function calculatePageViews(){
    if (sliderValue < 1000000) {
      const thousand = (sliderValue / 1000) + "K"
      setPageViews(thousand);
    } else if (sliderValue > 1000000) {
      const million = (sliderValue / 1000000) + "M";
      setPageViews(million);
    }
  }
  
  function calculateMonthlyBilling(){
    let billing = 0;
    if (sliderValue < 50000) {
      billing = 8;
    } else if (sliderValue >= 50000 && sliderValue < 100000) {
      billing = 12;
    } else if (sliderValue >= 100000 && sliderValue < 500000) {
      billing = 16;
    } else if (sliderValue >= 500000 && sliderValue < 1000000) {
      billing = 24;
    } else if (sliderValue >= 1000000) {
      billing = 36;
    }
    
    if (isYearlyBilling) {
      billing = billing * 0.75;
    }

    setBillingCost(billing.toFixed(2));
  }
  
  
  useEffect(() => {
    calculateMonthlyBilling();
  }, [isYearlyBilling, sliderValue]);

  useEffect(() => {
    calculatePageViews();
  }, [sliderValue]);


  return (
    <StyledPricingContainer>
      <StyledPageViews>{pageViews} Pageviews</StyledPageViews>
      <StyledPricingInput type="range" min="10000" max="1500000" step="10000" value={sliderValue} onChange={handleChange}/>
      <StyledMonthlyPrice><span>${billingCost}</span> / Month</StyledMonthlyPrice>

      <StyledToggleContainer>
        <p>Monthly Billing</p>
        <Toggle>
          <input type="checkbox" checked={isYearlyBilling} onChange={handleCheckBoxChange}/>
          <span></span>
        </Toggle>
        <p>Yearly Billing<span>-25%</span></p>
      </StyledToggleContainer>

      <StyledHr />

      <StyledBottomContainer>

        <StyledUnorderedList>
          <StyledListItem>Unlimited Websites</StyledListItem>
          <StyledListItem>100% data ownership</StyledListItem>
          <StyledListItem>Email Reports</StyledListItem>
        </StyledUnorderedList>

        <Button>Start my trial</Button>

      </StyledBottomContainer>
    
    </StyledPricingContainer>
  );
}