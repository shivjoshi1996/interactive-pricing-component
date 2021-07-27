import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Toggle from './Toggle';

const StyledPricingContainer = styled.div`
  min-height: 400px;
  width: 90vw;
  max-width: 540px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 20px 30px -5px rgba(127, 137, 185, 0.152073);
  padding-top: 34px;
  padding-bottom: 32px;

  @media (min-width: 768px) {
    min-height: 100%;
    padding-bottom: 32px;
  }
`;

const StyledPricingInput = styled.input`
  -webkit-appearance: none;
  width: 80%;
  border-radius: 50px;
  height: 8px;
  background: #f1f5fe;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  margin-top: 40px;
  margin-bottom: 40px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 40px;
    height: 40px;
    border-radius: 100px;
    background-color: #10d8c4;
    cursor: pointer;
    background-image: url('/icon-slider.svg');
    background-repeat: no-repeat;
    background-size: 25px 15px;
    background-position: center;
    box-shadow: 0px 15px 30px rgba(0, 255, 231, 0.6);

    &:hover {
      background-color: #a4f3eb;
    }
  }
`;

const StyledPageViews = styled.p`
  font-size: 10px;
  color: #848ead;
  text-transform: uppercase;
  font-weight: 800;
  line-height: 16px;
  letter-spacing: 2px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const StyledMonthlyPrice = styled.p`
  font-size: 14px;
  color: #848ead;
  padding-bottom: 34px;

  span {
    color: #293356;
    font-size: 32px;
    font-weight: 800;
  }
`;

const StyledHr = styled.hr`
  margin-top: 38px;
  height: 1px;
  background-color: #ecf0fb;
  border: none;
`;

const StyledBottomContainer = styled.div`
  margin-top: 24px;

  @media (min-width: 768px) {
    display: flex;
    width: 80%;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    margin-top: 32px;
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
    margin: unset;
    text-align: left;
  }
`;

const StyledListItem = styled.li`
  color: #848ead;
  font-size: 12px;
  margin-bottom: 10px;
`;

export default function Pricing() {
  const [sliderValue, setSliderValue] = useState(500000);
  const [pageViews, setPageViews] = useState('500K');
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);
  const [billingCost, setBillingCost] = useState(24);

  function handleChange(e) {
    const { value } = e.currentTarget;
    setSliderValue(value);
  }

  function handleCheckBoxChange(e) {
    setIsYearlyBilling(e.currentTarget.checked);
  }

  function calculatePageViews() {
    if (sliderValue < 1000000) {
      const thousand = `${sliderValue / 1000}K`;
      setPageViews(thousand);
    } else if (sliderValue > 1000000) {
      const million = `${sliderValue / 1000000}M`;
      setPageViews(million);
    }
  }

  function calculateMonthlyBilling() {
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
      billing *= 0.75;
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
      <StyledPricingInput
        type="range"
        min="10000"
        max="1000000"
        step="10000"
        value={sliderValue}
        onChange={handleChange}
      />
      <StyledMonthlyPrice>
        <span>${billingCost}</span> / Month
      </StyledMonthlyPrice>

      <Toggle checked={isYearlyBilling} onChange={handleCheckBoxChange} />

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
