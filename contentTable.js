
class contentTable extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" }).innerHTML = `
        <link rel="stylesheet" href="styles/w3.css">
        <link rel="stylesheet" href="styles/dodouce.css">
        <link href="styles/fontawesome/css/fontawesome.css" rel="stylesheet" />
        <link href="styles/fontawesome/css/solid.css" rel="stylesheet" />
        <div class="w3-container">
            <div>
              <input id="search" type="text" placeholder="Filtrer" class="w3-margin-bottom table-search">
              <i class="fa-solid fa-magnifying-glass w3-text-black table-search-glass"></i>
            </div>
            <table class="w3-table w3-border w3-hoverable w3-centered w3-card">
                <thead id="headers">
                </thead>
                <tbody id="table">
                </tbody>
            </table>
        </div>`

        this.addHeaderLine();
        this.shadowRoot.getElementById('search').onkeyup = () => this.filterContent();
    }

    addHeaderLine() {
        if (this.hasAttribute("content")) {
            let content = this.getAttribute("content");
            this.shadowRoot.getElementById("headers").innerHTML = this.hasSourceColumn() ? `<tr><th>${content}</th><th>Source</th></tr>` : `<tr><th>${content}</th></tr>`;
        }
    }

    /**
     * @param content.href      link to the content page
     * @param content.label     label of the content
     * @param content.source    source that content comes from
     */
    addContent(content) {
        if (this.hasSourceColumn()) {
            this.shadowRoot.getElementById("table").insertAdjacentHTML('beforeend', `<tr onclick="location.href=\'${content.href}\'"><td>${content.label}</td><td>${content.source}</td></tr>`);
        } else {
            this.shadowRoot.getElementById("table").insertAdjacentHTML('beforeend', `<tr onclick="location.href=\'${content.href}\'"><td>${content.label}</td></tr>`);
        }
    }

    hasSourceColumn(){
        if (this.hasAttribute("sources-column")) {
            return this.getAttribute("sources-column") === true;
        } else {
            return true;
        }
    }

    filterContent() {
        for (let contentLine of this.shadowRoot.querySelectorAll('tbody > tr')) {
            contentLine.style.display = this.matchSearch(contentLine) ? 'table-row' : 'none';
        }
    }

    matchSearch(contentLine) {
        return contentLine.textContent.toLowerCase().includes(this.shadowRoot.getElementById("search").value.toLowerCase());
    }

}

customElements.define('content-table', contentTable);