interface LS {
  websiteName: string;
  websiteURL: string;
  id: string;
}

class BookmarkMaker {
  public modal: HTMLDivElement;
  public showModal: HTMLHeadingElement;
  public closeModal: HTMLElement;
  public bookmarkForm: HTMLFormElement;
  public bookmarksContainer: HTMLDivElement;
  public deletePost!: HTMLElement;
  public error: HTMLElement;
  public localArray: LS[] = [];

  constructor() {
    this.modal = document.getElementById('modal') as HTMLDivElement;
    this.showModal = document.getElementById(
      'show-modal'
    ) as HTMLHeadingElement;
    this.closeModal = document.getElementById('close-modal') as HTMLElement;
    this.bookmarkForm = document.getElementById(
      'bookmark-form'
    ) as HTMLFormElement;
    this.bookmarksContainer = document.getElementById(
      'bookmarks-container'
    ) as HTMLDivElement;
    this.error = document.getElementById('error') as HTMLElement;

    this.getLocalAndRender();

    this.showModal.addEventListener('click', () => {
      this.modalOpen();
    });

    this.closeModal.addEventListener('click', () => {
      this.modalClose();
    });

    this.modal.addEventListener('click', (e: Event) => {
      if (e.target === this.modal) this.modalClose();
    });

    this.bookmarkForm.addEventListener('submit', this.submitForm.bind(this));
  }

  modalOpen(): void {
    this.modal.classList.add('show-modal');
  }

  modalClose(): void {
    this.modal.classList.remove('show-modal');
  }

  submitForm(e: Event): void {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    let websiteName = (target[0] as HTMLInputElement).value;
    let websiteURL = (target[1] as HTMLInputElement).value;
    //*small-anti xss
    websiteName = websiteName.replace(/[<>]+/gi, '');
    //* valid email check
    if (
      /^(https?:\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(
        websiteURL
      )
    ) {
      if (websiteURL.includes('https://') || websiteURL.includes('http://')) {
        websiteURL = websiteURL.replace(/https?:\/\//gi, '');
      }
      this.error.style.display = 'none';
      // *Saving to local storage
      this.setLocal(websiteName, websiteURL);
      this.getLocalAndRender();
    } else {
      this.error.style.display = 'inline';
    }
  }

  setLocal(websiteName: string, websiteURL: string): void {
    const id = 'id' + Math.random().toString(16).slice(2);
    this.localArray.push({ websiteName, websiteURL, id });
    localStorage.setItem('collection', JSON.stringify(this.localArray));
  }

  getLocalAndRender(): void {
    const locStorData = JSON.parse(
      localStorage.getItem('collection') as string
    );

    if (locStorData) {
      this.localArray = locStorData;
      this.bookmarksContainer.innerText = '';

      this.localArray.forEach((item: LS): void => {
        const { websiteName, websiteURL, id } = item;
        const nodeToAppend = document.createElement('div');
        nodeToAppend.classList.add('item');
        nodeToAppend.innerHTML = `
     <i class="fa-solid fa-circle-xmark original"
      title="delete bookmark"
      id="${id}"></i>
      <div class="name">
      <img src="https://s2.googleusercontent.com/s2/favicons?domain=${websiteURL}&sz=32" alt="favicon" />
      <a href="https://${websiteURL}" target="_blank">${
          websiteName || 'Anonymous'
        }</a>
      </div> 
      `;

        this.addListener(nodeToAppend);

        this.bookmarksContainer.appendChild(nodeToAppend);
      });
    } else {
      return;
    }
  }

  addListener(node: HTMLDivElement): void {
    node.children[0].addEventListener('click', (e: Event) => {
      this.localArray = this.localArray.filter((item: LS) => {
        return item.id !== (e.target as HTMLElement).id;
      });
      localStorage.setItem('collection', JSON.stringify(this.localArray));
      this.getLocalAndRender();
    });
  }
}

const bookmarkMaker = new BookmarkMaker();
