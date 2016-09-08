
function clickHandler(){
	emotionName = $(this).text();
	renderRankedSentences(emotionName);
	applyFliter(emotionName);
}

function applyFliter(emotionName){
	sentences = data.tone.sentences_tone;
	result = "";
	sentences.forEach(function(sentenceObj){
		sentence = sentenceObj.text;
		if(sentenceObj.tone_categories[0]){
			score = sentenceObj.tone_categories[0].tones.filter(function(obj){
				return obj.tone_name === emotionName;
			})[0].score;
			if(score > 0 && score <= 0.25){
				className = emotionName.toLowerCase() + "-min";
			}
			else if(score > 0.25 && score <= 0.50){
				className = emotionName.toLowerCase() + "-low";
			}
			else if(score > 0.50 && score <= 0.75){
				className = emotionName.toLowerCase() + "-mid";
			}
			else{
				className = emotionName.toLowerCase() + "-high";
			}
			sentenceMarkup = "<span class=" + className + ">" + sentence + "</br>" + " </span>";
			result += sentenceMarkup;
		}
		else{
			sentenceMarkup = "<span class=no-score>" + sentence + "</br>" + "</span>";
			result += sentenceMarkup;
		}
	});

	color = "<span class=" + emotionName.toLowerCase() + "-min>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
	color += "<span class=" + emotionName.toLowerCase() + "-low>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
	color += "<span class=" + emotionName.toLowerCase() + "-mid>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
	color += "<span class=" + emotionName.toLowerCase() + "-high>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";

	$(".tab-pane > p").html(result);
	$(".rectangle > p").html(color);
}

function descending(a, b){
		return b.score - a.score;
}

function ascending(a, b){
		return a.score - b.score;
}


function renderRankedSentences(emotionName){
	list = [];
	data.tone.sentences_tone.forEach(function(sentenceObj){
		list.push({	
					score: sentenceObj.tone_categories[0].tones.filter(function(obj){
						return obj.tone_name === emotionName;
					})[0].score,
					sentence: sentenceObj.text
				});
	});
	list.sort(descending)
	console.log(list);
	result ="";
	list.forEach(function(item){
		result += "<div class='sentence-wrapper'><div class='sentence-score'>" + item.score.toFixed(2) + "</div><div class='sentence'>" + item.sentence + "</div></div>"
	});
	$("#ranked").html(result);
}


$(document).ready(function(){
	var emotionName = $(".nav-stacked > li.active ").text();
	applyFliter(emotionName);
	renderRankedSentences(emotionName);
	$(".nav-stacked > li").on('click', clickHandler);
});