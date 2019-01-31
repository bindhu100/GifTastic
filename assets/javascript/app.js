
$(document).ready(function(){
    // display button
    var displayButton =["cat","dog","fish","sky"];

    // display image
    function dispalyimage (){
        $("#display-Image").empty();
        var input =$(this).attr("data-name");
        var limit =10;
        // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        // input + "&limit=" + limit+"&api_key=dc6zaTOxFJmzC";
        // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input  + limit + "&api_key=dc6zaTOxFJmzC";   
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";   
        // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";

        $.ajax({
            url:queryURL,
            method:"get"

        }).then(function(response){
          for(var i=0; i<limit; i++){

            var displayDiv = $("<div>");
            displayDiv.addClass("holder");

            var image = $("<img>");
            image.attr("src", response.data[i].images.original_still.url);
            image.attr("image-still",response.data[i].images.original_still.url);
            image.attr("image-animated",response.data[i].images.original.url);
            image.attr("data-state", "still");
            image.attr("class", "gif");
            displayDiv.append(image);
            
            var rating = response.data[i].rating;
            console.log(response);
            var pRating = $("<p>").text("Rating: "+ rating);
            displayDiv.append(pRating)

            $("#display-Image").append(displayDiv);


          }
        })

    }
        // adding button
     function renderButtons(){
         $("#button-Display").empty();

         for(var b=0; b<displayButton.length; b++){
             var newbutton =$("<button>");
             newbutton.attr("class", "btn btn-secondary");
             newbutton.attr("id", "input");
             newbutton.attr("data-name",displayButton[b]);
             newbutton.text(displayButton[b]);
             $("#button-Display").append(newbutton);


         }
     }


    //  8888888888888888888888888888888888888888888888
    // to clear the user input text box
            function ClearFields() {

                document.getElementById("user-Input").value = "";
                
            }
        // 88888888888888888888888888888888888888888888888888
        //  image change
     function imageChange(){
         var state =$(this).attr("data-state");
         var animatedImage =$(this).attr("image-animated");
         var stillImage=$(this).attr("image-still");

         if (state == "still"){
             $(this).attr("src",animatedImage);
             $(this).attr("data-state", "animate");
         }

         else if(state == "animate"){
            $(this).attr("src",stillImage);
            $(this).attr("data-state", "still");
         }
     }

     $("#submitButton").on("click", function(){
         var input =$("#user-Input").val().trim();

        
        
         displayButton.push(input);
         renderButtons();

        // 88888888888888888888888888888888888888888888888888888

        ClearFields();
        
        //88888888888888888888888888888888888888888888888888888 
         return false;




     })
     // Calling the renderButtons function at least once to display the initial list of movies
     renderButtons();
    //  movie name button it will display 
     $(document).on("click","#input", dispalyimage);
     $(document).on("click", ".gif", imageChange);
});
