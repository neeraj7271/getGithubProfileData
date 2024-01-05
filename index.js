const url = "https://api.github.com/users/";
const get = (params) => document.getElementById(`${params}`);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const btnsubmit = get("submit");
const input = get("input");
const noresults = get("no-results");
const avatar = get("avatar");
const username = get("name");
const user = get("user");
const date = get("date");
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
let darkmode = false;



async function getUserData(giturl) {

    console.log("HI");

    try {
        const response = await fetch(giturl);

        const data = await response.json();

        console.log(data);
        updateProfile(data);

    } catch (error) {
        console.log("you got an error");
    }

}

input.addEventListener("keydown", function(e) {

    // console.log("inside the input");
    if(e.key =="Enter") {
        if(input.value !== "") {
            getUserData(url + input.value);

        }
    }
}, false)

btnsubmit.addEventListener("submit", () => {
// console.log("inside the button");
   if(input.value !== "") {
    getUserData(url + input.value);
   }
})

btnmode.addEventListener("click", function() {
    if(darkmode == false) {
        darkModeProperties();
    } else {
        lightModeProperties();
    }
})

input.addEventListener("input", function() {
    noresults.style.display = "none";
})

function updateProfile(data) {
    if(data.messsage !== "Not Found") {
        noresults.style.display = "none";


    function checkNull(param1, param2) {
        if (param1 === "" || param1 === null) {
          param2.style.opacity = 0.5;
          param2.previousElementSibling.style.opacity = 0.5;
          return false;
        } else {
          return true;
        }
      }

        avatar.src = `${data.avatar_url}`;
        username.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `@${data.login}`;
        bio.innerText = data.bio === null ? "This profile has no bio" : `${data.bio}`;
        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`
        following.innerText = `${data.following}`;
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";

    } else {
        noresults.style.display = "block";
    }
}



//SWITCH TO DARK MODE - activateDarkMode()
function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkmode = true;
    console.log("darkmode changed to " + darkmode);
    localStorage.setItem("dark-mode", true);  console.log("setting dark mode to false");
    
    console.log("setting dark mode to true");
    
}

//SWITCH TO LIGHT MODE - activateLightMode()
function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkmode = false;
    console.log("darkmode changed to " + darkmode);
    
    localStorage.setItem("dark-mode", false);
    console.log("setting dark mode to false");
}

function init() {
    darkmode = false;

    console.log('inside init');
    const value = localStorage.getItem("dark-mode");

    console.log(value);

    if(value === null) {
        localStorage.setItem("dark-mode", darkmode);
        lightModeProperties();
    }
    else if(value == "true") {
        darkModeProperties();
    }
    else if(value == "false") {
        lightModeProperties();
    }

    getUserData(url + "thepranaygupta");
}


init();