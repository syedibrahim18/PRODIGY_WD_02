$(".stopwatch-btn").click(function () {
  $(".outer-wrapper > div").slideUp();
  $(".stopwatch").slideDown();
  $(".type").html("Stopwatch");
});
$(".timer-btn").click(function () {
  $(".outer-wrapper > div").slideUp();
  $(".timer").slideDown();
  $(".type").html("Timer");
});

const addTrailingZero = (num) => {
  return num < 10 ? "0" + num : num;
};

let stopwatchHours = 0,
  stopwatchMinutes = 0,
  stopwatchSeconds = 0,
  stopwatchMilliseconds = 0,
  stopwatchRunning = false,
  laps = 0,
  stopwatchInterval;

const stopwatch = () => {
  stopwatchMilliseconds++;
  if (stopwatchMilliseconds == 100) {
    stopwatchSeconds++;
    stopwatchMilliseconds = 0;
  }
  if (stopwatchSeconds == 60) {
    stopwatchMinutes++;
    stopwatchSeconds = 0;
  }
  if (stopwatchMinutes == 60) {
    stopwatchHours++;
    stopwatchMinutes = 0;
  }

  $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
  $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
  $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
  $("#stopwatch-ms").html(addTrailingZero(stopwatchMilliseconds));
};

const startStopwatch = () => {
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
  }
};

const stopStopwatch = () => {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
};

const resetStopwatch = () => {
  clearInterval(stopwatchInterval);
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMilliseconds = 0;
  stopwatchRunning = false;
  laps = 0;

  $("#stopwatch-hour").html("00");
  $("#stopwatch-min").html("00");
  $("#stopwatch-sec").html("00");
  $("#stopwatch-ms").html("00");
  $(".laps").html("");
};

$(".start-stopwatch").click(function () {
  startStopwatch();
  $(".start-stopwatch").hide();
  $(".lap-stopwatch").show();
  $(".pause-stopwatch").show();
});

$(".pause-stopwatch").click(function () {
  stopStopwatch();
  $(".pause-stopwatch").hide();
  $(".play-stopwatch").show();
});

$(".play-stopwatch").click(function () {
  startStopwatch();
  $(".pause-stopwatch").show();
  $(".play-stopwatch").hide();
});

$(".reset-stopwatch").click(function () {
  resetStopwatch();
  $(".start-stopwatch").show();
  $(".pause-stopwatch").hide();
  $(".lap-stopwatch").hide();
  $(".play-stopwatch").hide();
});

$(".lap-stopwatch").click(function () {
  laps++;
  $(".lap").removeClass("active");
  $(".laps").prepend(
    `<div class="lap active">
      <p>Lap ${laps}</p>
      <p>
        ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(
      stopwatchMinutes
    )} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
      stopwatchMilliseconds
    )}
      </p>
    </div>`
  );
});