let quiz_0 = {
  title: "The ultimate Computer Quiz",
  author: "By Pranay",
  description:
    "This is basic computer related quiz. Any beginner can attempt this quiz.",
  image: "com.png",
  "Who is the father of the computer": [
    "Charles Babbage",
    "Tim Cook",
    "Steve Jobs",
    "Ada Lovelace",
    ";;;",
    "12",
    "1",
    "Multiple Choice",
  ],
  "What is software?": [
    "clothing designed to be worn by computer users",
    "any part of the computer that has a physical structure",
    "instructions that tell the hardware what to do",
    "flexible parts of a computer case",
    ";;;",
    "17",
    "3",
    "Multiple Choice",
  ],
  "Which of the following are types of computer hardware? ": [
    "RAM",
    "Microsoft Word",
    "GTA - 6",
    "Operating System",
    ";;;",
    "10",
    "1",
    "Multiple Choice",
  ],
  "The computer’s main circuit board is called a ________.": [
    "Bluetooth card",
    "motherboard",
    "monitor",
    "hard drive",
    ";;;",
    "10",
    "2",
    "Multiple Choice",
  ],
  "RAM is like a computer’s ________, while a hard drive is like a computer’s ________. ":
    [
      "nervous system / brain",
      "brain / nervous system",
      "long-term memory / short-term memory",
      "short-term memory / long-term memory",
      ";;;",
      "10",
      "4",
      "Multiple Choice",
    ],
  "What is an Ethernet port used for?": [
    "Connecting smartphones and other peripherals",
    "Creating new user accounts",
    "Providing power to the computer",
    "Connecting to the Internet",
    ";;;",
    "10",
    "4",
    "Multiple Choice",
  ],
  correct: ["1", "3", "1", "2", "4", "4"],
};

let quiz_1 = {
  title: "The Quiz of Intelligence",
  author: "Anomynous",
  description:
    "This quiz is for people with higher IQ's. Ready to accept the challenge !",
  image: "bizzare.png",
  "How many volt are there in a twelve vold battery": [
    "12",
    "twelve",
    "6+6",
    "50",
    ";;;",
    "12",
    "1",
    "Multiple Choice",
  ],
  "Which of the following is not a browser": [
    "Chrome",
    "Brave",
    "Opera",
    "Internet Explorer",
    ";;;",
    "15",
    "4",
    "Multiple Choice",
  ],
  "How to store milk safely and for long last freshness": [
    "Put the cow in fridge",
    "Drink all the milk",
    "Convert milk to milk powder",
    "No scope",
    ";;;",
    "17",
    "4",
    "Multiple Choice",
  ],
  "Which is the thing which is always coming but never comes ": [
    "Success",
    "Tommorow",
    "Achhe Din",
    "No Scope",
    ";;;",
    "10",
    "1",
    "Multiple Choice",
  ],
};
let get_quiz_value = localStorage.getItem("apply_quiz");
if (get_quiz_value == null || get_quiz_value != 1) {
  let j = JSON.stringify(quiz_0);
  localStorage.setItem("quiz-1", j);
  j = JSON.stringify(quiz_1);
  localStorage.setItem("quiz-2", j);
  localStorage.setItem("apply_quiz", "1");
  localStorage.setItem("quiz", "2");
}
