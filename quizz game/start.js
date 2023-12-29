heading_element = document.getElementById("heading");
let time = 0;
setInterval(() => {
  if (time == 1) {
    heading_element.style.color = "#9D468E";
  } else if (time == 2) {
    heading_element.style.color = "#EFA929";
  } else if (time == 3) {
    heading_element.style.color = "#D5546D";
  } else {
    time = 0;
    heading_element.style.color = "#2D9DA6";
  }
  time += 1;
}, 3000);

var elementTarget = document.getElementById("tab");
var elementTarget_main = document.getElementsByClassName("tab-dub")[0];
var container = document.getElementsByClassName("container")[0];
let elementTarget_offset = elementTarget.offsetTop;
let element_tab = document.getElementsByClassName("tab-1");
let tab_tab = document.getElementsByClassName("tab-tab");
let right_img = document.getElementsByClassName("right-img");
console.log(right_img[0]);
function remove_tab_color() {
  tab_tab[0].setAttribute("class", "tab-tab");
  tab_tab[1].setAttribute("class", "tab-tab");
  tab_tab[2].setAttribute("class", "tab-tab");
  right_img[0].style.animation = "none";
  right_img[1].style.animation = "none";
  right_img[2].style.animation = "none";
}
function apply_right_img_style(num) {
  right_img[num].style.animation = "tab-img 1s linear";
  right_img[num].style.opacity = "1";
}
function remove_right_img_style(num) {
  right_img[num].style.animation = "tab-img-rem 1s linear";
  right_img[num].style.opacity = "0";
}
function color_tab(num) {
  remove_tab_color();
  if (num == 0) {
    tab_tab[0].setAttribute("class", "tab-tab active");
    apply_right_img_style(0);
    remove_right_img_style(1);
    remove_right_img_style(2);
  } else if (num == 1) {
    tab_tab[1].setAttribute("class", "tab-tab active");
    remove_right_img_style(0);
    apply_right_img_style(1);
    remove_right_img_style(2);
  } else if (num == 2) {
    tab_tab[2].setAttribute("class", "tab-tab active");
    remove_right_img_style(0);
    remove_right_img_style(1);
    apply_right_img_style(2);
  }
}
setInterval(() => {
  if (
    container.scrollTop > elementTarget_offset &&
    container.scrollTop <
      element_tab[2].offsetTop + element_tab[2].clientHeight - 150
  ) {
    elementTarget_main.style.opacity = "1";
    if (
      container.scrollTop >
      element_tab[2].offsetTop - element_tab[2].clientHeight / 2
    ) {
      color_tab(2);
    } else if (
      container.scrollTop >
      element_tab[1].offsetTop - element_tab[1].clientHeight / 2
    ) {
      color_tab(1);
    } else if (
      container.scrollTop >
      element_tab[0].offsetTop - element_tab[0].clientHeight / 2
    ) {
      color_tab(0);
    }
  } else {
    // elementTarget_main.style.display = "none";
    elementTarget_main.style.opacity = "0";
  }
  // console.log(window.scrollY);
  // console.log("e");
}, 300);

function click_tabs(num) {
  container.scrollTo(
    0,
    element_tab[num].offsetTop - element_tab[num].clientHeight / 2.5
  );
}
tab_tab[0].addEventListener("click", () => {
  click_tabs(0);
});
tab_tab[1].addEventListener("click", () => {
  click_tabs(1);
});
tab_tab[2].addEventListener("click", () => {
  click_tabs(2);
});

function sign_up() {
  // location.href = "/signup.html";
  location.replace("signup.html");
}
function log_in() {
  // location.href = "/login.html";
  location.replace("login.html");
}
