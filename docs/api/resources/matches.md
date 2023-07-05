# Matches

Get information about the matches of a specific day.

## Endpoints

### GET: /matches

Return list of all the matches of a specific day (default: today).

#### Parameters

| Parameter | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| date      | string | false    | The day's date<br>format: [YYYY-MM-DD] |

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
            "id": "3325351",
            "status": "finished",
            "home": {
              "name": "مانشستر سيتي",
              "img": "https://img.btolat.com/teamslogo/9259.png?v=922",
              "url": "9259/manchester-city",
              "goals": "1"
            },
            "away": {
              "name": "إنتر ميلان",
              "img": "https://img.btolat.com/teamslogo/11917.png?v=91",
              "url": "11917/internazionale",
              "goals": "0"
            }
          }
        ]
      },
      {
        "leagueId": "1420",
        "leagueName": "الدوري التونسي",
        "leagueImg": "https://img.btolat.com/tourlogo/7818215b-7bdd-4e90-8bdc-aa5538018650.png",
        "matches": [
          {
            "id": "3315751",
            "status": "finished",
            "home": {
              "name": "النادي الأفريقي",
              "img": "https://img.btolat.com/teamslogo/16921.png?v=464",
              "url": "16921/club-africain",
              "goals": "1"
            },
            "away": {
              "name": "الاتحاد المنستيري",
              "img": "https://img.btolat.com/teamslogo/16944.png?v=242",
              "url": "16944/monastir",
              "goals": "1"
            }
          },
          {
            "id": "3315752",
            "status": "finished",
            "home": {
              "name": "النجم الساحلي",
              "img": "https://img.btolat.com/teamslogo/16934.png?v=717",
              "url": "16934/etoile-du-sahel",
              "goals": "0"
            },
            "away": {
              "name": "الترجي التونسي",
              "img": "https://img.btolat.com/teamslogo/16933.png?v=298",
              "url": "16933/es-tunis",
              "goals": "0"
            }
          }
        ]
      },
      {
        "leagueId": "1440",
        "leagueName": "الدوري الامريكي الممتاز",
        "leagueImg": "https://img.btolat.com/",
        "matches": [
          {
            "id": "3277024",
            "status": "finished",
            "home": {
              "name": "أتالانتا يونايتد",
              "img": "https://img.btolat.com/teamslogo/27212.png?v=103",
              "url": "27212/atlanta-united",
              "goals": "3"
            },
            "away": {
              "name": "دي سي يونايتد",
              "img": "https://img.btolat.com/teamslogo/17310.png?v=90",
              "url": "17310/dc-united",
              "goals": "1"
            }
          },
          {
            "id": "3277025",
            "status": "finished",
            "home": {
              "name": "شارلوت",
              "img": "https://img.btolat.com/teamslogo/35765.png?v=902",
              "url": "35765/charlotte",
              "goals": "3"
            },
            "away": {
              "name": "سياتل ساوندرز",
              "img": "https://img.btolat.com/teamslogo/17385.png?v=623",
              "url": "17385/seattle-sounders",
              "goals": "3"
            }
          },
          {
            "id": "3277026",
            "status": "finished",
            "home": {
              "name": "مونتريال إمباكت",
              "img": "https://img.btolat.com/teamslogo/7920.png?v=460",
              "url": "7920/montreal-impact",
              "goals": "4"
            },
            "away": {
              "name": "مينيسوتا",
              "img": "https://img.btolat.com/teamslogo/17345.png?v=677",
              "url": "17345/minnesota-united",
              "goals": "0"
            }
          },
          {
            "id": "3277027",
            "status": "finished",
            "home": {
              "name": "نيو إنجلاند",
              "img": "https://img.btolat.com/teamslogo/17349.png?v=418",
              "url": "17349/new-england",
              "goals": "3"
            },
            "away": {
              "name": "إنتر ميامي",
              "img": "https://img.btolat.com/teamslogo/32374.png?v=344",
              "url": "32374/",
              "goals": "1"
            }
          },
          {
            "id": "3277028",
            "status": "finished",
            "home": {
              "name": "أورلاندو سيتي",
              "img": "https://img.btolat.com/teamslogo/24303.png?v=304",
              "url": "24303/orlando-city",
              "goals": "2"
            },
            "away": {
              "name": "كولورادو رابيدز",
              "img": "https://img.btolat.com/teamslogo/17304.png?v=829",
              "url": "17304/colorado-rapids",
              "goals": "0"
            }
          },
          {
            "id": "3277029",
            "status": "finished",
            "home": {
              "name": "تورونتو",
              "img": "https://img.btolat.com/teamslogo/7940.png?v=262",
              "url": "7940/toronto",
              "goals": "1"
            },
            "away": {
              "name": "ناشفيل",
              "img": "https://img.btolat.com/teamslogo/29167.png?v=893",
              "url": "29167/nashville-sc",
              "goals": "1"
            }
          }
        ]
      }
    ]
  }
}
```

### GET: /matches/{match_id}

Redirects to `/matches/{match_id}/stats` endpoint.

### GET: /matches/{match_id}/stats

Return statistics of the match.</br>

Available statistics:

1. Possession
2. Total shots
3. Shots on target
4. Saves
5. Yellow cards
6. Red cards
7. Offsides
8. Fouls

#### Example Request

`GET /api/matches/3325351/stats`

#### Example Response

```
{
    "data": {
        "matchId": "3325351",
        "possession": {
            "home": 56,
            "away": 44
        },
        "goals": {
            "home": 1,
            "away": 0
        },
        "yellowCards": {
            "home": 2,
            "away": 3
        },
        "redCards": {
            "home": 0,
            "away": 0
        },
        "shots": {
            "home": 7,
            "away": 14
        },
        "targetShots": {
            "home": 4,
            "away": 6
        },
        "offside": {
            "home": 1,
            "away": 1
        },
        "saves": {
            "home": 5,
            "away": 3
        },
        "fouls": {
            "home": 11,
            "away": 17
        }
    }
}
```

### GET: /matches/{match_id}/events

Return events of the match.</br>

Available events:

1. Goal
2. Yellow card
3. Red card
4. Substitution
5. Missed penalty

#### Example Request

`GET /api/matches/3325351/events`

#### Example Response

```
{
    "data": [
        {
            "atHomeTeam": true,
            "eventTime": "36",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "فيل فودين",
            "substituteName": "كيفين دي بروين"
        },
        {
            "atHomeTeam": false,
            "eventTime": "57",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "روميلو لوكاكو",
            "substituteName": "إيدين دجيكو"
        },
        {
            "atHomeTeam": false,
            "eventTime": "59",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "نيكولو باريلا"
        },
        {
            "atHomeTeam": true,
            "eventTime": "68",
            "eventImg": "https://static.btolat.com/images/goal.png",
            "playerName": "رودريجو هيرنانديز"
        },
        {
            "atHomeTeam": true,
            "eventTime": "75",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "كايل ووكر",
            "substituteName": "مانويل أكانجي"
        },
        {
            "atHomeTeam": false,
            "eventTime": "77",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "راؤول بيلانوفا",
            "substituteName": "دينزل دومفريس"
        },
        {
            "atHomeTeam": true,
            "eventTime": "83",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "كايل ووكر",
            "substituteName": "جون ستونز"
        },
        {
            "atHomeTeam": false,
            "eventTime": "83",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "روميلو لوكاكو"
        },
        {
            "atHomeTeam": false,
            "eventTime": "84",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "هنريخ مخيتاريان",
            "substituteName": "هاكان تشالهاناوجلو"
        },
        {
            "atHomeTeam": false,
            "eventTime": "84",
            "eventImg": "https://static.btolat.com/images/subst.png",
            "playerName": "دانيلو دامروزيو",
            "substituteName": "ماتيو دارميان"
        },
        {
            "atHomeTeam": false,
            "eventTime": "90+2",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "أندريه أونانا"
        },
        {
            "atHomeTeam": true,
            "eventTime": "90+2",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "إيرلينج هالاند"
        },
        {
            "atHomeTeam": true,
            "eventTime": "90+4",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "ايديرسون"
        },
        {
            "atHomeTeam": false,
            "eventTime": "90+6",
            "eventImg": "https://static.btolat.com/images/yellowcard.png",
            "playerName": "S. Inzaghi"
        }
    ]
}
```

### GET: /matches/{match_id}/lineups

Return lineups of the match.</br>

Available datas:

1. Formation
2. Start XI and their positions
3. Substitutes

#### Example Request

`GET /api/matches/3325351/lineups`

#### Example Response

```
{
    "home": {
        "formation": "3-2-4-1",
        "mainPlayers": {
            "GK": {
                "name": "ايديرسون",
                "shirtNumber": "31",
                "positionNumber": "1"
            },
            "D": [
                {
                    "name": "مانويل أكانجي",
                    "shirtNumber": "25",
                    "positionNumber": "2"
                },
                {
                    "name": "روبن دياز",
                    "shirtNumber": "3",
                    "positionNumber": "3"
                },
                {
                    "name": "ناثان أكي",
                    "shirtNumber": "6",
                    "positionNumber": "4"
                }
            ],
            "DM": [
                {
                    "name": "جون ستونز",
                    "shirtNumber": "5",
                    "positionNumber": "5"
                },
                {
                    "name": "رودريجو هيرنانديز",
                    "shirtNumber": "16",
                    "positionNumber": "6"
                }
            ],
            "M": [],
            "AM": [
                {
                    "name": "برناردو سيلفا",
                    "shirtNumber": "20",
                    "positionNumber": "7"
                },
                {
                    "name": "كيفين دي بروين",
                    "shirtNumber": "17",
                    "positionNumber": "8"
                },
                {
                    "name": "إلكاي جوندوجان",
                    "shirtNumber": "8",
                    "positionNumber": "9"
                },
                {
                    "name": "جاك جريليش",
                    "shirtNumber": "10",
                    "positionNumber": "10"
                }
            ],
            "F": [
                {
                    "name": "إيرلينج هالاند",
                    "shirtNumber": "9",
                    "positionNumber": "11"
                }
            ]
        },
        "substitutes": [
            {
                "name": " سيرجيو جوميز",
                "shirtNumber": 21
            },
            {
                "name": " فيل فودين",
                "shirtNumber": 47
            },
            {
                "name": " إيميرك لابورتي",
                "shirtNumber": 14
            },
            {
                "name": " رياض محرز",
                "shirtNumber": 26
            },
            {
                "name": " ريكو لويس",
                "shirtNumber": 82
            },
            {
                "name": " كايل ووكر",
                "shirtNumber": 2
            },
            {
                "name": " كالفين فيليبس",
                "shirtNumber": 4
            },
            {
                "name": " M. Perrone",
                "shirtNumber": 32
            },
            {
                "name": " سكوت كارسون",
                "shirtNumber": 33
            },
            {
                "name": " كول بالمر",
                "shirtNumber": 80
            },
            {
                "name": " ستيفان اورتيجا",
                "shirtNumber": 18
            },
            {
                "name": " جوليان ألفاريز",
                "shirtNumber": 19
            }
        ]
    },
    "away": {
        "formation": "3-5-2",
        "mainPlayers": {
            "GK": {
                "name": "أندريه أونانا",
                "shirtNumber": "24",
                "positionNumber": "1"
            },
            "D": [
                {
                    "name": "ماتيو دارميان",
                    "shirtNumber": "36",
                    "positionNumber": "2"
                },
                {
                    "name": "فرانشيسكو أتشيربي",
                    "shirtNumber": "15",
                    "positionNumber": "3"
                },
                {
                    "name": "أليساندرو باستوني",
                    "shirtNumber": "95",
                    "positionNumber": "4"
                }
            ],
            "DM": [],
            "M": [
                {
                    "name": "دينزل دومفريس",
                    "shirtNumber": "2",
                    "positionNumber": "5"
                },
                {
                    "name": "نيكولو باريلا",
                    "shirtNumber": "23",
                    "positionNumber": "6"
                },
                {
                    "name": "مارسيلو بروزوفيتش",
                    "shirtNumber": "77",
                    "positionNumber": "7"
                },
                {
                    "name": "هاكان تشالهاناوجلو",
                    "shirtNumber": "20",
                    "positionNumber": "8"
                },
                {
                    "name": "فيديريكو ديماركو",
                    "shirtNumber": "32",
                    "positionNumber": "9"
                }
            ],
            "AM": [],
            "F": [
                {
                    "name": "إيدين دجيكو",
                    "shirtNumber": "9",
                    "positionNumber": "10"
                },
                {
                    "name": "لاوتارو مارتينيز",
                    "shirtNumber": "10",
                    "positionNumber": "11"
                }
            ]
        },
        "substitutes": [
            {
                "name": " راؤول بيلانوفا",
                "shirtNumber": 12
            },
            {
                "name": " روبيرتو جاليارديني",
                "shirtNumber": 5
            },
            {
                "name": " سمير هاندنوفيتش",
                "shirtNumber": 1
            },
            {
                "name": " K. Asllani",
                "shirtNumber": 14
            },
            {
                "name": " إيه. كورداز",
                "shirtNumber": 21
            },
            {
                "name": " هنريخ مخيتاريان",
                "shirtNumber": 22
            },
            {
                "name": " ستيفان دي فري",
                "shirtNumber": 6
            },
            {
                "name": " خواكين كوريا",
                "shirtNumber": 11
            },
            {
                "name": " روبن جوسينس",
                "shirtNumber": 8
            },
            {
                "name": " روميلو لوكاكو",
                "shirtNumber": 90
            },
            {
                "name": " دانيلو دامروزيو",
                "shirtNumber": 33
            },
            {
                "name": " ميلان سكرينيار",
                "shirtNumber": 37
            }
        ]
    }
}
```
### GET: /matches/{match_id}/details
Return details about the 2 teams of the match.

Available details:
1. Face to face history.
2. Face to face results.
3. Face to face big wins.
4. The teams' standings in the league.
5. Results of the home team last matches.
6. Results of the away team last matches.

#### Example Request
`GET /api/matches/3330463/details`

#### Example Response
```
{
  "data": {
    "f2fHistory": {
      "total": 182,
      "homeWins": 56,
      "draw": 51,
      "awayWins": 75
    },
    "f2fResults": [
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "04.04.2023",
        "home": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "0"
        },
        "away": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "0"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "21.01.2023",
        "home": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "0"
        },
        "away": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "0"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "كأس الاتحاد الإنجليزي",
        "time": "14.05.2022",
        "home": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "0"
        },
        "away": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "0"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "كأس رابطة الدوري الإنجليزي",
        "time": "27.02.2022",
        "home": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "0"
        },
        "away": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "0"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "02.01.2022",
        "home": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "2"
        },
        "away": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "2"
        }
      }
    ],
    "f2fBigWins": [
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "27.08.1937",
        "home": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "6"
        },
        "away": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "1"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "19.04.1935",
        "home": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "6"
        },
        "away": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "0"
        }
      }
    ],
    "homeLastMatches": [
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "28.05.2023",
        "home": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "1"
        },
        "away": {
          "name": "نيوكاسل يونايتد",
          "url": "9287/newcastle-united",
          "img": "https://img.btolat.com/teamslogo/9287.png?v=971",
          "goals": "1"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "25.05.2023",
        "home": {
          "name": "مانشستر يونايتد",
          "url": "9260/manchester-united",
          "img": "https://img.btolat.com/teamslogo/9260.png?v=491",
          "goals": "4"
        },
        "away": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "1"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "21.05.2023",
        "home": {
          "name": "مانشستر سيتي",
          "url": "9259/manchester-city",
          "img": "https://img.btolat.com/teamslogo/9259.png?v=922",
          "goals": "1"
        },
        "away": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "0"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "13.05.2023",
        "home": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "2"
        },
        "away": {
          "name": "نوتينجهام فورست",
          "url": "9297/nottingham-forest",
          "img": "https://img.btolat.com/teamslogo/9297.png?v=865",
          "goals": "2"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "06.05.2023",
        "home": {
          "name": "بورنموث",
          "url": "9053/afc-bournemouth",
          "img": "https://img.btolat.com/teamslogo/9053.png?v=674",
          "goals": "1"
        },
        "away": {
          "name": "تشيلسي",
          "url": "9092/chelsea",
          "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
          "goals": "3"
        }
      }
    ],
    "awayLastMatches": [
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "28.05.2023",
        "home": {
          "name": "ساوثهامبتون",
          "url": "9363/southampton",
          "img": "https://img.btolat.com/teamslogo/9363.png?v=808",
          "goals": "4"
        },
        "away": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "4"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "20.05.2023",
        "home": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "1"
        },
        "away": {
          "name": "أستون فيلا",
          "url": "9008/aston-villa",
          "img": "https://img.btolat.com/teamslogo/9008.png?v=780",
          "goals": "1"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "15.05.2023",
        "home": {
          "name": "ليستر سيتي",
          "url": "9240/leicester-city",
          "img": "https://img.btolat.com/teamslogo/9240.png?v=924",
          "goals": "0"
        },
        "away": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "3"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "06.05.2023",
        "home": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "1"
        },
        "away": {
          "name": "برينتفورد",
          "url": "9059/brentford",
          "img": "https://img.btolat.com/teamslogo/9059.png?v=523",
          "goals": "0"
        }
      },
      {
        "id": "",
        "status": "finished",
        "league": "الدوري الإنجليزي",
        "time": "03.05.2023",
        "home": {
          "name": "ليفربول",
          "url": "9249/liverpool",
          "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
          "goals": "1"
        },
        "away": {
          "name": "فولهام",
          "url": "9175/fulham",
          "img": "https://img.btolat.com/teamslogo/9175.png?v=596",
          "goals": "0"
        }
      }
    ],
    "standings": [
      {
        "groupName": "  ",
        "standings": [
          {
            "order": 5,
            "teamData": {
              "name": "ليفربول",
              "img": "https://img.btolat.com/teamslogo/9249.png?v=112",
              "url": "9249/liverpool"
            },
            "matchesPlayed": 38,
            "wins": 19,
            "draws": 10,
            "losses": 9,
            "goalsFor": 75,
            "goalsAgainst": 47,
            "goalsDiff": 28,
            "points": 67
          },
          {
            "order": 12,
            "teamData": {
              "name": "تشيلسي",
              "img": "https://img.btolat.com/teamslogo/9092.png?v=306",
              "url": "9092/chelsea"
            },
            "matchesPlayed": 38,
            "wins": 11,
            "draws": 11,
            "losses": 16,
            "goalsFor": 38,
            "goalsAgainst": 47,
            "goalsDiff": -9,
            "points": 44
          }
        ]
      }
    ]
  }
}
```
