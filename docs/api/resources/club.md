# Clubs
Return data about the club, such as: squad and matches.

## Endpoints
### GET: /club/[club_id]/[club_slug]
Get details about the club.

The available details:
1. The club country.
2. Year of foundation.
3. The club stadium.
4. The manager name.
5. The leagues that the club paricipates in.

#### Example Request
`GET /api/club/8883/al-ahly/`

Scraped from `btolat.com/team/8883/al-ahly/`

#### Example Response
```
{
  "data": {
    "clubDetails": {
      "name": "الأهلي",
      "participatingLeagues": [
        {
          "name": "الدوري المصري",
          "url": "1193/premier-league"
        },
        {
          "name": "دوري أبطال أفريقيا",
          "url": "1513/caf-champions-league"
        },
        ...
      ],
      "country": "مصر",
      "foundationYear": 1907,
      "manager": "M. Koller",
      "stadium": "إستاد القاهرة الدولى"
    }
  }
}
```
### GET: /club/[club_id]/[club_slug]/matches
Return matches of the club.

#### Parameters
| Parameter | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| previous      | boolean | false    | If `true`, returns the previous matches of the club. |
| league      | string | false    | The league id, returns the club matches in the given league only. |

#### Example Request
`GET /api/club/16110/real-madrid/matches?previous=true&league=1005`

Scraped from `btolat.com/team/matchesended/16110/real-madrid?leagueid=1005`

#### Example Response
```
{
  "data": {
    "tournaments": [
      {
        "name": "الدوري الاسباني",
        "queryStr": "1399"
      },
      {
        "name": "دوري أبطال أوروبا",
        "queryStr": "1005"
      },
     ...
    ],
    "selectedTournament": {
      "tournamentQueryStr": "1005",
      "matches": [
        {
          "id": "3321012",
          "status": "finished",
          "time": " 17.05.2023   10:00 م",
          "home": {
            "name": "مانشستر سيتي",
            "img": "https://img.btolat.com/teamslogo/9259.png?v=922",
            "url": "9259/manchester-city",
            "goals": "4 "
          },
          "away": {
            "name": "ريال مدريد",
            "img": "https://img.btolat.com/teamslogo/16110.png?v=829",
            "url": "16110/real-madrid",
            "goals": "0 "
          },
          "league": "دوري أبطال أوروبا"
        },
       ....
      ]
    }
  }
}
```
### GET: /club/[club_id]/[club_slug]/squad
Return the squad of the club.

The available data for the players in the squad:
1. Player name.
2. Player image.
3. Position.
4. Nationality.
5. Birth date.

#### Example Request
`GET /api/club/9092/chelsea/squad`

Scraped from `btolat.com/team/squad/9092/chelsea`
#### Example Response
```
{
  "data": {
    "squad": [
      {
        "name": "E. Wady",
        "url": "541349/e-wady",
        "img": "https://img.btolat.com/playerslogo/541349.png?v=642",
        "position": "حارس مرمى",
        "nationality": "الولايات المتحدة",
        "birthDate": "2002-01-23T00:00:00.000Z"
      },
      {
        "name": "L. Bergström",
        "url": "578626/l-bergstr-m",
        "img": "https://img.btolat.com/playerslogo/578626.png?v=38",
        "position": "حارس مرمى",
        "nationality": "فينلندا",
        "birthDate": "2002-09-05T00:00:00.000Z"
      },
      {
        "name": "ماركوس بيتينيلي",
        "url": "194646/m-bettinelli",
        "img": "https://img.btolat.com/playerslogo/194646.png?v=68",
        "position": "حارس مرمى",
        "nationality": "إنجلترا",
        "birthDate": "1992-05-24T00:00:00.000Z"
      },
      {
        "name": "إدوارد ميندي",
        "url": "213222/e-mendy",
        "img": "https://img.btolat.com/playerslogo/213222.png?v=103",
        "position": "حارس مرمى",
        "nationality": "السنغال",
        "birthDate": "1992-03-01T00:00:00.000Z"
      },
      ...
    ]
  }
}
```
