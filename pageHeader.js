
class PageHeader extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
        <div class="w3-container w3-center w3-row">
            <a href="${document.location.origin}/dnd-dodouce/index.html"><img src="${document.location.origin}/dnd-dodouce/imgs/banner.svg" width="60%" class="w3-center"></a>
        </div>
        `
    }
}

customElements.define('page-header', PageHeader);