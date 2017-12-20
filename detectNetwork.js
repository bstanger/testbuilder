// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  // Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.
  // Heads up! Switch and Visa seem to have some overlapping card numbers - in any apparent conflict, you should choose the network with the longer prefix.

  // Once you've read this, go ahead and try to implement this function, then return to the console.

  const cardNumArray = cardNumber.split('');
  const cardNumLength = cardNumArray.length;
  const cardNumTwoPrefix = parseInt(cardNumArray.slice(0,2).join(''));
  const cardNumThreePrefix = parseInt(cardNumArray.slice(0,3).join(''));
  const cardNumFourPrefix = parseInt(cardNumArray.slice(0,4).join(''));
  const cardNumSixPrefix = parseInt(cardNumArray.slice(0,6).join(''));
  let networkName;

  if(cardNumLength === 14 && 
  	(cardNumTwoPrefix === 38 || cardNumTwoPrefix === 39)){
  		networkName = "Diner's Club"

  } else if(cardNumLength === 15 && 
  	(cardNumTwoPrefix === 34 || cardNumTwoPrefix === 37)){
  		networkName = "American Express"

  } else if ((cardNumLength === 13 || cardNumLength === 16 || cardNumLength === 19) && 
  	checkBetween(cardNumTwoPrefix, 40, 49)){
  		if((cardNumLength === 16 || cardNumLength === 19) &&
  			[4903, 4905, 4911, 4936].includes(cardNumFourPrefix)){
  				networkName = "Switch"
  		} else {
  			networkName = "Visa"
  		}

  } else if(cardNumLength === 16 && 
  	checkBetween(cardNumTwoPrefix, 51, 55)){
  		networkName = "MasterCard"

  } else if((cardNumLength === 16 || cardNumLength === 19) && 
  	(cardNumFourPrefix === 6011 || checkBetween(cardNumThreePrefix, 644, 649) || cardNumTwoPrefix === 65)){
  		networkName = "Discover"

  } else if(checkBetween(cardNumLength, 12, 20) &&
	[5018, 5020, 5038, 6304].includes(cardNumFourPrefix)){
  		networkName = "Maestro"
	
  } else if((checkBetween(cardNumLength, 16, 19)) &&
	(checkBetween(cardNumSixPrefix, 622126, 622925) || checkBetween(cardNumThreePrefix, 624, 626) || checkBetween(cardNumFourPrefix, 6282, 6288))){
		networkName = "China UnionPay"

  } else if((cardNumLength === 16 || cardNumLength === 18 || cardNumLength === 19) &&
  	([4903, 4905, 4911, 4936, 6333, 6759].includes(cardNumFourPrefix) || [564182, 633110].includes(cardNumSixPrefix))){
  		networkName = "Switch"

  } else {
  	networkName = "Invalid credit card - No network detected"
  }

  return networkName

};


var checkBetween = function(x, min, max) {
	return x >= min && x <= max;
};


