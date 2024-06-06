getSelectedRegion();

function getSelectedRegion() {
  let select_option = document.querySelector("#region_select");
  // console.log(select_option.value);

  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Universal function for creating box dynamically
      function universal(i) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.setAttribute("data-name", data[i].name); // Add data attribute for the box name

        const imgs = document.createElement("div");
        imgs.classList.add("imgs");
        imgs.style.backgroundImage = `url(${data[i].flag})`;

        const content = document.createElement("div");
        content.classList.add("content");

        const box_title = document.createElement("h1");
        box_title.classList.add("box_title");
        box_title.innerText = `${data[i].name}`;

        const box_moreinfo = document.createElement("div");
        box_moreinfo.classList.add("box_moreinfo");

        const population = document.createElement("p");
        population.classList.add("population");
        population.innerText = `Population: ${data[
          i
        ].population.toLocaleString()}`;

        const region = document.createElement("p");
        region.classList.add("region");
        region.innerText = `Region: ${data[i].region}`;

        const capital = document.createElement("p");
        capital.classList.add("capital");
        capital.innerText = `Capital: ${data[i].capital}`;

        document.querySelector(".result_page").appendChild(box);
        box.appendChild(imgs);
        box.appendChild(content);
        content.appendChild(box_title);
        content.appendChild(box_moreinfo);
        box_moreinfo.appendChild(population);
        box_moreinfo.appendChild(region);
        box_moreinfo.appendChild(capital);

        box.addEventListener("click", (event) => {
          const boxName = event.currentTarget.getAttribute("data-name");
          // localStorage.setItem("boxName", boxName);
          // console.log(data);
          clearResultPage();
          document.querySelector(".search_region").style.display = "none";
          document.querySelector(".individual_box").style.display = "flex";

          for (let i = 0; i < 250; i++) {
            if (boxName == data[i].name) {
              console.log(data[i]);

              document.querySelector(".individual_falg").style.backgroundImage = `url(${data[i].flag})`;
              document.querySelector(".indi_name").innerText = `${data[i].name}`;
              document.querySelector(".indi_native_name").innerText = `${data[i].nativeName}`;
              document.querySelector(".indi_population").innerText = ` ${data[i].population.toLocaleString()}`;
              document.querySelector(".indi_region").innerText = `${data[i].region}`;
              document.querySelector(".indi_subregion").innerText = `${data[i].subregion}`;
              document.querySelector(".indi_capital").innerText = `${data[i].capital}`;
              document.querySelector(".indi_domain").innerText = ` ${data[i].topLevelDomain}`;
              document.querySelector(".indi_currencies").innerText = `${data[i].currencies[0].name}`;
              document.querySelector(".indi_language").innerText = `${data[i].languages[0].name}`;
              document.querySelector(".border_countrie_box1").innerHTML = `${data[i].borders[0]}`;
              document.querySelector(".border_countrie_box2").innerHTML = `${data[i].borders[1]}`;

            }
          }
        });
      }

      // Function to clear all children of .result_page
      function clearResultPage() {
        const resultPage = document.querySelector(".result_page");
        while (resultPage.firstChild) {
          resultPage.removeChild(resultPage.firstChild);
        }
      }

      // Default box display
      if (select_option.value == "Filter by Region") {
        for (let i = 0; i < 8; i++) {
          let random_no = Math.floor(Math.random() * 250);
          universal(random_no);
        }
      }

      // Box with Africa only
      if (select_option.value == "Africa") {
        clearResultPage();
        for (let i = 0; i < 249; i++) {
          if (data[i].region == "Africa") {
            universal(i);
          }
        }
      }

      // Box with Americas only
      if (select_option.value == "Americas") {
        clearResultPage();
        for (let i = 0; i < 249; i++) {
          if (data[i].region == "Americas") {
            universal(i);
          }
        }
      }

      // Selected Europe box only
      if (select_option.value == "Europe") {
        clearResultPage();
        for (let i = 0; i < 249; i++) {
          if (data[i].region == "Europe") {
            universal(i);
          }
        }
      }

      // Selected Asia box only
      if (select_option.value == "Asia") {
        clearResultPage();
        for (let i = 0; i < 249; i++) {
          if (data[i].region == "Asia") {
            universal(i);
          }
        }
      }

      // Selected Oceania box only
      if (select_option.value == "Oceania") {
        clearResultPage();
        for (let i = 0; i < 249; i++) {
          if (data[i].region == "Oceania") {
            universal(i);
          }
        }
      }

      // Selected Antarctic box only
      if (select_option.value == "Antarctic") {
        clearResultPage();
        for (let i = 0; i < 249; i++) {
          if (data[i].region == "Antarctic") {
            universal(i);
          }
        }
      }

      // Input search
      document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const search_input = document.querySelector(".input_text").value;
        const update_input =
          search_input[0].toUpperCase() + search_input.slice(1);

        let two_lenght_input;
        if (search_input.length == 2) {
          two_lenght_input = search_input.toUpperCase();
        }

        let three_lenght_input;
        if (search_input.length == 3) {
          three_lenght_input = search_input.toUpperCase();
        }

        for (let i = 0; i < 250; i++) {
          if (
            update_input == data[i].name ||
            two_lenght_input == data[i].alpha2Code ||
            three_lenght_input == data[i].alpha3Code
          ) {
            // console.log(data[i]);
            clearResultPage();
            universal(i);
            return;
          }
        }
      });
    })
    .catch((err) => {
      alert("error in fetching please try again later");
    });
}

// --------------------------------

document.querySelector(".back_button").addEventListener("click", () => {
  document.querySelector(".search_region").style.display = "flex";
  document.querySelector(".individual_box").style.display = "none";
  getSelectedRegion()
});

// ------------------------- modes -----------------

document.querySelector(".modes").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Update the text and icon based on the current mode
  const modeText = document.getElementById("modes_p");
  const modeIcon = document.getElementById("modes_i");
  if (document.body.classList.contains("light-mode")) {
      modeText.textContent = "Dark Mode";
      modeIcon.classList.remove("fa-sun");
      modeIcon.classList.add("fa-moon");
  } else {
      modeText.textContent = "Light Mode";
      modeIcon.classList.remove("fa-moon");
      modeIcon.classList.add("fa-sun");
  }
});
