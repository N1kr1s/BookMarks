"use strict";
class BookmarkMaker {
    constructor() {
        this.localArray = [];
        this.modal = document.getElementById('modal');
        this.showModal = document.getElementById('show-modal');
        this.closeModal = document.getElementById('close-modal');
        this.bookmarkForm = document.getElementById('bookmark-form');
        this.bookmarksContainer = document.getElementById('bookmarks-container');
        this.getLocalAndRender();
        this.showModal.addEventListener('click', () => {
            this.modalOpen();
        });
        this.closeModal.addEventListener('click', () => {
            this.modalClose();
        });
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal)
                this.modalClose();
        });
        this.bookmarkForm.addEventListener('submit', this.submitForm.bind(this));
    }
    modalOpen() {
        this.modal.classList.add('show-modal');
    }
    modalClose() {
        this.modal.classList.remove('show-modal');
    }
    submitForm(e) {
        e.preventDefault();
        const target = e.target;
        const websiteName = target[0].value;
        const websiteURL = target[1].value;
        // *Saving to local storage
        this.setLocal(websiteName, websiteURL);
        this.getLocalAndRender();
    }
    setLocal(websiteName, websiteURL) {
        const id = 'id' + Math.random().toString(16).slice(2);
        this.localArray.push({ websiteName, websiteURL, id });
        localStorage.setItem('collection', JSON.stringify(this.localArray));
    }
    getLocalAndRender() {
        const locStorData = JSON.parse(localStorage.getItem('collection'));
        this.localArray = locStorData;
        this.bookmarksContainer.innerText = '';
        this.localArray.forEach((item) => {
            const { websiteName, websiteURL, id } = item;
            const nodeToAppend = document.createElement('div');
            nodeToAppend.classList.add('item');
            nodeToAppend.innerHTML = `
     <i class="fa-solid fa-circle-xmark original"
      title="delete bookmark"
      id="${id}"></i>
      <div class="name">
      <img src="favicon.ico" alt="favicon" />
      <a href="https://${websiteURL}" target="_blank">${websiteName}</a>
      </div> 
      `;
            this.addListener(nodeToAppend);
            this.bookmarksContainer.appendChild(nodeToAppend);
        });
    }
    addListener(node) {
        node.children[0].addEventListener('click', (e) => {
            this.localArray = this.localArray.filter((item) => {
                return item.id !== e.target.id;
            });
            localStorage.setItem('collection', JSON.stringify(this.localArray));
            this.getLocalAndRender();
        });
    }
}
const bookmarkMaker = new BookmarkMaker();
