
const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(lessons => displayLessons(lessons.data));
};

loadLessons();

// Display lessons button Functionality
const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerText = '';

    lessons.forEach(element => {
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
        <button onclick="loadCardWord(${element.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${element.level_no}
        </button>
        `
        levelContainer.append(buttonDiv);
    });
}

// Display word Functionality
const loadCardWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => displayCardWord(data.data));
}

const displayCardWord = (words) => {
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
        return;
    }    

    words.forEach(word => {
        console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card bg-white rounded-xl shadow-sm text-center pt-10 pb-7 px-5 space-y-4">
            <h2 class="text-2xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <p class="font-bangla">${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'Pronunciation পাওয়া যায়নি'}"</p>
            <div class="flex justify-between items-center">               
                <button class="bg-[#1A91FF10] p-4 rounded-md hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="bg-[#1A91FF10] p-4 rounded-md hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    })
}