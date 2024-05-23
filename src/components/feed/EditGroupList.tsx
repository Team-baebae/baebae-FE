import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { Flip, toast } from 'react-toastify'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { UnFixedButton } from '@/components/common/Button'
import { StyledToastContainer } from '@/components/toast/toastStyle'
import { categoryProps } from '@/components/category/types'
import { colors } from '@/styles/colors'
import { UserInfoStateProps, userInfoState } from '@/context/Atoms'
import { getCategoriesApi, makeCategoryApi } from '@/apis/CategoryApi'
import DefaultImg from '@/assets/main/DefaultImage.png'
import heic2any from 'heic2any'
import { EditGroupListProps } from './types'
import EachEditGroup from './EachEditGroup'
import EachEditGroupPlus from './EachEditGroupPlus'

// 답변 입력 후 카테고리 선택페이지의 카테고리리스트 컴포넌트
const EditGroupList = ({ selectedCategoryIds, setSelectedCategoryIds }: EditGroupListProps) => {
  // 리코일 로그인한 userInfo
  const [userInfo, setUserInfo] = useRecoilState<UserInfoStateProps>(userInfoState)

  // 로그인한 유저 디렉토리 리스트 저장
  const [categories, setCategories] = useState<categoryProps[]>([])
  // 로그인한 유저 디렉토리 조회
  const getCategories = async () => {
    try {
      await getCategoriesApi(userInfo.memberId).then((res) => {
        console.log(res)
        setCategories(res.data.categories)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  // open은 모달 열고 닫는 상태 (카테고리 생성 시 나오는 모달)
  const [open, setOpen] = useState<boolean>(false)
  // 모달 이전상태로 변화
  const handleDismissPlusMusicModal = () => {
    setOpen(false)
  }

  // 카테고리 생성시 카테고리 정보 저장
  const [categoryImgUrl, setCategoryImgUrl] = useState<string>('')
  const [categoryImgFile, setCategoryImgFile] = useState<File>()
  const [selectedAnswerIds] = useState<number[]>([])
  // 이미지 파일 선택 핸들러
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
          setCategoryImgUrl(URL.createObjectURL(file))
          setCategoryImgFile(file)
        })
      } else {
        setCategoryImgUrl(URL.createObjectURL(file))
        setCategoryImgFile(file)
      }
    }
  }

  // 카테고리 이름
  const [categoryName, setCategoryName] = useState<string>('')
  const onChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCategoryName(value)
  }
  // 새 카테고리 생성
  const makeCategory = async () => {
    try {
      await makeCategoryApi(
        userInfo.accessToken,
        userInfo.memberId,
        categoryImgFile,
        categoryName,
        selectedAnswerIds,
        userInfo.refreshToken,
        setUserInfo,
      ).then((res: any) => {
        setCategories([...categories, res.data])
        setOpen(false)
        setCategoryImgUrl('')
        setCategoryImgFile(undefined)
        setCategoryName('')
        toast(`'${categoryName}' 그룹 생성`)
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      {/* 카테고리 리스트 보여주기 */}
      {categories.map((item: any) => {
        return (
          <EachEditGroup
            selectedCategoryIds={selectedCategoryIds}
            setSelectedCategoryIds={setSelectedCategoryIds}
            category={item}
          />
        )
      })}
      {/* 카테고리 추가 */}
      <EachEditGroupPlus func={() => setOpen(!open)} />
      {/* 카테고리 추가 시 나오는 bottom sheet 모달 */}
      <BottomSheet open={open} snapPoints={() => [433.09091]} onDismiss={handleDismissPlusMusicModal} blocking={true}>
        <PlusLinkText>새 그룹 추가</PlusLinkText>
        {/* 새 카테고리 이미지 */}
        <FolderImgWrapper>
          {categoryImgUrl === '' ? (
            <ImageWrapper>
              <FolderImg src={DefaultImg} />
            </ImageWrapper>
          ) : (
            <FolderImg src={categoryImgUrl} />
          )}
        </FolderImgWrapper>
        <label htmlFor="file">
          <EditFolderImgText>사진 수정하기</EditFolderImgText>
        </label>
        <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
        {/* 새 카테고리 이름 */}
        <FolderName
          value={categoryName}
          onChange={onChangeCategoryName}
          placeholder="그룹명을 입력해주세요"
          maxLength={4}
        />
        <FolderNameConditionWrapper>
          <FolderNameConditionText color={colors.grey1} fontSize="12px">
            2-4자로 입력해주세요.
          </FolderNameConditionText>
          <FolderNameLengthWrapper>
            {categoryName.length > 0 ? (
              <FolderNameConditionText color={colors.grey2} fontSize="10px">
                {categoryName.length}
              </FolderNameConditionText>
            ) : (
              <FolderNameConditionText color={colors.grey4} fontSize="10px">
                {categoryName.length}
              </FolderNameConditionText>
            )}

            <FolderNameConditionText color={colors.grey4} fontSize="10px">
              /
            </FolderNameConditionText>
            <FolderNameConditionText color={colors.grey4} fontSize="10px">
              4
            </FolderNameConditionText>
          </FolderNameLengthWrapper>
        </FolderNameConditionWrapper>
        {/* 새 카테고리 생성 버튼 */}
        <UnFixedButton
          $positive={categoryName.length >= 2 && categoryName.length <= 4 ? true : false}
          func={makeCategory}
          func2={() => {
            console.log('그룹 추가 실패')
          }}
          text="추가하기"
          margin="20px 20px 0px 20px"
        />
      </BottomSheet>
      <StyledToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        pauseOnHover={false}
        closeOnClick={false}
        closeButton={false}
        rtl={false}
        theme="dark"
        transition={Flip}
      />
    </Container>
  )
}
export default EditGroupList

const Container = styled.div`
  display: grid;
  justify-items: stretch;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 23px;
  width: 335px;
  margin: 0px 20px 0px 20px;
  padding: 20px 0px 20px 0px;
  width: calc(100% - 40px);
  max-height: calc(100vh - 330px);
  overflow-y: auto;
`

const PlusLinkText = styled.div`
  align-self: stretch;
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.36px;
  margin: 20px 0px 0px 20px;
`

const FolderImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 88px;
  padding: 5.996px 6px 6.004px 6px;
  margin: 20px 0px 0px 50%;
  transform: translateX(-50%);
  border-radius: 24px;
  border: 1.76px solid ${colors.grey5};
  background: ${colors.white};
`

const ImageWrapper = styled.div`
  position: relative;
  width: 76px;
  height: 76px;
  border-radius: 16px;
  border: 1.76px solid ${colors.grey6};
  background: ${colors.white};
`
const FolderImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 16px;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
`

const EditFolderImgText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 87px;
  height: 26px;
  gap: 10px;
  margin: 9.09px 0px 0px 50%;
  transform: translateX(-50%);
  border-radius: 100px;
  border: 1px solid ${colors.grey1};
  background: ${colors.white};
  color: ${colors.grey1};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.48px;
  cursor: pointer;
`
const FolderName = styled.input`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  padding: 20px;
  gap: 9px;
  width: calc(100% - 40px);
  border-radius: 12px;
  background: ${colors.grey7};
  margin: 20px 20px 0px 20px;
  border: none;
  &:focus {
    outline: none;
  }
`

const FolderNameConditionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 6px 20px 0px 20px;
  padding: 0px 8px;
`

const FolderNameConditionText = styled.div<{ color: string; fontSize: string }>`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize};
  font-weight: 400;
`

const FolderNameLengthWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`
