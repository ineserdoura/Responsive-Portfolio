// dark mode based on system preferences
const body = document.querySelector("body");
const darkModeButton = document.querySelector("#dark-mode");
const darkModeIcon = document.querySelector("#dark-mode > i");

//verify if the browser supports matchMedia and verify if the condition of the color scheme dark matches

const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const userPrefersLight =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

if (userPrefersDark) {
  darkMode();
} else if (userPrefersLight) {
  lightMode();
}

// dark mode button

const currentBodyClass = body.classList;
// add event listener to button
darkModeButton.addEventListener("click", () => {
  if (currentBodyClass == "light-theme") {
    darkMode();
  } else if (currentBodyClass == "dark-theme") {
    lightMode();
  }
});

function darkMode() {
  body.classList.remove("light-theme");
  body.classList.add("dark-theme");
  darkModeIcon.classList.remove(`fa-moon`);
  darkModeIcon.classList.add(`fa-sun`);
  darkModeButton.removeAttribute("title");
  darkModeButton.setAttribute("title", "Turn lights on");
}

function lightMode() {
  body.classList.remove("dark-theme");
  body.classList.add("light-theme");
  darkModeIcon.classList.remove(`fa-sun`);
  darkModeIcon.classList.add(`fa-moon`);
  darkModeButton.removeAttribute("title");
  darkModeButton.setAttribute("title", "Turn lights off");
}

// get git hub api response

const myProjectsSection = document.querySelector("#projects");
const myProjectsItems = document.querySelector("#projects-items");

fetch("https://api.github.com/users/ineserdoura/repos")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    for (const repo of data) {
        console.log(data)
       console.log( data.indexOf(repo))
      
      // foreach repositorie from GitHub
      const repositoryUrl = repo.html_url; // repositorie url
      const repositoryName = repo.name.replaceAll("-", " ").toUpperCase(); // removes the - that exist in the repositorie names
      const projectWebsite = repo.homepage; // project website
      const repositoryLanguages = repo.languages_url;
      const descripion =repo.description;
      // create col
      const col = document.createElement("div");
      col.classList.add("col-md-4", "col-12", "mt-3");

      //create card
      const card = document.createElement("div");
      card.classList.add("card", "text-center", "rounded");

      //create card body
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      //create card title
      const cardTitle = document.createElement("h6");
      cardTitle.textContent = `${repositoryName}`;

      //create card subtitle / repo website
      const cardSubtitle = document.createElement("a");
      cardSubtitle.classList.add("mb-2");
      cardSubtitle.setAttribute("href", projectWebsite);
      cardSubtitle.setAttribute("target", "_blank");
      cardSubtitle.textContent = "Check the project live.";
      if (!projectWebsite) {
        cardSubtitle.style.visibility = "hidden"; // if the project doesn't have a website, hide this section
      }

      //create card descripion
      const cardDescription = document.createElement("p");
      cardDescription.innerHTML=`${descripion}`;

      // create card text / languages icons
      const cardLanguages = document.createElement("h3");
      cardLanguages.classList.add("card-text");

      //create card link / repository link
      const h3 = document.createElement("h3");
      const cardLink = document.createElement("a");
      cardLink.classList.add("card-link");
      cardLink.setAttribute("href", repositoryUrl);
      cardLink.setAttribute("target", "_blank");

      //create github icon
      const gitHubIcon = document.createElement("i");
      gitHubIcon.classList.add("fab", "fa-github");
      cardLink.appendChild(gitHubIcon); // append github icon to link
      h3.appendChild(cardLink); // append link to h3

      // create card
      cardBody.appendChild(cardTitle); // append title to card body
      cardBody.appendChild(cardSubtitle); // append subtitle to card body
      cardBody.appendChild(cardLanguages); // append text to card body
      cardBody.appendChild(cardDescription); // apend description
       cardBody.appendChild(h3); // append h3 to card body
      card.appendChild(cardBody); // append card body to card
      col.appendChild(card); // append card to col 
      myProjectsItems.appendChild(col); // append col to projects section
      const repoPosition= data.indexOf(repo);
      if(repoPosition%2==0 || repoPosition==0){
        card.classList.add("card-even");
      } else{
        card.classList.add("card-odd");
      }

      fetch(repositoryLanguages) // get repository languages url response
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const repoLanguages = Object.keys(data).sort(); // create an array with the keys from the repository languages object 
          const h6 = document.createElement("h6"); 
          h6.classList.add("px-1");
          h6.innerHTML = repoLanguages.join(" "); // create a string from the previous array
          cardLanguages.appendChild(h6); // append h6 to card text
        });
    }
  })
  .catch(() => {
    // if no response/ error from the api hide my projects link on menu and my projects section
    myProjectsSection.style.display="none";
  });