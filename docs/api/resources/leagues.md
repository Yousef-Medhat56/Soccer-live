# Leagues
Get information about a league, such as: standings, matches, top scorers.

## Endpoints
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

The data about each team:
1. Matches played.
2. Wins.
3. Draws.
4. Losses.
5. Total goals for.
6. Total goals against.
7. Goals difference.
8. Points.

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
### GET: /leagues/[league_id]/[league_slug]/top-scorers
Return top scorers of the league.
#### Example Request
`GET /api/leagues/1204/premier-league/top-scorers`
Scraped from `https://www.btolat.com/league/topscores/1204/premier-league`

#### Example Response
```
{
  "data": {
    "topScorers": [
      {
        "playerData": {
          "name": "إيرلينج هالاند",
          "url": "441484/e-h-land",
          "img": "//img.btolat.com/playerslogo/441484.png?v=509"
        },
        "clubData": {
          "name": "مانشستر سيتي ",
          "url": "9259/manchester-city",
          "img": "//img.btolat.com/teamslogo/9259.png?v=922"
        },
        "goalsNum": 36
      },
      {
        "playerData": {
          "name": "هاري كين",
          "url": "158575/h-kane",
          "img": "//img.btolat.com/playerslogo/158575.png?v=540"
        },
        "clubData": {
          "name": "إنجلترا ",
          "url": "8981/england",
          "img": "//img.btolat.com/teamslogo/8981.png?v=703"
        },
        "goalsNum": 30
      },
      {
        "playerData": {
          "name": "إيفان طوني",
          "url": "277348/i-toney",
          "img": "//img.btolat.com/playerslogo/277348.png?v=492"
        },
        "clubData": {
          "name": "برينتفورد ",
          "url": "9059/brentford",
          "img": "//img.btolat.com/teamslogo/9059.png?v=523"
        },
        "goalsNum": 20
      },
      {
        "playerData": {
          "name": "محمد صلاح",
          "url": "138653/mohamed-salah",
          "img": "//img.btolat.com/playerslogo/138653.png?v=148"
        },
        "clubData": {
          "name": "ليفربول ",
          "url": "9249/liverpool",
          "img": "//img.btolat.com/teamslogo/9249.png?v=112"
        },
        "goalsNum": 19
      },
     ...
    ]
  }
}
```
