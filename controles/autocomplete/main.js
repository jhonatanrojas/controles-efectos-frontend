class Search{

    static get(url){

        let xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send();

        return new Promise ((resolve,reject)=>{


        xhr.onreadystatechange= ()=>{

            if(xhr.readyState==4){
                if(xhr.status==200){
                    //Todo salio Bien
                    resolve(JSON.parse(xhr.responseText));
                }else{

                    reject(xhr.status);
                    //Algo salio Mal

                }

            }
        }

        });

    }

}

class Autocomplete {
    constructor(input_selector,baseUrl){

        this.search =this.search.bind(this);
        this.input=document.querySelector(input_selector);
        this.url=baseUrl;
        this.buildDatalist();
        this.bindEvents();
        this.value="";
        this.interval=null;

    }

    bindEvents(){
        this.input.addEventListener("keyup",()=>{

            if(this.input.value ==  this.value || this.input.value == "" ) return;
          
            if(this.interval) window.clearInterval(this.interval);

            this.value =  this.input.value;
    

          

            this.interval = window.setTimeout( this.search(), 500);

        })
    }
    search(){


        Search.get(this.url+this.value).then(results=>this.build(results))
    }
    buildDatalist(){
        this.dataList = document.createElement("datalist");
        let id="datalist-autocomplete"+  this.makeid(4);
        this.dataList.id = id;
        document.querySelector("body").appendChild(this.dataList);
        this.input.setAttribute("list",id);
    }
    build(response){
     
        this.dataList.innerHTML = "";
        response.items.forEach(item => {
            let optionEl = document.createElement("option");
            optionEl.value=item.volumeInfo.title;
            if(item.volumeInfo.subtitle)
                optionEl.innerHTML=item.volumeInfo.subtitle;

                this.dataList.appendChild(optionEl);
        });

    }

     makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     
}

(function(){
    const GoogleURL="https://www.googleapis.com/books/v1/volumes?q=";
 let autocomplete =  new Autocomplete("#searched",GoogleURL);
 

})()