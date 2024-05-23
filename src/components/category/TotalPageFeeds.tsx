import styled from 'styled-components'
import { useState } from 'react'
import { TotalPageFeedsProps } from '@/components/category/types'
import TotalPageFeed from '@/components/category/TotalPageFeed'
import NoFlip from '@/components/main/NoFlip'

// 전체 페이지의 피드리스트
const TotalPageFeeds = (props: TotalPageFeedsProps) => {
  const feedList = props.feedList
  const selectedCategoryId = props.selectedCategoryId
  const selectedCategoryImage = props.selectedCategoryImage
  const selectedCategoryGroupName = props.selectedCategoryGroupName
  const selectedCategoryAnswerIds = props.selectedCategoryAnswerIds

  //현재 실행하고 있는 트랙 저장
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  //현재 실행중인지 여부 확인
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <Container>
      {feedList.length > 0 ? (
        feedList.map((feed) => {
          return (
            <div key={feed.answerId}>
              <TotalPageFeed
                selectedFeed={feed}
                selectedCategoryId={selectedCategoryId}
                selectedCategoryImage={selectedCategoryImage}
                selectedCategoryGroupName={selectedCategoryGroupName}
                selectedCategoryAnswerIds={selectedCategoryAnswerIds}
                currentAudio={currentAudio}
                setCurrentAudio={setCurrentAudio}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                popLottie={props.popLottie}
                setPopLottie={props.setPopLottie}
              />
            </div>
          )
        })
      ) : (
        <NoFlip />
      )}
    </Container>
  )
}

export default TotalPageFeeds

const Container = styled.div`
  width: 100%;
`
