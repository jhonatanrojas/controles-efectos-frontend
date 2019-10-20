class DOMHelper {

    static move(el, coords) {
        el.style.top = (coords.y - (el.clientHeight / 2)) + "px";
        el.style.left = (coords.x - (el.clientWidth / 2)) + "px";

    }
    static isOver(el, pointerCoords) {
        let elCoords = el.getBoundingClientRect();
        if (pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)) {
            if (pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)) {
               return true;
            }

        }

        return false;
       // el.style.background="inherit";

    }


    static whereIs(el, pointerCoords) {

        let elCoords = el.getBoundingClientRect();
        if (pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)) {
            if (pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)) {
                if (pointerCoords.y > elCoords.top + (elCoords.height / 2)) return 1;
                return 2;
            }

        }

        return -1;
    }
}

class DragList {

    constructor(list_selector, item_selector = "li") {

        this.list = document.querySelector(list_selector);
        this.items = this.list.querySelectorAll(item_selector);
        this.finalPosition=-1;
        this.finalElementHover= null;
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.canvas = document.createElement("canvas");
        this.bindFakeElement();

        this.bindEvents();

    }

    bindFakeElement() {

        this.fakeElement = document.createElement("div");

        this.fakeElement.style.background = "#eee";
        this.fakeElement.classList.add("card");
       // this.list.appendChild(this.fakeElement);
    }

    bindEvents() {
        this.items.forEach(item => {
            item.addEventListener("dragstart", this.handleDragStart);
            item.addEventListener("drag", this.handleDrag);
            item.addEventListener("dragend", this.handleDragEnd);


        });
    }
    handleDragStart(ev) {
        console.log("drag start")
        let el = ev.currentTarget;
        el.classList.add("dragging")
        ev.dataTransfer.setDragImage(this.canvas, 0, 0);


    }



    handleDrag(ev) {
        let mauseCoord ={ x: ev.clientX, y: ev.clientY };
        DOMHelper.move(ev.currentTarget,mauseCoord );

        if(DOMHelper.isOver(this.list,mauseCoord)){

            this.items.forEach(item =>{
           
                if(item== ev.currentTarget) return;
             let result=   DOMHelper.whereIs(item,mauseCoord);
    
             if(result== -1) return;
             this.finalPosition= result;
             this.finalElementHover= item;

             if(result==1)
             this.list.insertBefore(this.fakeElement,item.nextSibling);
             if(result==2)
             this.list.insertBefore(this.fakeElement,item);
            } );

        }else{
            this.fakeElement.remove();
        }
        
    
    }

    handleDragEnd(ev) {
        console.log("drag end")

        let el = ev.currentTarget;
        el.classList.remove("dragging");
        el.style.top = "";
        el.style.left = "";
      

        if(this.finalPosition==1)
        this.list.insertBefore(el,this.finalElementHover.nextSibling);
        if(this.finalPosition==2)
        this.list.insertBefore(el,this.finalElementHover);
    }

}

(function () {
    new DragList('ul');
})()