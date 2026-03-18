export const handleSearch = async (inputValue, setSuggestions) => {
    if (!inputValue) {
        setSuggestions([]);
        return;
    }

    try {
        const { AutocompleteSuggestion } = await window.google.maps.importLibrary("places");

        const request = {
            input: inputValue,
            includedRegionCodes: ['in'],
        };

        const { suggestions: rawSuggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

        if (rawSuggestions && rawSuggestions.length > 0) {
            const formattedData = rawSuggestions.map((s) => {
                const prediction = s.placePrediction;
                const format = prediction?.structuredFormat;
                return {
                    placeId: prediction?.placeId || "",
                    description: prediction?.text?.text || "",
                    mainText: format?.mainText?.text || prediction?.text?.text || "Unknown location",
                    secondaryText: format?.secondaryText?.text || ""
                };
            });
            setSuggestions(formattedData);
            console.log(formattedData)
        } else {
            setSuggestions([]);
        }
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
    }
};