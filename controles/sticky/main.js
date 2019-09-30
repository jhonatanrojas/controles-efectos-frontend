(function(){
    let pinged=false;
    let nav = document.querySelector(".nav");
    let stickyScrollPoint=document.querySelector(".hero-image").offsetHeight;    
console.log(stickyScrollPoint)
    function pingToTop(){
        if(pinged) return;

        nav.classList.add("pined");
        pinged=true;

    }

    function pingFromTop(){
        if(!pinged) return;

        nav.classList.remove("pined");
        pinged=false;

    }


    window.addEventListener('scroll',function(ev){
        let coords =nav.getBoundingClientRect();

        console.log(coords)
        if(window.scrollY < stickyScrollPoint) return pingFromTop();
        if(coords.top <=0 ) return pingToTop();

        pingFromTop();
      
    
    })


})();