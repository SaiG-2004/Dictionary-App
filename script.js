const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchBtn = document.querySelector("#search-btn");
const word = document.querySelector("#word");

const searchWord = async () => {
  document.querySelector(".result").innerHTML = "";

  const response = await fetch(url + word.value);
  const data = await response.json();
  console.log(data);

  const meanings = data[0].meanings;

  meanings.forEach((e) => {
    createBox(e);
  });

  function createBox(e) {
    let synonymsData;
    let synonyms = e.synonyms;
    console.log(synonyms);
    if (synonyms.length == 0) {
      synonymsData = "No Synonyms Found";
    } else {
      synonymsData = synonyms.join(" , ");
    }

    let antonymsData;
    let antonyms = e.antonyms;
    if (antonyms.length == 0) {
      antonymsData = "No Antonyms Found";
    } else {
      antonymsData = antonyms.join(" , ");
    }


    let template = ` 
       <div class="card my-2" style="width:90%;">
         <div class="card-body">
           <h6 class="card-title">${data[0].word}</h6>
           <h6 class="card-subtitle mb-2 text-muted"> ${
             data[0].phonetics[2].text
               ? data[0].phonetics[2].text
               : data[0].phonetics[0].text
           }</h6>

           <div class="my-3 bg-danger px-2 rounded" style="width: max-content;">
             <p class="text-light m-2">${e.partOfSpeech}</p>  
           </div>

           <div class="alert alert-success" role="alert">
             <p class="alert-heading"><strong><i>Definition</i></strong></p>
             <p class="card-text">${
               e.definitions.length
                 ? e.definitions[0].definition
                 : "No definition found"
             }</p>
             <hr/>
             <p class="alert-heading"><strong><i>Example</i></strong></p>
             <p class="mb-0">${
               e.definitions[0].example
                 ? e.definitions[0].example
                 : "no example found"
             }</p>
           </div>

           <div class="alert alert-info" role="alert">
             <p class="alert-heading"><strong><i>Synonyms</i></strong></p>
             <p class="card-text">${synonymsData}</p>

           </div>
           <div class="alert alert-danger" role="alert">
             <p class="alert-heading"><strong><i>Antonyms</i></strong></p>
             <p class="card-text">${antonymsData}</p>

           </div>
     
      `;
    document.querySelector(".result").innerHTML += template;
  }
};

searchBtn.addEventListener("click", searchWord);