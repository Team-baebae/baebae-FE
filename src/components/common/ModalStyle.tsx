import { motion } from 'framer-motion'
import styled from 'styled-components'
import { colors } from '../../styles/colors'

// 모달 창 뒷배경
export const SearchModalBox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
`

// 모달 스타일
export const SearchModalContent = styled(motion.div)<{
  width: string
  height: string
}>`
  padding: 24px 20px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  flex-shrink: 0;
  border-radius: 12px;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  z-index: 5;
`
