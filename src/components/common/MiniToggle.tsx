import { useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../styles/colors'

const MiniToggle = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <ToggleSwitch>
      <CheckBox type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
      <ToggleSlider />
    </ToggleSwitch>
  )
}

export default MiniToggle

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 19px;
`

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.grey5};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 100px;

  &:before {
    position: absolute;
    content: '';
    height: 13px;
    width: 13px;
    left: 3px;
    bottom: 3px;
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
    -webkit-transform: translateX(17px);
    -ms-transform: translateX(17px);
    transform: translateX(17px);
  }
`
