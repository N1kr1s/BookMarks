class BookmarkMaker {
  public modalIsOpen: boolean = false;
  public modal: HTMLDivElement;
  public showModal: HTMLHeadingElement;
  public closeModal: HTMLElement;
  public bookmarkForm: HTMLFormElement;
  public bookmarksContainer: HTMLDivElement;
  public deletePost!: HTMLElement;
  public localArray: {
    websiteName: string;
    websiteURL: string;
  }[] = [];

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
    this.modalIsOpen = true;
    this.modal.classList.add('show-modal');
  }

  modalClose(): void {
    this.modalIsOpen = false;
    this.modal.classList.remove('show-modal');
  }

  submitForm(e: Event) {
    this.bookmarkForm;
    const target = e.target as HTMLFormElement;
    const websiteName = (target[0] as HTMLInputElement).value;
    const websiteURL = (target[1] as HTMLInputElement).value;
    // *Saving to local storage

    this.localArray.push({ websiteName, websiteURL });
    localStorage.setItem('collection', JSON.stringify(this.localArray));
    const nodeToAppend = document.createElement('div');
    nodeToAppend.classList.add('item');
    nodeToAppend.innerHTML = `
      <i
      class="fa-solid fa-circle-xmark original"
      title="delete bookmark"
    ></i>
    <div class="name">
      <img src="favicon.ico" alt="favicon" />
      <a href="https://${websiteURL}" target="_blank">${websiteName}</a>
      `;
    nodeToAppend.children[0].addEventListener('click', () => {
      this.bookmarksContainer.children;
    });
    this.bookmarksContainer.appendChild(nodeToAppend);
  }
}

const bookmarkMaker = new BookmarkMaker();
