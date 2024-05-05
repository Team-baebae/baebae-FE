import React, { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import styled from 'styled-components'
import { colors } from '../../styles/colors'
import { UnFixedButton } from '../common/Button'
import { getSpotifyAccessTokenApi, searchTermSpotifyApi } from '../../apis/SpotifyApi'
import music from '../../assets/Music.svg'
import glasses from '../../assets/Glasses.svg'
import musicGray from '../../assets/MusicGray.svg'
import pause from '../../assets/Pause.svg'
import play from '../../assets/Play.svg'

// 전달받은 Props
interface MusicProps {
  musicTitle: string
  setMusicTitle: any
  musicUrl: string
  setMusicUrl: any
  musicSinger: string
  setMusicSinger: any
}

// 스포티파이를 통해 받은 트랙
interface Track {
  id: string
  name: string
  preview_url: string
  album: {
    artists: { name: string }[]
  }
}

const Music = ({ musicTitle, setMusicTitle, musicUrl, setMusicUrl, musicSinger, setMusicSinger }: MusicProps) => {
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
  const selectTrack = (result: Track) => {
    setMusicTitle(result.name)
    setMusicUrl(result.preview_url)
    setMusicSinger(result.album.artists[0].name)
    setStep(1) // 선택 후 기본 BottomSheet로 돌아갑니다.
  }

  //검색어 저장
  const [searchTerm, setSearchTerm] = useState<string>('')
  //받은 response중 트랙리스트를 저장함
  const [searchResults, setSearchResults] = useState<Track[]>([])
  //스포티파이 api 어세스토큰 저장
  const [spotifyAccessToken, setSpotifyAccessToken] = useState<string>('')
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

  //   스포티파이 accessToken 받기 함수
  const getSpotifyAccessToken = async () => {
    try {
      await getSpotifyAccessTokenApi().then((res) => {
        console.log(res)
        setSpotifyAccessToken(res.data.access_token)
      })
    } catch (err) {
      console.log(err)
    }
  }

  //   스포티파이 api를 통해 검색어에 해당하는 트랙, 앨범, 가수 리스트 받기
  const handleSearch = async (searchTerm: any) => {
    if (!spotifyAccessToken) {
      await getSpotifyAccessToken()
    }
    try {
      await searchTermSpotifyApi(searchTerm, spotifyAccessToken).then((res) => {
        // 실제론 트랙, 앨범, 가수 다 받음
        setSearchResults(res.data.tracks.items)
      })
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
      {musicTitle === '' ? (
        <PlusBtn onClick={() => setOpen(!open)} margin="20px 0px 0px 0px">
          <BtnIcon src={music} alt="music" />
          <BtnText>음악 추가(선택)</BtnText>
        </PlusBtn>
      ) : (
        <ExistPlusBtn onClick={() => setOpen(!open)} margin="20px 0px 0px 12px">
          <BtnIcon src={music} alt="music" />
          <BtnText>
            {musicTitle} - {musicSinger}
          </BtnText>
        </ExistPlusBtn>
      )}

      {step === 1 ? (
        // 1단계 모달
        <BottomSheet open={open} snapPoints={() => [254]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
          <PlusMusicText>음악 추가</PlusMusicText>
          <SearchMusicWrapper>
            <MusicIcon src={musicGray} alt="musicGray" />
            {musicTitle === '' ? (
              <SearchedMusicText color={colors.grey5} onClick={openDetailSheet}>
                음악을 검색해주세요
              </SearchedMusicText>
            ) : (
              <SearchedMusicText color={colors.grey1} onClick={openDetailSheet}>
                {musicTitle} - {musicSinger}
              </SearchedMusicText>
            )}

            {/* 음악 선택 이후엔 미리듣기 가능하도록 아래와 같이 구현 */}
            {musicUrl !== '' && (
              <MusicPlayIconWrapper onClick={() => handlePreview(musicUrl)}>
                {currentAudio && currentAudio.src === musicUrl && isPlaying ? (
                  <MusicPlayIcon onClick={() => handlePreview} src={pause} alt="pause" />
                ) : (
                  <MusicPlayIcon onClick={() => handlePreview} src={play} alt="pause" />
                )}
              </MusicPlayIconWrapper>
            )}
          </SearchMusicWrapper>
          {/* 버튼 누를 시 해당 음악으로 결정 */}
          <UnFixedButton
            positive={musicTitle === '' ? false : true}
            func={() => {
              handleDismissPlusMusicModal()
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
            <GlassesIcon src={glasses} alt="glasses" />
            <SearchMusicInput value={searchTerm} onChange={handleInputChange} placeholder="노래, 아티스트, 앨범 검색" />
          </SearchMusicWrapper>

          <TotalTrackListWrapper>
            {/* 받은 트랙리스트리스트 */}
            {searchResults.map((result: Track) => {
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

//2단계 모달 각 트랙

const TotalTrackListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0px 0px 0px;
`

const EachTrackWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  align-items: center;
  gap: 10px;
  background: ${colors.white};
`
const EachTrackText = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.56px;
`
