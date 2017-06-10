var Body = function(lists, core, gender, age, name) {
	var body = {};
	var facets = {
		name: function(gender) {
			return lists.names[gender][Utility.random(0,lists.names[gender].length)];
		},
		
		gender: function() {
			return (Utility.random(0,2)) ? 'female' : 'male';
		},
		
		age: function(preset) {
			var population = 1000000;
			var chance = Math.floor(Math.log(population));
			var limit = population / chance;
			var age = preset || Utility.random(18, 66);
			if (!preset) {
				var pick = Utility.random(0, population);
				if (pick < limit) {
					if (Utility.random(0,2) === 0) {
						age = Utility.random(1, 18);
					} else {
						age = Utility.random(65, 101);
					}
				}
			}
			
			var category = 'elderly';
			switch (true) {
				case age < 6: category = 'infant'; break;
				case age < 13: category = 'child'; break;
				case age < 19: category = 'teenager'; break;
				case age < 51: category = 'adult'; break;
				case age < 71: category = 'middle-aged'; break;
			}
			
			var today = Utility.getDate();
			var year = today.year - age;
			var month = Utility.random(1,13);
			var day = Utility.random(1,31);
			if (month === 2 && day > 28) day = 28;
			if (month % 2 === 0 && day > 30) day = 30;
			
			var western = '';
			var eastern = '';
			switch (month) {
				case 1: western = (day < 20) ? 'capricorn' : 'aquarius'; break;
				case 2: western = (day < 19) ? 'aquarius' : 'pisces'; break;
				case 3: western = (day < 21) ? 'pisces' : 'aries'; break;
				case 4: western = (day < 20) ? 'aries' : 'taurus';	break;
				case 5: western = (day < 21) ? 'taurus' : 'gemini'; break;
				case 6: western = (day < 21) ? 'gemini' : 'cancer'; break;
				case 7: western = (day < 23) ? 'cancer' : 'leo'; break;
				case 8: western = (day < 23) ? 'leo' : 'virgo'; break;
				case 9: western = (day < 23) ? 'virgo' : 'libra'; break;
				case 10: western = (day < 23) ? 'libra' : 'scorpio'; break;
				case 11: western = (day < 22) ? 'scorpio' : 'sagittarius'; break;
				case 12: western = (day < 22) ? 'sagittarius' : 'capricorn'; break;
			}
			
			switch ((year - 4) % 12) {
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
				years: age,
				category: category,
				astrology: {
					western: western,
					eastern: eastern
				},
				birthday: {
					day: day,
					month: month,
					year: year
				}
			};
		},
			
		handedness: function() {
			var rand = Utility.random(1, 101);
			if (rand <= 70) return 'right';
			if (rand <= 80) return 'left';
			return 'mixed';
		},
		
		physical: function(mbti, age, gender) {
			// Someone came up with pseudo-science that ties MBTI with somatotype
			// which is unrealistic, but makes it easier to provide Utility.randomized
			// values, so whatever
			// Somatotype Number: Endo-Meso-Ecto
			var height = 68;
			var weight = 150;
			
			var soma = [4, 4, 4];
			var type = 'medial';
			
			// Generate somatotype information
			switch (mbti) {
				// Meso-centric
				case 'estj':
				case 'esfp':
				case 'estp':
					soma[0] -= Utility.random(0, 4);
					soma[1] += Utility.random(1, 4);
					soma[2] -= Utility.random(0, 4);
					type = 'meso';
					break;
				// Endo-centric
				case 'isjf':
				case 'infj':
				case 'infp':
					soma[0] += Utility.random(1, 4);
					soma[1] -= Utility.random(0, 4);
					soma[2] -= Utility.random(0, 4);
					type = 'endo';
					break;
				// Ecto-centric
				case 'istp':
				case 'intp':
				case 'intj':
					soma[0] -= Utility.random(0, 4);
					soma[1] -= Utility.random(0, 4);
					soma[2] += Utility.random(1, 4);
					type = 'ecto';
					break;
				// Transitional
				case 'esfj':
					soma[0] += Utility.random(-1, 3);
					soma[1] += Utility.random(-1, 3);
					soma[2] = Utility.random(1, 3);
					type = 'endo-meso';
					break;
				case 'istj':
					soma[0] = Utility.random(1, 3);
					soma[1] += Utility.random(-1, 3);
					soma[2] += Utility.random(-1, 3);
					type = 'ecto-meso';
					break;
				case 'isfp':
					soma[0] += Utility.random(-1, 3);
					soma[1] = Utility.random(1, 3);
					soma[2] += Utility.random(-1, 3);
					type = 'endo-ecto';
					break;
				// Medial
				case 'enfj':
				case 'enfp':
				case 'entj':
				case 'entp':
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
				switch (true) {
					case age < 6:
						height = Utility.random(12, 30);
						weight = Utility.random(9, 30);
						break;
					case age < 13:
						height = Utility.random(36, 51);
						weight = Utility.random(49, 101);
						break;
				}
			}
			
			// Generate BMI info
			var bmi = (weight / (height * height)) * 703;
			var category = 'healthy';
			switch (true) {
				case bmi < 18.5:				category = 'underweight'; break;
				case bmi >= 25 && bmi < 30:	category = 'overweight'; break;
				case bmi >= 30 && bmi < 35:	category = 'obese'; break;
				case bmi >= 35 && bmi < 40:	category = 'clinically-obese'; break;
				case bmi >= 40: 				category = 'morbidly-obese'; break;
			}
			
			return {
				type: type,
				height: height,
				weight: weight,
				//soma: soma,
				handedness: facets.handedness(),
				bmi: bmi,
				bmiCategory: category,
			};
	
		},
	
		birthDefects: function() {
			// ~0.5% of world population is blind
			// ~0.9% of world population is deaf
			// ~0.9% of world population is mute (no good stat)
			// ~0.007% of world population has type 1 diabetes
			// ~0.2% of world population has cerebral palsy
			var abs = {				
				blindness: (Utility.random(0, 1000) < 4) ? true: false,
				deafness: (Utility.random(0, 1000) < 8) ? true : false,
				muteness: (Utility.random(0, 1000) < 8) ? true : false,
				'cerebral-palsy': (Utility.random(0, 1000) < 1) ? true : false,
				diabetes1: (Utility.random(0, 100000) < 6) ? true : false,
			}
			var result = [];
			for (var key in abs) {
				if (abs[key]) result.push(key);
			}
			return result;
		}
	}
	
	body.core = core;
	body.age = facets.age(age);
	body.gender = gender || facets.gender();
	body.name = name || facets.name(body.gender);
	body.physical = facets.physical(core.mbti, body.age.years, body.gender);
	body.physical.birthDefects = facets.birthDefects();
	
	body.toString = function() {
		var string = [
			this.name,
			this.gender,
			this.physical.bmiCategory,
			this.age.category + '('+this.age.years+')',
		];
		return string.join(', ') + '\r\n' + body.core.toString();
	}
	
	return body;
}