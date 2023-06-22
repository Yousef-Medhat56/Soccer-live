# Matches
Get information about the matches of a specific day.
## Endpoints
### GET: /matches
Return list of all the matches of a specific day (default: today).
#### Parameters
| Parameter | Type   | Required | Description                           |
|-----------|--------|----------|---------------------------------------|
|    date   | string |   false  | The day's date<br>format: [YYYY-MM-DD] |
#### Example Request
`GET /api/matches?date=2023/06/10`
#### Example Response
```
{
    "data": {
        "allMatches": [
            {
                "leagueId": "1005",
                "leagueName": "دوري أبطال أوروبا",
                "leagueImg": "https://img.btolat.com/tourlogo/84aa6db5-64e9-439b-a595-2040420fa1e2.png",
                "matches": [
                    {
                        "matchId": "3325351",
                        "matchStatus": "finished",
                        "homeName": "مانشستر سيتي",
                        "homeImg": "https://img.btolat.com/teamslogo/9259.png?v=922",
                        "homeUrl": "/team/9259/manchester-city",
                        "homeScore": "1",
                        "awayName": "إنتر ميلان",
                        "awayImg": "https://img.btolat.com/teamslogo/11917.png?v=91",
                        "awayUrl": "/team/11917/internazionale",
                        "awayScore": "0"
                    }
                ]
            },
            {
                "leagueId": "1420",
                "leagueName": "الدوري التونسي",
                "leagueImg": "https://img.btolat.com/tourlogo/7818215b-7bdd-4e90-8bdc-aa5538018650.png",
                "matches": [
                    {
                        "matchId": "3315751",
                        "matchStatus": "finished",
                        "homeName": "النادي الأفريقي",
                        "homeImg": "https://img.btolat.com/teamslogo/16921.png?v=464",
                        "homeUrl": "/team/16921/club-africain",
                        "homeScore": "1",
                        "awayName": "الاتحاد المنستيري",
                        "awayImg": "https://img.btolat.com/teamslogo/16944.png?v=242",
                        "awayUrl": "/team/16944/monastir",
                        "awayScore": "1"
                    },
                    {
                        "matchId": "3315752",
                        "matchStatus": "finished",
                        "homeName": "النجم الساحلي",
                        "homeImg": "https://img.btolat.com/teamslogo/16934.png?v=717",
                        "homeUrl": "/team/16934/etoile-du-sahel",
                        "homeScore": "0",
                        "awayName": "الترجي التونسي",
                        "awayImg": "https://img.btolat.com/teamslogo/16933.png?v=298",
                        "awayUrl": "/team/16933/es-tunis",
                        "awayScore": "0"
                    }
                ]
            }
        ]
    }
}
```
