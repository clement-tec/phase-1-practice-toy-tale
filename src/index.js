let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });})

const toyCollection = document.querySelector("#toy-collection");

fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(data =>
   data.forEach(renderToy))

const renderToy = (toy) => {
  console.log(toy);
  const toyCard = document.createElement('div');
  toyCard.className = "card";
  toyCollection.append(toyCard);

  const h2 = document.createElement('name');
  h2.textContent = toy.name 
  toyCard.append(h2);

  const img = document.createElement('img');
  img.src = toy.image
  img.className = "toy-avatar";
  toyCard.append(img);

  const TheP = document.createElement("p");
  TheP.textContent = `${toy.likes} likes`;
  toyCard.append(TheP);

  const button = document.createElement("button");
  button.className = "like-btn";
  button.textContent = "❤️";
  toyCard.append(button);

  button.addEventListener("click", (e) => {
    
    const newLike = toy.likes + 1
    toy.likes = newLike
    TheP.textContent = `${newLike} likes`;

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        likes: newLike,
      }) 
  })
});
};

const form = document.querySelector('form');
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const image = e.target.image.value;
  const newToy = {
  name: name,
  image: image,
  likes: 0,
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then((response) => response())
  .then((toy) => {
    renderToy(toy);
  })
});
