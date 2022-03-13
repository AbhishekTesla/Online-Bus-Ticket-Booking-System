const creatNav = ()=>{
    let nav = document.querySelector('.header');
    nav.innerHTML=`
        <div class="left">
         
             <h2 class="left-text">BusBooket.com
             </h2>
            <!-- <img src="https://us.123rf.com/450wm/maxkabakov/maxkabakov1601/maxkabakov160103267/51160967-tourism-concept-painted-red-bus-icon-on-black-brick-wall-background.jpg?ver=6"
                height="100px" width="150px" alt=""> -->



        </div>

        <div class="mid">
            <nav class="navmenu">
                <ul>
                    <li><a href=""> Book Tickets</a></li>
                    <li><a href="">Why Book With Us?</a></li>
                    <li><a href="">Popular Bus Routes</a></li>
                    <li><a href=""> Contact Us</a></li>
                </ul>
            </nav>

        </div>
     


        <div class="right">
       
         <a   class="user-btn"><img id="user-img" src="https://cdn-icons-png.flaticon.com/512/64/64572.png" height="65px" alt="">
         <div class="login-logout-popup hide">
         <p class="account-info"></p>
         <button class="btn-new" id="user-btn">Sign in</button>
        <br>
        <br>
         <button class="btn-new-2" id="user-btn-2">Sign Up</button>
         </a>
        </div>
        

  
    `
}

creatNav();


//nav popup

const userImageButton=document.querySelector('#user-img');
const userPoppup=document.querySelector('.login-logout-popup');
const popuptext=document.querySelector('.account-info');

const actionBtn=document.querySelector('#user-btn');
const actionBtn_2=document.querySelector('#user-btn-2');




userImageButton.addEventListener('click',()=>{
    userPoppup.classList.toggle('hide');      //hide is class name
})



window.onload = () =>{
    let user=JSON.parse(sessionStorage.user || null);
    if(user!=null){
        //means user is logged in 
        popuptext.innerHTML=`log in as, ${user.naam}`;
        actionBtn.innerHTML=`log out`;
     actionBtn.addEventListener('click',()=>{
         sessionStorage.clear();
         location.reload();
     })

     actionBtn_2.style.display='none';
    }

    else{
        
        //user is logged out
        actionBtn.addEventListener('click',()=>{
            location.href='/login';
          
            
          
        })

        actionBtn_2.addEventListener('click',()=>{
            location.href='/signup';
        })
        
    }

    

}

























