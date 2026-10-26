document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the footer year
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });

  // Filter robotics projects
  const filterButtons = document.querySelectorAll(".filter");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach(item =>
        item.classList.remove("active")
      );
      button.classList.add("active");

      projectCards.forEach(card => {
        const matches =
          selectedCategory === "all" ||
          card.dataset.category === selectedCategory;

        card.hidden = !matches;
      });
    });
  });

  // Search and filter component examples
  const shopSearch = document.getElementById("shopSearch");
  const shopCategory = document.getElementById("shopCategory");
  const shopCards = document.querySelectorAll(".shop-card");

  function filterShop() {
    const searchTerm = shopSearch.value.trim().toLowerCase();
    const selectedCategory = shopCategory.value;

    shopCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const category = card.dataset.category;

      const matchesSearch = name.includes(searchTerm);
      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      card.hidden = !(matchesSearch && matchesCategory);
    });
  }

  shopSearch.addEventListener("input", filterShop);
  shopCategory.addEventListener("change", filterShop);

  // Demo shopping bag counter
  let bagCount = 0;
  const bagCounter = document.getElementById("bagCount");

  document.querySelectorAll(".add-to-bag").forEach(button => {
    button.addEventListener("click", () => {
      bagCount++;
      bagCounter.textContent = bagCount;

      const originalText = button.textContent;
      button.textContent = "Added ✓";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1000);
    });
  });

  // Interactive beginner robotics quiz
  const questions = [
    {
      question:
        "Which component can measure distance to an obstacle?",
      answers: [
        "A. Ultrasonic sensor",
        "B. Speaker",
        "C. LED"
      ],
      correct: 0,
      explanation:
        "Correct! An ultrasonic sensor estimates distance using sound waves."
    },
    {
      question:
        "Which language is popular for learning AI and programming?",
      answers: [
        "A. HTML only",
        "B. Python",
        "C. CSS only"
      ],
      correct: 1,
      explanation:
        "Correct! Python is widely used for programming, data science and AI."
    },
    {
      question:
        "What is the main purpose of a motor in a mobile robot?",
      answers: [
        "A. Store photographs",
        "B. Display web pages",
        "C. Produce movement"
      ],
      correct: 2,
      explanation:
        "Correct! Motors convert energy into motion."
    },
    {
      question:
        "What does a sensor do in a robot?",
      answers: [
        "A. Detects information about its surroundings",
        "B. Always replaces the battery",
        "C. Prints documents"
      ],
      correct: 0,
      explanation:
        "Correct! Sensors collect information such as distance, light or temperature."
    },
    {
      question:
        "Which board is commonly used in beginner electronics projects?",
      answers: [
        "A. Television screen",
        "B. Arduino Uno",
        "C. Computer mouse"
      ],
      correct: 1,
      explanation:
        "Correct! Arduino Uno is a popular microcontroller board for learning electronics."
    }
  ];

  let questionIndex = 0;
  let score = 0;

  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");
  const feedbackElement = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("nextQuestion");

  function showQuestion() {
    const current = questions[questionIndex];

    questionElement.textContent =
      `Question ${questionIndex + 1} of ${questions.length}: ` +
      current.question;

    answersElement.replaceChildren();
    feedbackElement.textContent = "";
    nextButton.hidden = true;

    current.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = answer;

      button.addEventListener("click", () => {
        checkAnswer(index);
      });

      answersElement.appendChild(button);
    });
  }

  function checkAnswer(selectedIndex) {
    const current = questions[questionIndex];
    const answerButtons = answersElement.querySelectorAll("button");

    answerButtons.forEach((button, index) => {
      button.disabled = true;

      if (index === current.correct) {
        button.classList.add("correct");
      }

      if (index === selectedIndex && index !== current.correct) {
        button.classList.add("incorrect");
      }
    });

    if (selectedIndex === current.correct) {
      score++;
      feedbackElement.textContent = current.explanation;
    } else {
      feedbackElement.textContent =
        "Not quite. " + current.explanation;
    }

    nextButton.hidden = false;
    nextButton.textContent =
      questionIndex === questions.length - 1
        ? "See Results"
        : "Next Question →";
  }

  function showResults() {
    questionElement.textContent = "Your Quiz Results";
    answersElement.replaceChildren();

    feedbackElement.textContent =
      `You scored ${score} out of ${questions.length}. ` +
      (score === questions.length
        ? "Excellent work, innovator!"
        : "Great effort! Review the answers and try again.");

    nextButton.hidden = false;
    nextButton.textContent = "Try Again";
    nextButton.onclick = restartQuiz;
  }

  function restartQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.onclick = nextQuestion;
    showQuestion();
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      questionIndex++;
      showQuestion();
    } else {
      showResults();
    }
  }

  nextButton.addEventListener("click", nextQuestion);
  showQuestion();

  // Contact form: prepare an email using the visitor's email app
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = formData.get("name").toString().trim();
    const email = formData.get("email").toString().trim();
    const message = formData.get("message").toString().trim();

    const subject = encodeURIComponent(
      `Nexora Quantum inquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    formFeedback.textContent =
      "Opening your email app. Please review and send your message.";

    window.location.href =
      `mailto:?subject=${subject}&body=${body}`;
  });
});
