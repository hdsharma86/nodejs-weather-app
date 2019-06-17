const weatherForm = document.querySelector('form');
const searchKeyword = document.querySelector('input');
const elmResult = document.querySelector('.result-data');
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = searchKeyword.value;
    if(location){
        elmResult.innerHTML = "<p>Loading...</p>";
        fetch('/weather?address='+location).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    elmResult.innerHTML = "<p>"+data.error+"</p>";
                } else {
                    elmResult.innerHTML = "<p>"+data.location+"</p>"+"<p>"+data.forecastData+"</p>";
                }
            });
        });
    }
});