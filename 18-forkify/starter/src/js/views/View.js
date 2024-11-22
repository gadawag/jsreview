// import iconsx from '../img/icons.svg'; // IN PARCEL: WE CAN IMPORT MORE THAN JS FILE!!! ALL KINDS OF ASSETS (THIS IS FOR PARCEL 1 ONLY, AND ALSO PARCEL 2?)
import icons from 'url:../../img/icons.svg'; // IN PARCEL: WE CAN IMPORT MORE THAN JS FILE!!! ALL KINDS OF ASSETS (PARCEL 2 )

// THIS IS THE PARENT CLASS THAT WILL BE THE PROTOTYPE OF ALL CHILD CLASS (CONTAINS COMMON METHODS AND ATTRIBUTES)
export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance or child class that is calling this method
   * @author Jonas Schmedtmann
   * @todo Finish the implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup(); // _generateMarkup will vary depending on which class is calling this render method, because the value of 'this' always points to that object

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Will convert the string to real DOM nodes, and then we can use that to compare to the previous DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); // node list to array
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // node list to array from actual node in our page

    // comparing nodes (note: when child nodes changes, the parent node will also change (will be false in isEqualNode))
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // if new element is equal to current and if the content of that node is only text (this is to avoid changing elements, but only the CONTENT which is the text)
      // Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🎇', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        // console.log(newEl.attributes);
        // console.log(Array.from(newEl.attributes));

        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
                <svg>
                <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <div>
                <svg>
                <use href="${icons}#icon-alert-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
