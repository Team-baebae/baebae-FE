import { useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../styles/colors'

// 토글
const Toggle = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <ToggleSwitch>
      <CheckBox type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
      <ToggleSlider />
    </ToggleSwitch>
  )
}

export default Toggle

const ToggleSwitch = styled.label`
  display: inline-block;
  position: relative;
  width: 52px;
  height: 26px;
`

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.grey5};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 100px;
  cursor: pointer;
  &:before {
    position: absolute;
    content: '';
    height: 21.677px;
    width: 21.677px;
    left: 2.17px;
    bottom: 2.17px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`

const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: ${colors.primary};
  }

  &:checked + ${ToggleSlider}:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`
