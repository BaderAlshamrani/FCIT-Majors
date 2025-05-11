const questions = [{"text": "I enjoy writing code and debugging programs.", "majors": ["cs", "se", "ai"]}, {"text": "I like designing visually appealing interfaces.", "majors": ["it", "is"]}, {"text": "Securing systems against hackers fascinates me.", "majors": ["cy"]}, {"text": "I enjoy analyzing large datasets to find patterns.", "majors": ["ds", "ai"]}, {"text": "Understanding computer hardware components interests me.", "majors": ["cs", "se"]}, {"text": "I like managing projects and coordinating teams.", "majors": ["is", "it"]}, {"text": "Studying algorithms and their efficiency excites me.", "majors": ["cs", "ai"]}, {"text": "I enjoy explaining technical concepts to others.", "majors": ["it", "is"]}, {"text": "Building smart systems that can learn interests me.", "majors": ["ai", "ds"]}, {"text": "I'm detail\u2011oriented and enjoy testing software.", "majors": ["se"]}, {"text": "Working with databases and information systems interests me.", "majors": ["is", "ds"]}, {"text": "I like developing mobile applications.", "majors": ["it", "cs"]}, {"text": "I'm interested in cloud computing infrastructure.", "majors": ["it", "cs"]}, {"text": "Mathematics and statistics are enjoyable subjects for me.", "majors": ["ds", "ai"]}, {"text": "I like solving user problems through technology.", "majors": ["is", "it"]}, {"text": "Computer graphics and animation fascinate me.", "majors": ["cs", "it"]}, {"text": "I prefer working close to business processes.", "majors": ["is"]}, {"text": "I enjoy researching new artificial intelligence techniques.", "majors": ["ai", "ds"]}, {"text": "Ethical hacking to find vulnerabilities interests me.", "majors": ["cy"]}, {"text": "System administration and computer networks interest me.", "majors": ["it", "cy"]}];
const majorsInfo = {"cs": {"name": "Computer Science", "desc": "Focuses on algorithms, programming, and the theoretical foundations of computing."}, "se": {"name": "Software Engineering", "desc": "Centers on designing, developing, and maintaining reliable software systems."}, "is": {"name": "Information Systems", "desc": "Bridges business needs with technology solutions and data management."}, "it": {"name": "Information Technology", "desc": "Emphasizes practical implementation of technology, networks, and system administration."}, "ai": {"name": "Artificial Intelligence", "desc": "Explores creating intelligent systems that can learn, reason, and solve problems."}, "ds": {"name": "Data Science", "desc": "Combines statistics, programming, and domain knowledge to extract insights from data."}, "cy": {"name": "Cybersecurity", "desc": "Protects systems and data from digital attacks and vulnerabilities."}};

let current = 0;
let scores = {};

const startBtn = document.getElementById('startBtn');
const quizContainer = document.getElementById('quizContainer');
const questionText = document.getElementById('questionText');
const choicesDiv = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const resultContainer = document.getElementById('resultContainer');
const majorName = document.getElementById('majorName');
const majorDesc = document.getElementById('majorDesc');
const restartBtn = document.getElementById('restartBtn');

startBtn.addEventListener('click', () => {
    startBtn.parentElement.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    initQuiz();
});

function initQuiz() {
    current = 0;
    scores = {};
    questions.forEach(q => {
        q.majors.forEach(m => scores[m] = 0);
    });
    showQuestion();
}

function showQuestion() {
    const q = questions[current];
    questionText.textContent = `Q${current+1}. ` + q.text;
    choicesDiv.innerHTML = '';
    ['Yes','No'].forEach(choice => {
        const div = document.createElement('div');
        div.className = 'choice';
        div.textContent = choice;
        div.addEventListener('click', () => selectChoice(div, choice === 'Yes'));
        choicesDiv.appendChild(div);
    });
    nextBtn.disabled = true;
}

let answered = false;
function selectChoice(el, isYes) {
    if(answered) return;
    answered = true;
    el.classList.add('selected');
    if(isYes){
        questions[current].majors.forEach(m => scores[m]++);
    }
    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    if(!answered) return;
    answered = false;
    current++;
    if(current < questions.length){
        showQuestion();
        nextBtn.textContent = 'Next';
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.classList.add('hidden');
    const bestMajor = Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);
    majorName.textContent = majorsInfo[bestMajor].name;
    majorDesc.textContent = majorsInfo[bestMajor].desc;
    resultContainer.classList.remove('hidden');
}

restartBtn.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    startBtn.parentElement.classList.remove('hidden');
    nextBtn.textContent = 'Next';
});
