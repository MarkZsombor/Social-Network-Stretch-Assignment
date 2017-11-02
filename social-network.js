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
        // console.log(Object.keys(data)[entry]);
        // console.log(entry);
        listOfFans.push(entry);
      }
    }
  }
  return listOfFans;
}

// console.log(isFollowedBy("f04"));

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

function isFollowedTheMost() {
  var mostFollowers = ['', 0];
  for (var i in data) {
    if (isFollowedBy(i).length > mostFollowers[1]) {
      mostFollowers[0] = data[i].name;
      mostFollowers[1] = isFollowedBy(i).length;
    }
  }
  console.log(mostFollowers);
}

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

// List everyone and for each of them, list the names of who they follow and who follows them
// followsAndFollowers(); //IT WORKS

// Identify who follows the most people
// hasFollowsTheMost(); //IT WORKS

// Identify who has the most followers
// isFollowedTheMost(); //IT WORKS

// Identify who has the most followers over 30
// mostOldFollowers(); //works

// Identify who follows the most people over 30
// List those who follow someone that doesn't follow them back
// List everyone and their reach (sum of # of followers and # of followers of followers)