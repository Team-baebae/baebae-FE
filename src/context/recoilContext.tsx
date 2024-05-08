import { RecoilRoot, atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

// 로그인 상태 관리
export const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false,
  effects: [persistAtom],
})

export default function RecoilContextProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>
}
