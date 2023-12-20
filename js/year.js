// Function to toggle details for each year
function toggleYearDetails(yearId) {
  var yearDetails = document.getElementById("description-" + yearId);
  var eventElement = document.getElementById("event-" + yearId);
  if (yearDetails && eventElement) {
    // Close other tabs
    var yearIds = ["1997", "2013", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];
    yearIds.forEach(function(id) {
      if (id !== yearId) {
        var otherYearDetails = document.getElementById("description-" + id);
        var otherEventElement = document.getElementById("event-" + id);
        if (otherYearDetails && otherEventElement) {
          otherYearDetails.style.display = "none";
          // Reset event styles for other years
          otherEventElement.style.backgroundColor = "";
        }
      }
    });
    // Toggle the target year details
    yearDetails.style.display = "block";
    // Highlight the event for the selected year
    eventElement.style.backgroundColor = "#fff";
    eventElement.style.boxShadow = "0 0 5px 0 #000";
  }
}

// Function to handle hover event for each year
function handleYearHover(yearId) {
  var yearElement = document.getElementById("year-" + yearId);
  var eventElement = document.getElementById("event-" + yearId);
  if (yearElement && eventElement) {
    yearElement.addEventListener("mouseover", function() {
      toggleYearDetails(yearId);
    });

    yearElement.addEventListener("mouseout", function() {
      // Hide details on mouseout
      var yearDetails = document.getElementById("description-" + yearId);
      if (yearDetails) {
        yearDetails.style.display = "none";
      }
      // Reset event styles on mouseout
      eventElement.style.backgroundColor = "";
      eventElement.style.backgroundColor = "#000";
      eventElement.style.boxShadow = "none";
    });

    eventElement.addEventListener("mouseover", function() {
      // Trigger year hover effect
      yearElement.dispatchEvent(new Event("mouseover"));
    });

    eventElement.addEventListener("mouseout", function() {
      // Trigger year mouseout effect
      yearElement.dispatchEvent(new Event("mouseout"));
      
    });
  }
}

// Attach the hover event listeners for each year
document.addEventListener("DOMContentLoaded", function() {
  handleYearHover("1997");
  handleYearHover("2013");
  handleYearHover("2017");
  handleYearHover("2018");
  handleYearHover("2019");
  handleYearHover("2020");
  handleYearHover("2021");
  handleYearHover("2022");
  handleYearHover("2023");
});
