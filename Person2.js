var Person = function() {
	
	function random(min, max) {
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
	
	function uniques(arr) {
		var a = [];
		for (var i=0, l=arr.length; i<l; i++) if (a.indexOf(arr[i]) === -1 && arr[i] !== '') a.push(arr[i]);
		return a;
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
	
	function numSort(arr) {
		arr.sort(function(a,b) {return a-b});
		return arr;
	}
	
	var lists = {
		temperaments: [ 'melancholic', 'choleric', 'phlegmatic', 'sanguine' ],
		keirsey: {
			ESFJ: ['Provider', 'Conservator', 'Guardian', 'Observant'],
			ISFJ: ['Protector', 'Conservator', 'Guardian', 'Observant'],
			ESTJ: ['Supervisor', 'Administrator', 'Guardian', 'Observant'],
			ISTJ: ['Inspector', 'Administrator', 'Guardian', 'Observant'],
			ESFP: ['Performer', 'Entertainer', 'Artisan', 'Observant'],
			ISFP: ['Composer', 'Entertainer', 'Artisan', 'Observant'],
			ESTP: ['Promoter', 'Operator', 'Artisan', 'Observant'],
			ISTP: ['Crafter', 'Operator', 'Artisan', 'Observant'],
			ENFP: ['Champion', 'Advocate', 'Idealist', 'Introspective'],
			INFP: ['Healer', 'Advocate', 'Idealist', 'Introspective'],
			ENFJ: ['Teacher', 'Mentor', 'Idealist', 'Introspective'],
			INFJ: ['Counselor', 'Mentor', 'Idealist', 'Introspective'],
			ENTP: ['Inventor', 'Engineer', 'Rational', 'Introspective'],
			INTP: ['Architect', 'Engineer', 'Rational', 'Introspective'],
			ENTJ: ['Fieldmarshal', 'Coordinator', 'Rational', 'Introspective'],
			INTJ: ['Mastermind', 'Coordinator', 'Rational', 'Introspective']
		},
		names: {
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
				'Lucio', 'Vladimir', 'Victor', 'Karl', 'Derek', 'Dick', 'Richard', 'Roger', 'Oleg', 'Demitri', 'Dmitri',
				'Johan', 'Johannes', 'Krishna', 'Ravi', 'Aditya', 'Vihaan', 'Jae Suk', 'Jong Kook', 'Dong Hoon', 
				'Gae Ri', 'Francois', 'Eric', 'Jimmy', 'Jeff', 'Jeffrey', 'Artyom', 'Enrique', 'Bryan',
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
				'Gertrude', 'Ruby', 'Zarya', 'Whitney', 'Courtney', 'Rai', 'Erin', 'Kendra', 'Ekatarina', 'Yvette',
				'Francesca', 'Erica', 'Susan', 'Suzannah', 'Ananya', 'Diya', 'Myra', 'Eve', 'Eva', 'Soo Zee', 'Ming',
				'Ji Hyo', 'Taeyeon', 'Hyoyeon', 'Yuri', 'Raina', 'Alberta', 'Cheryl', 'Miranda', 'Sunny', 'Erika',
			]
		},
		enneagrams: [
			{	'type': '1',
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
			{	'type': '2',
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
			{	'type': '3',
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
			{	'type': '4',
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
			{	'type': '5',
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
			{	'type': '6',
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
			{	'type': '7',
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
			{	'type': '8',
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
			{	'type': '9',
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
			}
		],
		jobs: {
			//https://www.careerwise.mnscu.edu/guide/counselors/counselorclustersholland.html
			generic: {
				realistic: [ 'agriculture', 'architecture', 'health', 'hospitality', 'IT', 'law', 'manufacturing', 'engineering', 'logistics' ],
				investigative: [ 'health', 'IT', 'law', 'engineering' ],
				artistic: [ 'arts', 'education', 'hospitality', 'marketing' ],
				social: [ 'arts', 'education', 'politics', 'health', 'law', 'marketing' ],
				enterprising: [ 'arts', 'business', 'finance', 'politics', 'hospitality', 'law', 'logistics' ],
				conventional: [ 'architecture', 'business', 'finance', 'health', 'manufacturing', 'marketing', 'logistics' ],
			},
			specific: {
				agriculture: [ 'agricultural inspector', 'animal trainer', 'biochemist', 'butcher', 'commercial fisher', 'conservation scientist', 'game warden', 'forester', 'pest control', 'veterinarian', 'vet tech' ],
				architecture: [ 'architect', 'stonemason', 'carpenter', 'cartographer', 'civil engineer', 'construction worker', 'electrician', 'plumber', 'hvac', 'interior designer', 'painter', 'roofer', 'surveyor' ],
				arts: [ 'actor', 'business owner', 'art director', 'camera operator', 'choreographer', 'art teacher', 'curator', 'dancer', 'editor', 'fashion designer', 'photographer', 'writer' ],
				business: [ 'accountant', 'art director', 'broker', 'executive', 'manager', 'risk analyst', 'secretary', 'human resources', 'comptroller' ],
				education: [ 'coach', 'talent scout', 'professor', 'curator', 'school counselor', 'fitness trainer', 'historian', 'translator', 'librarian', 'tutor', 'elementary school teacher', 'middle school teacher', 'high school teacher' ],
				engineering: [ 'aerospace engineer', 'mathematician', 'astronomer', 'chemical engineer', 'math teacher', 'engineering professor', 'economist', 'geologist', 'historian', 'mechanical engineer', 'physicist', 'statistician', 'technical writer' ],
				finance: [ 'accountant', 'actuary', 'budget analyst', 'credit counselor', 'financial analyst', 'insurance underwriter', 'loan officer', 'bank teller', 'tax preparer', 'title examiner' ],
				health: [ 'acupuncturist', 'ambulance driver', 'anesthesiologist', 'chiropractor', 'insurance agent', 'dentist', 'nurse', 'general doctor', 'counselor', 'masseuse', 'neurologist', 'optometrist', 'pharmacist', 'social worker' ],
				hospitality: [ 'concierge', 'bartender', 'athlete', 'dishwasher', 'waiter', 'line cook', 'hotel clerk', 'housekeeper', 'private chef', 'chef', 'tour guide', 'referee', 'usher' ],
				IT: [ 'software developer', 'business analyst', 'programming teacher', 'freelancer', 'network architect', 'database architect', 'project manager', 'program manager', 'web developer', 'graphics designer' ],
				law: [ 'judge', 'mediator', 'bailiff', 'social worker', 'criminal justice teacher', 'corrections officer', 'detective', 'police', 'firefighter', 'forensic technician', 'lawyer', 'paralegal', 'security guard' ],
				logistics: [ 'air traffic controller', 'aircraft mechanic', 'pilot', 'bicycle repairer', 'bus driver', 'truck driver', 'dispatcher', 'flight attendant', 'locomotive engineer', 'logistician', 'safety manager', 'chauffeur', 'taxi driver' ],
				manufacturing: [ 'baker', 'boilermaker', 'cabinetmaker', 'civil engineering', 'machine operator', 'engraver', 'fashion designer', 'upholsterer', 'pipefitter', 'inspector', 'lathe operator', 'machinist', 'welder', 'millwright' ],
				marketing: [ 'cashier', 'customer service representative', 'door to door sales', 'marketing research analyst', 'model', 'sales', 'real estate broker', 'retail salesperson', 'sales manager', 'telemarketer', 'travel guide', 'wholesale buyer' ],
				politics: [ 'compliance officer', 'economist', 'legislator', 'political scientist', 'public relations', 'politician', 'mail clerk', 'postal worker', 'urban planner', 'regional planner', 'meter reader', 'tax examiner', 'community service manager' ]
			}
		},
	}
	
	var fx = {
		name: function(gender) {
			return lists.names[gender][random(0,lists.names[gender].length)];
		},
		
		gender: function() {
			return (random(0,2)) ? 'female' : 'male';
		},
		
		age: function(population) {
			if (population === undefined || population === '' || population <= 1) population = 1000000;
			var chance = Math.floor(Math.log(population));
			var limit = population / chance;
			var age = random(18, 66);
			var pick = random(0, population);
			if (pick < limit) {
				if (random(0,2) === 0) {
					age = random(0, 18);
				} else {
					age = random(65, 101);
				}
			}
			//console.log(population, chance, limit, pick, pick < limit, age);
			return age;
		},
		
		ageCategory: function(age) {
			switch (true) {
				case age < 6: return 'infant'; break;
				case age < 13: return 'child'; break;
				case age < 19: return 'teenager'; break;
				case age < 51: return 'adult'; break;
				case age < 71: return 'middle-aged'; break;
				default: return 'Elderly'; break;
			}
		},
		
		birthdate: function(age) {
		// Figure out the birth year, then assign a random
			var today = getDate();
			var year = today.year - age;
			var month = random(1,13);
			var day = random(1,31);
			if (month === 2 && day > 28) day = 28;
			if (month % 2 === 0 && day > 30) day = 30;
			return {
				'day': day,
				'month': month,
				'year': year,
			}
		},
		
		bmi: function(weight, height) {
			var bmi = (weight / (height * height)) * 703;
			return bmi;
		},
	
		bmiCategory: function(bmi) {
			switch (true) {
				case bmi < 18.5:				return 'underweight'; break;
				case bmi >= 25 && bmi < 30:	return 'overweight'; break;
				case bmi >= 30 && bmi < 35:	return 'obese'; break;
				case bmi >= 35 && bmi < 40:	return 'clinically obese'; break;
				case bmi >= 40: 				return 'morbidly obese'; break;
				default:					return 'healthy'; break;
			}
		},
		
		handedness: function() {
			var rand = random(1, 101);
			if (rand <= 70) return 'right';
			if (rand <= 80) return 'left';
			return 'mixed';
		},
		
		mbti: function(totals) {
			// http://www.typologycentral.com/forums/mbti-tm-and-jungian-cognitive-functions/42045-ocean-personality-matrix-combining-mbti-keirsey-temperament.html
			var mbti = [];
			mbti.push('I', 'N', 'F', 'P');
			if (totals.extroversion >= 50) mbti[0] = 'E';
			if (totals.openness >= 50) mbti[1] = 'S';
			
			if ((mbti[1] === 'S' && totals.agreeableness >= 50) || 
			(mbti[1] === 'N' && totals.agreeableness < 50)) 
				mbti[2] = 'T';
			
			if ((mbti[1] === 'S' && totals.conscientiousness >= 50) || 
			(mbti[1] === 'N' && totals.conscientiousness < 50)) 
				mbti[3] = 'J';
			
			return mbti.join('');
		},
		
		matrix: function() {
			return {
				neuroticism: {
					anxiety: 			random(0, 100),
					hostility: 			random(0, 100),
					depression: 			random(0, 100),
					selfconsciousness: 	random(0, 100),
					impulsiveness: 		random(0, 100),
					stress: 				random(0, 100),
				},
				extroversion: {
					warmth: 				random(0, 100),
					gregariousness: 		random(0, 100),
					assertiveness: 		random(0, 100),
					activity: 			random(0, 100),
					excitementseeking: 	random(0, 100),
					positivity: 			random(0, 100),
				},
				openness: {
					fantasy: 			random(0, 100),
					aesthetics: 			random(0, 100),
					feelings: 			random(0, 100),
					actions: 			random(0, 100),
					ideas: 				random(0, 100),
					values: 				random(0, 100),
				},
				agreeableness: {
					trust: 				random(0, 100),
					straightforwardness: 	random(0, 100),
					altruism: 			random(0, 100),
					compliance: 			random(0, 100),
					modesty: 			random(0, 100),
					tendermindedness: 	random(0, 100),
				},
				conscientiousness: {
					competence: 			random(0, 100),
					order: 				random(0, 100),
					dutifulness: 		random(0, 100),
					striving: 			random(0, 100),
					discipline: 			random(0, 100),
					deliberation: 		random(0, 100),
				},
			}
		},
	
		traits: function(matrix) {
			var maxValue = 99 * 6;
			var totals = {};
			var averages = {};
			var total = 0;
			for (var trait in matrix) {
				totals[trait] = 0;
				averages[trait] = 0;
				for (var facet in matrix[trait]) {
					totals[trait] += matrix[trait][facet];
					total += matrix[trait][facet];
					averages[trait] += matrix[trait][facet];
				}
				// totals[trait] = Math.floor((totals[trait] / maxValue) * 100);
				averages[trait] = Math.floor(averages[trait] / 6);
			}
			return {
				total: total,
				max: 99 * 6 * 5,
				//maturity: Math.floor(total / (maxValue * Object.keys(matrix).length) * 100),
				maturity: Math.floor((((total / (maxValue * Object.keys(matrix).length) * 100) - 27) / (75 - 27)) * 100),
				totals: totals,
				averages: averages,
			};
		},
	
		holland: function(mbti) {
			// https://en.wikipedia.org/wiki/Holland_Codes
			var split = person.mbti.split('');
			var scores = {
				realistic: 0,
				investigative: 0,
				artistic: 0,
				social: 0,
				enterprising: 0,
				conventional: 0,
			}
			
			// Realistic
			if (has(split, 'S')) scores.realistic ++;
			if (has(split, 'T')) scores.realistic ++;
			if (has(split, 'P')) scores.realistic ++;
			if (mbti === 'ISTP') scores.realistic += 12;
			if (mbti === 'ESTP') scores.realistic += 7;
			if (mbti === 'ISFP') scores.realistic += 5;
			
			// Investigative
			if (has(split, 'N')) scores.investigative += 2;
			if (has(split, 'T')) scores.investigative += 2;
			if (mbti === 'INTP') scores.investigative += 12;
			if (mbti === 'INTJ') scores.investigative += 12;
			if (mbti === 'ENTP') scores.investigative += 12;
			if (mbti === 'ENTJ') scores.investigative += 7;
			
			// Artistic
			if (has(split, 'N')) scores.artistic ++;
			if (has(split, 'F')) scores.artistic ++;
			if (has(split, 'P')) scores.artistic ++;
			if (mbti === 'INFP') scores.artistic += 12;
			if (mbti === 'INFJ') scores.artistic += 10;
			if (mbti === 'ENFP') scores.artistic += 7;
			if (mbti === 'ENFJ') scores.artistic += 5;
			if (mbti === 'ISFP') scores.artistic += 5;
			
			// Social
			if (has(split, 'E')) scores.social += 2;
			if (has(split, 'F')) scores.social += 2;
			if (mbti === 'ENFP') scores.social += 7;
			if (mbti === 'ENFJ') scores.social += 7;
			if (mbti === 'ESFP') scores.social += 7;
			if (mbti === 'ESFJ') scores.social += 12;
			if (mbti === 'ISFJ') scores.social += 5;
			
			// Enterprising
			if (has(split, 'E')) scores.enterprising += 5;
			if (mbti === 'ENTJ') scores.enterprising += 7;
			if (mbti === 'ESTJ') scores.enterprising += 7;
			if (mbti === 'ESTP') scores.enterprising += 7;
			if (mbti === 'ESFP') scores.enterprising += 7;
			if (mbti === 'ENFP') scores.enterprising += 7;
			if (mbti === 'ENFJ') scores.enterprising += 7;
			
			// Conventional
			if (has(split, 'S')) scores.conventional += 2;
			if (has(split, 'J')) scores.conventional += 2;
			if (mbti === 'ISTJ') scores.conventional += 12;
			if (mbti === 'ISFJ') scores.conventional += 7;
			if (mbti === 'ESTJ') scores.conventional += 7;
			
			var sorted = [];
			for (var k in scores) sorted.push([k, scores[k]]);
			sorted.sort(function(a, b) {
				return b[1] - a[1];
			});
			return [sorted[0][0], sorted[1][0], sorted[2][0]];
		},

		keirsey: function(mbti) {
			//https://en.wikipedia.org/wiki/Keirsey_Temperament_Sorter
			return lists.keirsey[mbti];
		},
	
		enneagram: function(mbti) {
			// https://en.wikipedia.org/wiki/Enneagram_of_Personality
			// http://personalityjunkie.com/07/myers-briggs-enneagram-mbti-types-correlations-relationship/
			// http://daemonsandanalyses.tumblr.com/post/50016577026/likely-enneagram-mbti-and-form-correlations
					
			// 1 8: ENTJ, ESTP, ISTP, ESTJ
			// 2 9: INFP, ENFP, INFJ, ENFJ, ISFP, INTP
			// 2 1: INFJ, ENFJ, ESFJ, ISFJ, INTJ, ENTJ, ISTJ
			// 2 2: ENFJ, ESFJ, ESFP, INFP, ISFJ, INFJ, ENFP
			// 2 3: ESFP, ENTJ, ENTP, ESTP, ESTJ, ENFP, ENFJ
			// 1 4: INFP, ISFP, ISFJ, INFJ
			// 1 5: INTP, INTJ, ISTJ, ISTP
			// 3 6: INFP, INFJ, ISFJ, ENFJ, ESTP, ESFJ, INTP, INTJ, ISTP, ISFP, ISTJ, ENTP, ENFP, ENTJ, ESFP, ESTJ
			// 1 7: ESTP, ESFP, ENFP, ENTP

			var choice = ['6'];
			switch (mbti) {
				case 'ESFJ':	choice = ['1', '2', '6']; break;
				case 'ISFJ': 	choice = ['1', '2', '4', '6']; break;
				case 'ESTJ': 	choice = ['8', '3', '6']; break;
				case 'ISTJ': 	choice = ['1', '5', '6']; break;
					
				case 'ESFP': 	choice = ['2', '3', '6', '7']; break;
				case 'ISFP': 	choice = ['9', '4', '6']; break;
				case 'ESTP': 	choice = ['8', '3', '6', '7', '6']; break;
				case 'ISTP': 	choice = ['8', '5', '6']; break;
				
				case 'ENFP': 	choice = ['9', '2', '3', '6', '7']; break;
				case 'INFP': 	choice = ['9', '2', '4', '6']; break;
				case 'ENFJ': 	choice = ['9', '1', '2', '3', '6']; break;
				case 'INFJ': 	choice = ['9', '1', '2', '4', '6']; break;
				
				case 'ENTP': 	choice = ['3', '7', '6']; break;
				case 'INTP': 	choice = ['9', '5', '6']; break;
				case 'ENTJ': 	choice = ['8', '1', '3', '6']; break;
				case 'INTJ': 	choice = ['1', '5', '6']; break;
			}
			return lists.enneagrams[choice[random(0, choice.length)]*1-1];
		},
	
		physical: function(mbti) {
			// Someone came up with pseudo-science that ties MBTI with somatotype
			// which is unrealistic, but makes it easier to provide randomized
			// values, so whatever
			// Somatotype Number: Endo-Meso-Ecto
			var gender = fx.gender();
			var age = fx.age();
			var ageCategory = fx.ageCategory(age);
			var birthday = fx.birthdate(age);
			var height = 68;
			var weight = 150;
			
			var soma = [4, 4, 4];
			var type = 'medial';
			
			// Generate somatotype information
			switch (mbti) {
				// Meso-centric
				case 'ESTJ':
				case 'ESFP':
				case 'ESTP':
					soma[0] -= random(0, 4);
					soma[1] += random(1, 4);
					soma[2] -= random(0, 4);
					type = 'meso';
					break;
				// Endo-centric
				case 'ISJF':
				case 'INFJ':
				case 'INFP':
					soma[0] += random(1, 4);
					soma[1] -= random(0, 4);
					soma[2] -= random(0, 4);
					type = 'endo';
					break;
				// Ecto-centric
				case 'ISTP':
				case 'INTP':
				case 'INTJ':
					soma[0] -= random(0, 4);
					soma[1] -= random(0, 4);
					soma[2] += random(1, 4);
					type = 'ecto';
					break;
				// Transitional
				case 'ESFJ':
					soma[0] += random(-1, 3);
					soma[1] += random(-1, 3);
					soma[2] = random(1, 3);
					type = 'endo-meso';
					break;
				case 'ISTJ':
					soma[0] = random(1, 3);
					soma[1] += random(-1, 3);
					soma[2] += random(-1, 3);
					type = 'ecto-meso';
					break;
				case 'ISFP':
					soma[0] += random(-1, 3);
					soma[1] = random(1, 3);
					soma[2] += random(-1, 3);
					type = 'endo-ecto';
					break;
				// Medial
				case 'ENFJ':
				case 'ENFP':
				case 'ENTJ':
				case 'ENTP':
					soma[0] += random(-1, 3);
					soma[1] += random(-1, 3);
					soma[2] += random(-1, 3);
					break;
			}
			
			// Generate a height and weight based on gender, age, and body type
			if (age >= 12) {
				if (gender === 'female') height = 63;
				switch (type) {
					// Potentially taller body types
					case 'ecto':
					case 'ecto-meso':
						height *= random(1.1, 2.0);
						weight *= random(1.1, 2.0);
						break;
					// Potentially shorter body types
					case 'endo':
					case 'endo-meso':
						height *= random(0.92, 1.5);
						weight *= random(1.0, 3.1);
						break;
					// Everyone else
					default:
						height += random(-3.0, 3.1);
						weight += random(-20, 21);
						break;
				}
			} else {
				// This is a child, and won't be 68 inches tall or 300 pounds
				// I don't even know what I'm doing with these numbers here
				switch (ageCategory) {
					case 'Infant':
						height = random(12, 30);
						weight = random(9, 30);
						break;
					case 'Child':
						height = random(36, 51);
						weight = random(49, 101);
						break;
				}
			}
			
			var bmi = fx.bmi(weight, height);

			return {
				'gender': gender,
				'age': age,
				'ageCategory': ageCategory,
				'birthday': birthday,
				'type': type,
				'height': height,
				'weight': weight,
				'soma': soma,
				'bmi': bmi,
				'bmiCategory': fx.bmiCategory(bmi),
				'handedness': fx.handedness(),
			};
	
		},
	
		astrology: function(birthday) {
			var western = '';
			var eastern = '';
			switch (birthday.month) {
				case 1: western = (birthday.day < 20) ? 'capricorn' : 'aquarius'; break;
				case 2: western = (birthday.day < 19) ? 'aquarius' : 'pisces'; break;
				case 3: western = (birthday.day < 21) ? 'pisces' : 'aries'; break;
				case 4: western = (birthday.day < 20) ? 'aries' : 'taurus';	break;
				case 5: western = (birthday.day < 21) ? 'taurus' : 'gemini'; break;
				case 6: western = (birthday.day < 21) ? 'gemini' : 'cancer'; break;
				case 7: western = (birthday.day < 23) ? 'cancer' : 'leo'; break;
				case 8: western = (birthday.day < 23) ? 'leo' : 'virgo'; break;
				case 9: western = (birthday.day < 23) ? 'virgo' : 'libra'; break;
				case 10: western = (birthday.day < 23) ? 'libra' : 'scorpio'; break;
				case 11: western = (birthday.day < 22) ? 'scorpio' : 'sagittarius'; break;
				case 12: western = (birthday.day < 22) ? 'sagittarius' : 'capricorn'; break;
			}
			
			switch ((birthday.year - 4) % 12) {
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
				'western': western,
				'eastern': eastern,
			}
		},
	
		temperament: function(traits) {
			// Sanguine: lively, sociable, talkative
			// Choleric: egocentric, impulsive, aggressive
			// Melancholic: serious, introverted, depressive
			// Phlegmatic: thoughtful, calm, tolerant
			return lists.temperaments[getQuadrant(traits.extroversion, traits.neuroticism) - 1];
		},
	
		jobs: function(holland) {
			var jobs = [];
			var cat = holland[0];
			var generic = lists.jobs.generic[cat];
			generic.map(function(type) {
				jobs = jobs.concat(lists.jobs.specific[type]);
			});
			return uniques(jobs);
		},
	
		faith: function(person) {
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
			if (['Provider', 'Protector', 'Promoter', 'Healer', 'Champion', 'Healer', 'Teacher', 'Counselor', 'Mastermind'].indexOf(person.keirsey[0]) !== -1) faith ++;
			faith = (faith / 10) * 100;
			return levels[Math.floor(faith / Math.floor(100 / (levels.length - 1)))];
		},
	}
	
	var person = {};
	
	person.matrix = fx.matrix();
	person.traits = fx.traits(person.matrix);
	person.mbti = fx.mbti(person.traits.averages);
	
	person.physical = fx.physical(person.mbti);
	person.name = fx.name(person.physical.gender);
	
	person.keirsey = fx.keirsey(person.mbti);
	person.holland = fx.holland(person.mbti);
	person.enneagram = fx.enneagram(person.mbti);
	person.astrology = fx.astrology(person.physical.birthday);
	person.temperament = fx.temperament(person.traits.averages);
	
	person.jobs = fx.jobs(person.holland);
	person.faith = fx.faith(person);
	
	return person;
}