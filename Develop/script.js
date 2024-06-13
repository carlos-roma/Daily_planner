$(document).ready(function () {
  const currentHour = dayjs().hour(); // Get the current hour using dayjs
  const container = $('.container-fluid'); // Main container to add time blocks
  const currentDayElement = $('#currentDay'); // Get the current day element

  // Function to update current day and time
  function updateCurrentDay() {
    const now = dayjs();
    const formattedDateTime = now.format('dddd, MMMM D, YYYY h:mm:ss A');
    currentDayElement.text(formattedDateTime);
  }

  // Update the current day 
  updateCurrentDay();

  // Update  every second
  setInterval(updateCurrentDay, 1000);

  // time blocks
  function createTimeBlock(hour) {
    const hourText = dayjs().hour(hour).format('hA'); // Hours format
    const timeBlock = $('<div>').addClass('row time-block').attr('id', `hour-${hour}`);
    const hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hourText);
    const textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);
    const button = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');

    // classifying hour into proper category
    if (hour < currentHour) {
      timeBlock.addClass('past');
    } else if (hour === currentHour) {
      timeBlock.addClass('present');
    } else {
      timeBlock.addClass('future');
    }

    // Load saved data from local storage
    const savedText = localStorage.getItem(`hour-${hour}`);
    if (savedText) {
      textArea.val(savedText);
    }

    // Append elements to the time block
    timeBlock.append(hourDiv, textArea, button);

    // Event listener to the button
    button.on('click', function () {
      const text = textArea.val();
      localStorage.setItem(`hour-${hour}`, text);
      console.log(`"${text}" saved to local storage`);
    });

    return timeBlock;
  }

  // Generate time blocks
  for (let hour = 9; hour <= 17; hour++) {
    container.append(createTimeBlock(hour));
  }
});
