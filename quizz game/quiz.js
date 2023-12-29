function load_color(color = "#461A42", darker = "#3A1737") {
  document.getElementsByClassName("container")[0].style.backgroundColor = color;
  document.getElementById("dp").style.borderColor = color;
  document.getElementsByClassName("option")[0].style.backgroundColor = darker;
}
function set_dp() {
  let dp = document.getElementById("dp");
  let dp_img = localStorage.getItem("dp");
  dp.setAttribute("src", dp_img);
}
load_color();
set_dp();

const question_list = {};
const question_list_assist = [];
let correct_value = [];
let question_count = 0;
let user_answer = [];
let user_score = 0;
let past_score = 100;
function load_question(data = "") {
  data = localStorage.getItem(data);
  data = JSON.parse(data);
  let u = Object.keys(data);
  document.title = "QUIZ : " + data["title"];
  for (let i of u) {
    if (
      !i.includes("title") &&
      !i.includes("description") &&
      !i.includes("author") &&
      !i.includes("image") &&
      !i.includes("correct")
    ) {
      question_list_assist.push(i);
      question_list[i] = data[i];
    }
  }
  correct_value = data["correct"];
}
var background_audio = new Audio("m-0");
let background_audio_count = 0;
let audio;
function show_wrong_right_noti(correct) {
  if (correct == 1) {
    document.getElementsByClassName("gain")[0].style.display = "grid";
    setTimeout(() => {
      document.getElementsByClassName("gain")[0].style.display = "none";
    }, 1500);
  } else if (correct == 2) {
    document.getElementsByClassName("gain")[0].style.display = "grid";
    document.getElementsByClassName("gain")[0].children[0] = "+ (100 + 100)";
    setTimeout(() => {
      document.getElementsByClassName("gain")[0].children[0] = "+ 100";
      document.getElementsByClassName("gain")[0].style.display = "none";
    }, 1500);
  } else {
    document.getElementsByClassName("lose")[0].style.display = "grid";
    setTimeout(() => {
      document.getElementsByClassName("lose")[0].style.display = "none";
    }, 1500);
  }
}
function play_sound(sound) {
  background_audio.pause();
  audio = new Audio(sound);
  audio.play();
}
function shuffle_background_music() {
  background_audio.pause();
  if (background_audio_count > 3) {
    background_audio_count = 0;
  }
  background_audio = new Audio("m-" + background_audio_count + ".mp3");
  background_audio.play();
  background_audio_count += 1;
}
load_question(localStorage.getItem("now"));
let option_color = ["#2F6DAE", "#2C9CA6", "#ECA82C", "#D4546A"];
let steaks = 0;
let steak = document.getElementsByClassName("steaka");
// powerups
let power_up_time = 0;
let power_up_2x = 0;
let power_up_saver = 0;
let powerup_wait_screen = 0;

function color_options() {
  for (let i = option_color.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [option_color[i], option_color[j]] = [option_color[j], option_color[i]];
  }
  let option = document.getElementsByClassName("opt");
  for (let i in option) {
    try {
      option[i].style.backgroundColor = option_color[i];
    } catch {}
  }
}
function load_powerup() {}
color_options();
function upload_question() {
  shuffle_background_music();
  try {
    color_options();
    let question = document.getElementById("question");
    let option = document.getElementsByClassName("opt");
    question.textContent = question_list_assist[question_count];

    for (let i in option) {
      try {
        option[i].style.border = "0";
        option[i].style.opacity = "1";

        option[i].children[0].textContent =
          question_list[question_list_assist[question_count]][i];
      } catch {}
    }
    time(question_list[question_list_assist[question_count]][5]);
    question_count += 1;
  } catch {
    document.getElementsByClassName("end")[0].style.display = "block";
    play_sound("result.mp3");
    setTimeout(() => {
      document.getElementsByClassName("end")[0].style.display = "none";
      document.getElementsByClassName("container")[0].style.display = "none";
      document.getElementsByClassName("bottom")[0].style.display = "none";
      result_ques_creater();
      play_sound("res.wav");
    }, 2000);
  }
}
function check_answer(element) {
  clearInterval(timer);
  let option = document.getElementsByClassName("opt");
  let correct = correct_value[question_count - 1] - 1;
  document.getElementById("time").style.backgroundColor = "transparent";
  console.log(steaks);
  for (let i in option) {
    try {
      if (option[i] == element) {
        if (i == correct) {
          option[i].style.backgroundColor = "green";
          option[i].style.border = "4px solid white";
          user_answer.push(1);
          steaks += 1;
          user_score += past_score;
          if (power_up_2x == 1) {
            user_score += past_score;
            power_up_2x = 0;
            show_wrong_right_noti(2);
          } else {
            show_wrong_right_noti(1);
          }
          play_sound("correct.wav");
          if (steaks > 1) {
            setTimeout(() => {
              play_sound("power.wav");
              next_powerup();
            }, 2000);
          }
          document.getElementById("score-d").textContent = user_score;
        } else {
          option[i].style.backgroundColor = "red";
          option[i].style.border = "4px solid white";
          user_answer.push(0);
          play_sound("wrong.wav");
          user_score -= 50;
          if (power_up_saver == 1) {
            user_score += 50;
            power_up_saver = 0;
          }
          steak[0].style.display = "none";
          steak[1].style.display = "none";
          steak[2].style.display = "none";
          steaks = 0;
          show_wrong_right_noti(0);

          document.getElementById("score-d").textContent = user_score;
        }
      } else {
        if (i == correct) {
          option[i].style.backgroundColor = "green";
          option[i].style.animation = "correction .5s linear";
          setTimeout(() => {
            option[i].style.animation = "none";
          }, 2000);
        } else {
          option[i].style.opacity = "0";
        }
      }
    } catch {}
  }
  if (steaks > 2) {
    // unlock the poweerups
    steaks = 0;
    steak[0].style.display = "none";
    steak[1].style.display = "none";
    steak[2].style.display = "none";
  } else if (steaks > 1) {
    steak[2].style.display = "block";
  } else if (steaks > 0) {
    steak[1].style.display = "block";
  } else {
    steak[0].style.display = "block";
  }
  if (steaks < 2) {
    setTimeout(() => {
      if (powerup_wait_screen == 0) {
        upload_question();
      }
    }, 2000);
  }
}
function set_option_click_next_remove_this_later() {
  let option = document.getElementsByClassName("opt");

  for (let i in option) {
    try {
      option[i].addEventListener("click", () => {
        check_answer(option[i]);
      });
    } catch {}
  }
}
var timer;
function time(time) {
  let top = document.getElementById("time");
  top.style.backgroundColor = "#adb5bd";
  let width = 100;
  clearInterval(timer);
  timer = setInterval(() => {
    if (width <= 0) {
      document.getElementsByClassName("time")[0].style.display = "block";
      user_answer.push(2);
      play_sound("skip.wav");
      setTimeout(() => {
        document.getElementsByClassName("time")[0].style.display = "none";
        upload_question();
      }, 2500);
      clearInterval(timer);
    } else if (width > 60 && width < 75) {
      top.style.backgroundColor = "green";
    } else if (width > 40 && width < 75) {
      top.style.backgroundColor = "yellow";
    } else if (width > 0 && width < 75) {
      top.style.backgroundColor = "red";
    }
    top.style.width = width + "%";
    width -= 100 / time / 20;
  }, 50);
}

let powerups = {};
let powerups_count = 0;
let powerup_img = ["time.png", "2x.png", "saver.png"];
let powerup_text = [
  "You can use this powerup to freeze the time.",
  "You will get 2x points on Correct Answer",
  "This will save you from deduction of points on wrong answer",
];
let message = document.getElementsByClassName("message")[0];
function call_msg(title, msg, bgcolor) {
  message.style.display = "flex";
  message.style.backgroundColor = bgcolor;
  message.children[0].textContent = title;
  message.children[1].textContent = msg;

  setTimeout(() => {
    message.style.display = "none";
  }, 1500);
}
function call_power_up(value) {
  let valued = parseInt(value.getAttribute("val"));
  switch (valued) {
    case 0:
      clearInterval(timer);
      background_audio.pause();
      call_msg("Power Up", powerup_text[valued], "cyan");

      break;
    case 1:
      power_up_2x = 1;
      call_msg("Power Up", powerup_text[valued], "purple");
      break;
    case 2:
      call_msg("Power Up", powerup_text[valued], "green");
      power_up_saver = 1;
      break;
    default:
      break;
  }
  powerups_count -= 1;
  value.setAttribute("val", "");
}
function change_power_up(value) {
  value = parseInt(value);
  let u = document.getElementsByClassName("power-ele");

  u[0].setAttribute("src", powerup_img[value]);
  u[1].textContent = powerup_text[value];
  for (let i = 0; i <= 2; i++) {
    if (powerups[i][2] == 0) {
      powerups[i][0].setAttribute("src", powerup_img[value]);
      powerups[i][0].setAttribute("click", "1");
      powerups[i][0].setAttribute("val", value);
      powerups[i][2] = 1;
      break;
    }
  }
  document.getElementsByClassName("power")[0].style.display = "grid";
  setTimeout(() => {
    document.getElementsByClassName("power")[0].style.display = "none";
    upload_question();
  }, 3500);
}
function just_load_powerup() {
  // shoudl  be run only once
  let power = document.getElementsByClassName("power-img");
  for (let i = 0; i <= 2; i++) {
    powerups[i] = [power[i], "powerupnull.png", 0];
    power[i].addEventListener("click", () => {
      if (power[i].getAttribute("click") == "1") {
        call_power_up(powerups[i][0]);
        power[i].setAttribute("click", "0");
        power[i].parentElement.style.animation = "power .5s linear";
        setTimeout(() => {
          power[i].parentElement.style.animation = "none";

          power[i].setAttribute("src", "powerupnull.png");
        }, 500);
      }
    });
  }
}
just_load_powerup();

function next_powerup() {
  if (powerups_count < 2) {
    let j = Math.floor(Math.random() * 3);
    change_power_up(j);
    powerups_count += 1;
  }
}

// upload_question();
set_option_click_next_remove_this_later();

let full = document.getElementById("full");
full.addEventListener("click", () => {
  if (full.getAttribute("ok").includes("0")) {
    document.documentElement.requestFullscreen();
    full.setAttribute("ok", "1");
  } else {
    document.exitFullscreen();
    full.setAttribute("ok", "0");
  }
});

let result_element = document.getElementsByClassName("result")[0];
function create_result_ques(question, option, correct) {
  var navElement = document.createElement("nav");

  // Create an h1 element with the specified class and text content
  var h1Element = document.createElement("h3");
  h1Element.className = "result-ques";
  h1Element.textContent = question;

  // Create an hr element
  var hrElement = document.createElement("hr");

  // Create a div element
  var divElement = document.createElement("div");

  // Create and append four p elements with the specified class and text content to the div
  for (var i = 0; i <= 3; i++) {
    var pElement = document.createElement("p");
    pElement.className = "result-opt";
    pElement.textContent = option[i];
    divElement.appendChild(pElement);
  }

  if (correct == 0) {
    navElement.style.borderColor = "red";
  } else if (correct == 2) {
    navElement.style.borderColor = "orange";
  } else {
    navElement.style.borderColor = "green";
  }
  // Append the h1, hr, and div elements to the navigation element
  navElement.appendChild(h1Element);
  navElement.appendChild(hrElement);
  navElement.appendChild(divElement);

  result_element.appendChild(navElement);
}
function result_ques_creater() {
  for (let i = 0; i < question_count; i++) {
    create_result_ques(
      question_list_assist[i],
      question_list[question_list_assist[i]],
      user_answer[i]
    );
  }
  let scope_a = document.getElementsByClassName("scope-a");
  let total = 0;
  let cor = 0;
  user_answer.forEach((ans) => {
    if (ans == 0) {
      scope_a[1].textContent = parseInt(scope_a[1].textContent) + 1;
    } else if (ans == 1) {
      scope_a[0].textContent = parseInt(scope_a[0].textContent) + 1;
      cor += 1;
    } else if (ans == 2) {
      scope_a[2].textContent = parseInt(scope_a[2].textContent) + 1;
    }
    total += 1;
  });
  document.getElementById("score").textContent = user_score;
  document.getElementById("acc").style.width = (cor / total) * 100 + "%";
}

document.getElementById("back").addEventListener("click", () => {
  // location.href = "home.html";
  location.replace('home.html')
});

function counter() {
  let count = document.getElementById("counting");
  let c = 3;
  setTimeout(() => {
    play_sound("countdown.wav");
  }, 1000);
  let count_load = setInterval(() => {
    count.textContent = c;
    c -= 1;
  }, 1000);
  setTimeout(() => {
    clearInterval(count_load);
    document.getElementsByClassName("start")[0].style.display = "none";
    upload_question();
  }, 4800);
}
counter();
