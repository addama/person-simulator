

var Census = {
	people: [],
	stats: {
		gender: {},
		handedness: {},
		bmi: {},
		age: {},
	},
	add: function(person) {

	},
}

var PeopleMaker = {
	lists: null,

	make: function(count) {
		// Creates a population of people 
		var app = this;
		
		function makePerson() {
			
		}
		
		if (!this.lists) {
			Utility.loadJSON('statics.json', function(result) {
				app.lists = JSON.parse(result);
			
			});
		} else {
			
		}
	}
}


var Person = (function(lists, type, name) {
	//https://www.careerwise.mnscu.edu/guide/counselors/counselorclustersholland.html
	
	// Person creates the core of a person - the personality
	// Superfluous things like name, age, etc can be assigned later
	

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
			//https://www.unifr.ch/ztd/HTS/inftest/WEB-Informationssystem/en/4en001/d590668ef5a34f17908121d3edf2d1dc/hb.htm
			// https://uasdata.usc.edu/system/files/BigFiveInventory_key.pdf
			//http://fetzer.org/sites/default/files/images/stories/pdf/selfmeasures/Personality-BigFiveInventory.pdf
			//http://pages.uoregon.edu/sanjay/bigfive.html#where
			return {
				neuroticism: {
					anxiety: 			Utility.random(0, 100),
					hostility: 			Utility.random(0, 100),
					depression: 			Utility.random(0, 100),
					selfconsciousness: 	Utility.random(0, 100),
					impulsiveness: 		Utility.random(0, 100),
					stress: 				Utility.random(0, 100),
				},
				extroversion: {
					warmth: 				Utility.random(0, 100),
					gregariousness: 		Utility.random(0, 100),
					assertiveness: 		Utility.random(0, 100),
					activity: 			Utility.random(0, 100),
					excitementseeking: 	Utility.random(0, 100),
					positivity: 			Utility.random(0, 100),
				},
				openness: {
					fantasy: 			Utility.random(0, 100),
					aesthetics: 			Utility.random(0, 100),
					feelings: 			Utility.random(0, 100),
					actions: 			Utility.random(0, 100),
					ideas: 				Utility.random(0, 100),
					values: 				Utility.random(0, 100),
				},
				agreeableness: {
					trust: 				Utility.random(0, 100),
					straightforwardness: 	Utility.random(0, 100),
					altruism: 			Utility.random(0, 100),
					compliance: 			Utility.random(0, 100),
					modesty: 			Utility.random(0, 100),
					tendermindedness: 	Utility.random(0, 100),
				},
				conscientiousness: {
					competence: 			Utility.random(0, 100),
					order: 				Utility.random(0, 100),
					dutifulness: 		Utility.random(0, 100),
					striving: 			Utility.random(0, 100),
					discipline: 			Utility.random(0, 100),
					deliberation: 		Utility.random(0, 100),
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
				averages[trait] = Math.floor(averages[trait] / 6);
			}
			return {
				total: total,
				max: 99 * 6 * 5,
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
			return lists.enneagrams[choice[Utility.random(0, choice.length)]*1-1];
		},
		
		physical2: function() {
			
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
	
	// type := lists.ageCategories
	
})();




/*
function Person(lists, type, name) {
	
	function Core() {
		var core = {};
		core.matrix = {
			neuroticism: {
				anxiety: 			Utility.random(0, 100),
				hostility: 			Utility.random(0, 100),
				depression: 			Utility.random(0, 100),
				selfconsciousness: 	Utility.random(0, 100),
				impulsiveness: 		Utility.random(0, 100),
				stress: 				Utility.random(0, 100),
			},
			extroversion: {
				warmth: 				Utility.random(0, 100),
				gregariousness: 		Utility.random(0, 100),
				assertiveness: 		Utility.random(0, 100),
				activity: 			Utility.random(0, 100),
				excitementseeking: 	Utility.random(0, 100),
				positivity: 			Utility.random(0, 100),
			},
			openness: {
				fantasy: 			Utility.random(0, 100),
				aesthetics: 			Utility.random(0, 100),
				feelings: 			Utility.random(0, 100),
				actions: 			Utility.random(0, 100),
				ideas: 				Utility.random(0, 100),
				values: 				Utility.random(0, 100),
			},
			agreeableness: {
				trust: 				Utility.random(0, 100),
				straightforwardness: 	Utility.random(0, 100),
				altruism: 			Utility.random(0, 100),
				compliance: 			Utility.random(0, 100),
				modesty: 			Utility.random(0, 100),
				tendermindedness: 	Utility.random(0, 100),
			},
			conscientiousness: {
				competence: 			Utility.random(0, 100),
				order: 				Utility.random(0, 100),
				dutifulness: 		Utility.random(0, 100),
				striving: 			Utility.random(0, 100),
				discipline: 			Utility.random(0, 100),
				deliberation: 		Utility.random(0, 100),
			}
		};
		
		core.mbti = 
		
		
	}
	
	function Body(core, type, gender, name) {
		
	}
	
	
	var criteria = {
		name: function(gender) {
			return lists.names[gender][Utility.random(0,lists.names[gender].length)];
		},
		
		gender: function() {
			return (Utility.random(0,2)) ? 'female' : 'male';
		},
		
		age: function(population) {
			if (population === undefined || population === '' || population <= 1) population = 1000000;
			var chance = Math.floor(Math.log(population));
			var limit = population / chance;
			var age = Utility.random(18, 66);
			var pick = Utility.random(0, population);
			if (pick < limit) {
				if (Utility.random(0,2) === 0) {
					age = Utility.random(0, 18);
				} else {
					age = Utility.random(65, 101);
				}
			}
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
		// Figure out the birth year, then assign a Utility.random
			var today = getDate();
			var year = today.year - age;
			var month = Utility.random(1,13);
			var day = Utility.random(1,31);
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
			var rand = Utility.random(1, 101);
			if (rand <= 70) return 'right';
			if (rand <= 80) return 'left';
			return 'mixed';
		},
	
		physical2: function() {
			
		},
		
		physical: function(mbti) {
			// Someone came up with pseudo-science that ties MBTI with somatotype
			// which is unrealistic, but makes it easier to provide Utility.randomized
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
					soma[0] -= Utility.random(0, 4);
					soma[1] += Utility.random(1, 4);
					soma[2] -= Utility.random(0, 4);
					type = 'meso';
					break;
				// Endo-centric
				case 'ISJF':
				case 'INFJ':
				case 'INFP':
					soma[0] += Utility.random(1, 4);
					soma[1] -= Utility.random(0, 4);
					soma[2] -= Utility.random(0, 4);
					type = 'endo';
					break;
				// Ecto-centric
				case 'ISTP':
				case 'INTP':
				case 'INTJ':
					soma[0] -= Utility.random(0, 4);
					soma[1] -= Utility.random(0, 4);
					soma[2] += Utility.random(1, 4);
					type = 'ecto';
					break;
				// Transitional
				case 'ESFJ':
					soma[0] += Utility.random(-1, 3);
					soma[1] += Utility.random(-1, 3);
					soma[2] = Utility.random(1, 3);
					type = 'endo-meso';
					break;
				case 'ISTJ':
					soma[0] = Utility.random(1, 3);
					soma[1] += Utility.random(-1, 3);
					soma[2] += Utility.random(-1, 3);
					type = 'ecto-meso';
					break;
				case 'ISFP':
					soma[0] += Utility.random(-1, 3);
					soma[1] = Utility.random(1, 3);
					soma[2] += Utility.random(-1, 3);
					type = 'endo-ecto';
					break;
				// Medial
				case 'ENFJ':
				case 'ENFP':
				case 'ENTJ':
				case 'ENTP':
					soma[0] += Utility.random(-1, 3);
					soma[1] += Utility.random(-1, 3);
					soma[2] += Utility.random(-1, 3);
					break;
			}
			
			// Generate a height and weight based on gender, age, and body type
			if (age >= 12) {
				if (gender === 'female') height = 63;
				switch (type) {
					// Potentially taller body types
					case 'ecto':
					case 'ecto-meso':
						height *= Utility.random(1.1, 2.0);
						weight *= Utility.random(1.1, 2.0);
						break;
					// Potentially shorter body types
					case 'endo':
					case 'endo-meso':
						height *= Utility.random(0.92, 1.5);
						weight *= Utility.random(1.0, 3.1);
						break;
					// Everyone else
					default:
						height += Utility.random(-3.0, 3.1);
						weight += Utility.random(-20, 21);
						break;
				}
			} else {
				// This is a child, and won't be 68 inches tall or 300 pounds
				// I don't even know what I'm doing with these numbers here
				switch (ageCategory) {
					case 'Infant':
						height = Utility.random(12, 30);
						weight = Utility.random(9, 30);
						break;
					case 'Child':
						height = Utility.random(36, 51);
						weight = Utility.random(49, 101);
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
	

	}
	
	var core = {
		

	};
	
	
	if (!name) 
	
	return {
		
	}
}*/