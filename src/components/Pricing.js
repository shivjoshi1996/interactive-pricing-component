import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledPricingContainer = styled.div`
  height: 60vh;
  width: 90vw;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 20px 30px -5px rgba(127, 137, 185, 0.152073);
`

const StyledPricingInput = styled.input`
  -webkit-appearance: none;
  width: 80%;
  border-radius: 50px;
  height: 8px;
  background: #ECF0FB;
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
  padding-top: 34px;
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

const StyledToggleContainer = styled.div`
  display: flex;
  justify-content: center;
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
        <label>
          <input type="checkbox" checked={isYearlyBilling} onChange={handleCheckBoxChange}/>
          <span></span>
        </label>
        <p>Yearly Billing</p>
      </StyledToggleContainer>

      <ul>
        <li>Unlimited Websites</li>
        <li>100% data ownership</li>
        <li>Email Reports</li>
      </ul>

      <button>Start my trial</button>
    
    </StyledPricingContainer>
  );
}