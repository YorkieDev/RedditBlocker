const quotes = [
  { text: "The cost of procrastination is the life you could have lived.", author: "Anonymous" },
  { text: "You cannot escape the responsibility of tomorrow by evading it today.", author: "Abraham Lincoln" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Lost time is never found again.", author: "Benjamin Franklin" },
  { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "It is not enough to be busy. The question is: what are we busy about?", author: "Henry David Thoreau" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "Until we can manage time, we can manage nothing else.", author: "Peter Drucker" },
  { text: "Amateurs sit and wait for inspiration. The rest of us just get up and go to work.", author: "Stephen King" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "You may delay, but time will not.", author: "Benjamin Franklin" },
  { text: "Either you run the day or the day runs you.", author: "Jim Rohn" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "What we fear doing most is usually what we most need to do.", author: "Tim Ferriss" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
  { text: "Don't wait. The time will never be just right.", author: "Napoleon Hill" }
];

let currentQuoteIndex = Math.floor(Math.random() * quotes.length);

function showQuote() {
  const quoteEl = document.getElementById('quote');
  const authorEl = document.getElementById('author');
  
  if (quoteEl && authorEl) {
    // Fade out
    quoteEl.classList.add('fade-out');
    authorEl.classList.add('fade-out');
    
    setTimeout(function() {
      // Update content
      const quote = quotes[currentQuoteIndex];
      quoteEl.textContent = '"' + quote.text + '"';
      authorEl.textContent = quote.author;
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      
      // Fade in
      quoteEl.classList.remove('fade-out');
      authorEl.classList.remove('fade-out');
    }, 500);
  }
}

function updateStats(count) {
  const blockedEl = document.getElementById('blockedCount');
  const timeEl = document.getElementById('timeSaved');
  if (blockedEl) blockedEl.textContent = count;
  if (timeEl) timeEl.textContent = count * 5;
}

document.addEventListener('DOMContentLoaded', function() {
  // Show first quote immediately (no fade for first one)
  const quoteEl = document.getElementById('quote');
  const authorEl = document.getElementById('author');
  if (quoteEl && authorEl) {
    const quote = quotes[currentQuoteIndex];
    quoteEl.textContent = '"' + quote.text + '"';
    authorEl.textContent = quote.author;
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  }
  
  // Cycle quotes every 30 seconds with animation
  setInterval(showQuote, 30000);

  // Set edition date
  const editionEl = document.getElementById('edition');
  if (editionEl) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    editionEl.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
  }

  // Increment blocked count and load stats
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({ type: 'INCREMENT_BLOCKED' });
    
    setTimeout(function() {
      if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['blockedCount'], function(result) {
          updateStats(result.blockedCount || 0);
        });
      }
    }, 100);
  } else {
    updateStats(0);
  }
});
