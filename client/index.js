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
        localStorage.setItem("words", JSON.stringify(words.json())); 
    } catch (error) {
        console.log(error);
    }
}

async function getPhrases() {
    const url = "http://localhost:8080/phrases/en_fr/"
    try {
        const phrases = await fetch(url);
        localStorage.setItem("phrases", phrases.json())
    } catch (error) {
        console.log(error);
    }
}

async function renderWords(startI) {
        var words = localStorage.getItem("words");  
        if (!words)    await getWords();
        words = JSON.parse(words)
        
        textHolders.forEach((text, i) => {
        text.innerText = words[i + startI][0]
    })
    firstTitle.innerText = "French"
    scndTitle.innerText = "English"
}
async function renderPhrases(startI) {
    var phrases = localStorage.getItem("phrases");  
        if (!phrases)    {
            await getPhrases();
            console.log('went from here');
            
            var phrases = localStorage.getItem("phrases");  
        }
        phrases = JSON.parse(phrases)
        console.log("rendrPHrases");
        textHolders.forEach((text, i) => {
        text.innerText = phrases[(i + startI)][0]
    })
    firstTitle.innerText = "English"
    scndTitle.innerText = "French"
}


verifyBtn.addEventListener('click', e => {
    e.preventDefault();
    if (firstTitle.innerText === "English") 
        var rightAnswers = localStorage.getItem("phrases");  
        
    else
        var rightAnswers = localStorage.getItem("words");  

    rightAnswers = JSON.parse(rightAnswers)
    answers.forEach((answer, i) => { 
        console.log(rightAnswers[i][1]);
        if(answer.value.toLowerCase().trim() !== rightAnswers[i][1].toLowerCase().trim()){
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
        updateAnswers()  
    }
    else{
        hideAnswers()
    }
})
wordsFrtoEnbtn.addEventListener("click", e => {
    mainMenu.style.display = "none";
    hero.style.display = "block";
    renderWords(0)
})

phFrToEnBtn.addEventListener("click", e => {
    mainMenu.style.display = "none";
    hero.style.display = "block";
    renderPhrases(0)
})


mainBtn.addEventListener("click", e => {
    e.preventDefault();
    hero.style.display = "none";
    mainMenu.style.display = "block";
    pageNum.innerText = "Page "+ (1) + "/4"

})


const pageNum = document.querySelector('.pagination');
const MAX_PAGE_NUM = 4;

nextBtn.addEventListener("click", e => {
    e.preventDefault()
    hideAnswers()
    let curPageNum = pageNum.innerText[5];
    if (firstTitle.innerText === "English"){
        switch (curPageNum) {
            case "1":
                pageNum.innerText = "Page "+ (+curPageNum + 1) + "/4"
                renderPhrases(5)
                break;
            case "2":
                pageNum.innerText = "Page "+ (+curPageNum + 1) + "/4"
                renderPhrases(10)
                break;
            case "3":
                pageNum.innerText = "Page "+ (+curPageNum + 1) + "/4"
                renderPhrases(15)
                break;
            case "4":
                pageNum.innerText = "Page "+ (1) + "/4"
                renderPhrases(0)
                break;
        
            default:
                break;
        }
    }else{
        switch (curPageNum) {
            case "1":
                pageNum.innerText = "Page "+ (+curPageNum + 1) + "/4"
                renderWords(5)
                break;
            case "2":
                pageNum.innerText = "Page "+ (+curPageNum + 1) + "/4"
                renderWords(10)
                break;
            case "3":
                pageNum.innerText = "Page "+ (+curPageNum + 1) + "/4"
                renderWords(15)
                break;
            case "4":
                pageNum.innerText = "Page "+ (1) + "/4"
                renderWords(0)
                break;
        
            default:
                break;
    }

}})

function renderAnswers(rightAnswers, startI) {
    rightAnswers = JSON.parse(rightAnswers)
        feedbacks.forEach((feedback, i) => {
            feedback.style.color = 'black'
            feedback.innerText = rightAnswers[i + startI][1]
        })   
} 

function updateAnswers(rightAnswers) {
    if (firstTitle.innerText === "English")
        var rightAnswers = localStorage.getItem("phrases");  
    else
        var rightAnswers = localStorage.getItem("words");
          
        let curPageNum = pageNum.innerText[5];
            switch (curPageNum) {
                case "1":
                    renderAnswers(rightAnswers, 0)
                    break;
                case "2":
                    renderAnswers(rightAnswers, 5)
                    break;
                case "3":
                    renderAnswers(rightAnswers, 10)
                    break;
                case "4":
                    renderAnswers(rightAnswers, 15)
                    break;
            
                default:
                    break;
            }
}
function hideAnswers() {
    feedbacks.forEach((feedback, i) => {
        feedback.style.color = 'black'
        feedback.innerText = "";

    })
}















