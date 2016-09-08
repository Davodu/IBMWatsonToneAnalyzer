module.exports = {

	analyzeTone: function(text){

		var watson = require('watson-developer-cloud');
		var tone_analyzer = watson.tone_analyzer({
		  username: '10d590f6-591e-4950-9715-a5efaff49e90',
		  password: 'JOl3OarYVNwa',
		  version: 'v3',
		  version_date: '2016-05-19 '
		});

		return new Promise(function(resolve, reject){
			if(!text){
				reject({message: "No text given to analyze"})
			}
			else{
				var input = {text: text};
				tone_analyzer.tone(input,
				function(err, tone) {
					if (err){
			  			reject(err);
		  			}
					else{
			  			resolve(tone, null, 2);
					}
				});
			}
		});	
  	}
};
