app.component("product-display", {
  template:
    /*html*/
    `
    <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :class="{'out-of-stock-img': !inStock}" :src="image" />
      </div>
      <div class="product-info">
        <h1>{{title}}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else>Out of stock</p>
        
        <p>Shipping: {{shipping}}</p>    

        <product-details :details="details"></product-details>

        <div
          v-for="(variant,index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{backgroundColor:variant.color}"
        ></div>
        <button
          :class="{disabledButton: !inStock}"
          :disabled="!inStock"
          class="button"
          @click="addToCart"
        >
          Add to cart
        </button>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>
  `,
  data() {
    return {
      product: "Socks",
      selectedVariant: 0,
      brand: "Vue Mastery",
      details: ["80% cotton", "Fits Nice!", "Awesome look"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/socks_blue.jpg",
          quantity: 0,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      return this.premium ? "Free" : "$2.99";
    },
  },
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
});
