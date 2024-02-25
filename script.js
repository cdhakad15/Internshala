document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('images.json');
        const doctors = await response.json();
        
        const doctorGrid = document.getElementById('doctorGrid');
        const pageSize = 4;
        let currentPage = 1;

        displayDoctors(doctorGrid, doctors, pageSize, currentPage);

        const nextPageButton = document.getElementById('nextPageButton');
        nextPageButton.addEventListener('click', () => {
            currentPage++;
            displayDoctors(doctorGrid, doctors, pageSize, currentPage);
        });

        const prevPageButton = document.getElementById('prevPageButton');
        prevPageButton.addEventListener('click', () => {
            currentPage--;
            displayDoctors(doctorGrid, doctors, pageSize, currentPage);
        });

    } catch (error) {
        console.error('Error fetching doctors:', error);
    }
});

function displayDoctors(container, doctors, pageSize, currentPage) {
    container.innerHTML = '';

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, doctors.length);

    for (let i = startIndex; i < endIndex; i++) {
        const doctorCard = createDoctorCard(doctors[i]);
        container.appendChild(doctorCard);
    }
    
    const nextPageButton = document.getElementById('nextPageButton');
    const prevPageButton = document.getElementById('prevPageButton');

    if (currentPage === 1) {
        prevPageButton.disabled = true;
    } else {
        prevPageButton.disabled = false;
    }

    if (endIndex >= doctors.length) {
        nextPageButton.disabled = true;
    } else {
        nextPageButton.disabled = false;
    }
}

function createDoctorCard(doctor) {
    const card = document.createElement('div');
    card.classList.add();

    // Main div for the card
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('content','border', 'rounded', 'card', 'grid-item');

    // Image div
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image-container');
    const image = document.createElement('img');
    image.src = doctor.image;
    image.classList.add(); // Add margin-bottom for spacing
    imageDiv.appendChild(image);

    // Content div for name and specialist
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('role');
    const name = document.createElement('h2');
    name.textContent = doctor.name;
    name.classList.add('text-lg', 'font-semibold');
    contentDiv.appendChild(name);

    const specialist = document.createElement('p');
    specialist.textContent = doctor.specialist;
    specialist.classList.add('mb-2');
    contentDiv.appendChild(specialist);

    // Append imageDiv and contentDiv to mainDiv
    mainDiv.appendChild(imageDiv);
    mainDiv.appendChild(contentDiv);

    // Append mainDiv to the card
    card.appendChild(mainDiv);

    return card;
}