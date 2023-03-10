document.getElementById('inputStartDate').max = new Date().toISOString().split("T")[0];
document.getElementById('inputEndDate').max = new Date().toISOString().split("T")[0];

const submitForm = document.querySelector('form');

const validDate = (startdate, enddate) => {
    let error = false;
    const date1 = new Date(startdate);
    const date2 = new Date(enddate);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(diffDays < 0){
        errorMsg.hidden=false;
        errorMsg.innerHTML='Please select a valid start date!';
        error = true;
    }else{
        errorMsg.hidden=true;
        errorMsg.innerHTML='';
        error = false;
    }

    return error;
};

const renderOutput = (data) => {
    let output = '';
    data.forEach(element => {
        output += `
        <li class="list-group-item">
          <h5 class="fw-bold">${element.properties.title}</h5>
          <p class="text-muted mb-2 fw-bold">${new Date(element.properties.time)}</p>
          <p class="text-muted mb-0">
            Alert Type: ${element.properties.alert} <br>
            Magnitude: ${element.properties.mag} mww
          </p>
          <br>
          <a href="${element.properties.url}" class="btn btn-primary">Go to Event Page</a>
        </li>
        `
    });
    searchList.innerHTML = output;
};

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const startdate = document.getElementById('inputStartDate').value || new Date().toISOString().slice(0, 10);
    const enddate = document.getElementById('inputEndDate').value || new Date().toISOString().slice(0, 10);
    const address = document.getElementById('inputLocation').value;
    const alertlevel = document.getElementById('inputAlertLevel').value;
    const maxradiuskm = document.getElementById('inputMaxRadius').value || 100;
    const maxmagnitude = document.getElementById('inputMaxMagnitude').value || 9.5;

    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');
    const searchList = document.getElementById('searchList');
    const outputErr = document.getElementById('outputErr');
    const outputDiv = document.getElementById('outputDiv');

    const url = '/earthquakestatus?location=' + address + '&starttime=' + startdate + '&endtime=' + enddate + '&alertlevel=' + alertlevel + '&maxradiuskm=' + maxradiuskm + '&maxmagnitude=' + maxmagnitude;

    submitBtn.innerHTML = 'Fetching...';

    if(validDate(startdate, enddate)){
        submitBtn.innerHTML = 'Submit';
    }else{
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
    }
});