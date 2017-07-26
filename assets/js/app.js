var gifsearch = [];
var gifResult = [];
var searchbar;
var resultGif
var giphysearchbuttons;
var giphsgalore = $("#giphsgalore");
var APIKey = "91f77c2fb99a4a739166601f74a2e385";
var giphyURL="https://api.giphy.com/v1/gifs/search?"
var state = "animate";
var resultGifDiv;
var resultGifPara;
var usersSearched = [];

console.log("we loaded right")
function loadSearch() {

	giphysearchbuttons = $("#giphysearchbuttons");
	var usersearch = $("#usersearch").val();
	// console.log(typeof(usersSearched.indexOf(usersearch)))

	if(usersSearched.indexOf(usersearch) === -1 ){
		usersSearched.push(usersearch)
		searchbar = $("<button>");
		searchbar.attr("data-value", usersearch );
		searchbar.text(usersearch);
		searchbar.addClass("btn btn-info giphybutton");
		giphysearchbuttons.append(searchbar);
	}
}



function loadGifs() {

	//Do space separation if search term has a space
	var searchTermwithSpace = $(this).attr("data-value");
	var searchTerm = searchTermwithSpace.split(" ").join("+")
	console.log ("They selected : " + searchTerm);
	giphsgalore.empty();
	var ajaxURL = giphyURL+"q="+searchTerm+"&api_key="+APIKey;
	console.log(ajaxURL);
	// Make that AJAX call
	$.ajax({
      url: ajaxURL,
      method: 'GET',
    }).done(function(result) {
		console.log(result)
		gifResult = result.data;
		for (var i in gifResult) {
			var gifCard = $("<div>");
			gifCard.addClass("card giphimgdiv");

			resultGifDiv = $("<div>");
			resultGifDiv.addClass("card-block");
			resultGifDiv.append("<p class='card-text'> Rating : " + gifResult[i].rating + "</p>");


			resultGif = $("<img>");
			resultGif.attr("data-value", gifResult[i].id);
			resultGif.attr("animate-url", gifResult[i].images.fixed_height.url);
			resultGif.attr("still-url", gifResult[i].images.fixed_width_still.url);
			resultGif.attr("state", "animate");
			resultGif.addClass("giph card-img-top");
			resultGif.attr("src", gifResult[i].images.fixed_height.url);

			gifCard.append(resultGif);
			gifCard.append(resultGifDiv);

			giphsgalore.append(gifCard);

		}

	})



}

function changeState (){
	var giphSelected = $(this);

	if(giphSelected.attr("state") === "animate") {
		giphSelected.attr("state", "still")
		giphSelected.attr("src", giphSelected.attr("still-url"));
	}else {
		giphSelected.attr("state", "animate");
		giphSelected.attr("src", giphSelected.attr("animate-url"));
	}


}

$(document).ready(function(){
	// $("#search").on("click", loadSearch);
	$(document).on("click", "#search", loadSearch);
	$(document).on("click", ".giphybutton", loadGifs)
	$(document).on("click", ".giph", changeState)
})