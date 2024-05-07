import React, { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import styled from 'styled-components'
import { colors } from '../../styles/colors'
import { UnFixedButton } from '../common/Button'
import link from '../../assets/Link.svg'
import linkGray from '../../assets/LinkGray.svg'

// 전달받은 Props
interface LinkProps {
  linkAttachments: string
  setLinkAttachments: any
}

const Link = ({ linkAttachments, setLinkAttachments }: LinkProps) => {
  // open은 모달 열고 닫는 상태
  const [open, setOpen] = useState<boolean>(false)
  // step은 1단계 2단계 모달 구분짓기 위한 상태
  const [step, setStep] = useState<number>(1)

  // 모달 이전상태로 변화
  const handleDismissPlusMusicModal = () => {
    if (step === 2) {
      setStep(1) // 단계 2에서는 이전 단계로 돌아갑니다.
    } else {
      setOpen(false)
    }
  }
  // 2단계 모달 열기
  const openDetailSheet = () => {
    setStep(2) // 음악 상세 선택 BottomSheet로 전환
  }

  //   검색어 입력부분
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkAttachments(e.target.value)
  }

  // 검색어 입력하고 엔터 누를 시 실행
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setStep(1)
    }
  }

  return (
    <>
      {/* 버튼 전체 */}
      {linkAttachments === '' ? (
        <PlusBtn onClick={() => setOpen(!open)} margin="12px 0px 0px 0px">
          <BtnIcon src={link} alt="link" />
          <BtnText>링크 추가(선택)</BtnText>
        </PlusBtn>
      ) : (
        <ExistPlusBtn onClick={() => setOpen(!open)} margin="12px 0px 0px 0px">
          <BtnIcon src={link} alt="link" />
          <BtnText>{linkAttachments}</BtnText>
        </ExistPlusBtn>
      )}

      {step === 1 ? (
        // 1단계 모달
        <BottomSheet open={open} snapPoints={() => [254]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
          <PlusLinkText>링크 추가</PlusLinkText>
          <SearchLinkWrapper>
            <LinkIcon src={linkGray} alt="linkGray" />
            {linkAttachments === '' ? (
              <SearchedLinkText color={colors.grey5} onClick={openDetailSheet}>
                링크를 입력해주세요.
              </SearchedLinkText>
            ) : (
              <SearchedLinkText color={colors.grey1} onClick={openDetailSheet}>
                {linkAttachments}
              </SearchedLinkText>
            )}
          </SearchLinkWrapper>
          {/* 버튼 누를 시 해당 음악으로 결정 */}
          <UnFixedButton
            positive={linkAttachments === '' ? false : true}
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
      ) : (
        //2단계 모달
        <BottomSheet open={open} snapPoints={() => [516]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
          <PlusLinkText>링크 추가</PlusLinkText>
          <SearchLinkWrapper>
            <LinkIcon src={linkGray} alt="linkGray" />
            <SearchLinkInput
              value={linkAttachments}
              onChange={handleInputChange}
              placeholder="링크를 입력해주세요."
              onKeyDown={handleKeyPress}
            />
          </SearchLinkWrapper>
        </BottomSheet>
      )}
    </>
  )
}

export default Link

// 전체 버튼
const PlusBtn = styled.button<{ margin: string }>`
  display: flex;
  padding: 10px 12px;
  width: 315px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: ${colors.grey1};
  margin: ${(props) => props.margin};
  cursor: pointer;
  outline: none;
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
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.28px;
`
// 모달창 내부
const PlusLinkText = styled.div`
  align-self: stretch;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
  margin: 20px 0px 0px 20px;
`

const SearchLinkWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 20px 0px 20px;
`

const LinkIcon = styled.img`
  position: absolute;
  left: 14.5px;
  width: 15px;
  height: 15px;
`

// 2단계 모달

const SearchedLinkText = styled.div<{ color: string }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;
  overflow: hidden;
  color: ${(props) => props.color};
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  display: flex;
  padding: 12px 12px 12px 41px;
  align-items: flex-start;
  gap: 9px;
  align-self: stretch;
  border-radius: 12px;
  background: ${colors.grey7};
`

const SearchLinkInput = styled.input`
  display: flex;
  padding: 12px 12px 12px 45px;
  height: 48px;
  align-items: flex-start;
  gap: 9px;
  align-self: stretch;
  border-radius: 12px;
  background: ${colors.grey7};
  flex: 1 0 0;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  border: none;
  cursor: pointer;
  outline: none;
  &::placeholder {
    color: ${colors.grey5};
  }
`

//2단계 모달 각 트랙
