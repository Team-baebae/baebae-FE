export const safeLocalStorage = {
  get(key: string): string | null {
    try {
      return typeof window !== 'undefined' ? localStorage.getItem(key) : null
    } catch {
      return null
    }
  },
  set(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value)
      }
    } catch {
      console.log('local storage 세팅 실패')
    }
  },
  remove(key: string): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
      }
    } catch {
      console.log('local storage 삭제 실패')
    }
  },
}
