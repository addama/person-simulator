var Core = function(lists) {
	var core = {};
	var facets = {
		mbti: function(totals) {
			// http://www.typologycentral.com/forums/mbti-tm-and-jungian-cognitive-functions/42045-ocean-personality-matrix-combining-mbti-keirsey-temperament.html
			var mbti = [];
			mbti.push('i', 'n', 'f', 'p');
			if (totals.extroversion >= 50) mbti[0] = 'e';
			if (totals.openness >= 50) mbti[1] = 's';
			
			if ((mbti[1] === 's' && totals.agreeableness >= 50) || 
			(mbti[1] === 'n' && totals.agreeableness < 50)) 
				mbti[2] = 't';
			
			if ((mbti[1] === 's' && totals.conscientiousness >= 50) || 
			(mbti[1] === 'n' && totals.conscientiousness < 50)) 
				mbti[3] = 'j';
			
			return mbti.join('');
		},
		
		matrix: function() {
			//https://www.unifr.ch/ztd/HTS/inftest/WEB-Informationssystem/en/4en001/d590668ef5a34f17908121d3edf2d1dc/hb.htm
			//https://uasdata.usc.edu/system/files/BigFiveInventory_key.pdf
			//http://fetzer.org/sites/default/files/images/stories/pdf/selfmeasures/Personality-BigFiveInventory.pdf
			//http://pages.uoregon.edu/sanjay/bigfive.html#where
			var maxValue = 99 * 6;
			var totals = {};
			var averages = {};
			var total = 0;
			var matrix = {};
			var max = 100 * 6 * 5;
			
			for (var group in lists.matrix) {
				matrix[group] = {};
				totals[group] = 0;
				for (var key in lists.matrix[group]) {
					var trait = lists.matrix[group][key];
					var value = Utility.random(0, 100);
					matrix[group][trait] = value;
					totals[group] += value;
				}
				total += totals[group];
			}
			
			for (var trait in matrix) {
				averages[trait] = 0;
				for (var facet in matrix[trait]) {
					averages[trait] += matrix[trait][facet];
				}
				averages[trait] = Math.floor(averages[trait] / 6);
			}
			
			return {
				matrix: matrix,
				stats: {
					total: total,
					max: max,
					totals: totals,
					averages: averages,
					percent: Math.floor(total/max * 100),
					deviation: Math.floor(50 - (total/max * 100))
				}
			};
		},

		holland: function(mbti) {
			// https://en.wikipedia.org/wiki/Holland_Codes
			var split = mbti.split('');
			var scores = {
				realistic: 0,
				investigative: 0,
				artistic: 0,
				social: 0,
				enterprising: 0,
				conventional: 0,
			}
			
			var steps = [ 1, 3, 5, 7, 9 ]; // 1, 2, 5, 7/10, 12
						
			// Realistic
			if (Utility.has(split, 's')) scores.realistic += steps[0];
			if (Utility.has(split, 't')) scores.realistic += steps[0];
			if (Utility.has(split, 'p')) scores.realistic += steps[0];
			if (mbti === 'istp') scores.realistic += steps[4];
			if (mbti === 'estp') scores.realistic += steps[3];
			if (mbti === 'isfp') scores.realistic += steps[2];
			
			// investigative
			if (Utility.has(split, 'n')) scores.investigative += steps[1];
			if (Utility.has(split, 't')) scores.investigative += steps[1];
			if (['intp', 'intj', 'entp'].indexOf(mbti) !== -1) scores.investigative += steps[4];
			if (mbti === 'entj') scores.investigative += steps[3];
			
			// artistic
			if (Utility.has(split, 'n')) scores.artistic += steps[0];
			if (Utility.has(split, 'f')) scores.artistic += steps[0];
			if (Utility.has(split, 'p')) scores.artistic += steps[0];
			if (mbti === 'infp') scores.artistic += steps[4];
			if (mbti === 'infj') scores.artistic += steps[3];
			if (mbti === 'enfp') scores.artistic += steps[3];
			if (mbti === 'enfj') scores.artistic += steps[2];
			if (mbti === 'isfp') scores.artistic += steps[2];
			
			// social
			if (Utility.has(split, 'e')) scores.social += steps[1];
			if (Utility.has(split, 'f')) scores.social += steps[1];
			if (['enfp', 'enfj', 'esfp'].indexOf(mbti) !== -1) scores.social += steps[3];
			if (mbti === 'esfj') scores.social += steps[4];
			if (mbti === 'isfj') scores.social += steps[2];
			
			// enterprising
			if (Utility.has(split, 'e')) scores.enterprising += steps[2];
			if (['entj', 'estj', 'estp', 'esfp', 'enfp', 'enfj'].indexOf(mbti) !== -1) scores.enterprising += steps[3];
			
			// conventional
			if (Utility.has(split, 's')) scores.conventional += steps[1];
			if (Utility.has(split, 'j')) scores.conventional += steps[1];
			if (mbti === 'istj') scores.conventional += steps[4];
			if (mbti === 'isfj') scores.conventional += steps[3];
			if (mbti === 'estj') scores.conventional += steps[3];
			
			var sorted = [];
			var holland = [];
			var jobs = [];
			
			for (var k in scores) sorted.push([k, scores[k]]);
			sorted.sort(function(a, b) { return b[1] - a[1] });
			holland = [sorted[0][0], sorted[1][0], sorted[2][0]];

			return holland;
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
				case 'esfj': choice = ['1', '2', '6']; break;
				case 'isfj': choice = ['1', '2', '4', '6']; break;
				case 'estj': choice = ['8', '3', '6']; break;
				case 'istj': choice = ['1', '5', '6']; break;
				case 'esfp': choice = ['2', '3', '6', '7']; break;
				case 'isfp': choice = ['9', '4', '6']; break;
				case 'estp': choice = ['8', '3', '6', '7', '6']; break;
				case 'istp': choice = ['8', '5', '6']; break;
				case 'enfp': choice = ['9', '2', '3', '6', '7']; break;
				case 'infp': choice = ['9', '2', '4', '6']; break;
				case 'enfj': choice = ['9', '1', '2', '3', '6']; break;
				case 'infj': choice = ['9', '1', '2', '4', '6']; break;
				case 'entp': choice = ['3', '7', '6']; break;
				case 'intp': choice = ['9', '5', '6']; break;
				case 'entj': choice = ['8', '1', '3', '6']; break;
				case 'intj': choice = ['1', '5', '6']; break;
			}
			return lists.enneagrams[choice[Utility.random(0, choice.length)]*1-1];
		},
	
		temperament: function(traits) {
			// Sanguine: lively, sociable, talkative
			// Choleric: egocentric, impulsive, aggressive
			// Melancholic: serious, introverted, depressive
			// Phlegmatic: thoughtful, calm, tolerant
			var temperament = lists.temperaments[Utility.getQuadrant(traits.extroversion, traits.neuroticism) - 1];
			return {
				type: temperament,
				descriptors: lists.temperamentDescriptions[temperament]
			}
		},
				
	}
	
	core = facets.matrix();
	core.mbti = facets.mbti(core.stats.averages);
	core.holland = facets.holland(core.mbti);
	core.keirsey = facets.keirsey(core.mbti);
	core.enneagram = facets.enneagram(core.mbti);
	core.temperament = facets.temperament(core.stats.averages);
	
	core.toString = function() {
		var string = [
			this.enneagram.role,
			this.temperament.descriptors.join(', '),
			this.holland.join(', '),
			this.keirsey.join(', '),
		];
		return string.join(', ');
	}
	
	return core;
}