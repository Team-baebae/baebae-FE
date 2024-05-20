// 약관 props
export interface TermsProps {
  isChecked: {
    isCheckedTotal: boolean
    isCheckedFirst: boolean
    isCheckedSecond: boolean
    isCheckedThird: boolean
  }
  setIsChecked: any
}

// GetKakaoUserInfo함수의 response 인터페이스
export interface KakaoUserInfoResponseProps {
  data: {
    token_type: string
    access_token: string
    expires_in: number
    refresh_token: string
    refresh_token_expires_in: number
    scope: string
    email: string
    nickname: string
  }
  status: number
  statusText: string
  headers: any
  config: any
}

// isExistingAccount함수의 response 인터페이스
export interface IsExistingAccountResponseProps {
  data: any
  status: number
  statusText: string
  headers: any
  config: any
}

// Login함수의 response 인터페이스
export interface LoginProps {
  data: any
  status: number
  statusText: string
  headers: any
  config: any
}

// getUserInfo Props
export interface GetUserInfoProps {
  accessToken: string
  email: string
  id: number
  nickname: string
  refreshToken: string
}
