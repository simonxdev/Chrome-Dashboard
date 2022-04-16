const author = document.getElementById('author');
const news = document.querySelector('#news');
const weather = document.querySelector('#weather');

//Set Background BG from Unsplash API
fetch("https://api.unsplash.com/photos/random?client_id=wlsctwaMzTDhAuY8fVX6hQB79_x6b2mhp8PEt3-Y2KY&orientation=landscape&query=nature")
.then(res => res.json())
.then(data => {
    document.body.style.backgroundImage = "url('" + data.urls.full + "')";
    author.innerText = `Image By: ${data.user.name}`
})
.catch(err => {
    document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3913&q=80)";
    author.innerText = `Image By: Vincentiu Solomon`
    console.log("Error trying to get Data from Unsplash API")
})

//Get Cryptocoin Data
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => res.json())
    .then(data => {
        document.getElementById("bitcoin").innerHTML = `
        <span class="icon"><img class="cryptoicon" src="${data.image.small}" alt="Bitcoin"> ${data.name}: ${data.market_data.current_price.eur} EUR</span>`
    })
    .catch(err => console.error(err))
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => res.json())
    .then(data => {
        document.getElementById("dogecoin").innerHTML = `
        <span class="icon"><img class="cryptoicon" src="${data.image.small}" alt="Dogecoin"> ${data.name}: ${data.market_data.current_price.eur} EUR</span>`
    })
    .catch(err => console.error(err))
fetch("https://api.coingecko.com/api/v3/coins/ethereum")
    .then(res => res.json())
    .then(data => {
        document.getElementById("ethereum").innerHTML = `
        <span class="icon"><img class="cryptoicon" src="${data.image.small}" alt="Ethereum"> ${data.name}: ${data.market_data.current_price.eur} EUR</span>`
    })
    .catch(err => console.error(err))

// Show current Time
const getTimeString = () => {
    const date = new Date()
    const time = date.toLocaleTimeString("de-DE", {timestyle: "short", hour: "2-digit", minute: "2-digit"})
    document.getElementById("time").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 timeicon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg> ${time}`
    setTimeout(() => {
        getTimeString()
    }, 60000);
}
getTimeString()

//Load News from API
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
        'X-RapidAPI-Key': '81b7598590msh663d1a8e320dcb3p156e09jsnda013592037b'
    }
};

fetch('https://free-news.p.rapidapi.com/v1/search?q=S&lang=de', options)
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < 7; i++){
            news.innerHTML += `
        <div class="news-item">
            <div><img src="${data.articles[i].media}" alt="${data.articles[i].title}"></div>
            <div style="padding:5px;text-align: center;"><h4>${data.articles[i].title}</h4>
            <a href="${data.articles[i].link}" target="_blank"><button>
            Lesen</button></a></div>
        </div>
        `  
        }
    
    })
    .catch(err => console.error(err));



        
  
    

    

// Load Weather from API
navigator.geolocation.getCurrentPosition(position => {
fetch(`https://api.weatherapi.com/v1/current.json?key=33c8f38d5c1548eca27214639221404&q=${position.coords.latitude},${position.coords.longitude}&aqi=no&lang=de`)
    .then(res => res.json())
    .then(data => {
        weather.innerHTML = `
            <div class="weather-icon"><img src="https://${data.current.condition.icon}"></div>
            <div class="weather-temp">${data.current.temp_c} °C</div>
            <div class="weather-city">${data.location.name}</div>
        `
    })
});

//Erinnerungen Box
//Add Task Modal
let taskArray = []
const modal = document.getElementById("taskcontainer")
const addtask = document.getElementById("taskbtn")
const addtaskmodal = document.getElementById("taskmodalbtn")
const closemodal = document.getElementById("close")
const addtasktext = document.getElementById("tasktext")
const keineintrag = document.getElementById("keineintrag")
const tasklist = document.querySelector(".tasklist")
const deletetasks = document.getElementById("deletetasks")

//Get Tasks from LocalStorage, override Array and Render the Tasks
const renderTasks = () => {
    document.querySelector(".tasklist").innerHTML = "<p>Erinnerungen:</p>"
    if(JSON.parse(localStorage.getItem("tasks")).length !== 0){
        taskArray = JSON.parse(localStorage.getItem("tasks"));
    } else {
        taskArray = [];
    }
    if(taskArray.length !== 0){
        taskArray.map(task => {
            document.querySelector(".tasklist").innerHTML += `
                <div class="task">${task}</div>
            `
        }) 
    } else {
        document.querySelector(".tasklist").innerHTML += "<div>Kein Eintrag</div>"
    }
}


//Open Add Task Modal
addtask.addEventListener("click", () => {
    modal.classList.remove("hidden")
    addtasktext.value = ""
})
//Close Add Task Modal
closemodal.addEventListener("click", () => {
    modal.classList.add("hidden")  
})
//Add Task BTN Modal
addtaskmodal.addEventListener("click", () => {
    document.querySelector(".tasklist").innerHTML = "<p>Erinnerungen:</p>"
    if(addtasktext.value.length!==0){
        taskArray.push(addtasktext.value)
        modal.classList.add("hidden") 
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        renderTasks()
    } else {
        alert("Bitte Erinnerungstext angeben")
    }
    

})
//Delete all Tasks BTN
deletetasks.addEventListener("click", () => {
    taskArray = []
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    document.querySelector(".tasklist").innerHTML = `
    <p>Erinnerungen:</p>
    <div id="keineintrag" class="keineintrag">Kein Eintrag</div> 
    `
})

//If there are Tasks in local Storage render them on Page Load
renderTasks()