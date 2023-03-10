const submitForm = document.querySelector('form');

const renderOutput = (data) => {
    let output = '';
    if(data.gender === 'm'){
        output += `
        <li class="list-group-item">
            <h5 class="fw-bold">${data.name}</h5>
            <p class="text-muted mb-2 fw-bold">Gender: Male &nbsp; <i class="fa fa-male" style="font-size:36px"></i></p>
        </li>
        `;
    }else if(data.gender === 'f'){
        output += `
        <li class="list-group-item">
            <h5 class="fw-bold">${data.name}</h5>
            <p class="text-muted mb-2 fw-bold">Gender: Female &nbsp; <i class="fa fa-female" style="font-size:36px"></i></p>
        </li>
        `;
    }
    
    searchList.innerHTML = output;
};

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;

    const url = '/behindthename?name=' + name;

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