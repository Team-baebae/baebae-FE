import React, { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { UnFixedButton } from '@/components/common/Button'
import { MusicProps, TrackProps } from '@/components/answer/types'
import { searchTermSpotifyApi } from '@/apis/SpotifyApi'
import MusicImg from '@/assets/Music.svg'
import Glasses from '@/assets/Glasses.svg'
import MusicGray from '@/assets/MusicGray.svg'
import Pause from '@/assets/Pause.svg'
import Play from '@/assets/Play.svg'

// 음악 선택 컴포넌트
const Music = ({ musicName, setMusicName, musicAudio, setMusicAudio, musicSinger, setMusicSinger }: MusicProps) => {
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
      currentAudio?.pause()
      setCurrentAudio(null)
      setIsPlaying(false)
      setSearchTerm('')
      setSearchResults([])
    }
  }
  // 2단계 모달 열기
  const openDetailSheet = () => {
    setStep(2) // 음악 상세 선택 BottomSheet로 전환
  }

  //트랙 선택 시
  const selectTrack = (result: TrackProps) => {
    setMusicName(result.name)
    setMusicAudio(result.preview_url)
    setMusicSinger(result.album.artists[0].name)
    setStep(1) // 선택 후 기본 BottomSheet로 돌아갑니다.
  }

  //검색어 저장
  const [searchTerm, setSearchTerm] = useState<string>('')
  //받은 response중 트랙리스트를 저장함
  const [searchResults, setSearchResults] = useState<TrackProps[]>([])
  //현재 실행하고 있는 트랙 저장
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  //현재 실행중인지 여부 확인
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  //   검색어 입력부분
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
    handleSearch(newSearchTerm)
  }

  const handleSearch = async (searchTerm: string) => {
    try {
      const res = await searchTermSpotifyApi(searchTerm)
      setSearchResults(res.data.tracks.items)
    } catch (err) {
      console.error('API 호출 오류:', err)
    }
  }

  //   트랙 미리듣기
  const handlePreview = (previewUrl: string) => {
    if (currentAudio && currentAudio.src === previewUrl) {
      // 이미 실행 중인 노래의 버튼을 다시 누르면 일시 중지/재생 토글
      if (isPlaying) {
        currentAudio.pause()
      } else {
        currentAudio.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      // 다른 노래의 버튼을 누르면 기존 노래 중지 후 새로운 노래 재생
      if (currentAudio) {
        currentAudio.pause()
      }
      const audio = new Audio(previewUrl)
      setCurrentAudio(audio)
      audio.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      {/* 버튼 전체 */}
      {musicName === '' ? (
        <PlusBtn onClick={() => setOpen(!open)} margin="20px 0px 0px 0px">
          <BtnIcon src={MusicImg} alt="music" />
          <BtnText>음악 추가(선택)</BtnText>
        </PlusBtn>
      ) : (
        <ExistPlusBtn onClick={() => setOpen(!open)} margin="20px 0px 0px 0px">
          <BtnIcon src={MusicImg} alt="music" />
          <BtnText>
            {musicName} - {musicSinger}
          </BtnText>
        </ExistPlusBtn>
      )}

      {step === 1 ? (
        // 1단계 모달
        <BottomSheet
          style={{ zIndex: 100 }}
          open={open}
          snapPoints={() => [254]}
          onDismiss={handleDismissPlusMusicModal}
          blocking={true}
        >
          <PlusMusicText>음악 추가</PlusMusicText>
          <SearchMusicWrapper>
            <MusicIcon src={MusicGray} alt="musicGray" />
            {musicName === '' ? (
              <SearchedMusicText color={colors.grey5} onClick={openDetailSheet}>
                음악을 검색해주세요
              </SearchedMusicText>
            ) : (
              <SearchedMusicText color={colors.grey1} onClick={openDetailSheet}>
                {musicName} - {musicSinger}
              </SearchedMusicText>
            )}

            {/* 음악 선택 이후엔 미리듣기 가능하도록 아래와 같이 구현 */}
            {musicAudio !== '' && (
              <MusicPlayIconWrapper onClick={() => handlePreview(musicAudio)}>
                {currentAudio && currentAudio.src === musicAudio && isPlaying ? (
                  <MusicPlayIcon onClick={() => handlePreview} src={Pause} alt="pause" />
                ) : (
                  <MusicPlayIcon onClick={() => handlePreview} src={Play} alt="play" />
                )}
              </MusicPlayIconWrapper>
            )}
          </SearchMusicWrapper>
          {/* 버튼 누를 시 해당 음악으로 결정 */}
          <UnFixedButton
            $positive={musicName === '' ? false : true}
            func={() => {
              handleDismissPlusMusicModal()
            }}
            func2={() => {
              console.log('음악을 추가하세요!')
            }}
            text="추가하기"
            margin="20px 20px 0px 20px"
          />
        </BottomSheet>
      ) : (
        //2단계 모달
        <BottomSheet open={open} snapPoints={() => [748]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
          <PlusMusicText>음악 추가</PlusMusicText>
          <SearchMusicWrapper>
            <GlassesIcon src={Glasses} alt="glasses" />
            <SearchMusicInput value={searchTerm} onChange={handleInputChange} placeholder="노래, 아티스트, 앨범 검색" />
          </SearchMusicWrapper>

          <TotalTrackListWrapper>
            {/* 받은 트랙리스트리스트 */}
            {searchResults.map((result: TrackProps) => {
              // 검색어와 같은 부분 확인
              const resultNameLower = result.name.toLowerCase()
              const searchTermLower = searchTerm.toLowerCase()

              return (
                <div key={result.id} onClick={() => selectTrack(result)}>
                  <EachTrackWrapper>
                    {/* 트랙 제목 */}
                    {resultNameLower.startsWith(searchTermLower) ? (
                      <>
                        <EachTrackText color={colors.grey1}>
                          {result.name.substring(0, searchTerm.length)}
                          <EachTrackText color={colors.grey3}>{result.name.substring(searchTerm.length)}</EachTrackText>
                        </EachTrackText>
                      </>
                    ) : (
                      <EachTrackText color={colors.grey3}>{result.name}</EachTrackText>
                    )}
                    <EachTrackText color={colors.grey3}>-</EachTrackText>
                    {/* 트랙 가수 이름 */}
                    <EachTrackText color={colors.grey3}>{result.album.artists[0].name}</EachTrackText>
                  </EachTrackWrapper>
                </div>
              )
            })}
          </TotalTrackListWrapper>
        </BottomSheet>
      )}
    </>
  )
}

export default Music

// 전체 버튼
const PlusBtn = styled.button<{ margin: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  width: 315px;
  gap: 10px;
  border-radius: 8px;
  background-color: ${colors.grey1};
  margin: ${(props) => props.margin};
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
const PlusMusicText = styled.div`
  align-self: stretch;
  margin: 20px 0px 0px 20px;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
`

const SearchMusicWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
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

const MusicPlayIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const MusicPlayIcon = styled.img`
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
`

// 2단계 모달

const SearchedMusicText = styled.div<{ color: string }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;
  align-items: flex-start;
  display: flex;
  align-self: stretch;
  padding: 12px 12px 12px 41px;
  gap: 9px;
  border-radius: 12px;
  background-color: ${colors.grey7};
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  cursor: pointer;
`

const SearchMusicInput = styled.input`
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

//2단계 모달 각 트랙

const TotalTrackListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0px 0px 0px;
`

const EachTrackWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  gap: 10px;
  background-color: ${colors.white};
  cursor: pointer;
  &:hover {
    background-color: ${colors.grey7};
  }
`
const EachTrackText = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.56px;
`
