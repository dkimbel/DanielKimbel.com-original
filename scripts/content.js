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

  clear: function() {
    $("#content").fadeOut(600, function() {
      $("#content").html('')
      hash.remove()
    })
  },

  fastClear: function() {
    $("#content").css("display","none")
    $("#content").html('')
    this.$lastButtonPressed = null
    this.somethingAlreadyDisplayed = false
  },

  fastReveal: function(template) {
    this.changeHTML(template)
    if (hash.notBlank()) {
      this.somethingAlreadyDisplayed = true
      $("#content").css("display","block")
      this.$lastButtonPressed = this.inferLastButtonPressed()
    }
  },

  inferLastButtonPressed: function() {
    var currHash = hash.get()
    var index
    if (currHash === '#about') {
      index = 0
    } else if (currHash === '#portfolio') {
      index = 1
    } else if (currHash === '#resume') {
      index = 2
    }
    return $($('.large-nav-button')[index])
  }
}