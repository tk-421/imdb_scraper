var express = require('express');
var fs      = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app     = express();

app.set('view engine', 'pug')
app.use(express.static(__dirname))
app.use(express.static(__dirname + '/bootstrap'))

var title_list = []
var images = []
var div_list = [];
var movie_list = [];
var ratings_list = [];

function build_data_map(){
  for (index = 0; index < div_list.length; ++index){
    title = div_list[index].find('.overview-top').children().first().text()
    image_url = div_list[index].find('.hover-over-image').children('img').attr('src')
    ratings_link = div_list[index].find('h4').children().attr('href')
    ratings_url = url_base + ratings_link
    rating = ''

    movie_list.push({movie_title: title, movie_image_url: image_url, imdb_link: ratings_url, rating: rating})
  }
}

function update_rating(){
  // for (item of movie_list){
  //   for (index = 0; index < ratings_list.length; index++){
  //     item['rating'] = ratings_list[index]
  //   }
  // }
}

function get_rating(){
  for (item of movie_list){
    ratings_url = item['imdb_link']
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
          ratings_list.push(rating)
        })
      }
      console.log(item['rating'])
      item['rating'] = rating
    })
  }
}

function push_movie_list(){
  return movie_list
}

app.get('/', function(req, res){
  url_base = 'http://www.imdb.com'
  url = 'http://www.imdb.com/movies-in-theaters/?ref_=nv_mv_inth_1';

  request(url, function(error, response, html) {
    if (!error){
      var $ = cheerio.load(html)
      var index;

      $('.list_item').filter(function(){
        var data = $(this)
        div_list.push(data)
      })
      build_data_map()
      get_rating()
      update_rating()
      setTimeout(function(){
          res.render('popup.pug', {movie_list : movie_list})
      }, 10000)
      setTimeout(function(){
          console.log(movie_list)
      }, 10000)
    }
  })
})

app.listen(process.env.PORT || '8081')

exports = module.exports = app;
