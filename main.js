document.querySelector('.start span').addEventListener('click',()=>{
    document.querySelector('.start').style.display = 'none';
})
// set the letters container
let alpha = "abcdefghijklmnopqrstuvwxyz0123456789+#";
let letters_array = Array.from(alpha);
letters_array.forEach(letter=>{
    // create main span
    let span = document.createElement('span');
    // create textnode for the main span
    let textSpan = document.createTextNode(letter);
    // append the test in the main span
    span.appendChild(textSpan);
    // give for main span class name
    span.className = 'letter-box';
    // append main span in the container
    document.querySelector(".letters").appendChild(span);
});
// create object contain all my categories and its value

let mycategories = {
    programming:['Javascript','Python','C++','C#','Java','Php','Fortron','Kotlin','Kamel','Swift','Bascal'],
    colors:['Red','Green','Blue','Black','Orange','White','Yellow','Pink','Brown'],
    foods:['Meat','Chicken','Rice','Soap','Pizza','Tomato','Potato'],
    tecnologies:['Back end','Front end','Data analisys','Cyber security','Artificial intelegance','Embeded system'],
    countries:['Egypt','Souria','Palestine','Qater','Soudi aribia','Bahreen','Oman','Libia'],
    string_numbers:['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Twenty','Hundred','Fifty','Fourty','Threety'],
    numbers:['0','1','2','3','4','5','6','7','8','9']
}
let key = Object.keys(mycategories);
// get the index of key with random way
let randow_key_index = Math.floor(Math.random() * key.length);
// get the name of key with random way
let randow_key_name = key[randow_key_index];
// get the random value of the random_key_name
let random_key_name_values = mycategories[randow_key_name];
// get the random index in random key_name_values
let random_key_name_name_index = Math.floor(Math.random()* random_key_name_values.length);
// get the random value in random index key_name_values  (the name of it)
let random_key_name_values_index_value = random_key_name_values[random_key_name_name_index];
// get the container info of category and put the cagegory name in it
document.querySelector('.info_category span').innerHTML  = randow_key_name;
// Create the letters guess of the random word
let letersandSpace = Array.from(random_key_name_values_index_value);
letersandSpace.forEach(letter=>{
    //create span for each letter
    let letter_span = document.createElement('span');
    if(letter == ' ')
    {
        // give class name for letter space
        letter_span.className = 'space';
    }
    // append the span in the container 
    document.querySelector(".letters_guess").appendChild(letter_span);
})
// variable for attempts
let attempts = 0;
//set the variables of hangman
let full_draw = document.querySelector('.the_draw');
// header of draw
let header = document.querySelector('.header');
// the stand of the draw
let stand = document.querySelector('.the_stand');
// the hang of the draw
let hang = document.querySelector('.the_hang');
// the rope of the draw
let rope = document.querySelector('.rope');
// the head of the draw
let head = document.querySelector('.head');
// the body of the draw
let body = document.querySelector('.body');
// the hands of the draw
let hands = document.querySelector('.hands');
// the legs of the draw
let legs = document.querySelector('.legs');
// set the hangman 
let hangmanDraw = document.querySelector('.hangman_draw');
// set the all spans of the chosen word
let allspans = document.querySelectorAll('.letters_guess span');
  // make an empty array to put in it the values of the all spans
  let new_array= [];
// get the letter on click
document.addEventListener('click',(clicked_letter)=>{
    // create the status variable
    let Thestatus = false;
    if(clicked_letter.target.className  == 'letter-box')
    {
        clicked_letter.target.classList.add('clicked');
    
    // set the clicked letter in variable
    let click_letter = clicked_letter.target.innerHTML;
    // get the word array
    letersandSpace.forEach((chosen_letter,index)=>{
        if(click_letter == chosen_letter.toLowerCase())
        {
            allspans[index].innerHTML = chosen_letter;
            // push the value of the correct letter in new array
            new_array.push(allspans[index].innerHTML);
            // set the status variable true
            Thestatus = true;
        }
    })
        // if wrong letter
        if(Thestatus == false)
        {
        // increase the attempts
        attempts++;
        // give the class if the wrong letter
        hangmanDraw.classList.add(`wrong${attempts}`);
        // play the audio of mistake
        document.getElementById('fail').play();
          if(attempts == 11)
          {
                    // add class to stop clicking on letters box
                    document.querySelector('.letters').classList.add("disabled");
                    // call the function that end the game
                    endgame();
                    document.querySelector('.score').style.display='block';
                    document.querySelector('.score span').innerHTML += localStorage.value;
                    // check if the score inner not equal any value 
                    if(document.querySelector('.score span').innerHTML == 'undefined')
                    {
                        // put 0 in it
                        document.querySelector('.score span').innerHTML = 0
                    }
                    setTimeout(()=>{
                        location.reload();
                        // clear the localstortage after the score
                        localStorage.clear();
                    },3000);
          }
        }
        else
        {
            document.getElementById('success').play();
        }
        if(new_array.join('') == random_key_name_values_index_value)
        {
            document.getElementById('good').play();
            // check if localstortage is empty or no
            if(localStorage.value == null)
            {
                // add to localstortage 10
                localStorage.setItem('value',10)
            }
            else
            {
                // increade localstortage in each step by 10
               localStorage.setItem('value',parseInt(localStorage.value) + 10);
            }
            // show the layput of success
           document.querySelector('.success').style.display='block';
           // onclick the span continue
           document.querySelector('.success span').addEventListener('click',()=>{
            // making reload after success
            location.reload();
           })
        }
        }
})
// create function end game
function endgame()
{
    document.querySelector('.fail').style.display ='block';
}