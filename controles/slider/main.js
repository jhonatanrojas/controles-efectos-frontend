class IndexForSiblings{

    static get(el){
        let children =el.parentNode.children;

        for (let index = 0; index < children.length; index++) {

            let child =children[index];
            if(child ==el) return index;
            
        }
    }
}

class Slider{
    constructor(selector, movimiento=true){
        this.move = this.move.bind(this);
        this.moveByButtom = this.moveByButtom.bind(this);
        
        this.slider=document.querySelector(selector);
        this.interval=null;
        this.contador=0;
        this.start();
      
        this.itemsCount = this.slider.querySelectorAll( ".container > *").length;
        this.buildControls();
        this.bindEvents();
        this.movimiento=movimiento;

    }

    start(){
        if(!this.movimiento) return;
        this.interval =window.setInterval(this.move,3000)

    }

    move(){

      
       
        this.contador++;
        if(this.contador > this.itemsCount -1) this.contador=0;
        this.moveTo(this.contador);

    }


    moveTo(index){
        let left =index*100;
 
        this.resetIndicator();
        this.slider.querySelector(".container").style.left="-"+left+"%";  

        this.slider.querySelector(".controls li:nth-child("+(index+1)+")").classList.add("active");

    }
    buildControls(){

        for (let index = 0; index < this.itemsCount ; index++) {
            
           
          
            let control = document.createElement("li");
            if(index==0) control.classList.add("active");
            this.slider.querySelector(".controls ul").appendChild(control);
      
            
        }

    }
    resetIndicator(){

        this.slider.querySelectorAll(".controls li.active").forEach(element => element.classList.remove("active"));
    }

    bindEvents(){
        this.slider.querySelectorAll(".controls li").forEach(
            element => {
                element.addEventListener("click",this.moveByButtom)
            });


    }

    moveByButtom(ev){
        let index = IndexForSiblings.get(ev.currentTarget);
        this.contador=index;
        this.moveTo(index);
        this.restart()

    }
    restart(){
        if(this.interval) window.clearInterval(this.interval);
        this.start();


    }
}


(function(){

         new Slider(".slider");
})();