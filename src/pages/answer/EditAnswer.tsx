import styled from 'styled-components'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useLocation, useNavigate } from 'react-router-dom'
import Question from '@/components/answer/Question'
import { UnFixedButton } from '@/components/common/Button'
import Music from '@/components/answer/Music'
import Link from '@/components/answer/Link'
import DelayModal from '@/components/common/DelayModal'
import Modal from '@/components/common/Modal'
import AnswerHeader from '@/components/common/AnswerHeader'
import { colors } from '@/styles/colors'
import { modifyFeedApi } from '@/apis/AnswerApi'
import { userInfoState } from '@/context/Atoms'
import heic2any from 'heic2any'

// 질문에 대한 답변 페이지
const EditAnswer = () => {
  const navigate = useNavigate()
  // 넘겨 받은 피드정보 저장
  const location = useLocation()
  const question = location.state?.question
  const selectedFeed = location.state?.selectedFeed

  // 리코일 로그인한 유저정보
  const userInfo = useRecoilValue(userInfoState)

  // 이미지 파일 선택 핸들러
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState<string>(selectedFeed.imageUrl)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files && e.target.files[0]
    if (file) {
      if (file?.name.split('.')[1].toLowerCase() === 'heic') {
        let blob = file
        heic2any({ blob: blob, toType: 'image/jpeg' }).then((resultBlob) => {
          const convertedBlob = Array.isArray(resultBlob) ? resultBlob[0] : resultBlob
          file = new File([convertedBlob], file?.name.split('.')[0] + '.jpg', {
            type: 'image/jpeg',
            lastModified: new Date().getTime(),
          })
          console.log(file)
          setImageUrl(URL.createObjectURL(file))
          setImageFile(file)
        })
      } else {
        setImageUrl(URL.createObjectURL(file))
        setImageFile(file)
      }
    }
  }

  // 텍스트 저장
  const [content, setContent] = useState<string>(selectedFeed.content)
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
  }

  // 모달창에서 선택받은 음악 관련 정보, 링크 저장
  const [musicName, setMusicName] = useState<string>(selectedFeed.musicName)
  const [musicAudio, setMusicAudio] = useState<string>(selectedFeed.musicAudioUrl)
  const [musicSinger, setMusicSinger] = useState<string>(selectedFeed.musicSinger)
  const [linkAttachments, setLinkAttachments] = useState<string>(selectedFeed.linkAttachments)

  // 사진 또는 텍스트 작성없이 답변하려할 때
  const [isOpenDelayModal, setIsOpenDelayModal] = useState(false)
  // 작성 중 뒤로가기를 누를 때
  const [isOpenBackWarningModal, setIsOpenBackWarningModal] = useState(false)

  // 답변하기 버튼 누를 시
  const onClickModifyBtn = async () => {
    try {
      await modifyFeedApi(userInfo.accessToken, selectedFeed.answerId, imageFile, {
        questionId: selectedFeed.questionId,
        nickname: selectedFeed.nickname,
        profileOnOff: selectedFeed.profileOnOff,
        content: content,
        linkAttachments: linkAttachments,
        musicName: musicName,
        musicSinger: musicSinger,
        musicAudioUrl: musicAudio,
        imageUrl: imageUrl,
        updateImage: false,
      }).then((res) => {
        navigate(`/${userInfo.nickname}`, {
          state: {
            defaultCategory: 1,
          },
        })
        console.log(res)
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <AnswerHeader func={() => setIsOpenBackWarningModal(true)} text="플립 수정" background={colors.grey7} />
      {/* 질문 */}
      <Question question={question} />
      {/* 답변 이미지 */}
      <PolaroidContainer>
        <label htmlFor="file">
          <ProfileWrapper>
            <ProfileImg src={imageUrl} alt="image" />
            {imageUrl === '' ? <PlusImgText>사진 추가</PlusImgText> : <PlusImgText></PlusImgText>}
          </ProfileWrapper>
        </label>
        <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
        {/* 답변 텍스트 */}
        <AnswerText onChange={onChangeContent} value={content} placeholder="답변을 입력해보세요." />
      </PolaroidContainer>
      {/* 답변 음악 */}
      <Music
        musicName={musicName}
        setMusicName={setMusicName}
        musicAudio={musicAudio}
        setMusicAudio={setMusicAudio}
        musicSinger={musicSinger}
        setMusicSinger={setMusicSinger}
      />

      {/* 답변 링크 */}
      <Link linkAttachments={linkAttachments} setLinkAttachments={setLinkAttachments} />
      <UnFixedButton
        $positive={imageUrl !== '' && content !== '' ? true : false}
        func={() => {
          onClickModifyBtn()
        }}
        func2={() => {
          {
            imageUrl === '' || content === '' ? setIsOpenDelayModal(true) : console.log('비활성화')
          }
        }}
        text="수정하기"
        margin="83px 20px 0px 20px"
      />
      {/* 사진 또는 텍스트 작성없이 답변하러 할 때 */}
      {isOpenDelayModal && imageUrl === '' ? (
        <DelayModal setIsOpenDelayModal={setIsOpenDelayModal} text="사진을 추가해주세요!" />
      ) : isOpenDelayModal && content === '' ? (
        <DelayModal setIsOpenDelayModal={setIsOpenDelayModal} text="텍스트를 입력해주세요!" />
      ) : (
        <></>
      )}
      {/* 답변 작성 중 뒤로가기 시 */}
      {isOpenBackWarningModal && (
        <Modal
          content="지금 나가면 작성된 내용은 사라져요. 나가시겠어요?"
          buttonText1="아니요"
          buttonText2="예"
          func1={() => {
            setIsOpenBackWarningModal(false)
          }}
          func2={() => {
            navigate(`/${userInfo.nickname}`, {
              state: {
                defaultCategory: 1,
              },
            })
          }}
          clickModal={() => {
            setIsOpenBackWarningModal(false)
          }}
        />
      )}
    </Container>
  )
}

export default EditAnswer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0px 0px 30px 0px;
`
const PolaroidContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 315px;
  height: 346px;
  margin: 20px 0px 0px 0px;
  padding: 18px;
  gap: 18px;
  border-radius: 2px;
  background-color: ${colors.white};
  box-shadow: 0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.1);
`
const ProfileWrapper = styled.div`
  position: relative;
  width: 279px;
  height: 250px;
  flex-shrink: 0;
  border-radius: 2.473px;
  background: ${colors.grey6};
  box-shadow:
    0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.04) inset,
    0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.04) inset;
  cursor: pointer;
`
const ProfileImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2.473px;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
`
const PlusImgText = styled.div`
  position: absolute;
  top: 133px;
  left: 132px;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.56px;
  cursor: pointer;
`
// 텍스트
const AnswerText = styled.textarea`
  align-self: stretch;
  height: 42px;
  border: none;
  outline: none;
  resize: none;
  flex-shrink: 0;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  &::placeholder {
    color: ${colors.grey5};
  }
`
