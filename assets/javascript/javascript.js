var catsList = ["fish","dogs","eggs","banjo","james+franco","hat","space","blanket","ball","falling","scared","funny","burrito"];
// Function for displaying the pokemon buttons
function renderButtons() 
{
    // Delete the content inside the buttons-view div prior to adding new catsand buttons
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loop through the array of terms, then generate buttons for each term in the array
    $(catsList).each(function(index,listItem)
    {
        var buttonToAdd = $("<button>");
        buttonToAdd.addClass("catsButton");
        buttonToAdd.attr("data-name", listItem);
        buttonToAdd.text(listItem);
        $("#buttons-view").append(buttonToAdd);
    });
 };


 function getGifs(searchTerm)//get the new gifs and display them
 {

	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=cats+" + searchTerm
	//dc6zaTOxFJmzC a public key
	//console.log(queryURL);
	$.ajax(
	{
		url: queryURL,
		method: "GET"
	}).done(function(gifSearch)
	{
		//clear out any previous results
		$("#content-area").empty();
		//for each gif in the data returned, add the rating and picture
		$(gifSearch.data).each(function(index,element)
		{
			var rating = element.rating;//save the rating
			var gifDiv = $("<div class='catsDiv'>");//create a div for the elements
			var p = $("<p>").text("Rating: " + rating);//create a p for our rating text
			var catsImage = $("<img>");//create an image to hold our picture
			$(catsImage).attr("src", element.images.fixed_height_still.url);//we start out still
			$(catsImage).addClass("aGif");//i'll detect a click with this later
			$(catsImage).attr("data-still",element.images.fixed_height_still.url);//save the still url
			$(catsImage).attr("data-animate",element.images.fixed_height.url);//save the animated url
			$(catsImage).attr("data-state","still");//create a location to store the status of the image
			//build our gifDiv and append it to our content area
			gifDiv.append(p);
			gifDiv.append(catsImage);
			gifDiv.addClass("float-left bg-light border border-light")
			$("#content-area").append(gifDiv);
		});

	});
 	
 }

 renderButtons();

 $(document).on("click", ".catsButton", function() //hey someone clicked a catsAnd button! do stuff!
 {
 	getGifs($(this).data("name"));
 });

 $(document).on("click", "#add-cats", function(event) //hey someone entered a term! do stuff!
 {
 	event.preventDefault();//don't actually submit anything to anywhere
     // Capture User Input
 	catsList.push($("#cats-input").val().trim());//push it onto the array
 	renderButtons();//make the buttons again with the new term
 });

 $(document).on("click", ".aGif", function(event) //hey someone clicked a gif! do stuff!
 {
 	//check the current state
    if($(this).data("state") == "still")
    {
    	$(this).data("state","animate");//change the state var
        $(this).attr("src",$(this).attr("data-animate"));//change the pic url
    }
    else
    {
    	$(this).data("state","still");//change the state var
    	$(this).attr("src",$(this).attr("data-still"));//change the pic url
    }

 });