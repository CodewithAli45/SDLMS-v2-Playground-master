class CardGenerator {
    constructor(cardsData) {
      this.cardsData = cardsData;
      this.template = `<div class="container">
                        <div class="row">
                          ${this.generateCards()}
                        </div>
                      </div>`;
    }
  
    generateCards() {
      return this.cardsData.map((card) => {
        return `<div class="col-md-4">
                  <div class="card">
                    <img src="${card.image}" class="card-img-top img-fluid" alt="Image">
                    <div class="card-body">
                      <h5 class="card-title">${card.title}</h5>
                      <p class="card-text">${card.text}</p>
                    </div>
                  </div>
                </div>`;
      }).join('');
    }
  
    render(targetElement) {
      document.querySelector(targetElement).innerHTML = this.template;
    }
  }
  
  // Example usage:
  const cardsData = [
    {
      title: 'Card Title 1',
      text: 'Some example text 1.',
      image: 'image1.jpg'
    },
    {
      title: 'Card Title 2',
      text: 'Some example text 2.',
      image: 'image2.jpg'
    },
    {
      title: 'Card Title 3',
      text: 'Some example text 3.',
      image: 'image3.jpg'
    }
  ];
