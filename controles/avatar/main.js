 (function(){

    document.querySelector("#file-uploader")
        .addEventListener("change",function(ev){
                let files = ev.target.files;
                let image = files[0];
                let imageUrl= URL.createObjectURL(image);

                document.querySelector(" .img")
                    .style.backgroundImage="url('"+imageUrl+"')";
                
        })


 })()