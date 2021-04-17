let app = new Vue({
  el: "#app",
  data: {
    brand: "Vue Mastery",
    product: "Socks",
    selectedVariant: 0,
    details: ["80% cotton", "20% polyester", "Gender-neutral", "Fits nice"],
    onSale: true,
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./images/vmSocks-green-onWhite.jpg",
        variantQuantity: 10,
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./images/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0,
      },
    ],
    cart: 0,
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      if (this.cart === 0) return;
      this.cart -= 1;
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale(){
      if(this.onSale) return `${this.brand} ${this.product} are on sale!`
      else return `${this.brand} ${this.product} are not on sale!`
    }
      
  },
});
