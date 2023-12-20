function toggleDetails(detailsId) {
  var details = document.getElementById(detailsId);
  if (details) {
    // Close other tabs
    var detailsIds = ["dj-details", "craft-details", "design-details", "language-details", "code-details", "video-details", "camera-details", "other-details"];
    detailsIds.forEach(function(id) {
      if (id !== detailsId) {
        var otherDetails = document.getElementById(id);
        if (otherDetails) {
          otherDetails.style.display = "none";
        }
      }
    });
    // Toggle the target details
    details.style.display = details.style.display === "none" ? "block" : "none";
  }
}

// Add click event listeners to each category element
function addCategoryClickListener(categoryId, detailsId) {
  var categoryElement = document.getElementById(categoryId);
  if (categoryElement) {
    categoryElement.addEventListener("click", function() {
      toggleDetails(detailsId);
    });
  }
}

// Attach the click event listeners for each category
addCategoryClickListener("dj", "dj-details");
addCategoryClickListener("craft", "craft-details");
addCategoryClickListener("design", "design-details");
addCategoryClickListener("language", "language-details");
addCategoryClickListener("code", "code-details");
addCategoryClickListener("video", "video-details");
addCategoryClickListener("camera", "camera-details");
addCategoryClickListener("other", "other-details");
