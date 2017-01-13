$(function() {
  var MINUTES = 25
  var $clock = $('[data-behaviour~="clock"]')
  var sound = $('[data-behaviour~="clock-sound"]').get(0)
  var endTime = null
  var timeInterval = null

  var setup = function() {
    sound.play()
    sound.pause()
    var previousEndTime = !!localStorage.getItem("endTime") ? (new Date(localStorage.getItem("endTime"))) : null

    if (previousEndTime && previousEndTime > new Date()) {
      endTime = previousEndTime
      timeInterval = setInterval(updateClock, 1000)
    } else {
      reset()
    }
    $('#overlay').remove()
  }

  $('#overlay').click(setup)

  var updateClock = function() {
    $minutes = $clock.find('[data-behaviour~="minutes"]')
    $seconds = $clock.find('[data-behaviour~="seconds"]')

    var remainingTotal = Date.parse(endTime) - Date.parse(new Date())
    var remainingSeconds = Math.floor((remainingTotal / 1000) % 60)
    var remainingMinutes = Math.floor((remainingTotal / 1000 / 60) % 60)

    $minutes.html(('0' + remainingMinutes).slice(-2))
    $seconds.html(('0' + remainingSeconds).slice(-2))

    if (remainingTotal <= 0) {
      clearInterval(timeInterval)
      sound.play()
      timeInterval = null
    }
  }

  var reset = function() {
    clearInterval(timeInterval)
    timeInterval = null
    localStorage.removeItem("endTime");
    endTime = new Date(Date.parse(new Date()) + MINUTES * 60 * 1000)
    updateClock()
  }

  $('[data-behaviour~="clock-start"]').on('click', function() {
    if(timeInterval == null) {
      reset()
      localStorage.setItem("endTime", endTime);
      timeInterval = setInterval(updateClock, 1000)
    }
  })

  $('[data-behaviour~="clock-reset"]').on('click', function() {
    if (timeInterval == null || confirm("This will stop and reset the clock")) {
      reset()
    }
  })
})
