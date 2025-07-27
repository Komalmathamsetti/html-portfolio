
var qCount = 1; // this will save no. of questions and used in id ceation for new questions
var savedQue = []; // array to save questions and their options, inside we store objects 

window.onload = function () { // when user clciks refresh we ask whether to load prev data or start new.
  let data = JSON.parse(localStorage.getItem('data')); // data is stored name for savedQue array
    if (data) { 
    let loadSaved = confirm("Load previously saved questions?"); 
    if (loadSaved) {
     if(document.getElementById('q1')) document.getElementById('q1').remove(); // we have to remove 1st question given  
    for( let x in data){                                                      //  as default to display saved questions from prev state.
        let saved = data[x]
        let num = Number(x); // x is string by defaukt, so conversion needed.
       const div = document.createElement('div');  // adding prev questions.
      div.className = 'queDiv';
      div.innerHTML = ` <h3>Question ${num+1}</h3>
          <input id="que" type="text" placeholder="${saved.q}">
        <div class="opt"><input id="opt1"type="text" placeholder="${saved.op1}">
                           <input id="opt2"type="text" placeholder="${saved.op2}">
                           <input id="opt3"type="text" placeholder="${saved.op3}">
                           <input id="opt4"type="text" placeholder="${saved.op4}">
        <button id="opt">correct answer</button></div>
        <div id="last"><button id="change" onclick=" ">CHANGE</button></div>` // yet to decide what to put for saved que, 
      document.getElementsByClassName('queContainer')[0].appendChild(div);    // I'll change this thing soon
  } 
  qCount = data.length; // updating the qcount for next adding ques.
  }
   else {
      localStorage.removeItem("data"); // if user clicks no then prev saved data is removed.
    }
  }
  }

function addQue(){  // this will add new question.
qCount++;
const mainQueBox = document.getElementsByClassName("queContainer")[0];
var newQue = document.createElement('div');
newQue.className = 'queDiv';
newQue.id = 'q'+qCount   // this is update with no issues later u can find QIdUpdate function 
newQue.innerHTML = ` <h3>Question ${qCount} </h3> 
<input id="que" type="text" placeholder="Type your Question here">
        <div class="opt"><input id="opt1"type="text" placeholder="option 1">
                           <input id="opt2"type="text" placeholder="option 2">
                           <input id="opt3"type="text" placeholder="option 3">
                           <input id="opt4"type="text" placeholder="option 4">
        <button id="opt">correct answer</button></div>
        <div id="last"><button id="save" onclick="saveQueBtn(this)">SAVE</button>
        <button id="del" onclick="delBeforeSave(this)">DELETE</button></div>`
mainQueBox.appendChild(newQue);}

function saveQueBtn(btn){       // questions are saved based on their index 
let parent = btn.closest('.queDiv');
let q = parent.querySelector('#que').value;
let op1 = parent.querySelector('#opt1').value;
let op2 = parent.querySelector('#opt2').value;
let op3 = parent.querySelector('#opt3').value;
let op4 = parent.querySelector('#opt4').value;
let correctIndex = prompt("Enter correct option number: ");
correctIndex=parseInt(correctIndex);
if(![1,2,3,4].includes(correctIndex)){
  alert("This is not a valid correct option.");
  return;
}
const question = new qAssignToArray(q,op1,op2,op3,op4,correctIndex); // this is a class constructor.
let s = getIndex(btn); // even when any questions are deleted nothing will be problem 
savedQue[s] = question; // coz everything will get updated but we have to optimize these update functions.
localStorage.setItem('data',JSON.stringify(savedQue)); 
}

function delBeforeSave(btn){  // we have to delete 2 things, from html and from localStorage.
  const questionDiv = btn.closest('.queDiv'); 
   let d = getIndex(btn);
    if (questionDiv) questionDiv.remove(); // this will only delete from queContainer
    update(savedQue,d); // when que is deleted indexes for question below the del que will change
    QIdUpdate(d); // so every que which has their index changed will be changed in savedQUe[] & Id will also changed
  qCount--;
}

function delAfterSave(btn){ // this is for ques that are saved in local stoarge
  const questionDiv = btn.closest('.queDiv'); 
   let d = getIndex(btn);
  if (questionDiv) questionDiv.remove();
   delete savedQue[d];
   update(savedQue,d);
   QIdUpdate(d);
   qCount--;
}

function qAssignToArray(q,op1,op2,op3,op4,correct){ // class constructor.
  this.q = q;
  this.op1 = op1;
  this.op2 = op2;
  this.op3 = op3;
  this.op4 = op4; 
  this.correct = correct
}

function QIdUpdate(d){ // this is for updating Id and que no. inside html tag
   const allQues = document.querySelectorAll('.queDiv'); // this function must be used after deleting questions.
   const len = Array.from(allQues).length;
   for(let i = d;i<len;i++){  // every que after the deleted question needs to be changed.
      let temp = document.getElementsByClassName('queDiv')[i];
      temp.id = 'q'+i+1;
      let h3 = temp.getElementsByTagName('h3')[0];
      h3.textContent = `Question ${i+1}`;
   }

}
function update(savedQue,d){ // this splice will make undefined for that d index and move 
     savedQue.splice(d,1);    // every element after it in one go.
     localStorage.setItem('data',JSON.stringify(savedQue));
   return savedQue;}

function getIndex(btn) {  // need this for everything, as index of the queDIv is needed.
  const queDiv = btn.closest('.queDiv');
  const allQues = document.querySelectorAll('.queDiv');
  const index = Array.from(allQues).indexOf(queDiv);
  return index;
}
function generateQuizLink() {
  if (savedQue.length === 0) {
    alert("Please save at least one question before generating a link.");
    return;
  }

  const quizId = 'quiz_' + Math.random().toString(36).substr(2, 9); // unique id
  localStorage.setItem(quizId, JSON.stringify(savedQue)); // store quiz

  const joinURL = `${location.origin}${location.pathname.replace("create.html", "join.html")}?id=${quizId}`;
  
  document.getElementById('quizLinkDisplay').innerHTML = `
    <p>Share this link to take the quiz:</p>
    <a href="${joinURL}" target="_blank">${joinURL}</a>`;
}

/* 1.savedQue is saved so many times its a burden we have to optimize 
   2.although i made a function for updating id i never used it anywhere.
     yet to find its use somewhere.
   3.delAfterSave is also not used but have to use after deciding things for saved questions.
   */

/* ------->>>>>>>> COMPLETED THINGS ARE ----
        (CHECKING IS NEEDED FOR DIFFERENT CASES IN ORDER TO NOT HAVE ANY DISPUTES B/W THEM)
        1.RELOADING OF PREV DATA. 
        2.ADDING QUESTIONS WITH QUESTION NUMBERS.
        3.SAVEING IN ORDER OF QUESTIONS DISPLAYED.
        4.DELETING ON SCREEN QUESTIONS & STORED QUESTIONS 
            */