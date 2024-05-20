import styled from 'styled-components'
import { SelectedFeedProps } from '@/components/feed/types'
import { colors } from '@/styles/colors'
import { extractImageApi } from '@/apis/AnswerApi'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/context/Atoms'
import { useEffect, useState } from 'react'

// 피드의 답변 컴포넌트
const BackFeedContents = (props: SelectedFeedProps) => {
  const selectedFeed = props.selectedFeed
  const userInfo = useRecoilValue(userInfoState)

  const [newImageUrl, setNewImageUrl] = useState<string>('')
  const imageUrlToBytes = async () => {
    try {
      await extractImageApi(userInfo.accessToken, selectedFeed.imageUrl).then((res) => {
        const binaryImageData = atob(res.data.image)
        const length = binaryImageData.length
        const bytes = new Uint8Array(length)
        for (let i = 0; i < length; i++) {
          bytes[i] = binaryImageData.charCodeAt(i)
        }

        const blob = new Blob([bytes], { type: 'image/jpeg' })
        const url = URL.createObjectURL(blob)
        setNewImageUrl(url)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    imageUrlToBytes()
  }, [])
  return (
    <FlipWrapper>
      <Photo src={newImageUrl} />
      <ContentWrapper>{selectedFeed.content}</ContentWrapper>
    </FlipWrapper>
  )
}

export default BackFeedContents

const Photo = styled.img`
  width: 279px;
  height: 250px;
`
const FlipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 18px;
  gap: 18px;
  background: ${colors.white};
  box-shadow: 0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.32);
`
const ContentWrapper = styled.div`
  height: 42px;
  overflow: hidden;
`
