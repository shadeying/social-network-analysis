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


//List everyone
// for each of them, list the names of who they follow and who follows them
function listPeople(){
  var object = {};

  for(var code in data){
    object[data[code].name] = {};
    var codeArray = data[code].follows;
    object[data[code].name]["follows"] = codeArray;
    object[data[code].name]["followers"] = [];
  }

  for(var peopleNames in object){
    var followArray = object[peopleNames].follows;
    for(var id in data){
      for(var i = 0; i < followArray.length; i++){
        if(followArray[i] === id){
          followArray[i] = data[id].name;
        }
      }
    }
  }

  for(var names in object){
    var followsArray = object[names].follows;
    for(var names2 in object){
      for(var j = 0; j < followsArray.length; j++){
        if(followsArray[j] === names2){
          object[names2]["followers"].push(names);
        }
      }
    }
  }
  return object;
}


// Identify who follows the most people
function mostFollow(){
  var count = 0;
  var who = '';
  for(var code in data){
    if(data[code].follows.length > count){
      count = data[code].follows.length;
      who = data[code].name;
    }
  }
  return who;
}


// Identify who has the most followers
function mostFollowers(){
  var count = 0;
  var who = '';
  var object = listPeople();
  for(var names in object){
    if(object[names].followers.length > count){
      count = object[names].followers.length;
      who = names;
    }
  }
  return who;
}


// Identify who has the most followers over 30
function mostFollowers30(){

}


// Identify who follows the most people over 30
function mostFollow30(){

}


// List those who follow someone that doesn't follow them back
function doNotFollowBack(){

}


// List everyone and their reach (sum of # of followers and # of followers of followers)
function reach(){

}


console.log(listPeople());
console.log(mostFollow());
console.log(mostFollowers());
console.log(mostFollowers30());
console.log(mostFollow30());
console.log(doNotFollowBack());
console.log(reach());

