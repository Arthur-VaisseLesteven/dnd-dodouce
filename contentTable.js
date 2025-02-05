
class contentTable extends HTMLElement {
    columns;

    constructor() {
        super();

        this.innerHTML = `
        <style>
        content-table > .content-table-row {
            cursor: pointer;
        }
        
        content-table > .content-table-search {
            position: relative;
            top: 50px;
            left: 5px
        }
        content-table > .content-table-search-glass {
            position: relative;
            top: 50px;
            left: -22px
        }
        </style>
        <div class="w3-container">
            <div>
              <input type="text" placeholder="Filtrer" class="w3-margin-bottom content-table-search">
              <i class="fa-solid fa-magnifying-glass w3-text-black content-table-search-glass"></i>
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
        this.getRootNode().getElementById('search').onkeyup = () => this.filterContent();
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
        this.getRootNode().getElementById("headers").innerHTML = '<tr>' + this.columns.map(column => `<th>${column}</th>`).join('') + '</tr>';
    }

    /**
     * @param content.href      link to the content page
     * @param content.label     label of the content
     * @param content.source    source that content comes from
     */
    addContent(content) {
        this.getRootNode().getElementById("table").insertAdjacentHTML('beforeend', this.buildContentLine(content))
    }

    buildContentLine(content) {
        return `<tr class="content-table-row" onclick="location.href=\'${content.href}\'">` + this.columns.map(column => `<td>${content[column]}</td>`).join('') + '</tr>';
    }

    filterContent() {
        for (let contentLine of this.shadowRoot.querySelectorAll('tbody > tr')) {
            contentLine.style.display = this.matchSearch(contentLine) ? 'table-row' : 'none';
        }
    }

    matchSearch(contentLine) {
        return contentLine.textContent.toLowerCase().includes(this.getRootNode().getElementById("search").value.toLowerCase());
    }
}

customElements.define('content-table', contentTable);