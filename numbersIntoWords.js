const oneTillNineteen = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const from20Till99 = [
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  
  const getWordsForUpto3Digits = (number) => {
    if (!number) return "";
  
    // console.log("number", number);
  
    // straighforwardly return the word
    if (number < 20) {
      return oneTillNineteen[number - 1];
    }
  
    let output = "";
  
    
    if (number < 100) {
      const tensPositionDigit = parseInt(number / 10);
      const onesPositionDigit = parseInt(number % 10);
      output = from20Till99[tensPositionDigit - 2] + " ";
      
      // We have calcualted only tens position so far, we have to append the one's position word as well.
      // If there is none return, else calculate.
      if (onesPositionDigit === 0) {
        return output;
      }
  
      output += oneTillNineteen[onesPositionDigit - 1];
      return output;
    }
  
    // Get the digit in hundreds position
    const hundredsPosDigit = parseInt(number / 100);
  
    output =
      oneTillNineteen[hundredsPosDigit - 1] +
      " hundred " +
      getWordsForUpto3Digits(number % 100);
  
    return output;
  };
  
  const padLeft = (value, reqLen) => {
    let output = value;
  
    for(let i = 0; output.length < reqLen; i++)
    {
      output = '0' + output;
    }
  
    return output;
  }
  
  // PAdding numners to nine digits. Since 9 digits make up to 99 crores.
  // Processing the number in this format 99, 99, 99, 999
  // First 2 numbers for crores, second 2 numbers for lakhs, thrid 2 numbers for thousands, 4th triad is for digits
  // starting from hundred placeholder
  
  const processChunk = (chunk) => {
  
    if(chunk.length < 9) {
      chunk = padLeft(chunk, 9); // Padding with 0's
    }
  
    const croresVal = parseInt(chunk.substr(0, 2));
    const lakhsVal = parseInt(chunk.substr(2, 2));
    const thousandsVal = parseInt(chunk.substr(4, 2));
    const last3digVal = parseInt(chunk.substr(6, 3));
  
    let inWords = '';
  
    if(croresVal) { // If after parsing, if its non zero value, then process it
      inWords += getWordsForUpto3Digits(croresVal) + ' crore ';
    }
  
    if(lakhsVal) {
      inWords += getWordsForUpto3Digits(lakhsVal) + ' lakh ';
    }
  
    if(thousandsVal) {
      inWords += getWordsForUpto3Digits(thousandsVal) + ' thousand ';
    }
  
    if(last3digVal) {
      inWords += getWordsForUpto3Digits(last3digVal);
    }
  
    return inWords;
  
  };
  
  // For easy processing numbers are processed as chunks of 9 digits
  const getChunksOfSize9 = (value) => {
    const chunks = [];
    // Processing from the last digit and dividing into chunks  
    for (let i = value.length - 1, chunk = ""; i > -1; i--) {
      chunk += value[i];
  
      if (chunk.length % 9 === 0 || i === 0) {
        // Since we are processing from the last end, we are reversing the digits.
        chunk = chunk.split("").reverse().join("");
        chunks.unshift(chunk);
        // You have to multiply by a hundred for every 9 digit chunk that is added after initial chunk.
        chunk = chunks.length > 0 ? "00" : "";
      }
    }
  
    return chunks;
  };
  
  const getWords = (value) => {
    let chunksProcessed = "";
  
    // Process each chunk.
    chunksProcessed = getChunksOfSize9(value).map((value) => {
      return processChunk(value).trim();
    });
  
    // Join each chunk with a conjuction ;) :D
    // console.log(value + " : " + chunksProcessed.join(" and "));
    return chunksProcessed.join(" and ");
  };
  
  /* Testcases: */
  
  getWords("1800000");
  
  getWords("19");
  
  getWords("321");
  
  getWords("4321");
  
  getWords("54321");
  
  getWords("654321");
  
  getWords("619321");
  
  getWords("7654321");
  
  getWords("87654321");
  
  getWords("81654321");
  
  getWords("990000000");
  
  getWords("987654321");
  
  getWords("1987654321");
  
  getWords("1987654321");
  
  getWords("21987654321");
  
  getWords("321987654321");
  
  getWords("4321987654321");
  
  getWords("54321987654321");
  
  getWords("654321987654321");
  
  getWords("7654321987654321");
  
  getWords("87654321987654321");
  
  getWords("987654321987654321");
  
  getWords("1987654321987654321"); 
  
  /*
  Output:
  1800000 : eighteen lakh
  19 : nineteen
  321 : three hundred twenty one
  4321 : four thousand three hundred twenty one
  54321 : fifty four thousand three hundred twenty one
  654321 : six lakh fifty four thousand three hundred twenty one
  619321 : six lakh nineteen thousand three hundred twenty one
  7654321 : seventy six lakh fifty four thousand three hundred twenty one
  87654321 : eight crore seventy six lakh fifty four thousand three hundred twenty one
  81654321 : eight crore sixteen lakh fifty four thousand three hundred twenty one
  990000000 : ninety nine crore
  987654321 : ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  1987654321 : one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  1987654321 : one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  21987654321 : two thousand one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  321987654321 : thirty two thousand one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  4321987654321 : four lakh thirty two thousand one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  54321987654321 : fifty four lakh thirty two thousand one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  654321987654321 : six crore fifty four lakh thirty two thousand one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  7654321987654321 : seventy six crore fifty four lakh thirty two thousand one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  87654321987654321 : eight hundred and seventy six crore fifty four lakh thirty two thousand one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  987654321987654321 : nine thousand eight hundred and seventy six crore fifty four lakh thirty two thousand one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  1987654321987654321 : nineteen thousand eight hundred and seventy six crore fifty four lakh thirty two thousand one hundred and ninety eight crore seventy six lakh fifty four thousand three hundred twenty one
  */