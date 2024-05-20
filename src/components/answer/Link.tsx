import React, { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { UnFixedButton } from '@/components/common/Button'
import { LinkProps } from '@/components/answer/types'
import LinkImg from '@/assets/answer/Link.svg'
import LinkGray from '@/assets/answer/LinkGray.svg'

// 링크 입력 컴포넌트
const Link = ({ linkAttachments, setLinkAttachments }: LinkProps) => {
  // open은 모달 열고 닫는 상태
  const [open, setOpen] = useState<boolean>(false)

  // 모달 이전상태로 변화
  const handleDismissPlusMusicModal = () => {
    setOpen(false)
  }
  //   검색어 입력부분
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkAttachments(e.target.value)
  }

  // 검색어 입력하고 엔터 누를 시 실행
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setOpen(false)
    }
  }

  return (
    <>
      {/* 버튼 전체 */}
      {linkAttachments === '' ? (
        <PlusBtn onClick={() => setOpen(!open)} margin="12px 0px 0px 0px">
          <BtnIcon src={LinkImg} alt="link" />
          <BtnText>링크 추가(선택)</BtnText>
        </PlusBtn>
      ) : (
        <ExistPlusBtn onClick={() => setOpen(!open)} margin="12px 0px 0px 0px">
          <BtnIcon src={LinkImg} alt="link" />
          <BtnText>{linkAttachments}</BtnText>
        </ExistPlusBtn>
      )}

      <BottomSheet open={open} snapPoints={() => [254]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
        <PlusLinkText>링크 추가</PlusLinkText>
        <SearchLinkWrapper>
          <LinkIcon src={LinkGray} alt="linkGray" />
          <SearchLinkInput
            value={linkAttachments}
            onChange={handleInputChange}
            placeholder="링크를 입력해주세요."
            onKeyDown={handleKeyPress}
          />
        </SearchLinkWrapper>
        <UnFixedButton
          $positive={linkAttachments === '' ? false : true}
          func={() => {
            handleDismissPlusMusicModal()
          }}
          func2={() => {
            console.log('링크 추가하기')
          }}
          text="추가하기"
          margin="20px 20px 0px 20px"
        />
      </BottomSheet>
    </>
  )
}

export default Link

// 전체 버튼
const PlusBtn = styled.button<{ margin: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 315px;
  gap: 10px;
  border-radius: 8px;
  background-color: ${colors.grey1};
  margin: ${(props) => props.margin};
  padding: 10px 12px;
  outline: none;
  cursor: pointer;
`

const ExistPlusBtn = styled(PlusBtn)`
  justify-content: flex-start;
`

const BtnIcon = styled.img`
  width: 15px;
  height: 15px;
  flex-shrink: 0;
`

const BtnText = styled.div`
  color: ${colors.white};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.28px;
`
// 모달창 내부
const PlusLinkText = styled.div`
  align-self: stretch;
  margin: 20px 0px 0px 20px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
`

const SearchLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 20px 20px 0px 20px;
`

const LinkIcon = styled.img`
  position: absolute;
  left: 14.5px;
  width: 15px;
  height: 15px;
`

// 2단계 모달

const SearchLinkInput = styled.input`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  padding: 12px 12px 12px 45px;
  height: 48px;
  gap: 9px;
  border-radius: 12px;
  background-color: ${colors.grey7};
  flex: 1 0 0;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  border: none;
  outline: none;
  cursor: pointer;

  &::placeholder {
    color: ${colors.grey5};
  }
`
