// GetKakaoUserInfo함수의 response 인터페이스
interface KakaoUserInfoResponseProps {
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
interface IsExistingAccountResponseProps {
  data: any
  status: number
  statusText: string
  headers: any
  config: any
}

// Login함수의 response 인터페이스
interface LoginProps {
  data: any
  status: number
  statusText: string
  headers: any
  config: any
}
