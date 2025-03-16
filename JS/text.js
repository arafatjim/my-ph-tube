


function convertTime(seconds){
          var hours=Math.floor(seconds/3600);
          var minutes=Math.floor((seconds%3600)/60);
          var remainingSeconds=seconds%60;
          return hours+" hour "+minutes+" minute "+remainingSeconds+" second";
}
var seconds=12345;
console.log(convertTime(seconds));
//   <h3 class="card-title">${item.title}</h3>
//     <p class="card-description">${item.description}</p>
//     <div class="card-meta"></div>
//       <span class="date">${item.others.posted_date}</span>
console.log("netlify deploy");