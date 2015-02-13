$(document).ready(function () {
    $(window).load(function () {
        $(".movieholder").hide();
    });

    $(".go").click(fetchData);

    function fetchData(event) {
        event.preventDefault();
        var apikey = "325pdck85e9sd5fsfpy4d7j5";
        var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";
        var moviesSearchUrl = baseUrl + '/movies.json?format=jsonp&show=all&apikey=' + apikey;
        var title = $("input[name=title]").val();
        var year = $("input[name=year]").val();
        var parameters = {
            "title": $("input[name=title]").val()
        }

        $.ajax({
            "url": moviesSearchUrl + "&q=" + title,
            "dataType": "jsonp",
            "success": function (response) {
                $(".response").val(response);
                renderUi(response.movies);
            }
        })
    }

    function renderUi(json) {
        console.log(json);
        var resultSet = $(".result-set");
        var instanceTemplate = $(".result-set .instance:first").clone();
        resultSet.empty();
        for (var i = 0; i < json.length; i++) {
            var instance = json[i];
            var instanceDom = instanceTemplate.clone();
            instanceDom.find(".title").html(instance.title);
            instanceDom.find(".year").html(instance.year);
            instanceDom.find(".audienceScore").html(instance.ratings.audience_score);
            instanceDom.find(".criticsScore").html(instance.ratings.critics_score);
            instanceDom.find(".rating").html(instance.mpaa_rating);
            instanceDom.find(".year").html(instance.year);
            instanceDom.find(".poster .image").attr("src", instance.posters.detailed);
            resultSet.append(instanceDom);
        }
        $(".movieholder").show();
    }

});