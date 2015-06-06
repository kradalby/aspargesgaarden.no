
window.addEventListener("load", function(){

    var thumbs = document.querySelectorAll(".thumb")
    
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener("click", function(e){
            var currentPreview = document.getElementById("preview")
            currentPreview.src = this.src
        })
    }
})
