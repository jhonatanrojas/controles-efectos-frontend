class TabsManager{
    
    constructor(selector_tabs,controls_selector,inidicador_selector){
        this.tabs =document.querySelector(selector_tabs);
        this.controls =document.querySelectorAll(controls_selector);
        this.indicador =document.querySelector(inidicador_selector);
        this.handleClick=this.handleClick.bind(this);
        this.setIndicatorWidth();
   
        this.bindEvents();


    }
    setIndicatorWidth(){
        this.indicador.style.width= this.controls[0].clientWidth +"px";

    }
    bindEvents(){
        this.controls.forEach(button => {
            button.addEventListener("click",this.handleClick);
        });

    }
    handleClick(ev){
        ev.preventDefault();

        let button = ev.currentTarget;
 
        let position=IndexForSiblings.get(button);

        this.indicador.style.left= (position * this.indicador.clientWidth)+ "px";

        this.openTab(button.hash,position)
    }

    openTab(hash,position){
  
        let tab = document.querySelector(hash);
       
     this.tabs.querySelector(".container").style.left= -(position * 100)+ "%";
    }
}

class IndexForSiblings{

    static get(el){
        let children =el.parentNode.children;

        for (let index = 0; index < children.length; index++) {

            let child =children[index];
            if(child ==el) return index;
            
        }
    }
}

new TabsManager(".tabs",".tabs-controls a",".indicator")