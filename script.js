const quizData = [
    {
      question: '1. First version of CSS was invented in -',
      options: ['1998', '1996', '2000', '1994'],
      answer: '1996',
    },
    {
      question: '2.Which of the following properties in CSS3 is used to create a smooth transition effect between two different property values over a specified duration?',
      options: ['transition', 'transform', 'animation', 'flex'],
      answer:'transition'
    },
    {
      question: '3.Which CSS property is used to specify the spacing between lines of text?',
      options: ['margin', 'padding', 'line height', 'letter spacing'],
      answer: 'line height',
    },
    {
      question: '4. What does CSS stand for? ',
      options: ['Cascading Style Sheets', 'Creative Style Sheets', 'Central Style Sheets', 'Colorful Style Sheets'],
      answer: 'Cascading Style Sheets',
    },
    {
      question: '5. Which CSS3 property is used to apply a shadow effect to text?',
      options: [
        'text-shadow',
        'box-shadow',
        'shadow',
        'font-shadow',
      ],
      answer: 'text-shadow',
    },
    {
      question: '6.Which CSS property is used to control the space between elements in a flexible or grid layout? ',
      options: ['margin', 'paddling', 'gap', 'space'],
      answer: 'gap',
    },
    {
      question: '7. Which CSS3 feature allows for the creation of complex animations without the need for JavaScript?',
      options: [
        'Transitions',
        ' Keyframes',
        'Transforms',
        'Animations',
      ],
      answer: 'Animations',
    },
    {
      question: '8. Which CSS property is used to specify the style of a border?',
      options: ['border-style', 'border', 'border-color', 'border-width'],
      answer: 'border-style',
    },
    {
      question: '9.Which CSS3 property is used to make text or images responsive to different screen sizes? ',
      options: [
        'media',
        'responsive',
        'flexbox',
        '@media',
      ],
      answer: '@media',
    },
    {
      question: '10. Which CSS property is used to change the color of text within an element?',
      options: ['color', 'text-color', 'font-color', 'fill'],
      answer: 'color',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();