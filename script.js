
$(function () {

  // Create an array of objects representing each hour block in a day

  var timeBlocks = [
    { hour: 1, label: "1AM"},
    { hour: 2, label: "2AM"},
    { hour: 3, label: "3AM"},
    { hour: 4, label: "4AM"},
    { hour: 5, label: "5AM"},
    { hour: 6, label: "6AM"},
    { hour: 7, label: "7AM"},
    { hour: 8, label: "8AM"},
    { hour: 9, label: "9AM"},
    { hour: 10, label: "10AM"},
    { hour: 11, label: "11AM"},
    { hour: 12, label: "12AM"},
    { hour: 13, label: "1PM"},
    { hour: 14, label: "2PM"},
    { hour: 15, label: "3PM"},
    { hour: 16, label: "4PM"},
    { hour: 17, label: "5PM"},
    { hour: 18, label: "6PM"},
    { hour: 19, label: "7PM"},
    { hour: 20, label: "8PM"},
    { hour: 21, label: "9PM"},
    { hour: 22, label: "10PM"},
    { hour: 23, label: "11PM"},
    { hour: 24, label: "12PM"},
  ];

  // Get the container where the time blocks will be added

  var timeBlocksContainer = document.getElementById("time-block");

  // Create each time block by looping through the timeBlocks array and appending elements to the DOM

  timeBlocks.forEach(function(timeBlock) {
    var timeBlockEl = document.createElement("div");
    timeBlockEl.classList.add("row", "time-block");
    timeBlockEl.id = "hour-" + timeBlock.hour;

    var timeEl = document.createElement("div");
    timeEl.classList.add("col-2", "col-md-1", "hour", "text-center", "py-3");
    timeEl.textContent = timeBlock.label;
    timeBlockEl.appendChild(timeEl);

    var descriptionEl = document.createElement("textarea");
    descriptionEl.classList.add("col-8", "col-md-10", "description");
    timeBlockEl.appendChild(descriptionEl);

    var saveBtnEl = document.createElement("button");
    saveBtnEl.classList.add("btn", "saveBtn", "col-2", "col-md-1");
    saveBtnEl.innerHTML = '<i class="far fa-save"></i>';
    timeBlockEl.appendChild(saveBtnEl);

    timeBlocksContainer.appendChild(timeBlockEl);
  });

  // When the save button is clicked, save the text in the corresponding description field to local storage

  $(".saveBtn").on("click", function () {
    var text = $(this).siblings(".description").val();
    var timeBlockId = $(this).closest(".time-block").attr("id");
    localStorage.setItem(timeBlockId, text);
    console.log("I've been clicked!");
  });

  // Function to update the background color of each time block based on the current time

  function updateHourlyBlocks() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
      if(timeBlockHour < currentHour) {
        $(this).addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var savedText = localStorage.getItem(timeBlockId);
    if(savedText !== null) {
      $(this).find(".description").val(savedText);
    }
  });

  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  setInterval(updateHourlyBlocks, 15 * 60 * 1000);

  updateHourlyBlocks();
});
