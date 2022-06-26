// declare variable for target elements to manipulate
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-Quote');
const loader = document.getElementById('loader');

// global variable declared
let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new quote
function newQuote(){
    loading();
    // Pick a random Quote From apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank
    if (!quote.author) {
        authorText.textContent = 'unknown'
    }
    else{
        authorText.textContent = quote.author;
    }

    // check Quote Length to determine styling
    if(quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // set quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From  API Using Async Fetch request with try catch statement
async function getQuotes() {
    loading();
    // pass the apiurl
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    
    }
    catch (error){
        // Catch Error Here
    }
}


// Tweet a Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// OnLoad run the function
getQuotes();