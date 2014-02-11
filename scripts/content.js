content = {
  $lastButtonPressed: null,
  somethingAlreadyDisplayed: false,

  displayClicked: function(e) {
    var buttonClicked = e.target
    if (this.somethingAlreadyDisplayed && $(buttonClicked).attr("class") === this.$lastButtonPressed.attr("class")) {
      // do nothing
    } else {
      this.$lastButtonPressed = $(buttonClicked)
      this.transition()
    }
  },

  transition: function() {
    if (this.somethingAlreadyDisplayed) {
      $("#content").fadeOut(600, function() {
        hash.change(600, hash.inferNext())
      })
    } else {
      this.somethingAlreadyDisplayed = true
      hash.change(1000, hash.inferNext())
    }
  },

  addAndRevealNew: function(fadeTime, template) {
    var template = typeof(template) !== undefined ? template : this.getTemplate()
    this.changeHTML(template)
    this.reveal(fadeTime)
  },

  changeHTML: function(template) {
    $("#content").html(template.html())
  },

  reveal: function(fadeTime) {
    if (fadeTime >= 1000) {
      setTimeout(function() {
        $("#content").fadeIn(fadeTime)
      }, 300)
    } else {
      $("#content").fadeIn(fadeTime)
    }
  },

  getTemplate: function() {
    if (content.$lastButtonPressed.hasClass("left")) {
      return $("#about")
    } else if (content.$lastButtonPressed.hasClass("center")) {
      return $("#project")
    } else if (content.$lastButtonPressed.hasClass("right")) {
      return $("#resume")
    }
  },

  clear: function() {
    $("#content").fadeOut(600, function() {
      $("#content").html('')
      hash.remove()
    })
    content.$lastButtonPressed = null
    content.somethingAlreadyDisplayed = false
  },

  fastClear: function() {
    $("#content").css("display","none")
    $("#content").html('')
    content.$lastButtonPressed = null
    content.somethingAlreadyDisplayed = false
  },

  fastReveal: function(template) {
    content.changeHTML(template)
    if (hash.notBlank()) {
      content.somethingAlreadyDisplayed = true
      $("#content").css("display","block")
      content.$lastButtonPressed = content.inferLastButtonPressed()
    }
  },

  inferLastButtonPressed: function() {
    var currHash = hash.get()
    var index
    if (currHash === '#about') {
      index = 0
    } else if (currHash === '#project') {
      index = 1
    } else if (currHash === '#resume') {
      index = 2
    }
    return $($('.large-nav-button')[index])
  }
}