const burgerFunction=()=>{
  const x = document.getElementById("catMenu");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

}

const menu = async ()=> {
    try{
      const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    data.data.news_category.forEach((data)=>{
        const newsCat = document.getElementById('menuDown');
        newsCat.innerHTML+=`
        <button onclick="news(${data.category_id})" class="cat--button">${data.category_name}</button>
        `;
    })   
    }
    catch(err){
      console.log(err);
    }
}

menu();

const news = async (news_data)=>{
    try{
    const url = `https://openapi.programming-hero.com/api/news/category/0${news_data}`;
    loadRing(true);
    const res = await fetch(url);
    const data = await res.json();
    const newsCat = document.getElementById('news--cards');
    const newsCount = document.getElementById('newsCount');
    const numberNews = data.data.length;
    newsCount.innerText = `${numberNews} news found`;
    newsCat.innerHTML=``;
    if(numberNews>0){
      data.data.sort((a, b) => b.total_view - a.total_view);
        data.data.forEach((data)=>{
            newsCat.innerHTML+=`
            <div class="card">
            <div class="card--img"><img src="${data.thumbnail_url}" alt=""></div>
            <div class="card--text">
                <h3>${data.title}</h3>
                <p>Published Date:${data.author.published_date}</p>
                <p class="card--details">${data.details.slice(0,150)}.....</p>
                <div>
                    <div class="card--bottom">
                        <div class="author">
                          <img src="${data.author.img?data.author.img:'No data'}" alt="">
                          <p>Reported by: ${data.author.name? data.author.name : 'No Data'}</p>
                        </div>
                        <div>
                            <p>views: ${data.total_view?data.total_view:'No Views'}</p>
                            <p>Rating: ${data.rating.number?data.rating.number:'No data'}</p>
                        </div>
                        <button onclick="newsDetails('${data._id}')">Readmore</button>
                    </div>
                </div>
            </div>
        </div>
            `;
        })   
    }
    else{
        newsCat.innerHTML="No News";
    }
    loadRing(false);
    }
    
    catch(err){
      console.log(err);
    }
    
} 

const newsDetails = async (dataDetails)=>{
    try{
      const url = `https://openapi.programming-hero.com/api/news/${dataDetails}`;
    const res = await fetch(url);
    const data = await res.json();
    const newsDetails = document.getElementById('newsDetails');
    newsDetails.innerHTML=
    `<div class="modal--content">
    <span class="close">&times;</span>
    <div class="card--img"><img src="${data.data[0].thumbnail_url}" alt=""></div>
    <div class="card--text">
        <h3>${data.data[0].title}</h3>
        <p>Published Date:${data.data[0].author.published_date}</p>
        <p class="card--details">${data.data[0].details}</p>
        <div>
            <div class="card--bottom">
                <div class="author">
                  <img src="${data.data[0].author.img}" alt="">
                  <p>Reported by: ${data.data[0].author.name? data.data[0].author.name : 'No Data'}</p>
                </div>
                <div>
                    <p>views: ${data.data[0].total_view?data.data[0].total_view: 'No Views'}</p>
                    <p>Rating: ${data.data[0].rating.number}</p>
                </div>
            </div>
        </div>
    </div>
</div>`
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = ()=>{
      modal.style.display = "none";
    }
    window.onclick = (event)=>{
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
   
    }
    catch(err){
      console.log(err);
    }
};


const loadRing=(swtch)=>{
  const ringLoad = document.getElementById('ring');
  if(swtch){
    ringLoad.style.display= "block";
  }
  else{
    ringLoad.style.display= "none";
  }
}