const inputArea = document.getElementById('in');
const outputArea = document.getElementById('out');

function translateToMurinsky(text) {
    if (!text) return "";

    let res = text.toLowerCase();

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

        { reg: /я\w*/gi, final: "ч" },

        { reg: /меллстрой|mellstroy/gi, final: "мерстрой" },
        { reg: /сын/gi, final: "сыр" },
        { reg: /деньги|бабки|лавэ/gi, final: "дерьги" },
        { reg: /мурино/gi, final: "муриро" }
    ];

    placeholders.forEach((item, index) => {
        item.tempId = `___B${index}___`;
        res = res.replace(item.reg, item.tempId);
    });

    res = res
        .replace(/л/g, "р")
        .replace(/ч/g, "щ")
        .replace(/ться\b/g, "ца")
        .replace(/тся\b/g, "ца")
        .replace(/ть\b/g, "т")
        .replace(/\bчто\b/g, "що")
        .replace(/\bя\b/g, "ч");

    placeholders.forEach(item => {
        res = res.split(item.tempId).join(item.final);
    });

    return res;
}

inputArea.addEventListener('input', () => {
    outputArea.value = translateToMurinsky(inputArea.value);
});