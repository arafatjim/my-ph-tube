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



const loadVideos=async(videos) => {
  try{
    const response=await fetch("https://openapi.programming-hero.com/api/phero-tube/videos");
    const data=await response.json();
    videos=data.videos;
    displayVideos(videos);
  }
  catch(error){
    console.log(error);
  }
}

const displayVideos = (videos) => {
  const videoContainer=document.getElementById("video-container");
  videoContainer.innerHTML='';
  videos.forEach((item)=>{
    const cards=document.createElement("div");
    cards.classList="card";
    cards.innerHTML=`
    <div class="card card-compact">
  <figure>
    <img class="card-image"
      src="${item.thumbnail}"
      alt="Videos" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
    ${item.title}
      <div class="badge badge-secondary">view 100</div>
    </h2>
    <p>${item.description}</p>
    <div class="card-actions justify-end">
      <div class="badge badge-outline">Fashion</div>
      <div class="badge badge-outline">Products</div>
    </div>
  </div>
</div>
    `;
    videoContainer.appendChild(cards);

  })
}
loadVideos();

















// <div class="card border-2 gap-6 bg-[#dfe4ea] height-[250px]" style="">
// <img src="${item.thumbnail}" class="card-img-top height-[150px] rounded-md" alt="...">
// <div class="card-body " alt="..."">
// <h5 class="card-title text-[#3d3d3d] text-center font-bold text-lg
// ">${item.title}</h5>
// <p class="card-text"></p>
// </div>
// </div>