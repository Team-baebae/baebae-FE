import axios from 'axios'

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

// 현재 액세스 토큰 저장
let accessToken = ''
// 토큰이 만료되는 시간 저장
let tokenExpiresAt = 0

const getBasicAuthHeader = () => {
  return 'Basic ' + btoa(`${clientId}:${clientSecret}`)
}

const fetchAccessToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: getBasicAuthHeader(),
    },
  })

  accessToken = response.data.access_token
  tokenExpiresAt = Date.now() + response.data.expires_in * 1000
}

// 토큰 없거나, 만료시간 지나면 재발급
export const getAccessToken = async () => {
  if (!accessToken || Date.now() >= tokenExpiresAt) {
    await fetchAccessToken()
  }
  return accessToken
}

export const searchTermSpotifyApi = async (searchTerm: string) => {
  const spotifyAccessToken = await getAccessToken()
  return axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track,artist,album`, {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
  })
}
