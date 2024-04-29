import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

interface Track {
  id: string
  name: string
  preview_url: string
  album: {
    images: {
      url: string
    }[]
  }
}

const Spotify = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

  //검색어 저장
  const [searchTerm, setSearchTerm] = useState<string>('')
  //받은 response중 트랙리스트를 저장함
  const [searchResults, setSearchResults] = useState<Track[]>([])
  //스포티파이 api 어세스토큰 저장
  const [accessToken, setAccessToken] = useState<string>('')
  //현재 실행하고 있는 트랙 저장
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  //현재 실행중인지 여부 확인
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  //   검색어 입력부분
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  //   스포티파이 accessToken 받기 함수
  const getAccessToken = async () => {
    try {
      await axios
        .post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
          },
        })
        .then((res) => {
          console.log(res)
          setAccessToken(res.data.access_token)
        })
    } catch (err) {
      console.log(err)
    }
  }

  //   스포티파이 api를 통해 검색어에 해당하는 트랙, 앨범, 가수 리스트 받기
  const handleSearch = async () => {
    if (!accessToken) {
      await getAccessToken()
    }
    try {
      await axios
        .get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track,artist,album`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res)
          //   일단 화면에 보여주기 위해 트랙들만 저장
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
    <SpotifyOuterComponent>
      <SpotifyHeader>스포티파이 테스트</SpotifyHeader>
      <SpotifySearchContainer>
        <SpotifySearch type="text" value={searchTerm} onChange={handleInputChange} placeholder="검색어를 입력하세요" />
        <SpotifySearchBtn onClick={handleSearch}>검색</SpotifySearchBtn>
      </SpotifySearchContainer>

      <div>
        {searchResults.map((result) => (
          <div key={result.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* 트랙 제목 */}
              <div>{result.name}</div>
              {/* 트랙 오디오 */}
              {result.preview_url && (
                <SpotifyPreviewBtn onClick={() => handlePreview(result.preview_url)}>
                  {currentAudio && currentAudio.src === result.preview_url && isPlaying ? '일시 중지' : '30초 미리듣기'}
                </SpotifyPreviewBtn>
              )}
            </div>

            {/* 트랙 이미지 */}
            <SpotifyTrackImgContainer>
              {result.album.images.length > 0 && <SpotifyTrackImg src={result.album.images[0].url} alt="Track cover" />}
            </SpotifyTrackImgContainer>
          </div>
        ))}
      </div>
    </SpotifyOuterComponent>
  )
}

export default Spotify

const SpotifyOuterComponent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`

const SpotifyHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
`

const SpotifySearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0px 0px 0px;
`
const SpotifySearch = styled.input`
  width: 330px;
  height: 30px;
  outline: none;
`

const SpotifySearchBtn = styled.button`
  background-color: #f1f1f1;
  color: #000;
  width: 80px;
  height: 30px;
  margin: 10px 5px;
  cursor: pointer;
`

const SpotifyPreviewBtn = styled.button`
  background-color: #f1f1f1;
  color: #000;
  height: 30px;
  margin: 10px 5px;
  cursor: pointer;
`
const SpotifyTrackImgContainer = styled.div`
  width: 160px;
  height: 160px;
  border: 1px solid black;
`

const SpotifyTrackImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
