
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
        <button onclick="loadLevelWord(${element.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${element.level_no}
        </button>
        `
        levelContainer.append(buttonDiv);
    });
}

// Display word Functionality
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data));
}

// {
//     "id": 73,
//     "level": 1,
//     "word": "Cat",
//     "meaning": "বিড়াল",
//     "pronunciation": "ক্যাট"
// }

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerText = '';

    words.forEach(word => {
        console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card bg-white rounded-xl shadow-sm text-center pt-10 pb-7 px-5 space-y-4">
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <p class="font-bangla">${word.meaning} / ${word.pronunciation}"</p>
            <div class="flex justify-between items-center">               
                <button class="bg-[#1A91FF10] p-4 rounded-md hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="bg-[#1A91FF10] p-4 rounded-md hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    })
}