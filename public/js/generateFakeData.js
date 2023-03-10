const submitForm = document.querySelector('form');

const renderOutput = (data) => {
    let output = '';

    for (const key in data) {
        output += `
        <li class="list-group-item">
            <p class="text-muted mb-2 fw-bold">
        `;

        for(const item in data[key]){
            output += `
                ${data[key][item]} <br>
            `;
        }

        output += `
            </p>
        </li>       
        `;
    }

    searchList.innerHTML = output;
};

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const errorMsg = document.getElementById('errorMsg');

    const name = document.getElementById('name');
    const image = document.getElementById('image');
    const place = document.getElementById('place');
    const company = document.getElementById('company');
    const address = document.getElementById('address');
    const quantity = document.getElementById('totalRecords').value;

    const searchList = document.getElementById('searchList');
    const outputErr = document.getElementById('outputErr');
    const outputDiv = document.getElementById('outputDiv');
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.innerHTML = 'Fetching...';

    let url = '/fakedatagenerate?_quantity=' + quantity;

    if(!name.checked && !image.checked && !place.checked && !company.checked && !address.checked){
        errorMsg.hidden = false;
        errorMsg.innerHTML = 'Please select any of the fields to generate data!';
        submitBtn.innerHTML = 'Submit';
        return;
    }else{
        errorMsg.hidden = true;
    }

    if(name.checked){
        url += '&customfield1=name';
    }

    if(image.checked){
        url += '&customfield2=image';
    }

    if(place.checked){
        url += '&customfield3=image';
    }

    if(company.checked){
        url += '&customfield4=company_name';
    }

    if(address.checked){
        url += '&customfield5=streetAddress';
    }

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
                    renderOutput(data.data);
                    submitBtn.innerHTML = 'Submit';
                }
            });
        }
    });

});