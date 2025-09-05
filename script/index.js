// Fetch all the lesson from API
const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(lessons => displayLessons(lessons.data));
};

loadLessons();

// Display each lesson to different button
const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerText = '';

    lessons.forEach(element => {
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
        <button id="lesson-btn-${element.level_no}" class="btn btn-outline btn-primary lesson-button" 
            onclick="loadCardWord(${element.level_no})">
            <i class="fa-solid fa-book-open"></i> Lesson - ${element.level_no}
        </button>
        `
        levelContainer.append(buttonDiv);
    });
}

// Deselection of all button UI
const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-button');
    lessonButtons.forEach(button => button.classList.remove('active'));
}

// Fetch each word from API
const loadCardWord = (id) => {
    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickedButton = document.getElementById(`lesson-btn-${id}`);

        // Clicked Button Selection UI
        clickedButton.classList.add('active');
        displayWordCard(data.data)
    });
}

// Display each word to different card
const displayWordCard = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerText = '';

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <!-- Early Message to the User to Select a Lesson -->
        <div class="font-bangla text-center col-span-3 rounded-xl py-10 space-y-6">
            <img src="./assets/alert-error.png" class="mx-auto" alt="">
            <p class="text-xl font-medium text-gray-400">এই <span class="font-poppins">Lesson</span> এ এখনো কোন <span class="font-poppins">Vocabulary</span> যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট <span class="font-poppins">Lesson</span> এ যান</h2>
        </div>
        `;
        manageSpinner(false);
        return;
    }    

    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card bg-white rounded-xl shadow-sm text-center pt-10 pb-7 px-5 space-y-4">
            <h2 class="text-2xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <p class="font-bangla">${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'Pronunciation পাওয়া যায়নি'}</p>
            <div class="flex justify-between items-center">               
                <button class="bg-[#1A91FF10] p-4 rounded-md hover:bg-[#1A91FF80]" 
                    onclick="loadWordDetail(${word.id})">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="bg-[#1A91FF10] p-4 rounded-md hover:bg-[#1A91FF80]"
                    onclick="pronounceWord('${word.word}')">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });

    manageSpinner(false);
}

// Pronounce Word Functionality
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// load word details from API
const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url)
    const details = await res.json();
    displayWordDetails(details.data);
}

// display the details of the word to a modal
const displayWordDetails = (word) => {

    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
    <div class="">
        <h2 class="text-2xl font-bold">
            ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})
        </h2>
    </div>
    <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p class="font-bangla">${word.meaning}</p>
    </div>
    <div class="">
        <h2 class="font-bold">Example</h2>
        <p class="text-gray-600">${word.sentence}</p>
    </div>
    <div class=""> 
        <h2 class='font-bold'>Synonym</h2>          
        <div>${allSynonym(word.synonyms)}</div>
    </div>
    `
    document.getElementById('modal').showModal();
}

// return all synonym as string of HTML elements to the modal of word details
const allSynonym = (synonyms) => {
    const synonym = synonyms.map(element => `<span class='btn bg-[#1A91FF10]' onclick="pronounceWord('${element}')">${element}</span>`);
    return synonym.join(' ');
}

// Spinner Functionality [while loading data of word of lesson from API]
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    } else {
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}

// Search Button Functionality
document.getElementById('btn-search').addEventListener('click', () => {
    removeActive();
    const intput = document.getElementById('search-value');
    const searchValue = intput.value.trim().toLowerCase();
    console.log(searchValue);

    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;
        const filterWords = allWords.filter(words => words.word.toLowerCase().includes(searchValue));
        displayWordCard(filterWords);
    });
});