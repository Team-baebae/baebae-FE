export interface QuestionProps {
  question: {
    questionId: number
    content: string
    nickname: string
    profileOnOff: boolean
    createdDate: string
    isAnswered: boolean
    fcmtoken: string
  }
}

// Link Props
export interface LinkProps {
  linkAttachments: string
  setLinkAttachments: any
}

// Music Props
export interface MusicProps {
  musicName: string
  setMusicName: any
  musicAudio: string
  setMusicAudio: any
  musicSinger: string
  setMusicSinger: any
}

// 스포티파이를 통해 받은 트랙 Props
export interface TrackProps {
  id: string
  name: string
  preview_url: string
  album: {
    artists: { name: string }[]
  }
}

// PersonalHeader Props
export interface HeaderProps {
  text: string
  background: string
  func: any
}
