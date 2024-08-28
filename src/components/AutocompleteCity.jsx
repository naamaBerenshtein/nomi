import React, { useState } from 'react';

const AutocompleteCity = ({ onCitySelect }) => {
    const [cityPrefix, setCityPrefix] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (event) => {
        const input = event.target.value;
        setCityPrefix(input);

        if (input.length > 2) {
            const url = `http://api.geonames.org/searchJSON?name_startsWith=${input}&maxRows=5&username=YOUR_GEONAMES_USERNAME`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setSuggestions(data.geonames.map(city => city.name));
            } catch (error) {
                console.error('Error fetching city names:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleCitySelect = (city) => {
        setCityPrefix(city);
        setSuggestions([]);
        onCitySelect(city);
    };

    return (
        <div>
            {/* <input type="text" value={cityPrefix} onChange={handleInputChange} placeholder="Type a city name..." /> */}
            <div>
                {suggestions.map((city, index) => (
                    <div key={index} onClick={() => handleCitySelect(city)}>{city}</div>
                ))}
            </div>
        </div>
    );
};

export default AutocompleteCity;