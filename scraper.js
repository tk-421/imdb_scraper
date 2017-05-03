var express = require('express');
var fs      = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app     = express();

app.set('view engine', 'pug')
app.use(express.static(__dirname))
app.use(express.static(__dirname + '/bootstrap'))

app.get('/', function(req, res){
  url_base = 'http://www.imdb.com'
  url = 'http://www.imdb.com/movies-in-theaters/?ref_=nv_mv_inth_1';

  request(url, function(error, response, html) {
    if (!error){
      var $ = cheerio.load(html)
      var index;
      var title_list = []
      var images = []
      const movie_list = [];

      div_list = [];
      $('.list_item').filter(function(){
        var data = $(this)
        div_list.push(data)
      })

      for (index = 0; index < div_list.length; ++index){
        title = div_list[index].find('.overview-top').children().first().text()
        image_url = div_list[index].find('.hover-over-image').children('img').attr('src')

        movie_list.push({movie_title: title, movie_image_url: image_url})

        var rating;

        ratings_link = div_list[index].find('h4').children().attr('href')
        ratings_url = url_base + ratings_link
        request(ratings_url, function(error, response, html){
          if (!error){
            var $$ = cheerio.load(html)
            $$('.ratingValue').filter(function(){
              var data = $$(this)

              rating = data.children().text()
              if (rating.length === 0 || !rating){
                rating = "No Rating Yet"
              } else {
                rating = rating
              }
            })
          }
        })
      }
      res.render('popup.pug', {movie_list : movie_list})
    }
  })
})

app.listen(process.env.PORT || '8081')

exports = module.exports = app;
