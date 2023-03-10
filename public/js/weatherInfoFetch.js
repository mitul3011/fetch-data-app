const submitForm = document.querySelector('form');

const renderOutput = (location, data) => {
    let icon = '';

    switch(data.weather[0].main){
        case "Smoke":
            icon = `<i class="fa fa-cloud" aria-hidden="true"></i>`;
            break;

        case "Rain":
            icon = `<i class="fas fa-cloud-rain fa-sm fa-fw"></i>`;
            break;

        case "Partly cloudy":
            icon = `<i class="fas fa-cloud-sun fa-sm fa-fw"></i>`;
            break;

        case "Sunny":
            icon = `<i class="fas fa-sun fa-sm fa-fw"></i>`;
            break;

        case "Clear":
            icon = `<i class="fas fa-cloud-sun fa-sm fa-fw"></i>`;
            break;

        case "Light rain":
            icon = `<i class="fas fa-cloud-rain fa-sm fa-fw"></i>`;
            break;

        case "Moderate rain":
            icon = `<i class="fas fa-cloud-rain fa-sm fa-fw"></i>`;
            break;

        case "Heavy rain":
            icon = `<i class="fas fa-cloud-rain fa-sm fa-fw"></i>`;
            break;

        case "Thunder":
            icon = `<i class="fas fa-bolt fa-sm fa-fw"></i>`;
            break;

        case "Snow":
            icon = `<i class="fas fa-snowflake fa-sm fa-fw"></i>`;
            break;

        case "Clouds":
            icon = `<i class="fa fa-cloud" aria-hidden="true"></i>`;
            break;

        default:
            icon = `<i class="fas fa-cloud-sun fa-sm fa-fw"></i>`;
            break;
    }

    let output = '';
    output += `
    <li class="list-group-item">
        <h5 class="fw-bold">${location}</h5>
        <p class="text-muted mb-2 fw-bold">
            Weather: ${data.weather[0].main} ${icon} <br>
            Temperature: ${data.main.temp} &#8451; <br>
            Wind Speed: ${data.wind.speed} Meters/Sec
        </p>
    </li>
    `
    searchList.innerHTML = output;
};

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = document.getElementById('location').value;

    const url = '/getweatherinfo?location=' + location;

    fetch(url , {
        method: 'GET'
    }).then((response) => {
        if(response.ok){
            response.json().then((data) => {
                if(data.error){
                    outputDiv.hidden = false;
                    outputErr.hidden = false;
                    searchList.hidden = true;
                    outputErr.innerHTML = data.error;
                    submitBtn.innerHTML = 'Submit';
                }else{
                    outputDiv.hidden = false;
                    outputErr.hidden = true;
                    searchList.hidden = false;
                    renderOutput(location, data.data);
                    submitBtn.innerHTML = 'Submit';
                }
            });
        }
    });
});