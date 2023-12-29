let container = document.getElementsByClassName("container")[0];

const pSBC = (p, c0, c1, l) => {
  let r,
    g,
    b,
    P,
    f,
    t,
    h,
    i = parseInt,
    m = Math.round,
    a = typeof c1 == "string";
  if (
    typeof p != "number" ||
    p < -1 ||
    p > 1 ||
    typeof c0 != "string" ||
    (c0[0] != "r" && c0[0] != "#") ||
    (c1 && !a)
  )
    return null;
  if (!this.pSBCr)
    this.pSBCr = (d) => {
      let n = d.length,
        x = {};
      if (n > 9) {
        ([r, g, b, a] = d = d.split(",")), (n = d.length);
        if (n < 3 || n > 4) return null;
        (x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4))),
          (x.g = i(g)),
          (x.b = i(b)),
          (x.a = a ? parseFloat(a) : -1);
      } else {
        if (n == 8 || n == 6 || n < 4) return null;
        if (n < 6)
          d =
            "#" +
            d[1] +
            d[1] +
            d[2] +
            d[2] +
            d[3] +
            d[3] +
            (n > 4 ? d[4] + d[4] : "");
        d = i(d.slice(1), 16);
        if (n == 9 || n == 5)
          (x.r = (d >> 24) & 255),
            (x.g = (d >> 16) & 255),
            (x.b = (d >> 8) & 255),
            (x.a = m((d & 255) / 0.255) / 1000);
        else
          (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
      }
      return x;
    };
  (h = c0.length > 9),
    (h = a ? (c1.length > 9 ? true : c1 == "c" ? !h : false) : h),
    (f = this.pSBCr(c0)),
    (P = p < 0),
    (t =
      c1 && c1 != "c"
        ? this.pSBCr(c1)
        : P
        ? { r: 0, g: 0, b: 0, a: -1 }
        : { r: 255, g: 255, b: 255, a: -1 }),
    (p = P ? p * -1 : p),
    (P = 1 - p);
  if (!f || !t) return null;
  if (l)
    (r = m(P * f.r + p * t.r)),
      (g = m(P * f.g + p * t.g)),
      (b = m(P * f.b + p * t.b));
  else
    (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
      (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
      (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
  (a = f.a),
    (t = t.a),
    (f = a >= 0 || t >= 0),
    (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
  if (h)
    return (
      "rgb" +
      (f ? "a(" : "(") +
      r +
      "," +
      g +
      "," +
      b +
      (f ? "," + m(a * 1000) / 1000 : "") +
      ")"
    );
  else
    return (
      "#" +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
};

let color = document.getElementById("color");
const root_theme = document.querySelector(":root");
let old_color = "#673ab7";
color.value = old_color;
setInterval(() => {
  if (color.value != old_color) {
    root_theme.style.setProperty("--theme-text-color", color.value);
    root_theme.style.setProperty(
      "--theme-background-color",
      pSBC(0.75, color.value)
    );
    old_color = color.value;
  }
}, 1000);

let question = document.getElementsByClassName("question");
let question_show = 0;
let question_count = 2;
let old_ques_data = [];

let option_delete_button = document.getElementsByClassName("delete-option");
function delete_option() {
  for (let i of option_delete_button) {
    i.addEventListener("click", () => {
      i.parentElement.remove();
    });
  }
}
delete_option();

let add_ques = document.getElementsByClassName("add-ques");

function add_options_helper(element) {
  var optionDiv = document.createElement("div");
  optionDiv.className = "opt1";

  // Create bullet point (&bull;)
  var bulletPoint = document.createTextNode("\u2022");

  // Create input element
  var inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.placeholder = "option";
  inputElement.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      add_options_helper(element);
    }
  });
  // Create SVG element for delete option
  var deleteOptionSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  deleteOptionSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  deleteOptionSvg.setAttribute("fill", "none");
  deleteOptionSvg.setAttribute("viewBox", "0 0 24 24");
  deleteOptionSvg.setAttribute("stroke-width", "1.5");
  deleteOptionSvg.setAttribute("stroke", "currentColor");
  deleteOptionSvg.setAttribute("class", "delete-option");

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute(
    "d",
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  );

  // Append elements to their respective parent elements

  deleteOptionSvg.appendChild(path);
  optionDiv.appendChild(bulletPoint);
  optionDiv.appendChild(inputElement);
  optionDiv.appendChild(deleteOptionSvg);

  // Append the optionDiv to the body (you can append it to any other element)
  element.appendChild(optionDiv);

  inputElement.focus();
  option_delete_button = document.getElementsByClassName("delete-option");
  for (let i of option_delete_button) {
    let option_delete_button = document.getElementsByClassName("delete-option");
    for (let i of option_delete_button) {
      i.addEventListener("click", () => {
        i.parentElement.remove();
      });
    }
  }
}
function add_options() {
  for (let i of add_ques) {
    i.addEventListener("click", () => {
      let element = document.getElementById(i.getAttribute("value") + "option");

      add_options_helper(element);
    });
  }
  delete_option();
}
add_options();
let ques_content = document.getElementById("ques-content");

function bottom_wala() {
  function createElement(tag, attributes) {
    var element = document.createElement(tag);
    for (var key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    return element;
  }
  function createElementNS(first, tag, attributes) {
    var element = document.createElementNS(first, tag);
    for (var key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    return element;
  }

  // Create the outer <div> element
  var outerDiv = createElement("div", {});

  // Create the first <section> element
  var section1 = createElement("section", {});

  // Create the <input> element
  var inputElement = createElement("input", {
    type: "number",
    class: "number",
    value: 100,
  });

  // Create the first <svg> element
  var svg1 = createElementNS("http://www.w3.org/2000/svg", "svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    class: "w-6 h-6",
  });

  // Create the <path> element inside the first <svg>
  var path1 = createElementNS("http://www.w3.org/2000/svg", "path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z",
  });

  // Append <path> to the first <svg>
  svg1.appendChild(path1);

  // Append <input> and the first <svg> to the first <section>
  section1.appendChild(inputElement);
  section1.appendChild(svg1);

  // Create the second <svg> element
  var svg2 = createElementNS("http://www.w3.org/2000/svg", "svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    class: "question-delete",
  });

  // Create the <path> element inside the second <svg>
  var path2 = createElementNS("http://www.w3.org/2000/svg", "path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0",
  });

  // Append <path> to the second <svg>
  svg2.appendChild(path2);

  let navElement = document.createElement("nav");

  // Create input element
  let inputElement1 = document.createElement("input");
  inputElement1.setAttribute("type", "number");
  inputElement1.setAttribute("class", "correct");
  inputElement1.value = 1;
  // Create p element
  let pElement = document.createElement("p");
  pElement.textContent = "Correct Option Number";

  // Append input and p elements to nav
  navElement.appendChild(inputElement1);
  navElement.appendChild(pElement);

  outerDiv.appendChild(navElement);
  // Append the second <svg> to the outer <div>
  outerDiv.appendChild(section1);
  outerDiv.appendChild(svg2);
  return outerDiv;
}
function create_question(ques_num) {
  // Create main container
  var quesContainer = document.createElement("div");
  quesContainer.className = "ques";

  // Create upper div
  var upperDiv = document.createElement("div");
  upperDiv.className = "upper";

  // Create textarea
  var textarea = document.createElement("textarea");
  textarea.cols = "40";
  textarea.rows = "1";
  textarea.className = "ques-textarea";
  textarea.placeholder = "Question";

  // Create SVG icon for upper div
  var upperDivIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  upperDivIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  upperDivIcon.setAttribute("fill", "none");
  upperDivIcon.setAttribute("viewBox", "0 0 24 24");
  upperDivIcon.setAttribute("stroke-width", "1.5");
  upperDivIcon.setAttribute("stroke", "currentColor");
  upperDivIcon.setAttribute("class", "w-6 h-6");

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute(
    "d",
    "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  );

  upperDivIcon.appendChild(path);

  // Create select div
  var selectDiv = document.createElement("div");
  selectDiv.className = "select";

  // Create question h1
  var questionH1 = document.createElement("h1");
  questionH1.id = "q-" + ques_num + "";
  questionH1.setAttribute("class", "question");

  // Create SVG icons for question h1
  var questionH1Icon1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  questionH1Icon1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  questionH1Icon1.setAttribute("fill", "none");
  questionH1Icon1.setAttribute("viewBox", "0 0 24 24");
  questionH1Icon1.setAttribute("stroke-width", "1.5");
  questionH1Icon1.setAttribute("stroke", "currentColor");
  questionH1Icon1.setAttribute("style", "margin-right: 0");

  var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("stroke-linecap", "round");
  path1.setAttribute("stroke-linejoin", "round");
  path1.setAttribute(
    "d",
    "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
  );

  questionH1Icon1.appendChild(path1);

  var questionH1Icon2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  questionH1Icon2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  questionH1Icon2.setAttribute("fill", "none");
  questionH1Icon2.setAttribute("viewBox", "0 0 24 24");
  questionH1Icon2.setAttribute("stroke-width", "1.5");
  questionH1Icon2.setAttribute("stroke", "currentColor");
  questionH1Icon2.setAttribute("style", "margin-right: 0");

  var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");
  path2.setAttribute("d", "m19.5 8.25-7.5 7.5-7.5-7.5");

  questionH1Icon2.appendChild(path2);

  // Create span for question h1
  var questionH1Span = document.createElement("span");
  questionH1Span.setAttribute("class", "ques-type");
  questionH1Span.textContent = "Multiple Choice";

  // Function to create an HTML element with attributes
  function createElement(tag, attributes) {
    var element = document.createElement(tag);
    for (var key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    return element;
  }
  function createElementNS(first, tag, attributes) {
    var element = document.createElementNS(first, tag);
    for (var key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    return element;
  }

  // Data for each option
  var optionsData = [
    {
      value: "Multiple Choice",
      d: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75",
    },

    {
      value: "Short Answer",
      d: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
    },
    {
      value: "Single Correct",
      d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    },
    {
      value: "Time",
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    },
    {
      value: "Date",
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z",
    },
  ];

  // Create a container div
  var container = createElement("div", {
    class: "select-opt q-" + ques_num + "-show",
  });

  // Iterate through the options data and create HTML elements
  optionsData.forEach(function (option) {
    // Create the <p> element

    var paragraph = createElement("p", {
      ques: "q-" + ques_num + "",
      class: "select-option",
      value: option.value,
      d: option.d,
    });

    paragraph.addEventListener("click", () => {
      let ele = paragraph.parentElement.parentElement;
      ele.children[0].children[1].textContent = option.value;
      ele.children[0].children[0].children[0].setAttribute("d", option.d);
      // ele.children[0].setAttribute("click", "1");
      container.style.display = "none";
    });

    // Create the <svg> element
    var svg = createElementNS("http://www.w3.org/2000/svg", "svg", {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor",
    });

    // Create the <path> element inside <svg>
    var path = createElementNS("http://www.w3.org/2000/svg", "path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: option.d,
    });

    // Append <path> to <svg> and <svg> to <p>
    svg.appendChild(path);
    paragraph.appendChild(svg);

    // Create the <span> element
    var span = createElement("span", {});
    span.textContent = option.value;

    // Append <span> to <p>
    paragraph.appendChild(span);

    // Append <p> to the container
    container.appendChild(paragraph);

    // If it's not the last option, create and append a <hr> element
    if (option !== optionsData[optionsData.length - 1]) {
      var hr = createElement("hr", {});
      container.appendChild(hr);
    }
  });
  selectDiv.addEventListener("click", () => {
    if (selectDiv.getAttribute("click") == "1") {
      container.style.display = "none";
      selectDiv.setAttribute("click", "0");
    } else {
      container.style.display = "block";
      selectDiv.setAttribute("click", "1");
    }
  });
  // Append the container to the document body

  // Append elements to their respective parent elements
  upperDiv.appendChild(textarea);
  upperDiv.appendChild(upperDivIcon);
  upperDiv.appendChild(selectDiv);
  questionH1.appendChild(questionH1Icon1);
  questionH1.appendChild(questionH1Span);
  questionH1.appendChild(questionH1Icon2);
  selectDiv.appendChild(questionH1);
  selectDiv.appendChild(container);
  upperDiv.appendChild(selectDiv);

  //   MIDDLE DIV CONTAINER
  // Create middle div
  var middleDiv = document.createElement("div");
  middleDiv.className = "middle";

  // Create options div
  var optionsDiv = document.createElement("div");
  optionsDiv.className = "options";
  optionsDiv.id = "q-" + ques_num + "-option";

  // Create opt1 div
  var opt1Div = document.createElement("div");
  opt1Div.className = "opt1";

  // Create bullet point
  var bulletPoint = document.createTextNode("\u2022");

  // Create input element
  var inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.placeholder = "option";

  // Create SVG element for delete option
  var deleteOptionSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  deleteOptionSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  deleteOptionSvg.setAttribute("fill", "none");
  deleteOptionSvg.setAttribute("viewBox", "0 0 24 24");
  deleteOptionSvg.setAttribute("stroke-width", "1.5");
  deleteOptionSvg.setAttribute("stroke", "currentColor");
  deleteOptionSvg.className = "delete-option";

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute(
    "d",
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  );

  // Append elements to their respective parent elements
  opt1Div.appendChild(bulletPoint);
  opt1Div.appendChild(inputElement);
  opt1Div.appendChild(deleteOptionSvg);
  optionsDiv.appendChild(opt1Div);
  middleDiv.appendChild(optionsDiv);

  // Create button
  var aside = document.createElement("aside");

  var addButton = document.createElement("button");
  addButton.value = "q-" + ques_num + "-";
  addButton.className = "add-ques";
  addButton.textContent = "Add more options";

  inputElement.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      addButton.click();
    }
  });

  var spans = document.createElement("span");
  var inputs = document.createElement("input");
  inputs.value = 10;
  inputs.setAttribute("class", "range");
  inputs.setAttribute("type", "range");
  var a_tag = document.createElement("a");
  a_tag.appendChild(document.createTextNode("10s"));

  spans.appendChild(inputs);
  spans.appendChild(a_tag);
  aside.appendChild(addButton);
  aside.appendChild(spans);
  // Append button to middle div
  middleDiv.appendChild(aside);

  //   bottom div container
  // Create bottom div
  var bottomDiv = document.createElement("div");
  bottomDiv.className = "bottom";

  var hrElement = document.createElement("hr");

  let bottom_div = bottom_wala();

  bottomDiv.appendChild(hrElement);
  bottomDiv.appendChild(bottom_div);

  quesContainer.appendChild(upperDiv);
  quesContainer.appendChild(middleDiv);
  quesContainer.appendChild(bottomDiv);

  ques_content.appendChild(quesContainer);

  question_count += 1;
  add_options();
  question_delete();
  ranges();
}

let question_delete_button = document.getElementsByClassName("question-delete");
function question_delete() {
  for (let i of question_delete_button) {
    i.addEventListener("click", () => {
      i.parentElement.parentElement.parentElement.style.animation =
        "fade_in 1s linear";
      setTimeout(() => {
        i.parentElement.parentElement.parentElement.remove();
      }, 1000);
    });
  }
}
question_delete();

let ques_add_button = document.getElementById("ques-add-button");
function question_add() {
  ques_add_button.addEventListener("click", () => {
    create_question(question_count);
    container.scrollTo(0, ques_add_button.offsetTop);
  });
}
question_add();

function publish() {
  let question_container = {};
  let all_ques = document.getElementsByClassName("ques");
  question_container["title"] =
    document.getElementsByClassName("title")[0].value;
  question_container["author"] = localStorage.getItem("user").split(";;")[0];
  question_container["description"] =
    document.getElementsByClassName("desc")[0].value;
  let correct = document.getElementsByClassName("correct");
  for (let i of all_ques) {
    let question = i.children[0].children[0].value;
    let options = i.children[1].children[0].children;
    let time = i.children[1].children[1].children[1].children[0].value;
    let score = i.children[2].children[1].children[0].children[0].value;
    let type = i.children[0].children[2].children[0].children[1].textContent;
    let list = [];
    for (let j of options) {
      list.push(j.children[0].value);
    }
    list.push(";;;");
    list.push(time);
    list.push(score);
    list.push(type);
    question_container[question] = list;
  }
  let cor_ans = [];
  for (let i of correct) {
    cor_ans.push(i.value);
  }
  question_container["correct"] = cor_ans;
  let t = parseInt(localStorage.getItem("quiz"));
  t += 1;
  let myJSON = JSON.stringify(question_container);
  localStorage.setItem("quiz-" + t, myJSON);
  // location.href = "home.html";
  location.replace('home.html')
}

// publish();

let form_tab = document.getElementsByClassName("form")[0];
let setting_tab = document.getElementsByClassName("setting")[0];
let setting_button = document.getElementById("set-but");
let form_button = document.getElementById("form-but");
setting_button.addEventListener("click", () => {
  form_tab.style.display = "none";
  setting_tab.style.display = "block";

  setting_button.style.borderBottom = "3px solid var(--theme-text-color)";
  setting_button.style.color, "var(--theme-text-color)";

  form_button.style.borderBottom = "0";
  form_button.style.color, "black";
});
function choose_form() {
  setting_tab.style.display = "none";
  form_tab.style.display = "block";

  form_button.style.borderBottom = "3px solid var(--theme-text-color)";
  form_button.style.color, "var(--theme-text-color)";
  setting_button.style.borderBottom = "0";
  setting_button.style.color, "black";
}
form_button.addEventListener("click", () => {
  choose_form();
});
choose_form();

let range = document.getElementsByClassName("range");
let range_back = [];
function ranges() {
  for (let i of range) {
    if (!range_back.includes(i)) {
      i.value = 10;
      i.addEventListener("click", () => {
        i.nextElementSibling.textContent = parseInt(i.value) + "s";
      });
      range_back.push(i);
    }
  }
}
ranges();
create_question(0);
