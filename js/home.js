export class Home {
    constructor(){
  
       
    }
     food=[];
    async getFoot(){
        const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=a') ;
        let res = await api.json();
        food=res;
        console.log(res);
        disP()
    }
     disP(){
        var carton=``;
        for(let i=0;i<foot.length;i++){
        carton+=` 
          <div class="col-md-3">
        <img src="${foot[i].strMealThumb}" alt="">
        <h1></h1>
        </div>`
        }
        document.getElementById('row').innerHTML=carton;
    }
}