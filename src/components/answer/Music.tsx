import React, { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import music from '../../assets/Music.svg'
import styled from 'styled-components'
import { colors } from '../../styles/colors'
import glasses from '../../assets/Glasses.svg'
import musicGray from '../../assets/MusicGray.svg'

interface MusicProps {
  musicTitle: string
  setMusicTitle: any
  musicUrl: string
  setMusicUrl: any
}

const Music = ({}: MusicProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)

  const handleDismissPlusMusicModal = () => {
    if (step === 2) {
      setStep(1) // 단계 2에서는 이전 단계로 돌아갑니다.
    } else {
      setOpen(false)
    }
  }

  const openDetailSheet = () => {
    setStep(2) // 음악 상세 선택 BottomSheet로 전환
  }

  const selectOption = (name: string): void => {
    console.log('Selected Option:', name)
    setStep(1) // 선택 후 기본 BottomSheet로 돌아갑니다.
  }

  return (
    <>
      <PlusBtn onClick={() => setOpen(!open)} margin="20px 0px 0px 0px">
        <BtnIcon src={music} alt="music" />
        <BtnText>음악 추가(선택)</BtnText>
      </PlusBtn>
      {step === 1 ? (
        <BottomSheet open={open} snapPoints={() => [254]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
          <PlusMusicText>음악 추가</PlusMusicText>
          <SearchMusicWrapper>
            <MusicIcon src={musicGray} alt="musicGray" />
            <SearchedMusicText onClick={openDetailSheet}>음악을 검색해주세요.</SearchedMusicText>
          </SearchMusicWrapper>
        </BottomSheet>
      ) : (
        <BottomSheet open={open} snapPoints={() => [748]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
          <PlusMusicText>음악 추가</PlusMusicText>
          <SearchMusicWrapper>
            <GlassesIcon src={glasses} alt="glasses" />
            <SearchMusicInput placeholder="노래, 아티스트, 앨범 검색" />
          </SearchMusicWrapper>

          <div>
            <PlusMusicText onClick={() => selectOption('Option 1')}>옵션 1</PlusMusicText>
            <PlusMusicText onClick={() => selectOption('Option 2')}>옵션 2</PlusMusicText>
            <PlusMusicText onClick={() => selectOption('Option 3')}>옵션 3</PlusMusicText>
          </div>
        </BottomSheet>
      )}
    </>
  )
}

export default Music

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

const PlusMusicText = styled.div`
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

const SearchMusicWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 20px 0px 20px;
`

const MusicIcon = styled.img`
  position: absolute;
  left: 14px;
  width: 15px;
  height: 15px;
`

const GlassesIcon = styled.img`
  position: absolute;
  left: 12px;
  width: 24px;
  height: 24px;
`

const SearchedMusicText = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;
  overflow: hidden;
  color: ${colors.grey5};
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

const SearchMusicInput = styled.input`
  display: flex;
  padding: 12px 12px 12px 45px;
  height: 48px;
  align-items: flex-start;
  gap: 9px;
  align-self: stretch;
  border-radius: 12px;
  background: ${colors.grey7};
  flex: 1 0 0;
  color: ${colors.grey5};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  border: none;
  cursor: pointer;
  outline: none;
`
