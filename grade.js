module.exports = {

    convertRawScore: function(rawScore){
        if(rawScore <= 30.0){
            scoreObject = {schoolLevel: 'college graduate', description: 'Very difficult to read. Best understood by university graduates.'};
        }
        else if(rawScore > 30 && rawScore <= 50){
            scoreObject = {schoolLevel: 'college', description: 'Difficult to read.'};
        }
        else if(rawScore > 50 && rawScore <= 60){
            scoreObject = {schoolLevel: '10th - 12th grade', description: 'Fairly difficult to read.'};
        }
        else if(rawScore > 60 && rawScore <= 70){
            scoreObject = {schoolLevel: '8th & 9th grade', description: 'Plain English. Easily understood by 13- to 15-year-old students.'};
        }
        else if(rawScore > 70 && rawScore <= 80){
            scoreObject = {schoolLevel: '7th grade', description: 'Fairly easy to read.'};
        }
        else if(rawScore > 80 && rawScore <= 90){
            scoreObject = {schoolLevel: '6th grade', description: 'Easy to read. Conversational English for consumers.'};
        }
        else{
            scoreObject = {schoolLevel: '5th grade', description:'Very easy to read. Easily understood by an average 11-year-old student.' };
        }

        return scoreObject;
    },

    score: function(obj) {
        return 206.835 - (1.015*obj.word/obj.sentence) - (84.6*obj.syllable/obj.word);
    }
};
