import { useState } from "react";
import { suggestionTracks } from "../../Data/datafetch";
import "./Autocomplete.css"

const SuggestionSearch = () => {

    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState("");

    const handleChange = async (e) => {
        const query = e.target.value.toLowerCase();
        setValue(query);
        console.log(query)
        var data = await suggestionTracks(query)
        console.log(data)
        if (query.length > 1) {
            setSuggestions(data);
            setSuggestionsActive(true);
        } else {
            setSuggestionsActive(false);
        }
    };

    const handleClick = (e) => {
        setSuggestions([]);
        setValue(e.target.innerText);
        setSuggestionsActive(false);
    };

    const handleKeyDown = (e) => {
        // UP ARROW
        if (e.keyCode === 38) {
            if (suggestionIndex === 0) {
                return;
            }
        setSuggestionIndex(suggestionIndex - 1);
        }
        // DOWN ARROW
        else if (e.keyCode === 40) {
        if (suggestionIndex - 1 === suggestions.length) {
            return;
        }
        setSuggestionIndex(suggestionIndex + 1);
        }
        // ENTER
        else if (e.keyCode === 13) {
            setValue(suggestions[suggestionIndex]);
            setSuggestionIndex(0);
            setSuggestionsActive(false);
        }
    };

    const Suggestions = () => {
        return (
        <ul className="suggestions">
            {Object.keys(suggestions).map((suggestion, index) => {
            return(
                <li
                    className={index === suggestionIndex ? "active" : ""}
                    key={index}
                    onClick={handleClick}>
                    {suggestions[suggestion]}
                </li>
            
            )})}
        </ul>
        );
    };

    return (
        <div>
            <form>
                <label for="search">Search</label>
                    <input id="search" 
                        type="text" 
                        pattern=".*\S.*" 
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} required/>
                <span class="caret"></span>
            </form>
            {suggestionsActive && <Suggestions />}
            <input type="submit"/>
        </div>
        
    );
  
};

export default SuggestionSearch;