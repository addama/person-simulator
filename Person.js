
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function has(array, value) {
	return (array.indexOf(value) >= 0) ? true : false;
}

function getDate(date) {
	var today = (date) ? new Date(date) : new Date();
	if (today.toJSON()) {
		return {
			'day': today.getDate(), 
			'month': today.getMonth() + 1, 
			'year': today.getFullYear(),
			'hour': today.getHours(),
			'minute': today.getMinutes(),
			'second': today.getSeconds(),
			'full': today.toJSON(),
			'unix': today.getTime()
		};
	} 
	return false;
}

var Person = function(population, data) {
	// https://en.wikipedia.org/wiki/Two-factor_models_of_personality
	// https://en.wikipedia.org/wiki/Big_Five_personality_traits
	// http://www.brianmac.co.uk/bodytype.htm
	// http://www.burnthefatinnercircle.com/members/images/596.jpg
	// http://www.mysomatotype.com/body-type/?page_id=281
	
	// Variables
	var	maxValue = 99 * 6;
	var words = {
		name: {
			male: [
				'Jacob', 'Muhammad', 'Aaron', 'Shawn', 'Jonah', 'Daniel', 'Alex', 'Liam', 'Ryan', 'James', 'Michael', 
				'David', 'Ethan', 'Matthew', 'Luke', 'Harry', 'Ali', 'Jack', 'Jordan', 'Alexander', 'Tyler', 'Joshua',
				'Andrew', 'Dylan', 'Noah', 'Kevin', 'Adam', 'Joseph', 'Barry', 'Ryu', 'Jin', 'Evan', 'Juan', 'Jacque',
				'Nathan', 'John', 'Austin', 'Logan', 'Christopher', 'Louis', 'William', 'Brian', 'Anthony', 'Liu', 
				'Jason',  'Max', 'Kyle', 'Justin', 'Jackson', 'Brandon', 'Wesley', 'Peter', 'Pablo', 'Pascal', 'Donald',
				'Patrick', 'Paul', 'Phillip', 'Steven', 'George', 'Gregory', 'Guy', 'Geoffrey', 'Gordon', 'Grant', 
				'Sebastian', 'Sol', 'Sergio', 'Samuel', 'Scott', 'Sean', 'Simon', 'Stanley', 'Sandeep', 'Sven', 'Sanjay',
				'Charles', 'Cody', 'Colin', 'Cameron', 'Carl', 'Oscar', 'Owen', 'Omar', 'Kevin', 'Kurt', 'Caleb', 
				'Kent', 'Marcus', 'Martin', 'Mitch', 'Miles', 'Frank', 'Fred', 'Benjamin', 'Bob', 'Robert', 'Burt',
			],
			female: [
				'Chloe', 'Emily', 'Emma', 'Jennifer', 'Olivia', 'Jessica', 'Hannah', 'Lily', 'Sarah', 'Savannah', 
				'Isabella', 'Ava', 'Sophia', 'Ella', 'Grace', 'Charlotte', 'Elizabeth', 'Mia', 'Rebecca', 'Abigail', 'Samantha',
				'Ashley', 'Anna', 'Anne', 'Lauren', 'Megan', 'Nicole', 'Madison', 'Zoe', 'Katie', 'Jasmine', 'Amber',
				'Amy', 'Alyssa', 'Lucy', 'Abby', 'Amanda', 'Bella', 'Natalie', 'Rachel', 'Kelly', 'Alexis', 'Virginia',
				'Paige', 'Vanessa', 'Alice', 'Angela', 'Aurora', 'April', 'Anastasia', 'Audrey', 'Betsy', 'Brandy', 
				'Barbara', 'Bridget', 'Brittany', 'Bernadette', 'Beverly', 'Bianca', 'Brenda', 'Bronwyn', 'Bethany', 
				'Dakota', 'Diane', 'Danielle', 'Dawn', 'Daisy', 'Rose', 'Deborah', 'Deirdre', 'Dorothy', 'Valerie',
				'Frankie', 'Fiona', 'Fatima', 'Felicia', 'Helen', 'Holly', 'Haley', 'Heidi', 'Harley', 'Hillary',
				'Patty', 'Paula', 'Pamela', 'Phoebe', 'Paris', 'Crystal', 'Priya', 'Penny', 'Maria', 'Mary', 'Christina',
				'Gertrude', 'Ruby',
				
			],
		},
	}
	
	var enneagrams = {
		'1': {
			'type': '1',
			'role': 'reformer',
			'fixation': 'resentment',
			'idea': 'perfection',
			'fear': 'corruptness, imbalance, being bad',
			'desire': 'goodness, integrity, balance',
			'tempation': 'hypocrisy, hypercriticism',
			'vice': 'anger',
			'virtue': 'serenity',
			'foe': '4',
			'friend': '7'
		},
		'2': {
			'type': '2',
			'role': 'helper',
			'fixation': 'flattery',
			'idea': 'freedom',
			'fear': 'being unloved',
			'desire': 'to feel love',
			'tempation': 'self-depreciation, manipulation',
			'vice': 'pride',
			'virtue': 'humility',
			'foe': '8',
			'friend': '4'
		},
		'3': {
			'type': '3',
			'role': 'achiever',
			'fixation': 'vanity',
			'idea': 'hope, law',
			'fear': 'worthlessness',
			'desire': 'to feel valuable',
			'tempation': 'pushing self too far',
			'vice': 'deceit',
			'virtue': 'honesty',
			'foe': '9',
			'friend': '6'
		},
		'4': {
			'type': '4',
			'role': 'individualist',
			'fixation': 'melancholy',
			'idea': 'origin',
			'fear': 'having no identity or significance',
			'desire': 'to be unique',
			'tempation': 'overuse of imagination',
			'vice': 'envy',
			'virtue': 'equanimity',
			'foe': '2',
			'friend': '1'
		},
		'5': {
			'type': '5',
			'role': 'investigator',
			'fixation': 'stinginess',
			'idea': 'omniscience, transparency',
			'fear': 'helplessness, incompetence',
			'desire': 'mastery, understanding',
			'tempation': 'replacing experience with concepts',
			'vice': 'avarice',
			'virtue': 'non-attachment',
			'foe': '7',
			'friend': '8'
		},
		'6': {
			'type': '6',
			'role': 'loyalist',
			'fixation': 'cowardice',
			'idea': 'faith',
			'fear': 'being unsupported, without guidance',
			'desire': 'to be supported, guided',
			'tempation': 'indecision, doubt',
			'vice': 'fear',
			'virtue': 'courage',
			'foe': '3',
			'friend': '9'
		},
		'7': {
			'type': '7',
			'role': 'enthusiast',
			'fixation': 'planning',
			'idea': 'wisdom, plan',
			'fear': 'being trapped',
			'desire': 'to be satisfied, content',
			'tempation': 'thinking satisfaction is elsewhere',
			'vice': 'gluttony',
			'virtue': 'sobriety',
			'foe': '1',
			'friend': '5'
		},
		'8': {
			'type': '8',
			'role': 'challenger',
			'fixation': 'vengeance',
			'idea': 'truth',
			'fear': 'being controlled, harmed',
			'desire': 'self-protection',
			'tempation': 'thinking they are too self-sufficient',
			'vice': 'lust',
			'virtue': 'innocence',
			'foe': '5',
			'friend': '2'
		},
		'9': {
			'type': '9',
			'role': 'peacemaker',
			'fixation': 'daydreaming',
			'idea': 'love',
			'fear': 'loss, separation',
			'desire': 'wholeness, peace of mind',
			'tempation': 'avoiding conflicts',
			'vice': 'sloth',
			'virtue': 'action',
			'foe': '6',
			'friend': '3'
		},
		
		
	};
	
	// http://nuclear.ucdavis.edu/~rpicha/personal/astrology/zodiac1.png
	var zodiac = {
		// Western
		'capricorn': {
			sign: 'capricorn',
		},
		'aquarius': {
			sign: 'aquarius',
		},
		'pisces': {
			sign: 'pisces',
		},
		'aries': {
			sign: 'aries',
		},
		'taurus': {
			sign: 'taurus',
		},
		'gemini': {
			sign: 'gemini',
		},
		'cancer': {
			sign: 'cancer',
		},
		'leo': {
			sign: 'leo',
		},
		'virgo': {
			sign: 'virgo',
		},
		'libra': {
			sign: 'libra',
		},
		'scorpio': {
			sign: 'scorpio',
		},
		'sagittarius': {
			sign: 'sagittarius',
		},
		
		// Chinese
		'rat': {
			sign: 'rat',
		},
		'ox': {
			sign: 'ox',
		},
		'tiger': {
			sign: 'tiger',
		},
		'rabbit': {
			sign: 'rabbit',
		},
		'dragon': {
			sign: 'dragon',
		},
		'snake': {
			sign: 'snake',
		},
		'horse': {
			sign: 'horse',
		},
		'goat': {
			sign: 'goat',
		},
		'monkey': {
			sign: 'monkey',
		},
		'rooster': {
			sign: 'rooster',
		},
		'dog': {
			sign: 'dog',
		},
		'pig': {
			sign: 'pig',
		},
	}

	// Generative functions
	function makeMatrix() {
		return {
			neuroticism: {
				anxiety: 				getRandomNumber(0, 100),
				hostility: 			getRandomNumber(0, 100),
				depression: 			getRandomNumber(0, 100),
				selfconsciousness: 	getRandomNumber(0, 100),
				impulsiveness: 		getRandomNumber(0, 100),
				stress: 				getRandomNumber(0, 100),
			},
			extroversion: {
				warmth: 				getRandomNumber(0, 100),
				gregariousness: 		getRandomNumber(0, 100),
				assertiveness: 		getRandomNumber(0, 100),
				activity: 			getRandomNumber(0, 100),
				excitementseeking: 	getRandomNumber(0, 100),
				positivity: 			getRandomNumber(0, 100),
			},
			openness: {
				fantasy: 				getRandomNumber(0, 100),
				aesthetics: 			getRandomNumber(0, 100),
				feelings: 			getRandomNumber(0, 100),
				actions: 				getRandomNumber(0, 100),
				ideas: 				getRandomNumber(0, 100),
				values: 				getRandomNumber(0, 100),
			},
			agreeableness: {
				trust: 				getRandomNumber(0, 100),
				straightforwardness: 	getRandomNumber(0, 100),
				altruism: 			getRandomNumber(0, 100),
				compliance: 			getRandomNumber(0, 100),
				modesty: 				getRandomNumber(0, 100),
				tendermindedness: 		getRandomNumber(0, 100),
			},
			conscientiousness: {
				competence: 			getRandomNumber(0, 100),
				order: 				getRandomNumber(0, 100),
				dutifulness: 			getRandomNumber(0, 100),
				striving: 			getRandomNumber(0, 100),
				discipline: 			getRandomNumber(0, 100),
				deliberation: 		getRandomNumber(0, 100),
			},
		}
	}
	
	function assignGender() {
		return (getRandomNumber(0,2)) ? 'female' : 'male';
	}
	
	function assignName(gender) {
		return words.name[gender][getRandomNumber(0,words.name[gender].length)];
	}
	
	function assignAge(population) {
		if (population === null || population === '' || population <= 1) population = 100;
		var chance = Math.floor(Math.log(population));
		var limit = population / chance;
		var age = getRandomNumber(18, 66);
		if (getRandomNumber(0, population) < limit) {
			if (getRandomNumber(0,2) === 0) {
				age = getRandomNumber(0, 18);
			} else {
				age = getRandomNumber(65, 101);
			}
		}
		return age;
	}
	
	function getQuadrant(axis1, axis2) {
		// Creates a graph of 2 values, each having 54 units from top to bottom
		// Crossing these axes in the middle creates quadrants
		// Values are assumed to be percentages out of 100
		switch (true) {
			case axis1 >= 50 && axis2 >= 50:
				// +1, +2
				return 2; break;
			case axis1 <= 50 && axis2 >= 50:
				// -1, +2
				return 1; break;
			case axis1 >= 50 && axis2 <= 50:
				// +1, -2
				return 4; break;
			case axis1 <= 50 && axis2 <= 50:
				// -1, -2
				return 3; break;
		}
	}
	
	function getMBTI(person) {
		// http://www.typologycentral.com/forums/mbti-tm-and-jungian-cognitive-functions/42045-ocean-personality-matrix-combining-mbti-kiersey-temperament.html
		var mbti = [];
		mbti.push('I', 'N', 'F', 'P');
		if (person.totals.extroversion >= 50) mbti[0] = 'E';
		if (person.totals.openness >= 50) mbti[1] = 'S';
		
		if ((mbti[1] === 'S' && person.totals.agreeableness >= 50) || (mbti[1] === 'N' && person.totals.agreeableness < 50)) 
			mbti[2] = 'T';
		
		if ((mbti[1] === 'S' && person.totals.conscientiousness >= 50) || (mbti[1] === 'N' && person.totals.conscientiousness < 50)) 
			mbti[3] = 'J';

		return mbti.join('');
	}
	
	function getHolland(person) {
		// https://en.wikipedia.org/wiki/Holland_Codes
		var mbti = person.mbti.split('');
		var scores = {
			realistic: 0,
			investigative: 0,
			artistic: 0,
			social: 0,
			enterprising: 0,
			conventional: 0,
		}
		
		// Realistic
		if (has(mbti, 'S')) scores.realistic ++;
		if (has(mbti, 'T')) scores.realistic ++;
		if (has(mbti, 'P')) scores.realistic ++;
		if (person.mbti === 'ISTP') scores.realistic += 12;
		if (person.mbti === 'ESTP') scores.realistic += 7;
		if (person.mbti === 'ISFP') scores.realistic += 5;
		
		// Investigative
		if (has(mbti, 'N')) scores.investigative += 2;
		if (has(mbti, 'T')) scores.investigative += 2;
		if (person.mbti === 'INTP') scores.investigative += 12;
		if (person.mbti === 'INTJ') scores.investigative += 12;
		if (person.mbti === 'ENTP') scores.investigative += 12;
		if (person.mbti === 'ENTJ') scores.investigative += 7;
		
		// Artistic
		if (has(mbti, 'N')) scores.artistic ++;
		if (has(mbti, 'F')) scores.artistic ++;
		if (has(mbti, 'P')) scores.artistic ++;
		if (person.mbti === 'INFP') scores.artistic += 12;
		if (person.mbti === 'INFJ') scores.artistic += 10;
		if (person.mbti === 'ENFP') scores.artistic += 7;
		if (person.mbti === 'ENFJ') scores.artistic += 5;
		if (person.mbti === 'ISFP') scores.artistic += 5;
		
		// Social
		if (has(mbti, 'E')) scores.social += 2;
		if (has(mbti, 'F')) scores.social += 2;
		if (person.mbti === 'ENFP') scores.social += 7;
		if (person.mbti === 'ENFJ') scores.social += 7;
		if (person.mbti === 'ESFP') scores.social += 7;
		if (person.mbti === 'ESFJ') scores.social += 12;
		if (person.mbti === 'ISFJ') scores.social += 5;
		
		// Enterprising
		if (has(mbti, 'E')) scores.enterprising += 4;
		if (person.mbti === 'ENTJ') scores.enterprising += 7;
		if (person.mbti === 'ESTJ') scores.enterprising += 7;
		if (person.mbti === 'ESTP') scores.enterprising += 7;
		if (person.mbti === 'ESFP') scores.enterprising += 7;
		if (person.mbti === 'ENFP') scores.enterprising += 7;
		if (person.mbti === 'ENFJ') scores.enterprising += 7;
		
		// Conventional
		if (has(mbti, 'S')) scores.conventional += 2;
		if (has(mbti, 'J')) scores.conventional += 2;
		if (person.mbti === 'ISTJ') scores.conventional += 12;
		if (person.mbti === 'ISFJ') scores.conventional += 7;
		if (person.mbti === 'ESTJ') scores.conventional += 7;
		
		var sorted = [];
		for (var k in scores) {
			sorted.push([k, scores[k]]);
		}
		sorted.sort(function(a, b) {
			return b[1] - a[1];
		});
		return [sorted[0][0], sorted[1][0], sorted[2][0]];
	}

	function getKeirsey(person) {
		//https://en.wikipedia.org/wiki/Keirsey_Temperament_Sorter
		var mbti = person.mbti;
		switch (mbti) {
			case 'ESFJ': return ['Provider', 'Conservator', 'Guardian', 'Observant']; break;
			case 'ISFJ': return ['Protector', 'Conservator', 'Guardian', 'Observant']; break;
			case 'ESTJ': return ['Supervisor', 'Administrator', 'Guardian', 'Observant']; break;
			case 'ISTJ': return ['Inspector', 'Administrator', 'Guardian', 'Observant']; break;
			
			case 'ESFP': return ['Performer', 'Entertainer', 'Artisan', 'Observant']; break;
			case 'ISFP': return ['Composer', 'Entertainer', 'Artisan', 'Observant']; break;
			case 'ESTP': return ['Promoter', 'Operator', 'Artisan', 'Observant']; break;
			case 'ISTP': return ['Crafter', 'Operator', 'Artisan', 'Observant']; break;
			
			case 'ENFP': return ['Champion', 'Advocate', 'Idealist', 'Introspective']; break;
			case 'INFP': return ['Healer', 'Advocate', 'Idealist', 'Introspective']; break;
			case 'ENFJ': return ['Teacher', 'Mentor', 'Idealist', 'Introspective']; break;
			case 'INFJ': return ['Counselor', 'Mentor', 'Idealist', 'Introspective']; break;
			
			case 'ENTP': return ['Inventor', 'Engineer', 'Rational', 'Introspective']; break;
			case 'INTP': return ['Architect', 'Engineer', 'Rational', 'Introspective']; break;
			case 'ENTJ': return ['Fieldmarshal', 'Coordinator', 'Rational', 'Introspective']; break;
			case 'INTJ': return ['Mastermind', 'Coordinator', 'Rational', 'Introspective']; break;
		}
	}
	
	function getEnneagram(person) {
		// https://en.wikipedia.org/wiki/Enneagram_of_Personality
		// http://personalityjunkie.com/07/myers-briggs-enneagram-mbti-types-correlations-relationship/
		// http://daemonsandanalyses.tumblr.com/post/50016577026/likely-enneagram-mbti-and-form-correlations
				
		// 1 8: ENTJ, ESTP, ISTP, ESTJ	Fears losing control
		// 2 9: INFP, ENFP, INFJ, ENFJ, ISFP, INTP	Fears conflict
		// 2 1: INFJ, ENFJ, ESFJ, ISFJ, INTJ, ENTJ, ISTJ	Fears being the bad guy
		
		// 2 2: ENFJ, ESFJ, ESFP, INFP, ISFJ, INFJ, ENFP	Fears not being loved
		// 2 3: ESFP, ENTJ, ENTP, ESTP, ESTJ, ENFP, ENFJ	Fears being worthless
		// 1 4: INFP, ISFP, ISFJ, INFJ	Fears being insignificant
		
		// 1 5: INTP, INTJ, ISTJ, ISTP	Fears being helpless/incompetent
		// 3 6: INFP, INFJ, ISFJ, ENFJ, ESTP, ESFJ, INTP, INTJ, ISTP, ISFP, ISTJ, ENTP, ENFP, ENTJ, ESFP, ESTJ	Fears being abandoned
		// 1 7: ESTP, ESFP, ENFP, ENTP	Fears being in pain

		var choice = ['6'];
		switch (person.mbti) {
			case 'ESFJ':
				// ESFJ: 1, 2, 6
				choice = ['1', '2', '6'];
				break;
			case 'ISFJ': 
				// ISFJ: 1, 2, 4, 6
				var choice = ['1', '2', '4', '6'];
				break;
			case 'ESTJ': 
				// ESTJ: 8, 3, 6
				var choice = ['8', '3', '6'];
				break;
			case 'ISTJ': 
				// ISTJ: 1, 5, 6
				var choice = ['1', '5', '6'];
				break;
			
			case 'ESFP': 
				// ESFP: 2, 3, 6, 7
				var choice = ['2', '3', '6', '7'];
				break;
			case 'ISFP': 
				// ISFP: 9, 4, 6
				var choice = ['9', '4', '6'];
				break;
			case 'ESTP': 
				// ESTP: 8, 3, 6, 7
				var choice = ['8', '3', '6', '7', '6'];
				break;
			case 'ISTP': 
				// ISTP: 8, 5, 6
				var choice = ['8', '5', '6'];
				break;
			
			case 'ENFP': 
				// ENFP: 9, 2, 3, 6, 7
				var choice = ['9', '2', '3', '6', '7'];
				break;
			case 'INFP': 
				// INFP: 9, 2, 4, 6
				var choice = ['9', '2', '4', '6'];
				break;
			case 'ENFJ': 
				// ENFJ: 9, 1, 2, 3, 6
				var choice = ['9', '1', '2', '3', '6'];
				break;
			case 'INFJ': 
				// INFJ: 9, 1, 2, 4, 6
				var choice = ['9', '1', '2', '4', '6'];
				break;
			
			case 'ENTP': 
				// ENTP: 3, 6, 7
				var choice = ['3', '7', '6'];
				break;
			case 'INTP': 
				// INTP: 9, 5, 6
				var choice = ['9', '5', '6'];
				break;
			case 'ENTJ': 
				// ENTJ: 8, 1, 3, 6
				var choice = ['8', '1', '3', '6'];
				break;
			case 'INTJ': 
				// INTJ: 1, 5, 6
				var choice = ['1', '5', '6'];
				break;
		}
		return enneagrams[choice[getRandomNumber(0, choice.length)]];

	}
	
	function getAgeCategory(person) {
		switch (true) {
			case person.age < 6: return 'Infant'; break;
			case person.age < 13: return 'Child'; break;
			case person.age < 19: return 'Teenager'; break;
			case person.age < 51: return 'Adult'; break;
			case person.age < 71: return 'Middle Aged'; break;
			default: return 'Elderly'; break;
		}
	}
	
	function getBMI(weight, height) {
		// Find the BMI
		var bmi = (weight / (height * height)) * 703;
		return bmi;
	}
	
	function getBMICategory(bmi) {
		var category = 'healthy';
		switch (true) {
			case bmi < 18.5:
				category = 'underweight';
				break;
			case bmi >= 25 && bmi < 30:
				category = 'overweight';
				break;
			case bmi >= 30 && bmi < 35:
				category = 'obese';
				break;
			case bmi >= 35 && bmi < 40:
				category = 'clinically obese';
				break;
			case bmi >= 40:
				category = 'morbidly obese';
				break;	
		}
		return category;
	}
	
	function getSomatotype(person) {
		// Someone came up with pseudo-science that ties MBTI with somatotype
		// which is unrealistic, but makes it easier to provide randomized
		// values, so whatever
		
		// Somatotype Number: Endo-Meso-Ecto
		var soma = [4, 4, 4];
		var type = 'medial';
		switch (person.mbti) {
			// Meso-centric
			case 'ESTJ':
			case 'ESFP':
			case 'ESTP':
				soma[0] -= getRandomNumber(0, 4);
				soma[1] += getRandomNumber(1, 4);
				soma[2] -= getRandomNumber(0, 4);
				type = 'meso';
				break;
				
			// Endo-centric
			case 'ISJF':
			case 'INFJ':
			case 'INFP':
				soma[0] += getRandomNumber(1, 4);
				soma[1] -= getRandomNumber(0, 4);
				soma[2] -= getRandomNumber(0, 4);
				type = 'endo';
				break;
				
			// Ecto-centric
			case 'ISTP':
			case 'INTP':
			case 'INTJ':
				soma[0] -= getRandomNumber(0, 4);
				soma[1] -= getRandomNumber(0, 4);
				soma[2] += getRandomNumber(1, 4);
				type = 'ecto';
				break;
				
			// Transitional
			case 'ESFJ':
				soma[0] += getRandomNumber(-1, 3);
				soma[1] += getRandomNumber(-1, 3);
				soma[2] = getRandomNumber(1, 3);
				type = 'endo-meso';
				break;
			case 'ISTJ':
				soma[0] = getRandomNumber(1, 3);
				soma[1] += getRandomNumber(-1, 3);
				soma[2] += getRandomNumber(-1, 3);
				type = 'ecto-meso';
				break;
			case 'ISFP':
				soma[0] += getRandomNumber(-1, 3);
				soma[1] = getRandomNumber(1, 3);
				soma[2] += getRandomNumber(-1, 3);
				type = 'endo-ecto';
				break;
				
			// Medial
			case 'ENFJ':
			case 'ENFP':
			case 'ENTJ':
			case 'ENTP':
				soma[0] += getRandomNumber(-1, 3);
				soma[1] += getRandomNumber(-1, 3);
				soma[2] += getRandomNumber(-1, 3);
				break;
		}
		
		// Generate a height and weight based on gender, age, and body type
		var height = 68;
		var weight = 150;
		if (person.age >= 12) {
			if (person.gender === 'female') height = 63;
			switch (type) {
				// Potentially taller body types
				case 'ecto':
				case 'ecto-meso':
					height *= getRandomNumber(1.1, 1.7);
					weight *= getRandomNumber(1.1, 1.7);
					break;
				
				// Potentially shorter body types
				case 'endo':
				case 'endo-meso':
					height *= getRandomNumber(0.92, 1.1);
					weight *= getRandomNumber(1.0, 3.1);
					break;
					
				// Everyone else
				default:
					height += getRandomNumber(-3.0, 3.1);
					weight += getRandomNumber(-20, 21);
					break;
			}
		} else {
			// This is a child, and won't be 68 inches tall or 300 pounds
			// I don't even know what I'm doing with these numbers here
			switch (person.ageCategory) {
				case 'Infant':
					height = getRandomNumber(12, 30);
					weight = getRandomNumber(9, 30);
					break;
				case 'Child':
					height = getRandomNumber(36, 51);
					weight = getRandomNumber(49, 101);
					break;
			}
		}
		
		var bmi = getBMI(weight, height);
		return {
			'type': type,
			'height': Math.floor(height),
			'weight': Math.floor(weight),
			'soma': soma,
			'bmi': bmi,
			'category': getBMICategory(bmi),
			'handedness': getHandedness(person),
		};
	}
	
	function getTwoFactor(person) {
		// Sanguine: lively, sociable, talkative
		// Choleric: egocentric, impulsive, aggressive
		// Melancholic: serious, introverted, depressive
		// Phlegmatic: thoughtful, calm, tolerant
		var names = ['melancholic', 'choleric', 'phlegmatic', 'sanguine'];
		return names[getQuadrant(person.totals.extroversion, person.totals.neuroticism) - 1];
	}
	
	function getHandedness(person) {
		var random = getRandomNumber(1, 101);
		if (random <= 70) return 'right';
		if (random <= 80) return 'left';
		return 'mixed';
	}
	
	function getReligiosity(person) {
		// Determines likelihood of religiousness on a scale, but only their fervor for faith,
		// not what faith they hold, if any
		var faith = 0;
		var levels = ['Non-religious', 'Superstitious', 'Agnostic', 'Spiritual', 'Religious (non-practicing)', 'Religious (practicing)', 'Devout', 'Zealous'];
		if (person.matrix.openness.fantasy > 75) faith ++;
		if (person.matrix.openness.values > 50) faith ++;
		if (person.matrix.agreeableness.trust > 50) faith ++;
		if (person.matrix.agreeableness.compliance > 50) faith ++;
		if (person.matrix.conscientiousness.dutifulness > 75) faith ++;
		if (['1', '2', '6', '9'].indexOf(person.enneagram.type) !== -1) faith ++;
		if (person.enneagram.type === '6') faith += 2;
		if (person.holland[0] === 'social') faith ++;
		if (person.age >= 45) faith ++;
		if (['Provider', 'Protector', 'Promoter', 'Healer', 'Champion', 'Healer', 'Teacher', 'Counselor', 'Mastermind'].indexOf(person.keirsey[0]) !== -1) faith ++;
		
		faith = (faith / 10) * 100;
		return levels[Math.floor(faith / Math.floor(100 / (levels.length - 1)))];
	}
	
	function getBirthdate(person) {
		// Figure out the birth year, then assign a random
		var today = getDate();
		var year = today.year - person.age;
		var month = getRandomNumber(1,13);
		var day = getRandomNumber(1,31);
		if (month === 2 && day > 28) day = 28;
		if (month % 2 === 0 && day > 30) day = 30;
		return {
			'day': day,
			'month': month,
			'year': year,
		}
	}
	
	function getAstrology(person) {
		var western = '';
		var eastern = '';
		switch (person.birthday.month) {
			case 1: western = (person.birthday.day < 20) ? 'capricorn' : 'aquarius'; break;
			case 2: western = (person.birthday.day < 19) ? 'aquarius' : 'pisces'; break;
			case 3: western = (person.birthday.day < 21) ? 'pisces' : 'aries'; break;
			case 4: western = (person.birthday.day < 20) ? 'aries' : 'taurus';	break;
			case 5: western = (person.birthday.day < 21) ? 'taurus' : 'gemini'; break;
			case 6: western = (person.birthday.day < 21) ? 'gemini' : 'cancer'; break;
			case 7: western = (person.birthday.day < 23) ? 'cancer' : 'leo'; break;
			case 8: western = (person.birthday.day < 23) ? 'leo' : 'virgo'; break;
			case 9: western = (person.birthday.day < 23) ? 'virgo' : 'libra'; break;
			case 10: western = (person.birthday.day < 23) ? 'libra' : 'scorpio'; break;
			case 11: western = (person.birthday.day < 22) ? 'scorpio' : 'sagittarius'; break;
			case 12: western = (person.birthday.day < 22) ? 'sagittarius' : 'capricorn'; break;
		}
		
		switch ((person.birthday.year - 4) % 12) {
			case 0: eastern = 'rat'; break;
			case 1: eastern = 'ox'; break;
			case 2: eastern = 'tiger'; break;
			case 3: eastern = 'rabbit'; break;
			case 4: eastern = 'dragon'; break;
			case 5: eastern = 'snake'; break;
			case 6: eastern = 'horse'; break;
			case 7: eastern = 'goat'; break;
			case 8: eastern = 'monkey'; break;
			case 9: eastern = 'rooster'; break;
			case 10: eastern = 'dog'; break;
			case 11: eastern = 'pig'; break;
		}
		
		return {
			'western': zodiac[western],
			'eastern': zodiac[eastern],
		}
	}
	
	// Assumptions
	function makeAssumptions(person) {
		// Master function that orchestrates making assumptions about the person
		
	}
	
	function makeBodyAssumptions(person) {
		// 
		
	}
	
	// Load or generate data
	var person = {};
	if (data) {
		if (typeof data === 'string') data = JSON.parse(data);
		person = data;
	} else {
		person = {
			'matrix': makeMatrix(),
			'gender': assignGender(),
			'age': assignAge(population),
			'totals': {},
		};
		
		for (var trait in person.matrix) {
			person.totals[trait] = 0;
			for (var facet in person.matrix[trait]) {
				person.totals[trait] += person.matrix[trait][facet];
			}
			person.totals[trait] = Math.floor((person.totals[trait] / maxValue) * 100);
		}
		person['ageCategory'] = getAgeCategory(person);
		person['name'] = assignName(person.gender);
		person['mbti'] = getMBTI(person);
		person['holland'] = getHolland(person);
		person['keirsey'] = getKeirsey(person);
		person['quadrant'] = getTwoFactor(person);
		person['body'] = getSomatotype(person);
		person['enneagram'] = getEnneagram(person);
		person['faith'] = getReligiosity(person);
		person['birthday'] = getBirthdate(person);
		person['astro'] = getAstrology(person);
	}
	
	// Set up the functions
	person.toJSON = function() {
		// Convert the variables and structure (not functions) to JSON
		var result = {};
		for (var prop in this) {
			if (this[prop] instanceof Function === false) {
				result[prop] = this[prop];
			}
		}
		return JSON.stringify(result);
	}
	
	person.toString = function() {
		var sexes = {
			'male': 'man',
			'female': 'woman',
		}
		var address = {
			'male': 'He',
			'female': 'She'
		}
		var role = person.holland[0] + ' ' + person.keirsey[0] + ' ' + person.enneagram.role;
		var result = person.name + ', ' + person.age + ' year old ' + person.body.handedness + '-handed ' + person.body.category + ' ' + sexes[person.gender] + '. ';
		result += address[person.gender] + ' is a "' + role.toUpperCase() + '" who wants ' + person.enneagram.desire + ' but is prone to ' + person.enneagram.tempation
		return result;
	}
	
	person.toRow = function() {
		var t = '\t\t';
		return this.name +t+ this.age +t+ this.gender +t+ this.mbti +t+ this.holland[0] +t+ this.keirsey[0] +t+ this.enneagram.role +t+ this.body.category +t+ this.body.handedness +t+ this.faith +t+ this.quadrant;
	}
	
	person.react = function(event) {
		// How do I react to the given event?
		// Does it change my mood?
		// Does it change my hunger?
		// Do I respond? Or need to?
		// Who did it come from? Do I like them?
		// 
		
	}
	
	return person;
}