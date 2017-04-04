import urllib2
from bs4 import BeautifulSoup

url_base = 'http://www.imdb.com'
base_page = 'http://www.imdb.com/movies-in-theaters/?ref_=nv_mv_inth_1'
page = urllib2.urlopen(base_page).read()
soup = BeautifulSoup(page, "lxml")
movies = soup.findAll('h4', attrs={'itemprop':'name'})


for div in movies:
    ratings_page = url_base + div.find('a')['href']
    get_rating = urllib2.urlopen(ratings_page)
    more_soup = BeautifulSoup(get_rating, 'lxml')
    ratings_result = more_soup.findAll('span', attrs={'itemprop':'ratingValue'})
    if ratings_result:
        print div.find('a')['title'], ratings_result[0].text
    else:
        print div.find('a')['title'], "No Rating Yet"
