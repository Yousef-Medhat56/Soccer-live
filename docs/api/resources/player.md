# Players
Get data about the player, such as: statistics and transfers.

## Endpoints
### GET: /player/[player_id]/[player_slug]
Return details about the player.

Available details:
1. Player nationality
2. The player's club
3. Player image.
4. Position.
5. Age.
6. Height.
7. Weight.

#### Example Request
`GET /api/player/39358/e-hazard`

Scraped from `btolat.com/player/39358/e-hazard`

#### Example Response
```
{
  "data": {
    "playerDetails": {
      "name": "إدين هازارد",
      "position": "مهاجم",
      "club": {
        "name": " ريال مدريد",
        "url": "16110/real-madrid"
      },
      "img": "https://img.btolat.com/playerslogo/39358.png?v=61",
      "nationality": "بلجيكا ",
      "age": 32,
      "height": 175,
      "weight": 74
    }
  }
}
```

### GET: /player/[player_id]/[player_slug]/stats
Return the player statistics for every season he joined with his clubs in different leagues.

Available statistics:
1. Total appearances.
2. Total played minutes.
3. Total yellow cards.
4. Total red cards.
5. Total second yellow cards.
6. Total goals.

#### Example Request
`GET /api/player/39358/e-hazard/stats`

Scraped from `btolat.com/player/statics/39358/e-hazard`
#### Example Response
```
{
  "data": {
    "playerStats": {
      "playerName": "إدين هازارد ",
      "playerImg": "https://img.btolat.com/playerslogo/39358.png?v=61",
      "teams": [
        ....
        ,{
          "teamName": "تشيلسي",
          "leagues": [
            {
              "leagueName": "كأس الاتحاد الإنجليزي ",
              "leagueImg": "https://img.btolat.com/tourlogo/3b830702-2e9d-403f-92e2-955a0a1c406a.png ",
              "seasons": [
                {
                  "seasonName": "2018/2019",
                  "stats": {
                    "appearances": 2,
                    "minutesPlayed": 138,
                    "cards": {
                      "yellow": 0,
                      "red": 0,
                      "yellowThenRed": 0
                    },
                    "goals": 0
                  }
               },
                ...
            {
              "leagueName": "الدوري الإنجليزي ",
              "leagueImg": "https://img.btolat.com/tourlogo/32eab27b-e23c-4d16-ad92-605a1d6ab55d.png ",
              "seasons": [
                {
                  "seasonName": "2018/2019",
                  "stats": {
                    "appearances": 37,
                    "minutesPlayed": 2926,
                    "cards": {
                      "yellow": 2,
                      "red": 0,
                      "yellowThenRed": 0
                    },
                    "goals": 16
                  }
                },
                {
                  "seasonName": "2017/2018",
                  "stats": {
                    "appearances": 34,
                    "minutesPlayed": 2433,
                    "cards": {
                      "yellow": 2,
                      "red": 0,
                      "yellowThenRed": 0
                    },
                    "goals": 12
                  }
                },
               ...
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```
### GET: /player/[player_id]/[player_slug]/transfers
Return data about the player transfers.

#### Example Request 
`GET /api/player/39358/e-hazard/transfers`

Scraped from `btolat.com/player/transfers/39358/e-hazard`
#### Example Response
```
{
  "data": {
    "playerTransfers": {
      "playerName": "إدين هازارد ",
      "playerImg": "https://img.btolat.com/playerslogo/39358.png?v=61",
      "trasnfers": [
        {
          "from": {
            "name": "تشيلسي",
            "url": "9092/تشيلسي",
            "img": "https://img.btolat.com/teamslogo/9092.png?v=306 "
          },
          "to": {
            "name": "ريال مدريد",
            "url": "16110/ريال-مدريد",
            "img": "https://img.btolat.com/teamslogo/16110.png?v=829 "
          },
          "date": "01-07-2019",
          "price": "€ 100M",
          "type": "بيع"
        },
        ...
      ]
    }
  }
}
```
