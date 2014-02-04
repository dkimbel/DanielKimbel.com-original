content = {
  currentDisplayed: null,
  changeDisplay: function(e) {
    if (e.target.id === content.currentDisplayed) {
      // do nothing
    } else {
      content.transition(e.target.id)
    }
  },
  transition: function(buttonPressedID) {
    $("#content").fadeOut(400, function() {
      content.changeHTML(buttonPressedID)
      $("#content").fadeIn()
    })
  },
  changeHTML: function(buttonPressedID) {
    var template = null
    if (buttonPressedID === "left") {
      template = "oh hai there"
    } else if (buttonPressedID === "center") {
      template = "well hello"
    } else if (buttonPressedID === "right") {
      template = "yeaaaaaaah"
    }
    $("#content").html(template)
  }
}