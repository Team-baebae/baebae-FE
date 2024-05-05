import axios from 'axios'

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

export const getSpotifyAccessTokenApi = () => {
  return axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
    },
  })
}

export const searchTermSpotifyApi = (searchTerm: string, spotifyAccessToken: string) => {
  return axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track,artist,album`, {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
  })
}
