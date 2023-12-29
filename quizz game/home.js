let cut = document.getElementById("cut");
let show_data = document.getElementsByClassName("show-data")[0];
let dark = document.getElementsByClassName("dark")[0];
let quiz = document.getElementsByClassName("data")[0];
document.getElementById("play-now").addEventListener("click", () => {
  localStorage.setItem("now", show_data.getAttribute("now"));
  // location.href = "quiz.html";
  location.replace("quiz.html");
});

cut.addEventListener("click", () => {
  show_data.style.display = "none";
  dark.style.display = "none";
});
function show_quiz(title, name, desc, num) {
  show_data.style.display = "block";
  dark.style.display = "block";
  let show_item = document.getElementsByClassName("show-item");
  show_item[2].textContent = title;
  show_item[3].textContent = name;
  show_item[4].textContent = desc;
  show_data.setAttribute("now", num);
}

function add_data(
  title = "Quiz name",
  desc = "0",
  author = "pranay",
  quiz_num = "quiz-0",
  image = "dark.webp",
  question = "MCQ Qs"
) {
  var quizDiv = document.createElement("div");
  quizDiv.className = "quiz quizes";
  quizDiv.setAttribute("val", quiz_num);

  // Create nav element
  var navElement = document.createElement("nav");

  // Create img element with src attribute
  var imgElement = document.createElement("img");
  imgElement.src = image;

  // Create p element with text content "10 Qs"
  var pElement = document.createElement("p");
  pElement.textContent = question;

  // Append img and p elements to nav element
  navElement.appendChild(imgElement);
  navElement.appendChild(pElement);

  // Create h1 element with text content "Quiz Name"
  var h1Element = document.createElement("h1");
  h1Element.textContent = title;

  // Create h2 element with text content "By pranay"
  var h2Element = document.createElement("h2");
  h2Element.textContent = "By " + author;

  // Create a element
  var aElement = document.createElement("a");

  // Create span element with text content "75% accuracy"
  var spanElement = document.createElement("p");
  spanElement.textContent = desc;

  // Append span element to a element
  aElement.appendChild(spanElement);

  // Append nav, h1, h2, and a elements to quizDiv
  quizDiv.appendChild(navElement);
  quizDiv.appendChild(h1Element);
  quizDiv.appendChild(h2Element);
  quizDiv.appendChild(aElement);

  quizDiv.addEventListener("click", () => {
    show_quiz(title, author, desc, quiz_num);
  });

  quiz.appendChild(quizDiv);
}

let get_data_list = [
  "quiz-1",
  "quiz-2",
  "quiz-3",
  "quiz-4",
  "quiz-5",
  "quiz-6",
  "quiz-7",
  "quiz-8",
  "quiz-9",
  "quiz-10",
];
let data = [];
for (let i of get_data_list) {
  let content = localStorage.getItem(i);
  if (content != null && content.includes(";;;")) {
    let data_list = JSON.parse(content);
    if (data_list["image"] == null) {
      add_data(
        data_list["title"],
        data_list["description"],
        data_list["author"],
        i
      );
    } else {
      add_data(
        data_list["title"],
        data_list["description"],
        data_list["author"],
        i,
        data_list["image"]
      );
    }
  } else {
    break;
  }
}

document.getElementsByClassName("create")[0].addEventListener("click", () => {
  // location.href = "create.html";
  location.replace('create.html')
});

let feature = document.getElementsByClassName("feature")[0];
function feature_coming_soon() {
  feature.style.display = "block";
}

feature.addEventListener("click", () => {
  feature.style.display = "none";
});
