const content = (shadowRoot) => {
    const nav = shadowRoot.getElementById("nav");
    const ul = shadowRoot.getElementById("ul");
    const fetchJson = async () => {
        try {
            let response = await fetch('/client/getAll');
            let parsedList = await response.json();
            return parsedList
        } catch (err) {
            console.error(err)
        }
    }
    const output = ({ name }) => {
        return `<li> ${name} </li>`
    }

    const renderList = async (category) => {
        try {
            let data = await fetchJson();
            data.forEach(function (item) {
                item.category == category ? ul.innerHTML += output(item) : null;
            });

        } catch (err) {
            console.error(err)
        }
    }
    const makeButton = (catsArray) => {
        for (let category of catsArray) {
            let name = category;
            let btn = document.createElement('button')
            btn.textContent = name;
            nav.append(btn)
            btn.addEventListener('click', () => {
                ul.innerHTML = '';
                renderList(name);
                for (let b of [...nav.children]) {
                    b.disabled = false;
                }
                btn.disabled = true;
            });
        }
    }
    const renderMenu = async () => {
        let menuCategory = [];
        try {
            let getList = await fetchJson();
            for (let obj of getList) {
                menuCategory.push(obj.category)
            }
            makeButton([...new Set(menuCategory)]);

        } catch (err) {
            console.error(err)
        }
    }

    renderMenu()
}
export default content