fetch(
  "https://api.nasa.gov/planetary/apod?api_key=5XW2PJrtfg7RgSqy6gJfH7Gm7ubx388FMNqGVLXT"
).then((posts) =>
  posts.json().then((data) => {
    document.querySelector(".NASAPic").src = data.url;
    document.querySelector(".pictureExplanation").innerHTML = data.explanation;
  })
);

fetch("https://api.chucknorris.io/jokes/random").then((jokes) =>
  jokes.json().then((data) => {
    document.querySelector(".chuckJoke").innerHTML = data.value;
  })
);

function chuck() {
  fetch("https://api.chucknorris.io/jokes/random").then((jokes) =>
    jokes.json().then((data) => {
      document.querySelector(".chuckJoke").innerHTML = data.value;
    })
  );
}
