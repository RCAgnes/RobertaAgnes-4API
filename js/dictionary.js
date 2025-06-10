document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const wordInput = document.getElementById('wordInput');
  const resultDiv = document.getElementById('definitionResult');

  searchBtn.addEventListener('click', async () => {
    const term = wordInput.value.trim();
    if (!term) {
      resultDiv.textContent = "Please enter the name of a sweet!";
      return;
    }

    const url = `https://urban-dictionary7.p.rapidapi.com/v0/define?term=${encodeURIComponent(term)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e8e269bf03mshfa994dc54e1d50fp1a0930jsn0e32aa8fab09',
        'X-RapidAPI-Host': 'urban-dictionary7.p.rapidapi.com' 
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data); // For debugging

      if (Array.isArray(data.list) && data.list.length > 0 && data.list[0].definition) {
        resultDiv.innerHTML = `
          <p><strong>${term}</strong>:</p>
          <p>${data.list[0].definition}</p>
        `;
      } else {
        resultDiv.textContent = "No definition found";
      }
    } catch (error) {
      console.error("Error:", error);
      resultDiv.textContent = "Error fetching definition. Please check your connection or API key.";
    }
  });
});
