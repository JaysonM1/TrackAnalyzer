import axios from "axios";

function getTrackSuggestionList(rawData){
      const trackLists = rawData.tracks.items;
      var resultNames = []
      for (const element in trackLists){
        resultNames.push(trackLists[element]['name'])
      }
      return resultNames
}
export async function suggestionTracks (searchKey){
  let token = window.localStorage.getItem("token")
      var {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchKey,
          type: "track"
        }
      })
      return getTrackSuggestionList(data);
};