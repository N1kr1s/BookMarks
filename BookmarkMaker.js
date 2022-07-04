"use strict";
class BookmarkMaker {
    constructor() {
        this.localArray = [];
        this.modal = document.getElementById('modal');
        this.showModal = document.getElementById('show-modal');
        this.closeModal = document.getElementById('close-modal');
        this.bookmarkForm = document.getElementById('bookmark-form');
        this.bookmarksContainer = document.getElementById('bookmarks-container');
        this.error = document.getElementById('error');
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
        let websiteName = target[0].value;
        let websiteURL = target[1].value;
        //*small-anti xss
        websiteName = websiteName.replace(/[<>]+/gi, '');
        //* valid email check
        if (/^(https?:\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(websiteURL)) {
            if (websiteURL.includes('https://') || websiteURL.includes('http://')) {
                websiteURL = websiteURL.replace(/https?:\/\//gi, '');
            }
            this.error.style.display = 'none';
            // *Saving to local storage
            this.setLocal(websiteName, websiteURL);
            this.getLocalAndRender();
        }
        else {
            this.error.style.display = 'inline';
        }
    }
    setLocal(websiteName, websiteURL) {
        const id = 'id' + Math.random().toString(16).slice(2);
        this.localArray.push({ websiteName, websiteURL, id });
        localStorage.setItem('collection', JSON.stringify(this.localArray));
    }
    getLocalAndRender() {
        const locStorData = JSON.parse(localStorage.getItem('collection'));
        if (locStorData) {
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
      <img src="https://s2.googleusercontent.com/s2/favicons?domain=${websiteURL}&sz=32" alt="favicon" />
      <a href="https://${websiteURL}" target="_blank">${websiteName || 'Anonymous'}</a>
      </div> 
      `;
                this.addListener(nodeToAppend);
                this.bookmarksContainer.appendChild(nodeToAppend);
            });
        }
        else {
            return;
        }
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
