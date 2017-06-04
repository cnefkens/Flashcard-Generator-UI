

 function ClozeCard(text, cloze)  {
    if (this instanceof ClozeCard) { 
        this.clozeLower = cloze.toLowerCase();
        this.textLower = text.toLowerCase();
    
        if (this.textLower.includes(this.clozeLower)) {
            this.cloze = cloze;
            this.partial = text.replace(cloze,'...');
            this.fullText = text;
        }
        else {
            console.log("Error - '" + cloze + "' does not appear in text '" + text + "'");
        }
    }
    else {
        return new ClozeCard(text,cloze);
    }
    }
    
    module.exports = ClozeCard;

