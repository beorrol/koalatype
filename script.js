const englishSentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Actions speak louder than words.",
    "Easy come, easy go.",
    "Fortune favors the bold.",
    "The early bird catches the worm.",
    "A watched pot never boils.",
    "Curiosity killed the cat.",
    "Don't count your chickens before they hatch.",
    "Hindsight is 20/20.",
    "It's a piece of cake.",
    "No pain, no gain.",
    "On thin ice.",
    "Raining cats and dogs.",
    "Slow and steady wins the race.",
    "Under the weather.",
    "Variety is the spice of life.",
    "You can't judge a book by its cover.",
    "She sells sea shells by the seashore.",
    "Bite the bullet.",
    "Jump on the bandwagon.",
    "Keep your eyes peeled.",
    "Let the cat out of the bag.",
    "Make a long story short.",
    "Put all your eggs in one basket.",
    "The early bird catches the worm.",
    "When it rains, it pours.",
    "You can't judge a book by its cover.",
    "The Mississippi River is the second-longest river in the United States, flowing from Lake Itasca in Minnesota to the Gulf of Mexico.",
    "The Statue of Liberty, located in New York Harbor, was a gift from France to commemorate the centennial of American independence.",
    "In the 20th century, the United States became a global superpower, with significant influence in politics, economics, and culture.",
    "The Great Depression of the 1930s was a severe worldwide economic downturn that significantly impacted the United States.",
    "The American Civil War, fought from 1861 to 1865, was a conflict primarily over the issue of slavery in the United States.",
    "NASA's Apollo program successfully landed humans on the Moon, with the first moon landing by Apollo 11 in 1969.",
    "The United States Constitution, ratified in 1788, established the framework of government for the newly independent United States.",
    "The Golden Gate Bridge, located in San Francisco, California, is one of the most famous suspension bridges in the world.",
    "The Declaration of Independence, adopted on July 4, 1776, proclaimed the thirteen American colonies' independence from Great Britain.",
    "The American Revolution, spanning from 1775 to 1783, resulted in the thirteen American colonies gaining independence from Great Britain."
];

const koreanSentences = [
    "오늘 날씨가 정말 좋네요.",
    "사랑은 모든 것을 이기는 힘이에요.",
    "우리는 함께 가는 길을 선택했어요.",
    "내일 일정이 정말 바쁘네요.",
    "그 영화는 정말 감동적이었어요.",
    "미래에 대한 계획을 세워야 해요.",
    "학생들이 시험에서 잘 성적을 받았어요.",
    "그는 정말 신중한 사람이에요.",
    "오늘의 뉴스는 무척 중요한 내용이었어요.",
    "삶은 짧고 예술은 길어요.",
    "가족들과 함께 보내는 시간이 소중해요.",
    "나의 꿈을 이루기 위해 노력할 거예요.",
    "자신감 있는 모습을 보여주세요.",
    "우리 모두는 평화롭게 살고 싶어요.",
    "그는 참된 리더가 될 수 있어요.",
    "새로운 시작을 함께할 수 있어서 기쁘네요.",
    "긍정적인 마음가짐으로 살아가야 해요.",
    "우리는 단단한 결실을 맺을 거예요.",
    "지금 이 순간이 가장 소중해요.",
    "시간은 금이에요.",
    "나는 내일의 나를 믿어요.",
    "세상은 넓고 배울 것이 많아요.",
    "모든 사람은 존중받을 권리가 있어요.",
    "성공을 향한 여정은 한 발 한 발 나아가야 해요."
];

let currentSentenceIndex;
let originalSentences;
let startTime;
let wordsTyped = 0;

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', startGame);
document.getElementById('userInput').addEventListener('input', compareInput);

function startGame() {
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const language = document.getElementById('languageSelect').value;
    
    if (language === 'english') {
        originalSentences = includeNumbers ? englishSentences.concat(getSentencesWithNumbers(englishSentences)) : englishSentences.slice();
    } else if (language === 'korean') {
        originalSentences = includeNumbers ? koreanSentences.concat(getSentencesWithNumbers(koreanSentences)) : koreanSentences.slice();
    }

    currentSentenceIndex = Math.floor(Math.random() * originalSentences.length);
    displaySentence();
    startTime = new Date();
    wordsTyped = 0;
    updateWordCount();
}

function getSentencesWithNumbers(sentences) {
    const sentencesWithNumbers = [];
    const numberRegex = /\d+/;

    sentences.forEach(sentence => {
        if (numberRegex.test(sentence)) {
            sentencesWithNumbers.push(sentence);
        }
    });

    return sentencesWithNumbers;
}

function displaySentence() {
    document.getElementById('sentence').textContent = originalSentences[currentSentenceIndex];
    document.getElementById('userInput').value = '';
}

function compareInput() {
    const userInput = document.getElementById('userInput').value;
    const originalSentence = originalSentences[currentSentenceIndex];

    if (userInput === originalSentence) {
        const endTime = new Date();
        const minutesPassed = (endTime - startTime) / 60000;
        const wordsPerMinute = Math.round(wordsTyped / minutesPassed);

        displayResult(`Completed! Your WPM: ${wordsPerMinute}`);
        document.getElementById('restartButton').style.display = 'inline-block';
    } else if (originalSentence.startsWith(userInput)) {
        document.getElementById('sentence').innerHTML = `<span style="color: white;">${userInput}</span>${originalSentence.substring(userInput.length)}`;
    } else {
        let displaySentence = '';

        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === originalSentence[i]) {
                displaySentence += `<span style="color: white;">${userInput[i]}</span>`;
            } else {
                displaySentence += `<span style="color: red;">${userInput[i]}</span>`;
            }
        }

        displaySentence += originalSentence.substring(userInput.length);
        document.getElementById('sentence').innerHTML = displaySentence;
    }
}

function displayResult(message) {
    document.getElementById('result').textContent = message;
}

function updateWordCount() {
    wordsTyped = document.getElementById('userInput').value.trim().split(/\s+/).length;
}

document.getElementById('restartButton').style.display = 'none';