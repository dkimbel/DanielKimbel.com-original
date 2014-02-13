largeNavButtons = {
  lastHoveredClass: null,
  lastColor: null,
  lastTouchedColor: null,
  $lastButtonTouched: null,
  $lastAssociatedShadows: null,
  animationClasses: ["rotate-fast", "rotate-medium", "rotate-slow"],

  init: function() {
    $(".large-nav-button").hover(this.hoverOn.bind(this), this.hoverOff.bind(this))
    .click(content.displayClicked.bind(content))
    .click(this.brieflyExpandAllBorders.bind(this))
    .on('touchstart', this.handleTouch.bind(this))
  },

  brieflyExpandAllBorders: function() {
    for (i in this.$lastAssociatedShadows) {
      var currShadow = this.$lastAssociatedShadows[i]
      this.brieflyExpandBorders(currShadow)
    }
  },

  brieflyExpandBorders: function(currShadow) {
    var animateTime = 200
    if (currShadow.hasClass('one')) {
      currShadow.animate({'height':'172px', 'width':'172px', 'border-width':'10px'}, animateTime, function() {
        currShadow.animate({'height':'182px', 'width':'182px', 'border-width':'5px'}, animateTime)
      })
    } else if (currShadow.hasClass('two')) {
      currShadow.animate({'height':'156px', 'width':'156px', 'border-width':'18px'}, animateTime, function() {
        currShadow.animate({'height':'174px', 'width':'174px','border-width':'9px'}, animateTime)
      })
    } else if (currShadow.hasClass('three')) {
      currShadow.animate({'height':'136px', 'width':'136px', 'border-width':'28px'}, animateTime, function() {
        currShadow.animate({'height':'164px', 'width':'164px', 'border-width':'14px'}, animateTime)
      })
    }
  },

  hoverOn: function(e) {
    var targetButton = e.target
    this.lastHoveredClass = this.getLastHoveredClass(targetButton)
    this.lastColor = this.getLastColor(targetButton)
    $(targetButton).css("background", "transparent")
    this.$lastAssociatedShadows = this.getAssociatedShadows()
    this.toggleAppearances()
  },

  hoverOff: function(e) {
    var targetButton = e.target
    $(targetButton).css("background", this.lastColor)
    this.toggleAppearances()
  },

  toggleAppearances: function() {
    for (i in this.$lastAssociatedShadows) {
      var currShadow = this.$lastAssociatedShadows[i]
      currShadow.toggleClass('hidden')
      currShadow.toggleClass(this.animationClasses[i])
    }
  },

  getLastHoveredClass: function(targetButton) {
    var classes = $(targetButton).attr("class").split(" ")
    for (var i in classes) {
      if (classes[i] === "left" || classes[i] === "center" || classes[i] === "right") {
        return classes[i]
      }
    }
  },

  getLastColor: function(targetButton) {
    return $(targetButton).css("background")
  },

  getLastTouchedColor: function() {
    return this.$lastButtonTouched.css("background")
  },

  getAssociatedShadows: function() {
    var shadows = $(".shadow")
    var associatedShadows = []
    for (var i = 0; i < shadows.length; i++) {
      if ($(shadows[i]).hasClass(this.lastHoveredClass)) {
        associatedShadows.push($(shadows[i]))
      }
    }
    return associatedShadows
  },

  handleTouch: function(e) {
    this.$lastButtonTouched = $(e.target)
    this.lastTouchedColor = this.getLastTouchedColor()
    e.preventDefault()
    this.flashTouchedColor()
    this.$lastButtonTouched.trigger('click')
  },

  flashTouchedColor: function() {
    this.$lastButtonTouched.css('background','#eee')
    setTimeout(function() {
      largeNavButtons.$lastButtonTouched.css('background',largeNavButtons.lastTouchedColor)
    }, 100)
  }
}