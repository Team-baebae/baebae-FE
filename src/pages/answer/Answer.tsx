import styled from 'styled-components'
import { useState } from 'react'
import { colors } from '../../styles/colors'
import Question from '../../components/answer/Question'
import { UnFixedButton } from '../../components/common/Button'
import Music from '../../components/answer/Music'
import Link from '../../components/answer/Link'
import DelayModal from '../../components/common/DelayModal'
import Modal from '../../components/common/Modal'
import PersonalHeader from '../../components/answer/PersonalHeader'
import { useNavigate } from 'react-router-dom'

const Answer = () => {
  const navigate = useNavigate()

  // 입력 받은 값들 저장
  const [imageUrl, setImageUrl] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [musicName, setMusicName] = useState<string>('')
  const [musicAudio, setMusicAudio] = useState<string>('')
  const [musicSinger, setMusicSinger] = useState<string>('')
  const [linkAttachments, setLinkAttachments] = useState<string>('')

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    // 이미지 파일을 보낼 시엔 formData로 file을 추가해야함(추후 추가)
    if (file) {
      setImageUrl(URL.createObjectURL(file)) // 미리보기를 위해 파일 URL 생성
    }
  }

  // 텍스트 저장
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
  }

  const [isOpenDelayModal, setIsOpenDelayModal] = useState(false)
  const [isOpenBackWarningModal, setIsOpenBackWarningModal] = useState(false)

  return (
    <Container>
      <PersonalHeader func={() => setIsOpenBackWarningModal(true)} text="답변하기" background={colors.grey7} />
      <Question />
      <PolaroidContainer>
        <label htmlFor="file">
          <ProfileWrapper>
            {imageUrl === '' ? <ProfileImg /> : <ProfileImg src={imageUrl} alt="image" />}
            {imageUrl === '' ? <PlusImgText>사진 추가</PlusImgText> : <PlusImgText></PlusImgText>}
          </ProfileWrapper>
        </label>
        <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
        <AnswerText onChange={onChangeContent} value={content} placeholder="답변을 입력해보세요." />
      </PolaroidContainer>
      <Music
        musicName={musicName}
        setMusicName={setMusicName}
        musicAudio={musicAudio}
        setMusicAudio={setMusicAudio}
        musicSinger={musicSinger}
        setMusicSinger={setMusicSinger}
      />

      <Link linkAttachments={linkAttachments} setLinkAttachments={setLinkAttachments} />
      <UnFixedButton
        $positive={imageUrl !== '' && content !== '' ? true : false}
        func={() => {
          console.log('폴더 이동')
        }}
        func2={() => {
          {
            imageUrl === '' || content === '' ? setIsOpenDelayModal(true) : console.log('비활성화')
          }
        }}
        text="다음"
        margin="83px 20px 0px 20px"
      />
      {isOpenDelayModal && imageUrl === '' ? (
        <DelayModal setIsOpenDelayModal={setIsOpenDelayModal} text="사진을 추가해주세요!" />
      ) : isOpenDelayModal && content === '' ? (
        <DelayModal setIsOpenDelayModal={setIsOpenDelayModal} text="텍스트를 입력해주세요!" />
      ) : (
        <></>
      )}
      {isOpenBackWarningModal && (
        <Modal
          content="지금 나가면 작성된 내용은 사라져요. 나가시겠어요?"
          buttonText1="아니요"
          buttonText2="예"
          func1={() => {
            setIsOpenBackWarningModal(false)
          }}
          func2={() => {
            navigate(-1)
          }}
          clickModal={() => {
            setIsOpenBackWarningModal(false)
          }}
        />
      )}
    </Container>
  )
}

export default Answer

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 30px 0px;
`
const PolaroidContainer = styled.div`
  position: relative;
  margin: 20px 0px 0px 0px;
  display: flex;
  width: 315px;
  height: 346px;
  padding: 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  border-radius: 2px;
  background: ${colors.white};
  box-shadow: 0px 4.945px 8.655px 0px rgba(0, 0, 0, 0.1);
`

const ProfileWrapper = styled.div`
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
  width: 100%;
  height: 100%;
  border-radius: 2.473px;
`

const PlusImgText = styled.div`
  position: absolute;
  top: 133px;
  left: 132px;
  color: ${colors.grey4};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.56px;
  cursor: pointer;
`

const AnswerText = styled.textarea`
  height: 42px;
  flex-shrink: 0;
  align-self: stretch;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.56px;
  border: none;
  outline: none;
  resize: none;
  &::placeholder {
    color: ${colors.grey5};
  }
`
