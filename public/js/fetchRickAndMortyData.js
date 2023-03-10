const submitForm = document.querySelector('form');

const renderOutput = (data) => {
    let output = `
    <li class="list-group-item">
        <h5 class="fw-bold">${data.name}</h5>
        <p class="text-muted mb-2 fw-bold">
            Species: ${data.species} <br>
            Status: ${data.status} <br>
            Gender: ${data.gender} <br>
            Created: ${data.created} <br> <br>
            <img src="${data.image}" width="250" height="250">
        </p>
        <br>
        <a href="${data.url}" class="btn btn-primary">Get Character's all Info</a>
    </li>
    `;

    searchList.innerHTML = output;
};

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const species = document.getElementById('species').value;

    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');
    const searchList = document.getElementById('searchList');
    const outputErr = document.getElementById('outputErr');
    const outputDiv = document.getElementById('outputDiv');

    const url = '/rickandmortyinfo?name=' + name + '&species=' + species;

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
                    renderOutput(data.data[0]);
                    submitBtn.innerHTML = 'Submit';
                }
            });
        }
    });
});