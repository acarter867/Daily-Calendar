// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let dayTime = getDateTime();

  let displayCurrent = $('#currentDay');
  displayCurrent.text(dayTime)

  let hour = new Date();
  let currentHour = String('hour-' + String(hour.getHours()).padStart(2, 0));
  console.log(currentHour);
  console.log(dayTime);

  let mainDiv = $('.container-fluid');
  let hourBlocks = mainDiv.children('.row');


  for(let i = 0; i < hourBlocks.length; i++){
    let currentRow = hourBlocks[i];
    console.log(currentRow);
    let curDiv = $(currentRow);
    if(currentRow.id < currentHour){
      curDiv.addClass('past');
    }else if(currentRow.id > currentHour){
      curDiv.addClass('future');
    }else{
      curDiv.addClass('present');
    }

    
  }

//push events to local storage
  hourBlocks.children("button").on('click', (e) => {
      let buttonParent = $(e.target).parent();
      let divId = $(buttonParent).attr('id');
      let selectedText = $(buttonParent).children('textarea');
      let newEvent = selectedText.val();
      localStorage.setItem(divId, JSON.stringify(newEvent));
    })

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
});

function getDateTime(){
  //keep track of am/pm
  let am_pm = 'AM';

  //retrieve and format current date and time
  let currentDate = new Date();

  //convert month to string name instead of number
  let month = getMonth(currentDate.getMonth());

  let today = month + " " + currentDate.getDate() + ", " + currentDate.getFullYear();

  //retrieve hours and am/pm formatting
  let currentHours = currentDate.getHours();
  if(currentHours > 12){
    am_pm = 'PM';
    currentHours -= 12;
  }

  //retrieve minutes and format
  let currentMinutes = String(currentDate.getMinutes()).padStart(2, 0);
  let time = currentHours + ":" + currentMinutes + "" + am_pm;

  //return string of current formatted date and time
  return today + " - " + time;
}


//function to return name of month when given month numbers
function getMonth(something){
  switch(something){
    case 0: return 'January';
    case 1: return 'February';
    case 2: return 'March';
    case 3: return 'April';
    case 4: return 'May';
    case 5: return 'June';
    case 6: return 'July';
    case 7: return 'August';
    case 8: return 'September';
    case 9: return 'October';
    case 10: return 'November';
    case 11: return 'December';
  }
}


