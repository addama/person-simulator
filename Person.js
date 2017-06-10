var Person = function(lists, gender, age, name) {
	
	var facets = {
		addTags: function(person) {
			var tags = [];
			// General tags
			tags.push('is-'+person.physical.handedness+'-handed');
			tags.push('is-'+person.gender);
			tags.push('is-'+person.age.category);
			tags.push('is-'+person.core.temperament.descriptors[0]);
			tags.push('is-'+person.physical.bmiCategory);
			if (person.age.years >= 21) tags.push('can-Drink');
			if (person.age.years >= 16) tags.push('can-Drive');
			
			// Personality tags
			for (var domain in person.core.matrix) {
				for (var trait in person.core.matrix[domain]) {
					var value = person.core.matrix[domain][trait];
					if (value < 10) tags.push('not-'+trait);
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
				var genres = lists.musicGenres;
				Utility.shuffle(genres);
				console.log(genres);
			},
			food: function() {
				
			},
		}
	}
	
	var core = new Core(lists);
	var person = new Body(lists, core, gender, age, name);
	
	person.tags = facets.addTags(person);
	person.tastes = {};
	person.tastes.music = facets.tastes.music();
	person.tastes.food = facets.tastes.food();
	
	return person;
}