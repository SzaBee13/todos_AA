const container = document.getElementById("container");
const input = document.getElementById("search");
const submit = document.getElementById("submit");

let data = [];

// Api kulcs: api-key-12345
fetch("https://aa-api.bluemin.de/todos", {
    headers: {
        "X-API-Key": "api-key-12345",
    },
}).then((res) =>
    res.json().then((resData) => {
        data = resData;
        renderData();
    })
);

let search = "";

input.addEventListener("input", (e) => {
    search = e.currentTarget.value;
});

function searchFunc(e=undefined) {
    if (e) {
        e.preventDefault();
    }

    fetch("https://aa-api.bluemin.de/todos?title=" + search, {
        headers: {
            "X-API-Key": "api-key-12345",
        },
    }).then((res) =>
        res.json().then((resData) => {
            data = resData;
            renderData();
        })
    );
}

input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        searchFunc(e);
    }
});
input.addEventListener('change', (e) => {
    searchFunc(e);
});
submit.addEventListener('click', (e) => {
    searchFunc(e);
});

function renderData() {
    container.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const card = document.createElement("div");

        card.classList.add("card");
        card.textContent = data[i].title;

        container.appendChild(card);
    }
}
