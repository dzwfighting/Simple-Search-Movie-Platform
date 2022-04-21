$(function ($) {
    let requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows'
    };
    $.ajax(requestConfig).then((responseMessage) => {
        $.each(responseMessage, function(index, value){
            let a = $('<a>').html(value.name).attr("href", value._links.self.href)
            clickFunc(a, value._links.self.href);
            let li = $('<li>').html(a).attr("id", "show_id");
            $("#showList").append(li);
            $("#showList").removeAttr("hidden");
        });
    });

    $('#searchForm').submit(function (event) {
        event.preventDefault();
        let searchTerm = $('#search_term').val().trim()
        $("#error").attr("hidden", true)
        $("#showList").empty();
        $("#show").attr("hidden", true);
        if (!searchTerm || searchTerm === "") {
            $("#error").html("Error: The show you input is Empty, please input again")
            $("#error").removeAttr("hidden")
        }
        else {
            requestConfig = {
                method: 'GET',
                //url: 'http://api.tvmaze.com/search/shows?q=' + searchTerm
                url: `http://api.tvmaze.com/search/shows?q=${searchTerm}`
            };
            $.ajax(requestConfig).then(function (responseMessage) {
                //console.log(responseMessage);
                var shows = $(responseMessage);
                if (shows.length === 0) {  
                    //$('#error').show();
                    $('#error').html(`Sorry, we cannot find ${searchTerm} you input, please change another one`);
                    $("#error").removeAttr("hidden");
                } 
                $.each(responseMessage, function (index, value) {
                    let a = $('<a>').html(value.show.name).attr("href", value.show._links.self.href)
                    clickFunc(a, value.show._links.self.href)
                    let li = $('<li>').html(a)
                    $("#showList").append(li);
                    $("#showList").removeAttr("hidden");
                    $("#homeLink").removeAttr("hidden")
                });
            });

        }
    })
})(window.jQuery);

// $('#searchForm').submit((event) => {
//     event.preventDefault();
//     const search_term = $('#search_term').val().trim();
//     if (search_term && search_term.length != 0) {
//       $('#reloadLink').show();
//       $('#error').hide();
//       $('#showList').empty();
//       $('#showList').hide();
//       const requestConfig = {
//         method: 'GET',
//         url: 'http://api.tvmaze.com/search/shows?q=' + searchTerm
//       };
//       $.ajax(requestConfig).then((responseMessage) => {
//         var shows = $(responseMessage);
//         if (shows.length === 0) {  
//           $('#error').show();
//           $('#error').text(`No results found for ${search_term}`);
//         } 
//         $('#show').hide();
//         $('#showList').show();
//         shows.each((index, show) => { 
//           const elem = `<li><a href="${show.show._links.self.href}">${show.show.name}</a></li>`;
//           $('#showList').append(elem);
//         });
//       });
//       $('#search_term').focus();
//     } 
//     else {
//       $('#error').show();
//       $('#error').text(`Invalid Search Input!`);
//       $('#search_term').focus();
//       $('#search_term').val("");
//     }
// });
  
  
function clickFunc(ele, href){
    ele.on('click', (function (event){
        event.preventDefault();
        $("#showList").attr("hidden", true);
        $("#show").empty();
        let requestConfig = {
            method: 'GET',
            url: href
        };
        $.ajax(requestConfig).then(function (responseMessage){
            //console.log(requestConfig);
            //console.log(responseMessage);

            let h1;
            if(responseMessage.name){
                h1 = $('<h1>').html(responseMessage.name);
            }else{
                h1 = $('<h1>').html("Name: N/A");
            }

            let img;
            if(!responseMessage.image){
                img = $('<img>').attr('src', 'public/img/no_image.jpeg');
            }else{
                img = $('<img>').attr('src', responseMessage.image.medium)
            }

            let lang;
            if(responseMessage.language){
                lang = $('<dt>').html("Language: " + responseMessage.language)
            }else{
                lang = $('<dt>').html("Language: N/A");
            }

            let avg;
            if(responseMessage.rating.average){
                avg = $('<dt>').html("Average: " + responseMessage.rating.average);
            }else{
                avg = $('<dt>').html("Average: N/A");
            }

            let net;
            if(responseMessage.network){
                net = $('<dt>').html("Network: " + responseMessage.network.name);
            }else{
                net = $('<dt>').html("Network: N/A");
            }

            let gen;
            if(responseMessage.genres){
                gen = $('<ul>').html("Genres");
                gen.attr("id", "genre")
                $.each(responseMessage.genres, function(index, value){
                    let li = $('<li>').html(value);
                    gen.append(li);
                })
            }else{
                $('<dt>').html("genre: N/A");
            }
            let gens = $('<dd>').html(gen);
            /*
           if(responseMessage.genres){
               for(let i = 0; i < responseMessage.genres.length; i++){
                   $('#showgenres').append(`<li>${responseMessage.genres[i]}</li>`)
               }
           }else{
               $('#showgenres').text("<li>N/A</li>");
           }*/

            let sum;
            if(responseMessage.summary){
                sum = $('<dt>').html("Summary: " + responseMessage.summary);
            }else{
                sum = $('<dt>').html("Summary: N/A");
            }

            let d = $('<dl>').append(h1, img, lang, avg, net, gens, sum);
            $('#show').append(d);
            $('#show').removeAttr("hidden");
            $("#homeLink").removeAttr("hidden");

        })
    }))
}

