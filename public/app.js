var app = function(){
  
  var url = "http://pokeapi.co/api/v2/pokemon/?limit=151"
  var request = new XMLHttpRequest();
  request.open('GET', url);

  request.addEventListener('load', function(){
    var pokemons = JSON.parse(request.responseText)
    //console.log("response text", this.responseText)
    render(pokemons);
  });
    
  request.send();
}

var render = function (pokemons) {
  var storedPoke = localStorage.getItem('selectedPoke');
  var pokeToDisplay = null;

  populateSelect(pokemons.results);

  updateInfo(pokeToDisplay);
}


var populateSelect = function (pokemons) {

  var body = document.querySelector('#main')
  var select = document.createElement('select');
  select.id = "pokemons";

  var defaultOption = document.createElement('option');
  defaultOption.innerText = 'Select a pokemon';
  defaultOption.value = -1;
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);
    
  pokemons.forEach(function (item, index) {
    item.index = index;
    var option = document.createElement('option');
    option.value = index;
    option.text = item.name;
    select.appendChild(option);
    body.appendChild(select);
  });


  select.addEventListener('change', function (event) {
    var index = this.value;
    var poke = pokemons[index];
    
  
    updateInfo(poke);

    var jsonString = JSON.stringify(poke);
    localStorage.setItem('selectedPoke', jsonString);
  });
}

var updateInfo = function (poke) {

  
  var div = document.querySelector('#main')
  var p1 = document.createElement('p');
  var p2 = document.createElement('p');
  var img = document.createElement('img');


  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(img);


  if (poke !== null){
    p1.innerText = "Name: " + poke.name;
    p2.innerText = "Number: " + (poke.index+1);

  };

}



window.addEventListener('load', app);