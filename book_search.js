/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    /**
     * Convert Search Term into a Regex to remove 
     * inclusivity of matching (ex. "the" should not match "then")
     */
    const searchTermRE =  new RegExp(
        "[\\W]" + searchTerm + "[\\W]|" +
        "^" + searchTerm + "[\\W]|" + 
        "[\\W]" + searchTerm + "$|" +
        "^" + searchTerm + "$"
    )

    
    for (let i = 0; i < scannedTextObj.length; i++){
        let book = scannedTextObj[i];
        let content = book.Content;

        /** Apply SearchTerm Matching Function */
        content.map(function(entry){
            let containsSearchTerm = entry.Text.match(searchTermRE);
            /** Only Include Results Containing a Match */
            if(containsSearchTerm){
                result.Results.push({
                    ISBN: book.ISBN,
                    Page: entry.Page,
                    Line: entry.Line,
                });
            };
        });
    }

    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

//------------------------------------------------

const TestInputExclusiveSearch = [
    {
        "Title" : "Test for Exclusive Searching",
        "ISBN"  : "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "I drank then I ate a burger."
            },
        ]
    }
]

const TestCapitilizationnSensitive = [
    {
        "Title" : "Test for Exclusive Searching",
        "ISBN"  : "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "over The moon"
            },
        ]
    }
]

const TestFirstElement = [
    {
        "Title" : "Test for First Element",
        "ISBN"  : "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "the milk went bad"
            },
        ]
    }   
]

const TestLastElement = [
    {
        "Title" : "Test for Last Element",
        "ISBN"  : "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "eating potato the"
            },
        ]
    }   
]

const TestPrecedingPunctuation = [
    {
        "Title" : "Test for Preceding Punctuation",
        "ISBN"  : "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "Hello.the barn"
            },
            {
                "Page": 32,
                "Line": 8,
                "Text": "Hello?the barn"
            },
            {
                "Page": 33,
                "Line": 8,
                "Text": "Hello!the barn"
            },
            {
                "Page": 34,
                "Line": 8,
                "Text": "Hello;the barn"
            },
            {
                "Page": 35,
                "Line": 8,
                "Text": "Hello,the barn"
            },
            {
                "Page": 36,
                "Line": 8,
                "Text": "Hello)the barn"
            },
        ]
    }   

]

const TestFollowingPunctuation = [
    {
        "Title" : "Test for Following Punctuation",
        "ISBN"  : "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "Hello the. barn"
            },
            {
                "Page": 32,
                "Line": 8,
                "Text": "Hello the? barn"
            },
            {
                "Page": 33,
                "Line": 8,
                "Text": "Hello the! barn"
            },
            {
                "Page": 34,
                "Line": 8,
                "Text": "Hello the; barn"
            },
            {
                "Page": 35,
                "Line": 8,
                "Text": "Hello the, barn"
            },
            {
                "Page": 36,
                "Line": 8,
                "Text": "Hello the) barn"
            },
        ]
        
    }   
]

const TestOccuranceStartandEndTerm = [
    {
        "Title" : "Test Book 1",
        "ISBN"  : "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "the"
            },
        ]
        
    }
]

const TestMultipleBooks = [
    {
        "Title" : "Test Book 1",
        "ISBN"  : "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "close the door"
            },
        ]
        
    },
    {
        "Title" : "Test Book 2",
        "ISBN"  : "8780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "open the door"
            },
        ]
        
    }   
]

const TestMultipleOccurancesInContent = [
    {
        "Title" : "Test Multiple Occurances in Content",
        "ISBN"  : "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "close the door"
            },
            {
                "Page": 23,
                "Line": 2,
                "Text": "open the door"
            },
        ]
    },
]

const TestNoBooks =  []





/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


/** Check Serach Fails if Occurance is part of a larger word */
const test3result = findSearchTermInBooks("the", TestInputExclusiveSearch);
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", 0);
    console.log("Received:", test3result.Results.length);
}


/** Check Search Fails if Occurance is of different Capitalization */
const test4result = findSearchTermInBooks("the", TestCapitilizationnSensitive);
if (test4result.Results.length == 0) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", 0);
    console.log("Received:", test4result.Results.length);
}

/** Check Search Works when occuring on first element of text */
const test5result = findSearchTermInBooks("the", TestFirstElement);
if (test5result.Results.length == 1) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", 1);
    console.log("Received:", test5result.Results.length);
}

/** Check Search Works when occuring on Last element of text */
const test6result = findSearchTermInBooks("the", TestLastElement);
if (test6result.Results.length == 1) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", 1);
    console.log("Received:", test6result.Results.length);
}

/** Check Search Works when Match is preceded by punctuation */
const test7result = findSearchTermInBooks("the", TestPrecedingPunctuation);
if (test7result.Results.length == 6) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", 6);
    console.log("Received:", test7result.Results.length);
}


/** Check Search Works when Match is followed by punctuation */
const test8result = findSearchTermInBooks("the", TestFollowingPunctuation);
if (test8result.Results.length == 6) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", 6);
    console.log("Received:", test8result.Results.length);
}

/** Check Search Works when Match is both First and Last Element */
const test9result = findSearchTermInBooks("the", TestOccuranceStartandEndTerm);
if (test9result.Results.length == 1) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", 1);
    console.log("Received:", test9result.Results.length);
}

/** Check Occurances in multiple Books */
const test10result = findSearchTermInBooks("the", TestMultipleBooks);
if (test10result.Results.length == 2) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", 2);
    console.log("Received:", test10result.Results.length);
}

/** Check Multiple Occurances in Same Content */
const test11result = findSearchTermInBooks("the", TestMultipleOccurancesInContent);
if (test11result.Results.length == 2) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", 2);
    console.log("Received:", test11result.Results.length);
}

/** Check Multiple Occurances in Same Content */
const test12result = findSearchTermInBooks("the", TestNoBooks);
if (test12result.Results.length == 0) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", 0);
    console.log("Received:", test12result.Results.length);
}

