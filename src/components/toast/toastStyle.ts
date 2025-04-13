import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import { colors } from '@/styles/colors'

// 토스트 컴포넌트
export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 12px;
    margin: 0px 20px 30px 20px;
    text-align: center;
    background: rgba(29, 29, 29, 0.8);
    color: ${colors.white};
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.32px;
  }
`
