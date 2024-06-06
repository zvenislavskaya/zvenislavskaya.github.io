const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz {
    constructor(type, questions, results) {
        this.questions = questions;

        this.results = results;

        this.score = 0;

        this.result = 0;

        this.current = 0;
    }

    Click(index) {
        let value = this.questions[this.current].Click(index);
        this.score += value;

        let correct = -1;

        this.Next();

        return correct;
    }

    Next() {
        this.current++;

        if (this.current >= this.questions.length) {
            this.End();
        }
    }

    End() {
        for (let i = 0; i < this.results.length; i++) {
            if (this.results[i].Check(this.score)) {
                this.result = i;
            }
        }
    }
}

class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }

    Click(index) {
        return this.answers[index].value;
    }
}

class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}

class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
    Check(value) {
        if (this.value <= value) {
            return true;
        } else {
            return false;
        }
    }
}

const results = [new Result("Вы оффник", 0), new Result("Вы рейвер", 7), new Result("Вы анимешник", 11), new Result("Вы панк или эмо или гот", 14), new Result("Вы dead inside или альтушка", 18)];

const questions = [
    new Question("Кто вы? ", [new Answer("Экстраверт", 1), new Answer("Интроверт", 3), new Answer("Амбиверт", 2)]),

    new Question("Кого вы предпочтёте?", [new Answer("Miyagi & Andy Panda", 1), new Answer("CUPSIZE", 4), new Answer("NIRVANA", 3), new Answer("GSPD", 2)]),

    new Question("Что теперь выберите? ", [
        new Answer("Спортивки ааааа", 1),
        new Answer("Яркие удобные вещь, мб олимпийку деда", 2),
        new Answer("Чёрный лонгслив и мои любиые New Rockи", 5),
        new Answer("Чёрнорозовые шмотки или какие-нибудь рванные джисы с кожанной курткой", 4),
        new Answer("Миленькие юбочки и чулочки. кавай!!", 3),
    ]),

    new Question("Покрасили бы волосы или пирсинг или таут ", [new Answer("Да", 3), new Answer("Нет", 1), new Answer("Не знаю", 2)]),

    new Question("Расскажи немного о своих увлечениях.", [
        new Answer("Смотреть аниме", 4),
        new Answer("слушать музыку или играть на музыкальном инструменте.", 3),
        new Answer("Посещать концерты любимых групп и на всякие странные вечеринки", 2),
        new Answer("Играть с пацанами в футбол и плеваться на улице", 1),
    ]),

    new Question("Твоя самооценка?", [new Answer("Ниже плинтуса.", 3), new Answer("Нормальная. Себя надо любить ", 2), new Answer("Довольно высокая. Не, ну а чё, если я шикарна, а остальные - нет", 1)]),
];

const quiz = new Quiz(1, questions, results);

Update();

function Update() {
    if (quiz.current < quiz.questions.length) {
        headElem.innerHTML = quiz.questions[quiz.current].text;

        buttonsElem.innerHTML = "";

        for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
            let btn = document.createElement("button2");
            btn.className = "button2";

            btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

            btn.setAttribute("index", i);

            buttonsElem.appendChild(btn);
        }

        pagesElem.innerHTML = quiz.current + 1 + " / " + quiz.questions.length;

        Init();
    } else {
        buttonsElem.innerHTML = "";
        headElem.innerHTML = quiz.results[quiz.result].text;
    }
}

function Init() {
    let btns = document.getElementsByClassName("button2");

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (e) {
            Click(e.target.getAttribute("index"));
        });
    }
}

function Click(index) {
    let correct = quiz.Click(index);

    let btns = document.getElementsByClassName("button2");

    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "button2 passive";
    }

    {
        btns[index].className = "button2 activ";
    }

    setTimeout(Update, 1000);
}

