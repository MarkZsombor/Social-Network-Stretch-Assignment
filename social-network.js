var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

function convertIdtoName(userId) {
  return data[userId].name;
}

function convertArrayOfIdsToNames(arrayOfIds) {
    var arrayOfNames = [];
    for (var entry in arrayOfIds) {
      var name = convertIdtoName(arrayOfIds[entry]);
      arrayOfNames.push(name);
    }
    return arrayOfNames;
}

function isFollowedBy(userId) {
  var listOfFans = [];
  for (var entry in data) {
    for (var i = 0; i < data[entry].follows.length; i++) {
      if (data[entry].follows[i] === userId) {
        listOfFans.push(entry);
      }
    }
  }
  return listOfFans;
}


function followsAndFollowers() {
  for (var i in data) {
    var whoTheyFollow = convertArrayOfIdsToNames(data[i].follows);
    var whoFollowsThem = convertArrayOfIdsToNames(isFollowedBy(i));
    console.log(data[i].name + " follows: " + whoTheyFollow);
    console.log(data[i].name + " is followed by: " +whoFollowsThem);

  }
}

function hasFollowsTheMost() {
  var biggestFollower = ["", 0];
  for (var i in data) {
    if (data[i].follows.length > biggestFollower[1]) {
      biggestFollower[0] = data[i].name;
      biggestFollower[1] = data[i].follows.length
    }
  }
  console.log(biggestFollower[0] + " follows the most people, " + biggestFollower[1] + ".");
}

// TO DO add ability to recognize tie cases

function isFollowedTheMost() {
  var mostFollowers = ['', 0];
  for (var i in data) {
    if (isFollowedBy(i).length > mostFollowers[1]) {
      mostFollowers[0] = data[i].name;
      mostFollowers[1] = isFollowedBy(i).length;
    }
  }
  console.log(mostFollowers[0] + ' is followed by ' + mostFollowers[1] + ' people, the most of everyone.');
}

// TO DO add ability to recognize tie cases

function howManyOldFollowers(userId) {
  var numberOfOldFollowers = 0;
  var allFollowers = isFollowedBy(userId);
  for (var i = 0; i < allFollowers.length; i++) {
    var specificFollower = allFollowers[i];
    if (data[specificFollower].age > 30) {
      numberOfOldFollowers++;
    }
  }
  return numberOfOldFollowers;
}

function mostOldFollowers() {
  var oldPeopleLoveTheMost = ['', 0];
  for (var i in data) {
    if (howManyOldFollowers(i) > oldPeopleLoveTheMost[1]) {
      oldPeopleLoveTheMost[0] = data[i].name;
      oldPeopleLoveTheMost[1] = howManyOldFollowers(i);
    }
  }
  console.log(oldPeopleLoveTheMost[0] + ' has the most followers over 30 at ' + oldPeopleLoveTheMost[1]);
}

// TO DO add ability to recognize tie cases

function howMany30PlusFollowed(userId) {
  var number30PlusFollowed = 0;
  var allFollowed = data[userId].follows;
  for (var i = 0; i < allFollowed.length; i++) {
    var specificFollowed = allFollowed[i];
    if (data[specificFollowed].age > 30) {
      number30PlusFollowed++;
    }
  }
  return number30PlusFollowed;
}


function followsMostOldPeople() {
  var likesOldPeople = ['', 0];
  for (var i in data) {
    if (howMany30PlusFollowed(i) > likesOldPeople[1]) {
      likesOldPeople[0] = data[i].name;
      likesOldPeople[1] = howMany30PlusFollowed(i);
    }
  }
  console.log(likesOldPeople[0] + ' follows the most people over the age of 30, ' + likesOldPeople[1] + ' of them.');
}

// TO DO add ability to recognize tie cases

function followsButIsntFollowed(entry) {
  for (var entry in data) {
    for (var i = 0; i < data[entry].follows.length; i++) {
      var followerId = data[entry].follows[i];
      var notAFollower = false;
      for (var j = 0; j < data[followerId].follows.length; j++) {
        if (entry === data[followerId].follows[j]) {
          notAFollower = true;
          break;
        }
      }
      if (!notAFollower) {
        console.log(convertIdtoName(entry) + ' follows ' + convertIdtoName(followerId) + " but isn't followed by them");
      }
    }
  }
}


function followersFollowers() {
  for (var entry in data) {
    var sumOfSecondaryFollowers = 0;
    for (var i = 0; i < data[entry].follows.length; i++) {
      var followerId = data[entry].follows[i];
      sumOfSecondaryFollowers += data[followerId].follows.length;
    }
    var reach = sumOfSecondaryFollowers + data[entry].follows.length;
    console.log(convertIdtoName(entry) + ' has a reach of ' +  reach + ' followers');
  }
}




// List everyone and for each of them, list the names of who they follow and who follows them
followsAndFollowers(); //IT WORKS
console.log('------- \n');

// Identify who follows the most people
hasFollowsTheMost(); //IT WORKS, doesnt show ties
console.log('------- \n');

// Identify who has the most followers
isFollowedTheMost(); //IT WORKS doesn't show ties
console.log('------- \n');

// Identify who has the most followers over 30
mostOldFollowers(); //works doesnt show ties
console.log('------- \n');

// Identify who follows the most people over 30
followsMostOldPeople(); //WORKS doesnt show ties
console.log('------- \n');

// List those who follow someone that doesn't follow them back
followsButIsntFollowed(); //WORKS
console.log('------- \n');

// List everyone and their reach (sum of # of followers and # of followers of followers)
followersFollowers(); // WORKS