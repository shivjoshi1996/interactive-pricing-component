import React from 'react';
import styled from 'styled-components';

const StyledToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    color: #848ead;
    font-size: 12px;
    margin-right: 10px;
    margin-left: 10px;

    > span {
      color: #ff8d68;
      font-size: 10px;
      background-color: #feede8;
      border-radius: 50px;
      padding: 2px 5px;
      margin-left: 5px;

      > span {
        display: none;
        @media (min-width: 768px) {
          display: inline-block;
        }
      }
    }
  }
`;

const StyledToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 43px;
  height: 22px;

  > input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: #10d8c4;
    }

    &:focus + span {
      box-shadow: 0 0 1px #10d8c4;
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
    background-color: #cfd8ef;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;

    &::before {
      position: absolute;
      content: '';
      height: 14px;
      width: 14px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`;

export default function Toggle({ checked, onChange }) {
  return (
    <>
      <StyledToggleContainer>
        <p>Monthly Billing</p>
        <StyledToggle>
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            label="checkbox"
          />
          <span />
        </StyledToggle>
        <p>
          Yearly Billing
          <span>
            -25% <span> discount</span>
          </span>
        </p>
      </StyledToggleContainer>
    </>
  );
}
