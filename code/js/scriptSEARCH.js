
function capitalizeFirstLetterOfEachWord(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

function search() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsList = document.getElementById('resultsList');
    const hiddenTable = document.getElementById('hiddenTable');
    
    // Clear previous results
    resultsList.innerHTML = '';
    
    // Check if input is empty
    if (input.trim() === '') {
        //alert("Por favor escribe"); // Optional alert for empty input
        document.getElementById('searchResults').style.display = 'none'; // Hide results section
        return; // Exit the function early
    }

    // Get rows from the hidden table
    const rows = hiddenTable.getElementsByTagName('tr');
    
    let found = false; // Flag to check if any result is found

    // Loop through each row in the hidden table
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const name = cells[0].innerText.toLowerCase();
        const category = cells[1].innerText.toLowerCase();
        
        // Check if input matches either name or category (partial match)
        if (name.includes(input) || category.includes(input)) {
            found = true; // Set flag to true if match is found
            
            // Capitalize first letters of each word
            const formattedName = capitalizeFirstLetterOfEachWord(name);
            const formattedCategory = capitalizeFirstLetterOfEachWord(category);
            const link = cells[2].innerText;

            // Create a new list item for the result in the desired format
            const listItem = document.createElement('tr');
            listItem.innerHTML = `<td style="border-bottom: 1px solid dimgray;"><a href="${link}" target="_blank">${formattedName} - ${formattedCategory}</a></td>`;
            resultsList.appendChild(listItem);
        }
    }

    // Display search results section if any result is found
    const searchResultsSection = document.getElementById('searchResults');
    if (found) {
        searchResultsSection.style.display = 'block';
        setPage();
    } else {
        searchResultsSection.style.display = 'none'; // Hide if no results found
        alert("No se encontraron resultados");
    }
}
