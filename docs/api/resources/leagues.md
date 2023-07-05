# Leagues
Get information about a league, such as: standings, matches, top scorers.

## Enpoints
### GET: /leagues
Return a list of the most popular leagues around the world and the available leagues.

#### Example Request
`GET /api/leagues`

Scraped from `https://www.btolat.com/leagues`

#### Example Response
```
{
  "data": {
    "leagues": {
      "popular": [
        {
          "name": "كأس الامم الافريقية",
          "img": "https://img.btolat.com/tourlogo/7aa60c80-8e67-4dd4-bf10-b67bb57443d8.png",
          "url": "1059/cup-of-nations"
        },
        {
          "name": "الدوري المصري",
          "img": "https://img.btolat.com/tourlogo/49fee316-50f3-4228-80a5-728188802336.png",
          "url": "1193/premier-league"
        },
        {
          "name": "دوري أبطال أوروبا",
          "img": "https://img.btolat.com/tourlogo/84aa6db5-64e9-439b-a595-2040420fa1e2.png",
          "url": "1005/champleague"
        },
       ....
      ],
      "all": [
        {
          "name": "كأس العالم",
          "img": "https://img.btolat.com/tourlogo/ef38d2df-2737-4d4f-be89-f11d9be1934a.png",
          "url": "1056/world-cup"
        },
        {
          "name": "كأس العالم للأندية",
          "img": "https://img.btolat.com/tourlogo/0470b4f7-f1e2-4959-9480-89ca76c8f49e.png",
          "url": "1041/club-world-cup"
        },
        {
          "name": "كاس السوبر المصري",
          "img": "https://img.btolat.com/tourlogo/2265.png",
          "url": "2265/egypt-super"
        },
        ....
      ]
    }
  }
}
```
### GET: /leagues/[league_id]/[league_slug]/standings
Return standings of the league.
#### Example Request
`GET /api/leagues/1193/premier-league/standings`

Scraped from `https://www.btolat.com/league/standings/1193/premier-league`

#### Example Response
```
{
  "data": {
    "groups": [
      {
        "groupName": " ",
        "standings": [
          {
            "order": 1,
            "teamData": {
              "name": "الأهلي",
              "img": "https://img.btolat.com/teamslogo/8883.png?v=485",
              "url": "8883/al-ahly"
            },
            "matchesPlayed": 25,
            "wins": 20,
            "draws": 5,
            "losses": 0,
            "goalsFor": 48,
            "goalsAgainst": 7,
            "goalsDiff": 41,
            "points": 65
          },
          {
            "order": 2,
            "teamData": {
              "name": "بيراميدز",
              "img": "https://img.btolat.com/teamslogo/23165.png?v=987",
              "url": "23165/asyouty-sport"
            },
            "matchesPlayed": 30,
            "wins": 19,
            "draws": 7,
            "losses": 4,
            "goalsFor": 45,
            "goalsAgainst": 18,
            "goalsDiff": 27,
            "points": 64
          },
          {
            "order": 3,
            "teamData": {
              "name": "فيوتشر اف سي",
              "img": "https://img.btolat.com/teamslogo/34496.png?v=302",
              "url": "34496/fc-future"
            },
            "matchesPlayed": 30,
            "wins": 15,
            "draws": 12,
            "losses": 3,
            "goalsFor": 32,
            "goalsAgainst": 17,
            "goalsDiff": 15,
            "points": 57
          },
          ....
    }
  ]
}
```
