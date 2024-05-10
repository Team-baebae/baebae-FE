import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import { colors } from '../../styles/colors'

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    text-align: center;
    background: rgba(29, 29, 29, 0.8);
    color: ${colors.white};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.32px;
  }
`