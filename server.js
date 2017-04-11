// don't think I'll need this but saving for the moment. 
// var express = require('express');
// var fs      = require('fs')
// var request = require('request')
// var cheerio = require('cheerio')
// var app     = express();
//
// app.get('/scrape', function(req, res){
//
//   url_base = 'http://www.imdb.com'
//   url = 'http://www.imdb.com/movies-in-theaters/?ref_=nv_mv_inth_1';
//   var obj = {
//     table: []
//   }
//
//
//   request(url, function(error, response, html) {
//     if(!error){
//       var $ = cheerio.load(html)
//
//       var title, image, rating;
//       var json = { title: "", image : "", rating : ""}
//
//       var list = [];
//
//       $('.list_item').filter(function(){
//         var data = $(this);
//         list.push(data);
//       })
//
//       for (var movie in list) {
//
//         // get film image link
//         $('.hover-over-image').filter(function(){
//           var data = $(this);
//
//           image = data.children('img').attr('src')
//           json.image = image
//         })
//
//         // get film title
//         $('.overview-top').filter(function(){
//           var data = $(this);
//
//           title = data.children().first().text()
//           json.title = title
//         })
//
//         // get film rating
//         $('.overview-top').filter(function(){
//           var data = $(this);
//           ratings_link = data.children('h4').children().attr('href')
//
//           ratings_url = url_base + ratings_link
//           console.log("About to get rating")
//           request(ratings_url, function(error, response, html){
//             if(!error){
//               var $$ = cheerio.load(html)
//               console.log("Loading rating page")
//               $$('.ratingValue').filter(function(){
//                 var data = $$(this)
//
//                 rating = data.children().text()
//
//                 if (rating.length === 0 || !rating) {
//                   json.rating = "No Rating Yet"
//                 } else {
//                   json.rating = rating
//                 }
//                 console.log("Rating is", rating)
//               })
//             }
//           })
//         })
//         fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
//         })
//         console.log(title)
//         console.log(image)
//         console.log(rating)
//       }
//     }
//     console.log('File written, check project dir')
//     res.send('Check your console!')
//   })
// })
//
// app.listen('8081')
//
// exports = module.exports = app;
