import styled from 'styled-components'
import LinkShareImage from '@/assets/main/LinkShare.svg'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { colors } from '@/styles/colors'
import { safeLocalStorage } from '@/utils/safeLocalStorage'

interface ProfileImageProps {
  imageUrl: string
}

const ProfileImage = ({ imageUrl }: ProfileImageProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setIsFlipped(true)

      toast('플리빗 링크가 복사되었어요!')
      setTimeout(() => setIsFlipped(false), 500)
    } catch {
      toast('링크 복사에 실패했어요 😢')
    }
  }

  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const hasShown = localStorage.getItem('profile_tooltip_shown')
    if (!hasShown) {
      setShowTooltip(true)
      safeLocalStorage.set('profile_tooltip_shown', 'true')

      setTimeout(() => {
        setShowTooltip(false)
      }, 4000)
    }
  }, [])

  return (
    <>
      <Flipper $flipped={isFlipped} onClick={handleShareClick}>
        <FrontSide src={imageUrl} alt="profile" />
        <BackSide src={LinkShareImage} alt="copied" />
      </Flipper>
      {showTooltip && (
        <TooltipBox>
          내 프로필 사진을 클릭하면
          <br />
          링크가 복사돼요!
        </TooltipBox>
      )}
    </>
  )
}

export default ProfileImage

const Flipper = styled.div<{ $flipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`

const Side = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  backface-visibility: hidden;
`

const FrontSide = styled(Side)``

const BackSide = styled(Side)`
  transform: rotateY(180deg);
`

const TooltipBox = styled.div`
  position: absolute;
  padding: 6px 8px;
  width: 140px;
  top: 83px;
  left: 40%;
  transform: translateX(-20%);
  background-color: ${colors.grey1};
  color: ${colors.white};
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  border-radius: 4px;
  white-space: pre-line;
  z-index: 10;

  // 툴팁 화살표
  &::after {
    content: '';
    position: absolute;
    top: -11px;
    left: 24px;
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent ${colors.grey1} transparent;
  }
`
