'use strict';

const questionSet = [
  { 
    number: 1,
    text: 'Who is the starting running back for the Dallas Cowboys?',
    ans1: 'Melvin Gordon',
    ans2: 'Ezekiel Elliot', 
    ans3: 'Alvin Kamara', 
    ans4: 'LeVeon Bell'
  }, 

  {
    number: 2,
    text: 'How many Super Bowls have the Cowboys won?',
    ans1: '2', 
    ans2: '3', 
    ans3: '4', 
    ans4: '5'
  }, 

  {
    number: 3,
    text: 'What round did Dak Prescott get drafted in the 2016 NFL Draft?',
    ans1: '5', 
    ans2: '1', 
    ans3: '2', 
    ans4: '4'
  }, 
  {
    number: 4, 
    text: 'What year did the Dallas Cowboys debut in the NFL?',
    ans1: '1958', 
    ans2: '1960', 
    ans3: '1962', 
    ans4: '1964'
  }, 
  {
    number: 5,
    text: 'What year did the Dallas Cowboys win their first Super Bowl?',
    ans1: '1969', 
    ans2: '1971', 
    ans3: '1973', 
    ans4: '1977'
  }, 
  {
    number: 6,
    text: 'How many Dallas Cowboys Players are in the Hall of Fame?',
    ans1: '15', 
    ans2: '20 ', 
    ans3: '23', 
    ans4: '26'
  }, 
  {
    number: 7,
    text: 'Which player holds the Dallas Cowboys record for most receiving yards?"',
    ans1: 'Michael Irvin', 
    ans2: 'Jason Witten', 
    ans3: 'Terrell Owens', 
    ans4: 'Drew Pearson'
  }, 
  {
    number: 8,
    text: 'What college did Dak Prescott attend?',
    ans1: 'Ohio State University', 
    ans2: 'Louisiana State University', 
    ans3: 'University of Texas at Austin', 
    ans4: 'Mississippi State University'
  }, 
  {
    number: 9,
    text: 'Which player holds the Dallas Cowboys record for most passing yards?',
    ans1: 'Tony Romo', 
    ans2: 'Troy Aikman', 
    ans3: 'Danny White', 
    ans4: 'Roger Staubach'
  }, 
  {
    number: 10,
    text: 'What team did the Dallas Cowboys beat in Super Bowl XXX',
    ans1: 'Denver Broncos', 
    ans2: 'Pittsburgh Steelers', 
    ans3: 'Buffalo Bills', 
    ans4: 'New England Patriots'
  }
];

const ANSWERS = [ 
  'Ezekiel Elliot', 
  '5', 
  '4', 
  '1960', 
  '1971', 
  '23', 
  'Michael Irvin', 
  'Mississippi State University', 
  'Tony Romo', 
  'Pittsburgh Steelers'
];

let questionNum = 1;

let trueAnswers = 0;

function questionTemplate(trueAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${trueAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(trueAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;
    
    trueAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];
  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(trueAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}


function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>CORRECT!! ONE STEP CLOSER TO BEING A DALLAS COWBOYS GURU</h2>
    <img src="https://media1.tenor.com/images/ccb65cac7a61054200c35430d4c2dcaf/tenor.gif?itemid=9821998" alt="Ezekiel Elliot Feed Me">
    <button id="js-next-button">Next</button>
  </section>
`;


function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>INCORRECT. THE CORRECT ANSWER WAS ${ANSWERS[questionNum - 1]}!</h2>
      <img src="https://media1.giphy.com/media/3oFzm1E9VzECpiy9uE/giphy.gif" alt="Wrong Answer What">
      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  trueAnswers++;
}


function createResultsPage(trueAnswers) {
  $('#container').html(`
    <section id="final-page">
      <h2>You scored a ${trueAnswers} out of 10!</h2>
      <button id="js-restart-button">Play Again?</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();

