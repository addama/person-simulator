var Person = function(lists, gender, age, name) {
	
	var facets = {
		addTags: function(person) {
			var tags = [];
			// General tags
			tags.push('is-'+person.physical.handedness+'-handed');
			tags.push('is-'+person.gender);
			tags.push('is-'+person.age.category);
			tags.push('is-'+person.sexuality);
			tags.push('is-'+person.core.temperament.descriptors[0]);
			tags.push('is-'+person.core.temperament.descriptors[1]);
			tags.push('is-'+person.core.temperament.descriptors[2]);
			tags.push('likes-'+person.tastes.music[0]+'-music');
			tags.push('likes-'+person.tastes.music[1]+'-music');
			tags.push('likes-'+person.tastes.music[2]+'-music');
			tags.push('likes-'+person.tastes.food);
			tags.push('is-'+person.physical.bmiCategory);
			if (person.age.years >= 21) tags.push('can-Drink');
			if (person.age.years >= 18) tags.push('is-of-age');
			if (person.age.years >= 16) tags.push('can-Drive');
			
			// Personality tags
			for (var domain in person.core.matrix) {
				for (var trait in person.core.matrix[domain]) {
					var value = person.core.matrix[domain][trait];
					if (value < 25) {
						if (value < 10) {
							tags.push('very-not-'+trait);
						} else {
							tags.push('not-'+trait);
						}
					}
					if (value > 75) {
						if (value > 90) {
							tags.push('very-'+trait);
						} else {
							tags.push('is-'+trait);
						}
					}
				}
			}
			
			// Birth defect tags
			if (person.physical.birthDefects.length > 0) {
				for (var i = 0, l = person.physical.birthDefects.length; i < l; i++) {
					tags.push('has-'+person.physical.birthDefects[i]);
				}
			}
			return tags.sort();
		},
		
		tastes: {
			music: function() {
				var position = Utility.random(1, lists.musicGenres.length - 1);
				var genres = lists.musicGenres.slice(position-1, position+2);
				Utility.shuffle(genres);
				return genres;
			},
			
			food: function(person) {
				var average = (person.core.stats.averages.agreeableness + person.core.stats.averages.openness) / 2;
				var foods = lists.foodCategories.basic;
				var spacer = 0;

				if (average >= 40) {
					foods = foods.concat(lists.foodCategories.basic);
					spacer += 3;
				}
				
				if (average >= 50) {
					foods = foods.concat(lists.foodCategories.adventurous);
					spacer += 3;
				}
				
				if (average >= 55) {
					foods = foods.concat(lists.foodCategories.exotic);
					spacer += 3;
				}
				
				if (average >= 60) {
					foods = lists.foodCategories.exotic;
					spacer = 0;
				}
				var choice = foods[Utility.random(spacer, foods.length)];
				return choice;
			},
			
			coffeeOrTea: function() {
				var random = Utility.random(0, 100);
				if (random < 11) return "water";
				if (random < 19) return "both";
				if (random < 44) return "tea";
				return "coffee";
			},
		},
		
		mood: function(person) {
			var moodStep_positive = 1;
			var moodStep_negative = -1;
			var moodBase = 50;
			
			for (var i = 0; i < lists.negativeMoodTags.length; i++) {
				var tag = lists.negativeMoodTags[i];
				if (Utility.has(person.tags, tag)) {
					if (tag.startsWith('very-')) {
						moodStep_negative -= 2;
					} else {
						moodStep_negative -= 1;
					}
				}
			}
			
			for (var i = 0; i < lists.positiveMoodTags.length; i++) {
				var tag = lists.positiveMoodTags[i];
				if (Utility.has(person.tags, tag)) {
					if (tag.startsWith('very-')) {
						moodStep_positive += 2;
					} else {
						moodStep_positive += 1;
					}
				}
			}
			
			for (var i = 0; i < lists.neutralMoodTags.length; i++) {
				var tag = lists.positiveMoodTags[i];
				if (Utility.has(person.tags, tag)) {
					if (tag.startsWith('very-')) {
						moodStep_positive -= 2;
						moodStep_negative += 2;
					} else {
						moodStep_positive -= 1;
						moodStep_negative += 1;
					}
				}
			}
			
			moodBase += moodStep_negative + moodStep_positive;
			
			return {
				moodStep_positive: moodStep_positive,
				moodStep_negative: moodStep_negative,
				moodMax: 100,
				restingMood: moodBase
			}
		}
	}
	
	var core = new Core(lists);
	var person = new Body(lists, core, gender, age, name);
	
	person.tastes = {};
	person.tastes.music = facets.tastes.music();
	person.tastes.food = facets.tastes.food(person);
	person.tastes.coffeeOrTea = facets.tastes.coffeeOrTea();
	person.tags = facets.addTags(person);
	person.mood = facets.mood(person);
	
	return person;
}