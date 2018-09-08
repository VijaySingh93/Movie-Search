$('#reset-title').click(()=>{
  $('#title').val("");
  $('#year').val("");
  $('#ID').val("");
  $('.movie-class').empty();
});

$('#reset-id').click(()=>{
  $('#imdbID').val("");
  $('#title').val("");
  $('#year').val("");
  $('.movie-class').empty();
});

$('#search-title').click(()=>{
  $('#imdbID').val("");
  $('.movie-class').empty();
$.ajax({
    url: 'https://www.omdbapi.com/?apikey=350a1cf5&s='+$('#title').val()
}).done((response) =>{
      if(response.Response == "False"){
        alert("Please check the title of the movie");
      }
let movies = response.Search;
if($('#year').val()){
        var yearMatched = 0;
                for(movie in movies){
                      if(movies[movie].Year === $('#year').val()){
                        yearMatched = 1;
                        let card = `<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                                        <div class="card" style="width:300px;margin-bottom:20px;">
                                          <img class="card-img-top" style="" src=${movies[movie].Poster} alt="poster">
                                          <div class="card-body text-center">
                                            <p class="card-text ">
                                            <h4>${movies[movie].Title}</h4>
                                            Year : ${movies[movie].Year}<br>
                                            Type : ${movies[movie].Type}<br>
                                            ImdbId : ${movies[movie].imdbID}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                  `;
                                  $('.movie-class').append(card);
                                  if(movies[movie].Poster == "N/A"){
                                    $('.card-img-top').eq(movie).attr("src","default.jpg");
                                  }
                      }

                }
          if(yearMatched == 0){
            alert("No Movie for this name and year combination");
          }
      }
if(!$('#year').val()){
        for(movie in movies){
                let card = `<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4 d-flex align-items-stretch justify-content-center">
                                <div class="card" style="margin-bottom:20px;">
                                  <img class="card-img-top" style="height:400px" src=${movies[movie].Poster} alt="poster">
                                  <div class="card-body text-center">
                                    <p class="card-text ">
                                    <h4>${movies[movie].Title}</h4>
                                    Year : ${movies[movie].Year}<br>
                                    Type : ${movies[movie].Type}<br>
                                    ImdbId : ${movies[movie].imdbID}
                                    </p>
                                  </div>
                                </div>
                            </div>
                          `;
                          $('.movie-class').append(card);
                          if(movies[movie].Poster == "N/A"){
                            $('.card-img-top').eq(movie).attr("src","default.jpg");
                          }

        }
      }
    }).fail((err) =>{
      console.log(err);
    })
  });




$('#search-id').click(()=>{
  $('#title').val("");
  $('#year').val("");
  $('.movie-class').empty();
  $.ajax({
    type: 'GET',
    dataType: 'json',
    async: true,
    url: 'https://www.omdbapi.com/?apikey=350a1cf5&i='+$('#ID').val(),
})
    .done( (response) =>{
      if(response.Response == "False"){
        alert("No movie found with this ID");
      }

      if(response.Response != "False"){
        let card = `<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4 d-flex justify-content-center">
                        <div class="card" style="width:300px;margin-bottom:20px;">
                          <img class="card-img-top" style="height:300px" src=${response.Poster} alt="poster">
                          <div class="card-body text-center">
                            <p class="card-text ">
                            <h5>${response.Title}</h5><br>
                            <div style="border-top:1px solid grey">Type : ${response.Type}</div><br>
                            <div style="border-top:1px solid grey">Production : ${response.Production}<br></div><br>
                            <div style="border-top:1px solid grey">Plot : ${response.Plot}<br></div><br>
                            <div style="border-top:1px solid grey">Year : ${response.Year}<br></div><br>
                            <div style="border-top:1px solid grey">Released : ${response.Released}<br></div><br>
                            <div style="border-top:1px solid grey">Imdb Rating : ${response.imdbRating}<br></div><br>
                            <div style="border-top:1px solid grey">Runtime : ${response.Runtime}<br></div><br>
                            <div style="border-top:1px solid grey">Genre : ${response.Genre}<br></div><br>
                            <div style="border-top:1px solid grey">Language : ${response.Language}<br></div><br>
                            <div style="border-top:1px solid grey">Actors : ${response.Actors}<br></div><br>
                            <div style="border-top:1px solid grey">ImdbId : ${response.imdbID}<br></div>
                            </p>
                          </div>
                        </div>
                      </div>
                  `;
                  $('.movie-class').append(card);
                  if(response.Poster == "N/A"){
                    $('.card-img-top').attr("src","default.jpg");
                  }
      }

    }).fail((err) => {
      console.log(err);
    });
});
