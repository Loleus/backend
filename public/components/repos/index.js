export default class Repos extends HTMLElement {
  static get observedAttributes() { return ["loading"]; }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  }
  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  }
  async getRepos(url) {
    this.loading = true;
    const response = await fetch(url, { mode: 'cors' });
    const temp = await fetch("/components/repos/template.html")
    const tempStream = await temp.text()
    this.base = tempStream;
    const json = await response.json();
    this.reps = json;
    this.tmp = document.createElement('template');
    this.tmp.innerHTML += this.base
    this.setRepos(); 
    this.loading = false;
  }
  async connectedCallback() {
    this.shadowRoot.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.cancelBubble = true;
    },true);
    await this.getRepos("https://api.github.com/users/Loleus/repos");
  }
  disconnectedCallback() { }

  setRepos() {
    let i = 1;
    this.reps.map(repo => {
      if (repo.name != "loleus.github.io") {
        this.tmp.content.getElementById("repos").innerHTML += `
          <tr>
            <td id="no">${i++}</td>
            <td id="name"><a target="_blank" href="https://loleus.github.io/${repo.name}">${repo.name}</a></td>
            <td id="type">${repo.description}</td>
            <td id="lang">${repo.language}</td>
          </tr>
            `
      }
    }).join("")
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }
  render() {

    if (this.loading) {
      this.shadowRoot.innerHTML = `Loading...`;
    } else {
      this.shadowRoot.innerHTML = ``;
      this.shadowRoot.appendChild(this.tmp.content.cloneNode(true));
    }
  }
};
