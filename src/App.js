import {useEffect, useState} from "react";
import './App.css';
import axios from "axios";

function App() {
    const CLIENT_ID = "92d837c891cd4132997608650139a97b"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const REDIRECT_URI = "http://localhost:3000"
    const RESPONSE_TYPE = 'token'

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")

  }
    useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      // getToken()


      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

  }, [])

  const searchArtists = async (e) => {
    e.preventDefault()
      const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchKey,
          type: "artist"
        }
      })
      console.log(data)
      setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
        </div>
    ))
}
    return (
      <div className="App">
        <header className="App-header">
          <h1>Spotify Header</h1>
          {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}


          {token ?
            <form onSubmit={searchArtists}>
              <input type = 'text' onChange={e =>setSearchKey(e.target.value)}/>
              <button type="submit"> Search </button>
            </form> :
            <h2>Please Login</h2>}
            {renderArtists()}
        </header>
      </div>
    );
}

export default App;
