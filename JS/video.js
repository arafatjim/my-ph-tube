// convert time to hours, minutes and seconds
function getTime(seconds){
  
 
    var hours=Math.floor(seconds/3600);
    var minutes=Math.floor((seconds%3600)/60);
    var remainingSeconds=seconds%60;
    var days=parseInt(hours/24);
    return days+" day "+hours+" hour "+minutes+" minute "+remainingSeconds+" second";
  
  
  
}

//load categories
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
    const buttoncontainer=document.createElement("div");
    buttoncontainer.innerHTML=
    `<button id="btn-${item.category_id}" onclick="loadCategoryVideo(${item.category_id})" class="btn btn-error ">
      ${item.category}
    </button>
    `
    categoryContainer.appendChild(buttoncontainer);
  });
};


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

const loadDetails=async(videoId) =>{
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  try{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    .then((response) => response.json())
    .then((data) => {
      displayDetails(data.video);
      // You can add code here to display video details
    })
  }
     catch (error) {
      console.log(error);
    }
    
  
}

const displayDetails=(video)=>{
  console.log(video);
  const modalDetails=document.getElementById("modal-content");
  modalDetails.innerHTML=`
    <img class="card-image" src=${video.thumbnail}/>
    <p class="text-2xl font-bold py-2 text-[#3742fa]">${video.title} </p>
    <div class="flex justify-items-center place-items-center gap-4 text-2xl font-bold py-2 text-[#009432]">
        <img class="w-[100px] h-[100px] rounded-full" src=${video.authors[0].profile_picture} />
        
        <p class="text-center ">${video.authors[0].profile_name}</p>
    </div>
    <p class="text-sm "> ${video.description} </p>
  `
  //way 1
  // document.getElementById("customModal").showModal();
  // way2
  document.getElementById("showModalData").click();
}


const loadCategoryVideo = (id) =>{
 
  
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then((response) =>response.json())
  .then((data)=>{
    const activeBtn=document.getElementById(`btn-${id}`);
    activeBtn.classList.add('active');
    console.log(activeBtn);
    displayVideos(data.category);
  })
  
  .catch((error) =>console.log(error));
  
};


const displayVideos = (videos) => {
  const videoContainer=document.getElementById("video-container");
  // console.log(videoContainer);
  videoContainer.innerHTML='';
  
  if(videos.length == 0 ){
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML=`

  <div class="min-h-screen py-6 mx-2 flex flex-col gap-4 items-center justify-center border-4 rounded-2xl border-[red] bg-[#ff7f50] font-bold text-center">
    <img src="./assets/Icon.png" alt="Ooops! Sorry There is no <br> content here">
    <h3 class="text-4xl" >Ooops! Sorry There is no <br> content here</h3>
    
  </div>
  

    `;
    return;
  }
  else{
      videoContainer.classList.add("grid");
  }
  
  videos.forEach((video)=>{
    const verifiedIcon = video.authors[0].verified ? './assets/badge.png' : '';
    const cards=document.createElement("div");
    cards.classList="card";
    cards.innerHTML=`
    <div class="card card-compact">
  <figure class="relative">
    <img class="card-image"
      src="${video.thumbnail}"
      alt="Videos" />

         ${
          video.others.posted_date?.length === 0 ? '' 
          : `<span class="date" alt="." />${getTime(video.others.posted_date)}</span>`
         }

    
      
  </figure>
  <div class="card-body">
    <h2 class="card-title text-[#222f3e] font-bold text-xl">
    ${video.title}
      
    </h2>
    <div class="card-meta flex gap-2 items-center  align-center">
      <img class="avatar profile-avatar avatar-sm border-4 border-[#a4b0be] " src="${video.authors[0].profile_picture}" alt="." />
      <div class="flex gap-4 pt-1 items-center">
      <p class="font-bold pt-2 text-lg text-[#130f40]">${video.authors[0].profile_name}</p>
       ${verifiedIcon ? `<img class="avatar avatar-sm mt-[1em]" src="${verifiedIcon}" alt="Verified" />` : ''}
    </div>
      
    </div>
    
    <div class="card-actions justify-start font-bold">
      
      <div class="badge text-[#1e272e] bg-[#d1d8e0] w-4/12 h-[2em] border-2 border-[#0fbcf9]">${video.others.views}</div>
      <button id="loader" onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Show Details</button>
    </div>
  </div>
</div>
    `;
    
    videoContainer.appendChild(cards);

  })
}


loadCategories();
loadVideos();


















