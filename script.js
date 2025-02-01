document.querySelector(".busca").addEventListener("submit", async (e) => {
  e.preventDefault();

  let inputValue = document.querySelector("#searchInput").value.trim();

  if (inputValue) {
    clearInfo();
    showWarning("Carregando...");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      inputValue
    )}&appid=13c135a390464bd0d343c3f4f3b76d34&units=metric&lang=pt_br`;

    let result = await fetch(url);
    let json = await result.json();

    if (json.cod === 200) {
      showInfo({
        title: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        icon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windDeg: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning(
        "O nome da cidade não foi encontrado. Por favor, tente novamente."
      );
    }
  }
});

function showInfo(info) {
  document.querySelector(
    ".titulo"
  ).innerHTML = `${info.title}, ${info.country}`;
  document.querySelector(".tempInfo").innerHTML = `${info.temp} <sup>ºC</sup>`;
  document.querySelector(
    ".temp img"
  ).src = `http://openweathermap.org/img/wn/${info.icon}@2x.png`;
  document.querySelector(
    ".ventoInfo"
  ).innerHTML = `${info.windSpeed} <span>km/h</span>`;
  document.querySelector(".ventoPonto").style.transform = `rotate(${
    info.windDeg - 90
  }deg)`;
  showWarning("");
  document.querySelector(".resultado").style.display = "block";
}

function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

function clearInfo() {
  document.querySelector(".aviso").innerHTML = "";
  document.querySelector(".resultado").style.display = "none";
}
