# person-simulator
Generates randomized people using real psychological profiling systems and concepts, filling in the blanks with assumptions. 

At its core is a matrix of five categories, containing six subcategories each, as described by the Big Five personality Trait system. These subcategories are given numbers which are generated as a percentile to show how strong that subcategory is for this person. 

From there, I rely on many assumptions and conversions that I have found on the internet to translate these core facets of personality into other systems, most importantly the MBTI, which is used as the base for several of the conversions. Its popularity and its adherents' love of comparing psychological profiling systems has allowed me to generate data I wouldn't otherwise be able to. These assumptions and conversions would be tenuous at best if applied to a real person, but since we're creating these peoples' reality as we go, they are necessary in lieu of anything more meaningful.

As I become aware of further or more accurate associations between facets of personality, I can update these functions to produce more "accurate" data. As it stands, I have seen no bizarre results or non-sensical assumptions. If anything, I think they are too uniform in their current state, and need a more human touch, which I have planned as a part of the expanded Assumptions catalog.

I feel it should be said that I don't have any stake in these profiling systems, nor am I responsible for the translation schemes between them. I make no difference between science and pseudo-science, because as in life, these people will have results from all of these systems whether we or they believe in their effectiveness or not.

**Profiles currently being generated:**
- [Big Five](https://en.wikipedia.org/wiki/Big_Five_personality_traits)
- [Myers-Briggs Type Indicator (MBTI)](https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator)
- [Holland Codes](https://en.wikipedia.org/wiki/Holland_Codes)
- [Keirsey Temperaments](https://en.wikipedia.org/wiki/Keirsey_Temperament_Sorter)
- [Enneagrams](https://en.wikipedia.org/wiki/Enneagram_of_Personality)
- [Classical Temperaments](https://en.wikipedia.org/wiki/Four_temperaments)
- [Somatotype](https://en.wikipedia.org/wiki/Somatotype_and_constitutional_psychology)

**Additional factors:**
- Handedness
- Birthday and age
- Western/Chinese Zodiac sign
- BMI
- Gender
- Name (about 100 names per gender)

**Assumptions to be made based on the above:**
- "Religiosity" (WIP)
- Success/aptitude in sports/physical activity (NYI)
- Sentimentality vs. Stoicism (NYI)
- Sense of right and wrong (NYI)
- Work ethic (NYI)
- Potential careers, if any (NYI)
- Resistance/acceptance to change (NYI)
- Likelihood of physical life occurrances (heart attack, stroke, STDs, piercings, tattoos, etc)
- Likelohood of social life occurrances (jail time, drug use, alcoholism, volunteerism, being the DD, etc)

**Assumptions that can be made with or without the above:**
- Musical preference (NYI)
- Favorite *thing* (e.g. color, pet, etc) (NYI)
- Bodily phenomena (rolling the tongue, flexibility, flat footedness, hair color/shape, etc) (NYI)
- Incidental identifying information (email address, phone number, etc) (NYI)

# Usage
Load index.htm as you would any website, preferrably from a webserver. All output is written to the console for the moment. To open the console in modern browsers, press F12, then find the Console tab in the popup. People generated are represented as objects, meaning that you must click on their data to open it up and see its constituent parts.

index.htm is just a crude testing tool for Person.js, so I encourage you to play around with it. The `count` variable is how many people will be generated. I have successfully created up to 500,000 people in a single batch, though at this amount, it isn't reliable whether or not the task will finish or the tab will die. Up to 100,000 can consistently be generated in about 30 seconds with few problems. 

To generate more, refresh the page.

# Example output
```
{
    "matrix": {
        "neuroticism": {
            "anxiety": 32,
            "hostility": 41,
            "depression": 36,
            "selfconsciousness": 30,
            "impulsiveness": 43,
            "stress": 99
        },
        "extroversion": {
            "warmth": 9,
            "gregariousness": 0,
            "assertiveness": 51,
            "activity": 13,
            "excitementseeking": 89,
            "positivity": 93
        },
        "openness": {
            "fantasy": 66,
            "aesthetics": 6,
            "feelings": 89,
            "actions": 64,
            "ideas": 89,
            "values": 18
        },
        "agreeableness": {
            "trust": 28,
            "straightforwardness": 54,
            "altruism": 35,
            "compliance": 53,
            "modesty": 63,
            "tendermindedness": 24
        },
        "conscientiousness": {
            "competence": 42,
            "order": 35,
            "dutifulness": 15,
            "striving": 37,
            "discipline": 67,
            "deliberation": 92
        }
    },
    "gender": "female",
    "age": 54,
    "totals": {
        "neuroticism": 47,
        "extroversion": 42,
        "openness": 55,
        "agreeableness": 43,
        "conscientiousness": 48
    },
    "ageCategory": "Middle Aged",
    "name": "Jessica",
    "mbti": "ISFP",
    "holland": [
        "realistic",
        "artistic",
        "social"
    ],
    "keirsey": [
        "Composer",
        "Entertainer",
        "Artisan",
        "Observant"
    ],
    "quadrant": "phlegmatic",
    "body": {
        "type": "endo-ecto",
        "height": 62,
        "weight": 140,
        "soma": [
            4,
            2,
            3
        ],
        "bmi": 25.60353798126951,
        "category": "overweight",
        "handedness": "right"
    },
    "enneagram": {
        "type": "6",
        "role": "loyalist",
        "fixation": "cowardice",
        "idea": "faith",
        "fear": "being unsupported, without guidance",
        "desire": "to be supported, guided",
        "tempation": "indecision, doubt",
        "vice": "fear",
        "virtue": "courage",
        "foe": "3",
        "friend": "9"
    },
    "faith": "Spiritual",
    "birthday": {
        "day": 18,
        "month": 1,
        "year": 1961
    },
    "astro": {
        "western": {
            "sign": "capricorn"
        },
        "eastern": {
            "sign": "ox"
        }
    }
}
```

# But why?
It started out as a stock market simulation, where I had an agent based system. Each agent had money and thresholds for how much they would be willing to spend, how likely they were to snatch up cheap stocks, and how varied they wanted to keep their portfolio. As I was creating this, I began thinking about all of the additional factors that I could tack on to these faceless agents to make their interactions more genuine. From there, I moved on with the goal of generating people capable of making decisions based on their own personalities, hold jobs, get hungry, have friends, and in general *live*. 

The "why" of it is because I like simulations and randomness, and I feel that a lot can be done with randomness and making assumptions based on that randomness to create "real" things. It's one thing to just generate a random person, with random attributes; it's quite another to create a person that actually makes sense as a potential human.

**Potential uses:**
- NPC generation for games that have complex, reality-based personalities.
- Automated testing of user-based applications and websites that require user input.
- Interaction simulation.
- Psychological profiling exercises.
- Potential basis for AI personality (with, you know, a *whole* lot more work!)

# Still to be done
- Generate Big Five matrix macro-categories first, then using the intensity of those numbers to generate the subcategories. It is currently completely random, and doesn't account for subcategories that may influence others.

- Extend the body generation function to not just look at the only broadly applicable MBTI association, but also toward impulse control, stress levels, etc.

- Implement all those NYI things in the lists above.

- Expand the human, non-personality, attributes like hunger, mood, thirst, comfort, wakefulness, etc. This expansion would have to be accompanied by functions necessary to regulate these attributes.

- Expand the above functions to make use of internal data that this person has available to them based on preference and experience (how hungry are you? Would you like Chinese food right now? Which Chinese restaurant would you like to go to?)

