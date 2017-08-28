from selenium import webdriver
import io
import os

import json
from collections import namedtuple

def download(venue, url):

    browser = webdriver.Chrome() #replace with .Firefox() etc

    browser.get(url) #navigate to the page

    innerHTML = browser.execute_script("return document.body.innerHTML") #returns the inner HTML as a string

    # must have created html directory already
    page = open("./HTML/" + venue + "Scrape.html","a",encoding='utf8') #creates file with name of "...Scrape.html"

    page.write(innerHTML)

    page.close()
    browser.close()
    

download('Snug','http://snugrock.com')
download('Visulite','http://www.visulite.com/upcomingShows.cfm')
download('NeighborhoodTheatre','http://www.neighborhoodtheatre.com/')
download('Fillmore','http://www.fillmorecharlottenc.com/')
download('EveningMuse','http://www.eveningmuse.com/')
download('TinRoof','http://www.tinroofcharlotte.com/')
download('Milestone','https://themilestone.club/calendar/')
download('CoyoteJoes','http://www.coyote-joes.com/events.html')