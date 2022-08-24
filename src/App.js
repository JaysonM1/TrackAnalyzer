import {useEffect, useState} from "react";
import './App.css';
import SuggestionSearch from "./Components/SuggestionSearch/Autocomplete";

function App() {
    const CLIENT_ID = "92d837c891cd4132997608650139a97b"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const REDIRECT_URI = "http://localhost:3000"
    const RESPONSE_TYPE = 'token'

    const [token, setToken] = useState("")

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

    return (
      <div className="App">
        <header className="App-header">
          <h1>Track Analyzer</h1>
          {!token ?
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
                  : <button className = "logout-button" onClick={logout}>Logout</button>}
        </header>

          {token ?
            <SuggestionSearch/> : null}
      </div>
    );
}

export default App;
