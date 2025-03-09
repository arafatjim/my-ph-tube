let categories = [];

const loadCategories = async () => {
  try {
    const response = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await response.json();
    categories = data.categories;
    displayCategories(categories);
  } catch (error) {
    console.log(error);
  }
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category");
  categoryContainer.innerHTML = ''; // Clear any existing content
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoryContainer.appendChild(button);
  });
};
loadCategories();


let videos = [];
const loadVideos = async (category) => {
          fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
          .then((response) => response.json())
          .then(data => displayVideos(data.videos))
          .catch(error => console.log(error));
};
loadVideos();
const displayVideos = (videos) => {
          const videoContainer=document.getElementById("video-container");
          videos.forEach((item) =>{
                    const card=document.createElement("div");
                    card.classList="card";
                    card.innerHTML=`
                    <div class="card flex w-11/12 border-2 border-black-500 " style="">
                    <img src="${item.thumbnail}" class="card-img-top w-[20em] rounded-3" alt="...">
                    <div class="card-body " alt="..."">
                    <h5 class="card-title  
                    text-[#3d3d3d] text-center font-bold text
                    ">${item.title}</h5>
                    <p class="card-text w-[10em]  ">${item.description}</p>
                    </div>
                    </div>
                    `;
                    videoContainer.appendChild(card);

          })
};