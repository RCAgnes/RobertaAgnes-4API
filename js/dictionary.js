document.addEventListener('DOMContentLoaded', () => {
  // Get references to the search button, input field, and result display div
  const searchBtn = document.getElementById('searchBtn');
  const wordInput = document.getElementById('wordInput');
  const resultDiv = document.getElementById('definitionResult');

  // Add click event listener to the search button
  searchBtn.addEventListener('click', async () => {
    const term = wordInput.value.trim();
    if (!term) {
      // Show a message if the input is empty
      resultDiv.textContent = "Please enter the name of a sweet!";
      return;
    }

    // API endpoint and options for Urban Dictionary via RapidAPI
    // The API key and host must match your RapidAPI subscription and documentation
    const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${encodeURIComponent(term)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e8e269bf03mshfa994dc54e1d50fp1a0930jsn0e32aa8fab09', // Your RapidAPI key
        'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'     // Host as required by RapidAPI
      }
    };

    try {
      // Fetch the definition from the API
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data); // For debugging: shows the full API response in the browser console

      // Check if the API returned a valid definition
      if (Array.isArray(data.list) && data.list.length > 0 && data.list[0].definition) {
        resultDiv.innerHTML = `
          <p><strong>${term}</strong>:</p>
          <p>${data.list[0].definition}</p>
        `;
      } else {
        // Show a message if no definition was found
        resultDiv.textContent = "No definition found";
      }
    } catch (error) {
      // Handle errors such as network issues or invalid API key
      console.error("Error:", error);
      resultDiv.textContent = "Error fetching definition. Please check your connection or API key.";
    }
  });
});
