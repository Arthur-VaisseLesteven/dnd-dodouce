
class contentTable extends HTMLElement {
    columns;

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

        this.columns = this.buildColumnsFromAttributes();
        this.buildHeaderLine();
        this.shadowRoot.getElementById('search').onkeyup = () => this.filterContent();
    }

    buildColumnsFromAttributes() {
        let columns = [],
            counter = 0;

        do {
            counter += 1;
            if (this.hasAttribute(`column-${counter}`)) {
                columns.push(this.getAttribute(`column-${counter}`));
            }
        } while (columns.length === counter);

        return columns;
    }

    buildHeaderLine() {
        this.shadowRoot.getElementById("headers").innerHTML = '<tr>' + this.columns.map(column => `<th>${column}</th>`).join('') + '</tr>';
    }

    /**
     * @param content.href      link to the content page
     * @param content.label     label of the content
     * @param content.source    source that content comes from
     */
    addContent(content) {
        this.shadowRoot.getElementById("table").insertAdjacentHTML('beforeend', this.buildContentLine(content))
    }

    buildContentLine(content) {
        return `<tr onclick="location.href=\'${content.href}\'">` + this.columns.map(column => `<td>${content[column]}</td>`).join('') + '</tr>';
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