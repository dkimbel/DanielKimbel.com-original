largeNavButtons = {
  lastBackgroundColor: null,
  init: function() {
    $(".large-nav-button").hover(largeNavButtons.hoverOn, largeNavButtons.hoverOff)
    .click(content.changeDisplay)
  },
  hoverOn: function() {
    largeNavButtons.lastBackgroundColor = $(this).css("background")
    $(this).css("background", "blue")
  },
  hoverOff: function() {
    $(this).css("background", largeNavButtons.lastBackgroundColor)
  }
}