const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const nextQuoteBtn = document.getElementById("next-quote");
const loader = document.getElementById("loader");
const tryAgain = document.getElementById("try-again");
const tryAgainBtn = document.getElementById("try-again-button");

//loader
const showLoadingSpinner = ()=>{
    loader.hidden = false;
    quoteContainer.hidden = true;
    tryAgain.hidden = true;
}

const removeLoadingSpinner = ()=>{
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get Quote From API
async function getQuoteFromAPI(){
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const getUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try{
        const response = await fetch(proxyUrl+getUrl);
        const data = await response.json();
        adjustedLongQuoteFont(data.quoteText.length);
        quoteText.textContent = data.quoteText; 
        authorText.textContent = checkAuthor(data.quoteAuthor);
        // Stop Loading and Show Quote
        removeLoadingSpinner();
    }
    catch(err){
        console.error(err);
        tryAgainMessage();
    }
}


// If Author is blank, add unknown
const checkAuthor = (Author)=>{
    if(Author===""){
        return "unknown";
    }
    return Author;
}

//Make font size smaller if quote is long
const adjustedLongQuoteFont = (quoteLength)=>{
    if(quoteLength > 120){
        quoteText.classList.add("long-quote");
    }
    else{
        quoteText.classList.remove("long-quote");
    }
}

//Share quote to twitter
const tweetQuote = ()=>{
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" -${author}`
    window.open(twitterUrl,"_blank");
}


//Try again message in case of connection error while getting quote

const tryAgainMessage = ()=>{
    // Stop Loading and Show Quote
    removeLoadingSpinner();
    quoteContainer.hidden = true;
    tryAgain.hidden = false;
}

//Event Listeners
nextQuoteBtn.addEventListener("click",getQuoteFromAPI);
twitterBtn.addEventListener("click",tweetQuote);
tryAgain.addEventListener("click",getQuoteFromAPI);