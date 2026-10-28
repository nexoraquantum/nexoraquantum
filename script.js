/* ==========================================================
   NEXORA QUANTUM
   Premium Interactive Website
   Robotics • AI • Electronics
   ========================================================== */

"use strict";


/* ==========================================================
   1. BASIC ELEMENTS
   ========================================================== */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const cursorGlow = document.getElementById("cursorGlow");

const year = document.getElementById("year");


/* ==========================================================
   2. CURRENT YEAR
   ========================================================== */

if (year) {
  year.textContent = new Date().getFullYear();
}


/* ==========================================================
   3. MOBILE NAVIGATION
   ========================================================== */

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    document.body.classList.toggle("menu-open", isOpen);

  });


  /* Close menu when clicking navigation */

  navMenu.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("open");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove("menu-open");

    });

  });

}


/* ==========================================================
   4. HEADER SCROLL EFFECT
   ========================================================== */

function updateHeader() {

  if (!header) return;

  if (window.scrollY > 30) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* ==========================================================
   5. ACTIVE NAVIGATION SECTION
   ========================================================== */

const sections = document.querySelectorAll(
  "main section[id]"
);


function updateActiveNavigation() {

  let currentSection = "home";

  const scrollPosition =
    window.scrollY + 180;


  sections.forEach((section) => {

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition <
      sectionTop + sectionHeight
    ) {

      currentSection = section.id;

    }

  });


  navLinks.forEach((link) => {

    link.classList.remove("active");

    const target =
      link.getAttribute("href");

    if (target === `#${currentSection}`) {

      link.classList.add("active");

    }

  });

}


window.addEventListener(
  "scroll",
  updateActiveNavigation,
  { passive: true }
);

updateActiveNavigation();


/* ==========================================================
   6. SMOOTH INTERNAL SCROLL
   ========================================================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId =
      link.getAttribute("href");

    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }

    const target =
      document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();


    const headerHeight =
      header ? header.offsetHeight : 0;


    const targetPosition =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      15;


    window.scrollTo({

      top: targetPosition,
      behavior: "smooth"

    });

  });

});


/* ==========================================================
   7. PROJECT FILTER SYSTEM
   ========================================================== */

const filterButtons =
  document.querySelectorAll(
    "#projectFilters .filter"
  );

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedFilter =
      button.dataset.filter;


    filterButtons.forEach((item) => {

      item.classList.remove("active");

    });


    button.classList.add("active");


    projectCards.forEach((card) => {

      const category =
        card.dataset.category;


      const shouldShow =
        selectedFilter === "all" ||
        selectedFilter === category;


      if (shouldShow) {

        card.classList.remove("project-hidden");

        requestAnimationFrame(() => {

          card.classList.add("project-visible");

        });

      } else {

        card.classList.remove("project-visible");

        card.classList.add("project-hidden");

      }

    });

  });

});


/* ==========================================================
   8. COMPONENT SEARCH + CATEGORY FILTER
   ========================================================== */

const componentSearch =
  document.getElementById(
    "componentSearch"
  );

const componentCategory =
  document.getElementById(
    "componentCategory"
  );

const componentCards =
  document.querySelectorAll(
    ".component-card"
  );


function filterComponents() {

  const searchValue =
    componentSearch
      ? componentSearch.value
          .trim()
          .toLowerCase()
      : "";


  const selectedCategory =
    componentCategory
      ? componentCategory.value
      : "all";


  componentCards.forEach((card) => {

    const name =
      (
        card.dataset.name ||
        card.textContent
      ).toLowerCase();


    const category =
      card.dataset.category;


    const matchesSearch =
      name.includes(searchValue);


    const matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory;


    if (
      matchesSearch &&
      matchesCategory
    ) {

      card.hidden = false;

      requestAnimationFrame(() => {

        card.classList.add(
          "component-visible"
        );

      });

    } else {

      card.classList.remove(
        "component-visible"
      );

      card.hidden = true;

    }

  });

}


if (componentSearch) {

  componentSearch.addEventListener(
    "input",
    filterComponents
  );

}


if (componentCategory) {

  componentCategory.addEventListener(
    "change",
    filterComponents
  );

}


filterComponents();


/* ==========================================================
   9. QUIZ DATABASE
   ========================================================== */

const quizQuestions = [

  {
    question:
      "Which component can measure distance to an obstacle?",

    answers: [
      "Ultrasonic Sensor",
      "Speaker",
      "LED"
    ],

    correct: 0,

    explanation:
      "Correct! An ultrasonic sensor can measure distance using ultrasonic sound waves."
  },


  {
    question:
      "Which board is commonly used for beginner robotics projects?",

    answers: [
      "Arduino Uno",
      "Computer Monitor",
      "Keyboard"
    ],

    correct: 0,

    explanation:
      "Correct! Arduino Uno is widely used for learning electronics and robotics."
  },


  {
    question:
      "Which component creates movement in a small robot car?",

    answers: [
      "LED",
      "DC Motor",
      "Resistor"
    ],

    correct: 1,

    explanation:
      "Correct! DC motors convert electrical energy into mechanical movement."
  },


  {
    question:
      "Which microcontroller includes built-in Wi-Fi and Bluetooth?",

    answers: [
      "ESP32",
      "LED",
      "HC-SR04"
    ],

    correct: 0,

    explanation:
      "Correct! ESP32 includes wireless connectivity and is excellent for IoT projects."
  },


  {
    question:
      "What does AI stand for?",

    answers: [
      "Automatic Internet",
      "Artificial Intelligence",
      "Advanced Input"
    ],

    correct: 1,

    explanation:
      "Correct! AI stands for Artificial Intelligence."
  }

];


/* ==========================================================
   10. QUIZ SYSTEM
   ========================================================== */

let currentQuestion = 0;

let quizLocked = false;


const questionElement =
  document.getElementById("question");

const answersElement =
  document.getElementById("answers");

const feedbackElement =
  document.getElementById(
    "quizFeedback"
  );

const nextQuestionButton =
  document.getElementById(
    "nextQuestion"
  );

const questionNumber =
  document.getElementById(
    "questionNumber"
  );


function loadQuestion() {

  if (
    !questionElement ||
    !answersElement
  ) {
    return;
  }


  quizLocked = false;


  const data =
    quizQuestions[currentQuestion];


  questionElement.textContent =
    data.question;


  if (questionNumber) {

    questionNumber.textContent =
      String(
        currentQuestion + 1
      ).padStart(2, "0");

  }


  answersElement.innerHTML = "";


  data.answers.forEach(
    (answer, index) => {

      const button =
        document.createElement(
          "button"
        );


      const letter =
        String.fromCharCode(
          65 + index
        );


      button.innerHTML = `

        <span>${letter}</span>

        ${answer}

      `;


      button.dataset.answer =
        index;


      button.addEventListener(
        "click",
        () => {

          selectAnswer(
            button,
            index
          );

        }
      );


      answersElement.appendChild(
        button
      );

    }
  );


  if (feedbackElement) {

    feedbackElement.textContent = "";

    feedbackElement.className = "";

  }


  if (nextQuestionButton) {

    nextQuestionButton.hidden = true;

  }

}


function selectAnswer(
  selectedButton,
  selectedIndex
) {

  if (quizLocked) return;

  quizLocked = true;


  const data =
    quizQuestions[currentQuestion];


  const buttons =
    answersElement.querySelectorAll(
      "button"
    );


  buttons.forEach(
    (button, index) => {

      button.disabled = true;


      if (
        index === data.correct
      ) {

        button.classList.add(
          "correct-answer"
        );

      }

    }
  );


  if (
    selectedIndex ===
    data.correct
  ) {

    selectedButton.classList.add(
      "correct-answer"
    );


    if (feedbackElement) {

      feedbackElement.textContent =
        data.explanation;

      feedbackElement.className =
        "quiz-success";

    }

  } else {

    selectedButton.classList.add(
      "wrong-answer"
    );


    if (feedbackElement) {

      feedbackElement.textContent =
        `Not quite. The correct answer is ${data.answers[data.correct]}.`;

      feedbackElement.className =
        "quiz-error";

    }

  }


  if (nextQuestionButton) {

    nextQuestionButton.hidden = false;


    if (
      currentQuestion ===
      quizQuestions.length - 1
    ) {

      nextQuestionButton.textContent =
        "Restart Quiz ↻";

    } else {

      nextQuestionButton.textContent =
        "Next Question →";

    }

  }

}


if (nextQuestionButton) {

  nextQuestionButton.addEventListener(
    "click",
    () => {

      currentQuestion++;


      if (
        currentQuestion >=
        quizQuestions.length
      ) {

        currentQuestion = 0;

      }


      loadQuestion();

    }
  );

}


loadQuestion();


/* ==========================================================
   11. CONTACT FORM
   ========================================================== */

const contactForm =
  document.getElementById(
    "contactForm"
  );

const formFeedback =
  document.getElementById(
    "formFeedback"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const name =
        document
          .getElementById(
            "visitorName"
          )
          ?.value
          .trim();


      const email =
        document
          .getElementById(
            "visitorEmail"
          )
          ?.value
          .trim();


      const message =
        document
          .getElementById(
            "visitorMessage"
          )
          ?.value
          .trim();


      if (
        !name ||
        !email ||
        !message
      ) {

        if (formFeedback) {

          formFeedback.textContent =
            "Please complete all fields.";

          formFeedback.className =
            "form-error";

        }

        return;

      }


      /*
       * This static website does not
       * secretly collect or store
       * visitor information.
       *
       * Instead, it prepares an email
       * in the visitor's email app.
       */


      const subject =
        encodeURIComponent(
          `Nexora Quantum — Message from ${name}`
        );


      const body =
        encodeURIComponent(

`Hello Nexora Quantum,

My name is ${name}.

${message}

Contact email:
${email}`

        );


      /*
       * IMPORTANT:
       *
       * Replace YOUR-EMAIL@example.com
       * with the email address you want
       * visitors to contact.
       */

      const destinationEmail =
        "YOUR-EMAIL@example.com";


      if (formFeedback) {

        formFeedback.textContent =
          "Opening your email app...";

        formFeedback.className =
          "form-success";

      }


      window.location.href =
        `mailto:${destinationEmail}?subject=${subject}&body=${body}`;

    }
  );

}


/* ==========================================================
   12. SCROLL REVEAL
   ========================================================== */

const revealElements =
  document.querySelectorAll(
    `
    .section-heading,
    .project-card,
    .component-card,
    .learning-card,
    .quiz-container,
    .about-visual,
    .about-content,
    .contact-heading,
    .contact-form
    `
  );


revealElements.forEach(
  (element) => {

    element.classList.add(
      "reveal"
    );

  }
);


if (
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "revealed"
              );


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {

        threshold: 0.12,

        rootMargin:
          "0px 0px -50px 0px"

      }

    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "revealed"
      );

    }
  );

}


/* ==========================================================
   13. STAGGERED CARD REVEAL
   ========================================================== */

const staggerGroups = [

  document.querySelectorAll(
    ".project-card"
  ),

  document.querySelectorAll(
    ".component-card"
  ),

  document.querySelectorAll(
    ".learning-card"
  )

];


staggerGroups.forEach(
  (group) => {

    group.forEach(
      (item, index) => {

        item.style.setProperty(
          "--reveal-delay",
          `${index * 80}ms`
        );

      }
    );

  }
);


/* ==========================================================
   14. CURSOR GLOW
   Desktop only
   ========================================================== */

const supportsFinePointer =
  window.matchMedia(
    "(pointer: fine)"
  ).matches;


const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


if (
  cursorGlow &&
  supportsFinePointer &&
  !reducedMotion
) {

  let mouseX = 0;
  let mouseY = 0;

  let glowX = 0;
  let glowY = 0;


  document.addEventListener(
    "mousemove",
    (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorGlow.classList.add(
        "visible"
      );

    }
  );


  document.addEventListener(
    "mouseleave",
    () => {

      cursorGlow.classList.remove(
        "visible"
      );

    }
  );


  function animateGlow() {

    glowX +=
      (mouseX - glowX) * 0.12;

    glowY +=
      (mouseY - glowY) * 0.12;


    cursorGlow.style.transform =
      `translate3d(
        ${glowX}px,
        ${glowY}px,
        0
      )`;


    requestAnimationFrame(
      animateGlow
    );

  }


  animateGlow();

}


/* ==========================================================
   15. PREMIUM CARD POINTER EFFECT
   ========================================================== */

const interactiveCards =
  document.querySelectorAll(
    `
    .project-card,
    .component-card,
    .learning-card
    `
  );


if (
  supportsFinePointer &&
  !reducedMotion
) {

  interactiveCards.forEach(
    (card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const xPercent =
            x / rect.width;


          const yPercent =
            y / rect.height;


          const rotateY =
            (xPercent - 0.5) * 3;


          const rotateX =
            (0.5 - yPercent) * 3;


          card.style.setProperty(
            "--mouse-x",
            `${x}px`
          );


          card.style.setProperty(
            "--mouse-y",
            `${y}px`
          );


          card.style.transform =
            `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
            `;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    }
  );

}


/* ==========================================================
   16. HERO PARALLAX
   ========================================================== */

const heroVisual =
  document.querySelector(
    ".hero-visual"
  );


if (
  heroVisual &&
  supportsFinePointer &&
  !reducedMotion
) {

  document.addEventListener(
    "mousemove",
    (event) => {

      const x =
        (
          event.clientX /
          window.innerWidth -
          0.5
        ) * 12;


      const y =
        (
          event.clientY /
          window.innerHeight -
          0.5
        ) * 12;


      heroVisual.style.transform =
        `translate3d(
          ${x}px,
          ${y}px,
          0
        )`;

    }
  );

}


/* ==========================================================
   17. BUTTON RIPPLE EFFECT
   ========================================================== */

const buttons =
  document.querySelectorAll(
    ".button"
  );


buttons.forEach((button) => {

  button.addEventListener(
    "click",
    (event) => {

      const ripple =
        document.createElement(
          "span"
        );


      ripple.className =
        "button-ripple";


      const rect =
        button.getBoundingClientRect();


      const size =
        Math.max(
          rect.width,
          rect.height
        );


      ripple.style.width =
        `${size}px`;

      ripple.style.height =
        `${size}px`;


      ripple.style.left =
        `${
          event.clientX -
          rect.left -
          size / 2
        }px`;


      ripple.style.top =
        `${
          event.clientY -
          rect.top -
          size / 2
        }px`;


      button.appendChild(
        ripple
      );


      setTimeout(() => {

        ripple.remove();

      }, 650);

    }
  );

});


/* ==========================================================
   18. KEYBOARD ESCAPE MENU
   ========================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      navMenu &&
      menuToggle
    ) {

      navMenu.classList.remove(
        "open"
      );

      menuToggle.classList.remove(
        "active"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );

    }

  }
);


/* ==========================================================
   19. RESET MOBILE MENU ON RESIZE
   ========================================================== */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 900 &&
      navMenu &&
      menuToggle
    ) {

      navMenu.classList.remove(
        "open"
      );

      menuToggle.classList.remove(
        "active"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );

    }

  }
);


/* ==========================================================
   20. INITIAL WEBSITE STATE
   ========================================================== */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "website-loaded"
    );

  }
);


/* ==========================================================
   NEXORA QUANTUM
   IDEAS → ROBOTS → A BETTER TOMORROW
   ========================================================== */
