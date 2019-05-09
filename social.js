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
  var who = '';
  var object = {};
  for(let name in listPeople()){
    object[name] = listPeople()[name].followers;
  }

  var sum = 0;
  for(let people in object){
    var count = 0;
    for(let i = 0; i < object[people].length; i++){
      for(let code in data){
        if(object[people][i] === data[code].name && data[code].age > 30){
          count++;
        }
      }
    }
    if(count > sum){
      sum = count;
      who = people;
    }
  }
  return who;
}


// Identify who follows the most people over 30
function mostFollow30(){
  var who = '';
  var object = {};
  for(let name in listPeople()){
    object[name] = listPeople()[name].follows;
  }

  var sum = 0;
  for(let people in object){
    var count = 0;
    for(let i = 0; i < object[people].length; i++){
      for(let code in data){
        if(object[people][i] === data[code].name && data[code].age > 30){
          count++;
        }
      }
    }
    if(count > sum){
      sum = count;
      who = people;
    }
  }
  return who;
}


// List those who follow someone that doesn't follow them back
function doNotFollowBack(){
  const list = [];
  let object = listPeople();
  for(let people in object){
    if(object[people].follows.length > object[people].followers.length){
      list.push(people);
    }else{
      var count = 0;
      for(let i = 0; i < object[people].follows.length; i++){
        for(let j = 0; j < object[people].followers.length; j++){
          if(object[people].follows[i] === object[people].followers[j]){
            count++;
          }
        }
      }
      if(count < object[people].follows.length){
        list.push(people);
      }
    }
  }
  return list;
}


// List everyone and their reach (sum of # of followers and # of followers of followers)
function reach(){
  var object = {};
  for(let name in listPeople()){
    object[name] = {};
    object[name].followers = {};
    object[name].followersNumber = listPeople()[name].followers.length;
    for(let i = 0; i < listPeople()[name].followers.length; i++){
      for(let people in listPeople()){
        if(listPeople()[name].followers[i] === people){
          object[name].followers[people] = listPeople()[people].followers.length;
        }
      }
    }
  }
  return object;
}


console.log(listPeople());
//output
// { Alice:
//    { follows: [ 'Bob', 'Charlie', 'Debbie' ],
//      followers: [ 'Charlie', 'Debbie' ] },
//   Bob:
//    { follows: [ 'Elizabeth', 'Finn' ],
//      followers: [ 'Alice', 'Debbie' ] },
//   Charlie:
//    { follows: [ 'Alice', 'Debbie', 'Finn' ],
//      followers: [ 'Alice', 'Debbie' ] },
//   Debbie:
//    { follows: [ 'Alice', 'Bob', 'Charlie', 'Elizabeth', 'Finn' ],
//      followers: [ 'Alice', 'Charlie', 'Elizabeth' ] },
//   Elizabeth:
//    { follows: [ 'Debbie' ],
//      followers: [ 'Bob', 'Debbie', 'Finn' ] },
//   Finn:
//    { follows: [ 'Elizabeth' ],
//      followers: [ 'Bob', 'Charlie', 'Debbie' ] } }
console.log(mostFollow());
console.log(mostFollowers());
console.log(mostFollowers30());
console.log(mostFollow30());
console.log(doNotFollowBack());
console.log(reach());

