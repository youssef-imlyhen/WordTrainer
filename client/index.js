const textHolders = document.querySelectorAll('.word');
const answers = document.querySelectorAll('.tr-input');
const feedbacks = document.querySelectorAll('.feedback');
const verifyBtn = document.querySelector('.btn-pr');
const togleAnswers = document.querySelector('.btn-show-hide');
const next = document.querySelector('.btn-next');
const wordsFrtoEnbtn = document.querySelector('.btn-option1');
const firstTitle = document.querySelector('.title1');
const scndTitle = document.querySelector('.title2');
const nextBtn = document.querySelector('.btn-next');
const mainBtn = document.querySelector('.btn-main-menu');

const phFrToEnBtn = document.querySelector('.btn-option2');
const mainMenu = document.querySelector('.main-menu')
const hero = document.querySelector('.hero');

async function getWords() {
    const url = "http://localhost:8080/words/fr_en/"
    try {
        const words = await fetch(url);
        return await words.json()
    } catch (error) {
    }
}

async function getPhrases() {
    const url = "http://localhost:8080/phrases/en_fr/"
    try {
        const words = await fetch(url);
        return await words.json()
    } catch (error) {
    }
}

async function renderWords() {
    let words = await getWords();
        console.log(words);
        textHolders.forEach((text, i) => {
        text.innerText = words[i][0]
    })
    firstTitle.innerText = "French"
    scndTitle.innerText = "English"
    localStorage.setItem("words", JSON.stringify(words));
    
}
async function renderPhrases() {
    let phrases = await getPhrases();
        console.log(phrases);
        textHolders.forEach((text, i) => {
        text.innerText = phrases[i][0]
    })
    firstTitle.innerText = "English"
    scndTitle.innerText = "French"
    localStorage.setItem("phrases", JSON.stringify(phrases))
}


verifyBtn.addEventListener('click', e => {
    e.preventDefault();
    if (firstTitle.innerText === "English") 
        var rightAsnwers = localStorage.getItem("phrases");  
        
    else
        var rightAsnwers = localStorage.getItem("words");  

    rightAsnwers = JSON.parse(rightAsnwers)
    answers.forEach((answer, i) => {
        if(answer.value !== rightAsnwers[i][1]){
            feedbacks[i].innerText = "wrong"
            feedbacks[i].style.color = 'red'
        }
        else{
            feedbacks[i].innerText = "true"
            feedbacks[i].style.color = 'green'
        }

    })
})
let isClicked = false;
togleAnswers.addEventListener("click",e => {
    e.preventDefault();
    isClicked = !isClicked;
    if (isClicked) {
        if (firstTitle.innerText === "English") 
            var rightAsnwers = localStorage.getItem("phrases");  
        
        else
            var rightAsnwers = localStorage.getItem("words");  

        rightAsnwers = JSON.parse(rightAsnwers)
        feedbacks.forEach((feedback, i) => {
            feedback.innerText = rightAsnwers[i][1]
            feedback.style.color = 'balck'
        })    
    }
    else{
        feedbacks.forEach((feedback, i) => {
            feedback.innerText = "feedback"+(i+1);
            feedback.style.color = 'balck'

        })
    }
})
wordsFrtoEnbtn.addEventListener("click", e => {
    mainMenu.style.display = "none";
    hero.style.display = "block";
    renderWords()
})

phFrToEnBtn.addEventListener("click", e => {
    mainMenu.style.display = "none";
    hero.style.display = "block";
    renderPhrases()
})


mainBtn.addEventListener("click", e => {
    e.preventDefault();
    hero.style.display = "none";
    mainMenu.style.display = "block";
})