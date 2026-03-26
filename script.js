const inputArea = document.getElementById('in');
const outputArea = document.getElementById('out');

function translateToMurinsky(text) {
    if (!text) return "";

    let words = text.toLowerCase().split(/\s+/);

    const placeholders = [
        { reg: /пизда/gi, final: "пиздоси-бурмалдоси" },
        { reg: /хуй|хуя/gi, final: "хуй-бурмалдуй" },
        { reg: /мама\w*/gi, final: "мамость" },

        { reg: /салат\w*/gi, final: "салатик-бурмалдатик" },
        { reg: /пельмен\w*/gi, final: "пельмешки-бурмалдешки" },
        { reg: /пив\w*/gi, final: "пивко-бурмалдко" },
        { reg: /водк\w*/gi, final: "водочка-бурмалдочка" },
        { reg: /суп\w*/gi, final: "супчик-бурмалдчик" },
        { reg: /чипс\w*/gi, final: "чипсы-бурмалдыпсы" },

        { reg: /кот\w*/gi, final: "кот-бурмалдот" },
        { reg: /заяц\w*|зайц\w*/gi, final: "заяц-бурмалдаец" },
        { reg: /собак\w*|пёс\w*/gi, final: "пёс-бурмалдос" },
        { reg: /крыс\w*/gi, final: "крыса-бурмалдыса" },
        { reg: /хомяк\w*/gi, final: "хомяк-бурмалдак" },

        { reg: /квартир\w*/gi, final: "квартирка-бурмалдирка" },
        { reg: /машин\w*|тачк\w*/gi, final: "тачка-бурмалдачка" },
        { reg: /телефон\w*/gi, final: "трубка-бурмалдубка" },
        { reg: /комп\w*|пк/gi, final: "комп-бурмалдомп" },
        { reg: /стрим\w*/gi, final: "стрим-бурмалдим" },

        { reg: /чел\w*|человек\w*/gi, final: "чел-бурмалдел" },
        { reg: /батя\w*|отец\w*/gi, final: "батя-бурмалдя" },
        { reg: /лицо\w*|морда\w*/gi, final: "лицо-бурмалдо" },
        { reg: /рука\w*|руки/gi, final: "руки-бурмалдуки" },
        { reg: /голов\w*/gi, final: "голова-бурмалда" },
        { reg: /училка\w*/gi, final: "учиха" },
        { reg: /друг\w*/gi, final: "друн" },
        { reg: /друзья\w*/gi, final: "друны" },
        { reg: /друзей\w*/gi, final: "друнов" },
        { reg: /смеяться\w*/gi, final: "сметана" },
        { reg: /смеятся\w*/gi, final: "сметана" },
        { reg: /дед\w*/gi, final: "дод" },
        { reg: /прадед\w*/gi, final: "прадод" },
        { reg: /прапрадед\w*/gi, final: "прапрадод" },
        { reg: /прапрапрадед\w*/gi, final: "прапрапрадод" },

        { reg: /я\w*/gi, final: "ч" },

        { reg: /меллстрой|mellstroy/gi, final: "мерстрой" },
        { reg: /сын/gi, final: "сыр" },
        { reg: /деньги|бабки|лавэ/gi, final: "дерьги" },
        { reg: /мурино/gi, final: "муриро" }
    ];

    let processedWords = words.map(word => {
        let currentWord = word;
        let isBurmalda = false;

        // 1. Проверяем на Бурмалду
        for (let item of placeholders) {
            if (currentWord.match(item.reg)) {
                currentWord = item.final;
                isBurmalda = true;
                break;
            }
        }

        // 2. Если не Бурмалда — добавляем "-ость" (только для существительных/прилагательных > 3 букв)
        if (!isBurmalda && currentWord.length > 3) {
            // Если слово заканчивается на согласную — добавляем -ость
            if (/[бвгджзйклмнпрстфхцчшщ]$/.test(currentWord)) {
                currentWord += "ость";
            }
            // Если на гласную — заменяем её или просто добавляем (упрощенно)
            else if (/[аеёиоуыэюя]$/.test(currentWord)) {
                currentWord = currentWord.slice(0, -1) + "ость";
            }
        }

        // 3. Фонетика Мурино (Л -> Р и т.д.)
        // ВАЖНО: Применяем только если это НЕ бурмалда
        if (!isBurmalda) {
            currentWord = currentWord
                .replace(/л/g, "р")
                .replace(/ч/g, "щ")
                .replace(/ться\b|тся\b/g, "ца")
                .replace(/ть\b/g, "т");
        }

        // Отдельные замены для мелких слов
        if (currentWord === "что") currentWord = "що";
        if (currentWord === "я") currentWord = "ч";
        if (currentWord === "мурино") currentWord = "муриро";

        return currentWord;
    });

    let res = processedWords.join(" ");
    return res.charAt(0).toUpperCase() + res.slice(1);
}

inputArea.addEventListener('input', () => {
    outputArea.value = translateToMurinsky(inputArea.value);
});