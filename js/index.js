let section1= document.querySelector('#section1');
let SearchBtn=document.getElementById('SearchBtn');
let submitBtn;
$(document).ready(()=>{
getMeals('').then(()=>{
    $(".louding").fadeOut(1000)
    $("body").css("overflow","visible")
})
})
function openNav(){
    $('.side-nav-menu').animate({left:0},500);
    $('.open-close-icon').addClass('fa-x');
    $('.open-close-icon').removeClass('fa-align-justify');
    for(let i=0;i<5;i++){
        $('.links li').eq(i).animate({top:0},(i+5)*100);
    }
}
function closeNav(){
let widths= $('.side-nav-menu .nav-tab').outerWidth();
    $('.side-nav-menu').animate({left:-widths},500);
    $('.open-close-icon').addClass('fa-align-justify');
    $('.open-close-icon').removeClass('fa-x');
    $('.links li').animate({top:300},500);
}
$('.side-nav-menu i.open-close-icon').click(()=>{
if($('.side-nav-menu').css('left')== '0px'){
 closeNav()
}else{
  openNav()
}
})
closeNav();

async function getMeals(dat){
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dat}`);
     res= await res.json();
    // console.log(res.meals)
    disPlayMeals(res.meals)
}

function disPlayMeals(fee){
let carton = ``;
for(let i=0;i<fee.length;i++){
    carton+=`     <div class="col-md-3">
    <div onclick="getDetails('${fee[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 curP">
        <img class="w-100" src="${fee[i].strMealThumb}" alt="">
        <div class="meal-layer position-absolute d-flex align-items-center px-2">
             <h3>${fee[i].strMeal}</h3>
        </div>
    </div>
</div>`
}
section1.innerHTML=carton;
}

async function getCategory(){
    SearchBtn.innerHTML='';
    let cate= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    cate=await  cate.json();
       disPlayCate(cate.categories)
}


function disPlayCate(fee){
    let carton = ``;
    for(let i=0;i<fee.length;i++){
        carton+=`     <div class="col-md-3">
        <div onclick="getCategoryMeal('${fee[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 curP">
            <img class="w-100" src="${fee[i].strCategoryThumb}" alt="">
            <div class="meal-layer position-absolute px-2">
                 <h3>${fee[i].strCategory}</h3>
                 <p>${fee[i].strCategoryDescription.split(' ').slice(0,10).join(' ')}</p>
            </div>
        </div>
    </div>`
    }
    section1.innerHTML=carton;
    }

    async function getCategoryMeal(category){
        let cate= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        cate=await  cate.json();
        disPlayMeals(cate.meals.slice(0,20))
    }



    async function getArea(){
        SearchBtn.innerHTML='';
        let area= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        area=await  area.json();
           disPlayArea(area.meals)
    }

    function disPlayArea(fee){
        let carton = ``;
        for(let i=0;i<fee.length;i++){
            carton+=`     <div class="col-md-3">
            <div onclick="getAreaMeal('${fee[i].strArea}')" class=" rounded-2 text-center text-white curP">
            <i class="fa-solid fa-house fa-2x"></i>
                     <h3>${fee[i].strArea}</h3>
            </div>
        </div>`
        }
        section1.innerHTML=carton;
        }

        async function getAreaMeal(area){
            let cate= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
            cate=await  cate.json();
            disPlayMeals(cate.meals.slice(0,20))
        }

        async function getIngredients(){
            SearchBtn.innerHTML='';
            let area= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            area=await  area.json();
               disPlayIngredients(area.meals.slice(0,25))
        }
    
        function disPlayIngredients(fee){
            let carton = ``;
            for(let i=0;i<fee.length;i++){
                carton+=`     <div class="col-md-3">
                <div onclick="getIngredientMeal('${fee[i].strIngredient}')" class=" rounded-2 text-center text-white curP">
                <i class="fa-solid fa-drumstick-bite fa-3x text-center pb-1"></i>
                         <h3>${fee[i].strIngredient}</h3>
                         <p>${fee[i].strDescription.split(' ').slice(0,15).join(' ')}</p>
                </div>
            </div>`
            }
            section1.innerHTML=carton;
            }
        
            async function getIngredientMeal(ingrd){
                
                let cate= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrd}`);
                cate=await  cate.json();
                disPlayMeals(cate.meals.slice(0,20))
            }

            async function getDetails(sid){
                SearchBtn.innerHTML='';
                let cate= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${sid}`);
                cate= await  cate.json();
                // console.log(cate.meals[0]);
                displayDetails(cate.meals[0]);
               
            }

            function displayDetails(meal){
               let ing = ``;
               for(let i=1;i<=20;i++){
                if(meal[`strIngredient${i}`]){
                   ing +=`<li class="alert alert-info p-1 m-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
             
                }
               }
               
               let tags = meal.strTags?.split(',')
               if( !tags ) tags =[]
               let tagM =``;
               for(let i=0;i< tags.length;i++){
                tagM +=`<li class="alert alert-danger p-1 m-2">${tags[i]}</li>`
               }
               
                let carton=`
                <div class="col-md-4 text-white">
                <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="">
                <h2> ${meal.strMeal}</h2>

            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area :</span> ${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span> ${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex flex-wrap g-3">
                    ${ing}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex flex-wrap g-3">
                  ${tagM}
                </ul>
                <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
                <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
            </div>
                `
                section1.innerHTML = carton ;
            }

function showInput(){
    SearchBtn.innerHTML=`
    <div class="col-md-6">
    <input onkeyup="searchByName(this.value)"  class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
</div>
<div class="col-md-6">
    <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Litter">
</div>
    `
    section1.innerHTML=""
}

 async   function searchByName(tr){
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${tr}`);
    response=await  response.json();
    response.meals ? disPlayMeals(response.meals) :disPlayMeals([])
    }


 async   function searchByFirstLetter(tr){
    tr == ""? tr="a":"";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${tr}`);
    response=await  response.json();
    response.meals ? disPlayMeals(response.meals) :disPlayMeals([])
    }
      
    function showCont(){
        section1.innerHTML=`
        <div class="contect d-flex min-vh-100 justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input onkeyup="bigFunData()" id="nameInput" class="form-control"  type="text" placeholder="Enter Your Name">
                </div>
                <div class="col-md-6">
                    <input onkeyup="bigFunData()" id="emailInput"  class="form-control"  type="email" placeholder="Enter Your Email">
                </div>
                <div class="col-md-6">
                    <input onkeyup="bigFunData()" id="phoneInput"  class="form-control"  type=" number" placeholder="Enter Your Phone">
                </div>
                <div class="col-md-6">
                    <input onkeyup="bigFunData()" id="ageInput" class="form-control"  type="number" placeholder="Enter Your Age">
                </div>
                <div class="col-md-6">
                    <input onkeyup="bigFunData()" id="passwordInput" class="form-control"  type="password" placeholder="Enter Your Password">
                </div>
                <div class="col-md-6">
                    <input onkeyup="bigFunData()" id="repasswordInput" class="form-control"  type="password" placeholder="Repassword">
                </div>
            </div>
            <button id="submitBtn" disabled class="  btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div>
        `
        submitBtn = document.getElementById('submitBtn');
    }

    function bigFunData(){
       if(nameV()&&
       emailV()&&
       phoneV()&&
       ageV()&&
       passV()&&
       repassV()){
        submitBtn.removeAttribute('disabled')
       }else{
        submitBtn.setAttribute('disabled')
       }
    }

function nameV(){
    return (/^[a-zA-Z ]+$/.test(document.getElementById('nameInput').value))
}
function emailV(){
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('emailInput').value))
}
function phoneV(){
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById('phoneInput').value))
}
function ageV(){
    return (/^\S[0-9]{0,2}$/.test(document.getElementById('ageInput').value))
}
function passV(){
    return (/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(document.getElementById('passwordInput').value))
}
function repassV(){
    return (document.getElementById('repasswordInput').value == document.getElementById('passwordInput').value)
}