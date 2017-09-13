
#!/bin/bash
# get data from facebook
# The Station
curl -o station -i -X GET \
 "https://graph.facebook.com/v2.10/thestationclt/events/?access_token=EAAGObjMAdjwBANiVjIs6ZAEEeR10PxPr3ptdz01ihzNRqH6SG5Bq3P2liReQ2h8WPvj37TSbXkbzZCyZCPH257XSSvpwGxZBo52k9t09e8kZCdRW8WV5cnyEfsJxeOVTqqioWMpjFYt4jAtfrM674bQmhRTzoHZCZC4ZAhZBtEhFm8fzeqeI8Rn0ZAXmyZB87q6BgEZD"
# Coyote Joes
curl -o coyote -i -X GET \
 "https://graph.facebook.com/v2.10/CoyoteJoes/events/?access_token=EAAGObjMAdjwBANiVjIs6ZAEEeR10PxPr3ptdz01ihzNRqH6SG5Bq3P2liReQ2h8WPvj37TSbXkbzZCyZCPH257XSSvpwGxZBo52k9t09e8kZCdRW8WV5cnyEfsJxeOVTqqioWMpjFYt4jAtfrM674bQmhRTzoHZCZC4ZAhZBtEhFm8fzeqeI8Rn0ZAXmyZB87q6BgEZD"
# Rabbit Hole
curl -o rabbits -i -X GET \
 "https://graph.facebook.com/v2.10/rabbitholemidwood/events/?access_token=EAAGObjMAdjwBANiVjIs6ZAEEeR10PxPr3ptdz01ihzNRqH6SG5Bq3P2liReQ2h8WPvj37TSbXkbzZCyZCPH257XSSvpwGxZBo52k9t09e8kZCdRW8WV5cnyEfsJxeOVTqqioWMpjFYt4jAtfrM674bQmhRTzoHZCZC4ZAhZBtEhFm8fzeqeI8Rn0ZAXmyZB87q6BgEZD"
# extract the json from the fb event data
node makejson.js station
node makejson.js rabbits
node makejson.js coyote
# now extract them to the correct object format
node extractEvents.js station
node extractEvents.js coyote
node extractEventsRabbits.js rabbits
