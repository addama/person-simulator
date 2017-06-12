# person-simulator
Generates randomized people using real psychological profiling systems and concepts, filling in the blanks with assumptions. 

A 'person' in this system is the combination of 3 parts: the Core, the Body wrapper, and a Person wrapper. The Core generates non-physical personality traits, that could be applied to any person. The traits generated include Meyers-Briggs, Big Five, etc. The Body is wrapped around the Core, and uses it (albeit in a limited way) to generate physical non-personality traits, which begin to define a distinct person, who would be different than another that used the same Core thanks to randomization. These traits include height, weight, birthday and age, etc. Finally, a Person wrapper generates assumptions and interpersonal identifiers based on the body and core. The traits generated are abstract, and attempt to express the person in identifiers and language such that it feels like a real person. 

In general, the Core relies on two systems to derive all other facets: Big Five Inventory and Meyers-Briggs Type Indicator. The Big Five is generated first, placing random values (as a percentage of 1-5, rather than raw 1-5) into 30 facets and 5 major traits. From there, a conversion algorithm is used to express the inventory as an MBTI type. Its popularity and its adherents' love of comparing psychological profiling systems has allowed me to generate data I wouldn't otherwise be able to. With raw emotional and personality trait values as well as a key I can use to open up more personality systems, the Core can successfully express the "essence" of a person, albeit sometimes in the extremes for some values. I haven't found a good source for value ranges for the Big Five facets, but if I do, that will greatly increase the realism.

The goal is to arrive at a set of data that is human enough to use as a basis for AI, character development in games, test data stubs, etc. Ideally this would be statistically accurate for a given population, but right now each individual is environment-less EXCEPT for age distribution (which relies on a population index to get the age ranges right), and birth defects, which are based on world population.

Once the Core and Body are combined, the Person wrapper begins to make assumptions, as well as document the person's traits using a tagging system: `not-modest`, `is-tense`, `has-diabetes`, `very-curious`. These tags can be used to make decisions and mimic interpersonal interactions. The Person wrapper also generates more abstract assumptions that are more for flavor than data, such as musical and food tastes.

_I feel it should be said that I don't have any stake in these profiling systems, nor am I responsible for the translation schemes between them. I make no difference between science and pseudo-science, because as in life, these people will have results from all of these systems whether we or they believe in their effectiveness or not._

**Core facets currently being generated**
- [Big Five](https://en.wikipedia.org/wiki/Big_Five_personality_traits)
- [Myers-Briggs Type Indicator (MBTI)](https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator)
- [Holland Codes](https://en.wikipedia.org/wiki/Holland_Codes)
- [Keirsey Temperaments](https://en.wikipedia.org/wiki/Keirsey_Temperament_Sorter)
- [Enneagrams](https://en.wikipedia.org/wiki/Enneagram_of_Personality)
- [Classical Temperaments](https://en.wikipedia.org/wiki/Four_temperaments)

**Body Facets currently being generated**
- [Somatotype](https://en.wikipedia.org/wiki/Somatotype_and_constitutional_psychology)
- Birth defects: blindness, deafness, muteness, type 1 diabetes, cerebral palsy (using world population statistics)
- Handedness (conforming to real distribution)
- Birthday and age (weighted toward ages 18 to 65)
- Western/Chinese Zodiac sign
- Height and weight (based on somatotype)
- BMI, BMI category
- Gender
- Name (about 120 names per gender)

**Assumptions**
- "Religiosity"
- Success/aptitude in sports/physical activity
- Work ethic
- Potential careers, if any
- Resistance/acceptance to change
- Likelihood of physical life occurrances (heart attack, stroke, STDs, piercings, tattoos, etc)
- Likelihood of social life occurrances (jail time, drug use, alcoholism, volunteerism, being the DD, etc)
- Favorite food, music, color, animal, etc
- Bodily phenomena (rolling the tongue, flexibility, flat footedness, hair color/shape, etc)
- Incidental identifying information (email address, phone number, etc)

# Usage
Load index.htm as you would any website, preferrably from a webserver. All output is written to the console for the moment. To open the console in modern browsers, press F12, then find the Console tab in the popup. People generated are represented as objects, meaning that you must click on their data to open it up and see its constituent parts.

index.htm is just a crude testing tool for the system, so I encourage you to play around with it. The `population` variable is how many people will be generated. I have successfully created up to 500,000 people in a single batch, though at this amount, it isn't reliable whether or not the task will finish or the tab will die. Up to 100,000 can consistently be generated in about 30 seconds with few problems. The less that is logged to the console, the more it can do before timing out. It is most effective to generate new People into an array, and print the array only once everything is done.

To generate more, refresh the page.

# Example output
```
{
	"core": {
		"matrix": {
			"neuroticism": {
				"tense": 6,
				"irritable": 68,
				"depressed": 75,
				"shy": 74,
				"moody": 85,
				"vulnerable": 26
			},
			"extroversion": {
				"outgoing": 48,
				"sociable": 52,
				"assertive": 89,
				"energetic": 80,
				"adventurous": 85,
				"enthusiastic": 46
			},
			"openness": {
				"imaginative": 65,
				"artistic": 9,
				"excitable": 95,
				"wellrounded": 3,
				"curious": 81,
				"accepting": 19
			},
			"agreeableness": {
				"forgiving": 7,
				"blunt": 62,
				"altruistic": 63,
				"compliant": 59,
				"modest": 49,
				"sympathetic": 22
			},
			"conscientiousness": {
				"efficient": 47,
				"organized": 27,
				"dutiful": 56,
				"thorough": 94,
				"disciplined": 88,
				"deliberate": 11
			}
		},
		"stats": {
			"total": 1591,
			"max": 3000,
			"totals": {
				"neuroticism": 334,
				"extroversion": 400,
				"openness": 272,
				"agreeableness": 262,
				"conscientiousness": 323
			},
			"averages": {
				"neuroticism": 55,
				"extroversion": 66,
				"openness": 45,
				"agreeableness": 43,
				"conscientiousness": 53
			}
		},
		"mbti": "entp",
		"holland": [
			"investigative",
			"enterprising",
			"social"
		],
		"keirsey": [
			"inventor",
			"engineer",
			"rational",
			"introspective"
		],
		"enneagram": {
			"type": "7",
			"role": "enthusiast",
			"fixation": "planning",
			"idea": "wisdom, plan",
			"fear": "being trapped",
			"desire": "to be content",
			"tempation": "thinking satisfaction is elsewhere",
			"vice": "gluttony",
			"virtue": "sobriety",
			"foe": "1",
			"friend": "5"
		},
		"temperament": {
			"type": "choleric",
			"descriptors": [
				"egocentric",
				"impulsive",
				"aggressive"
			]
		}
	},
	"age": {
		"years": 42,
		"category": "adult",
		"astrology": {
			"western": "taurus",
			"eastern": "rabbit"
		},
		"birthday": {
			"day": 2,
			"month": 5,
			"year": 1975
		}
	},
	"gender": "male",
	"name": "simon",
	"physical": {
		"type": "medial",
		"height": 65,
		"weight": 170,
		"handedness": "mixed",
		"bmi": 28.286390532544377,
		"bmiCategory": "overweight",
		"birthDefects": []
	},
	"tags": [
		"can-Drink",
		"can-Drive",
		"is-adult",
		"is-adventurous",
		"is-assertive",
		"is-curious",
		"is-disciplined",
		"is-egocentric",
		"is-energetic",
		"is-male",
		"is-mixed-handed",
		"is-moody",
		"is-overweight",
		"not-artistic",
		"not-forgiving",
		"not-tense",
		"not-wellrounded",
		"very-excitable",
		"very-thorough"
	],
	"tastes": {}
}
```

# But why?
It started out as a stock market simulation, where I had an agent based system. Each agent had money and thresholds for how much they would be willing to spend, how likely they were to snatch up cheap stocks, and how varied they wanted to keep their portfolio. As I was creating this, I began thinking about all of the additional factors that I could tack on to these faceless agents to make their interactions more genuine. From there, I moved on with the goal of generating people capable of making decisions based on their own personalities, hold jobs, get hungry, have friends, and in general *live*. These would of course be simple decisions and simple lives, but a good pursuit nonetheless.

The "why" of it is because I like simulations and randomness, and I feel that a lot can be done with randomness and making assumptions based on that randomness to create "real" things. It's one thing to just generate a random person, with random attributes; it's quite another to create a person that actually makes sense as a potential human.

**Potential uses:**
- NPC generation for games that have complex, reality-based personalities.
- Automated testing of user-based applications and websites that require user input.
- AI interaction and decision making simulation.
- Psychological profiling exercises.

# Still to be done
- Bound the Big Five inventory values so they are more accurate to actual test values, rather than being purely random.

- Expand the human, non-personality, attributes like hunger, mood, thirst, comfort, wakefulness, etc. This expansion would have to be accompanied by functions necessary to regulate these attributes.

- Write API-like functions that pass tag and descriptor data between Person objects, or between a Person and Job, Home, Car, etc.

# All the references in the world
- [https://en.wikipedia.org/wiki/Two-factor_models_of_personality](https://en.wikipedia.org/wiki/Two-factor_models_of_personality)
- [https://en.wikipedia.org/wiki/Big_Five_personality_traits](https://en.wikipedia.org/wiki/Big_Five_personality_traits)
- [http://www.brianmac.co.uk/bodytype.htm](http://www.brianmac.co.uk/bodytype.htm)
- [http://www.burnthefatinnercircle.com/members/images/596.jpg](http://www.burnthefatinnercircle.com/members/images/596.jpg)
- [http://www.mysomatotype.com/body-type/?page_id=281](http://www.mysomatotype.com/body-type/?page_id=281)
- [http://nuclear.ucdavis.edu/~rpicha/personal/astrology/zodiac1.png](http://nuclear.ucdavis.edu/~rpicha/personal/astrology/zodiac1.png)
- [http://www.typologycentral.com/forums/mbti-tm-and-jungian-cognitive-functions/42045-ocean-personality-matrix-combining-mbti-kiersey-temperament.html](http://www.typologycentral.com/forums/mbti-tm-and-jungian-cognitive-functions/42045-ocean-personality-matrix-combining-mbti-kiersey-temperament.html)
- [https://en.wikipedia.org/wiki/Holland_Codes](https://en.wikipedia.org/wiki/Holland_Codes)
- [https://en.wikipedia.org/wiki/Keirsey_Temperament_Sorter](https://en.wikipedia.org/wiki/Keirsey_Temperament_Sorter)
- [https://en.wikipedia.org/wiki/Enneagram_of_Personality](https://en.wikipedia.org/wiki/Enneagram_of_Personality)
- [http://personalityjunkie.com/07/myers-briggs-enneagram-mbti-types-correlations-relationship/](http://personalityjunkie.com/07/myers-briggs-enneagram-mbti-types-correlations-relationship/)
- [http://daemonsandanalyses.tumblr.com/post/50016577026/likely-enneagram-mbti-and-form-correlations](http://daemonsandanalyses.tumblr.com/post/50016577026/likely-enneagram-mbti-and-form-correlations)
