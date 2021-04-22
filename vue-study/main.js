let eventBus = new Vue();

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },

  template: `     
  <div class="product">
  <div class="product-image">
    <img v-bind:src="image" alt="" />
  </div>

  <div class="product-info">
    <h1>{{title}}</h1>
    <p v-if="inStock">In Stock</p>
    <p :class="{lineThrough: !inStock}" v-else>Out of Stock</p>
    <p>{{sale}}</p>
    <p>Shipping: {{shipping}}</p>

    <product-details :details="details"></product-details>

    <div
      v-for="(variant,index) in variants"
      :key="variant.variantId"
      class="color-box"
      :style="{backgroundColor: variant.variantColor}"
      @click="updateProduct(index)"
    ></div>

    <button
      :disabled="!inStock"
      v-on:click="addToCart"
      :class="{disabledButton: !inStock}"
    >
      Add to cart
    </button>
    <button
      :disabled="!inStock"
      v-on:click="removeFromCart"
      :class="{disabledButton: !inStock}"
    >
      Remove from cart
    </button>

  </div>

  <product-tabs :reviews="reviews"></product-tabs>
  
 
</div>
`,
  data() {
    return {
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
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit("remove-from-cart");
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
    sale() {
      if (this.onSale) return `${this.brand} ${this.product} are on sale!`;
      else return `${this.brand} ${this.product} are not on sale!`;
    },
    shipping() {
      if (this.premium) return "Free";

      return "$2.99";
    },
  },
  mounted() {
    eventBus.$on("review-submitted", (productReview) => {
      this.reviews.push(productReview);
    });
  },
});

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
      <ul>
        <li v-for="detail in details">{{detail}}</li>
      </ul>
  `,
});

Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

  <p v-if="errors.length">
   <b>Please correct de following error(s):</b>
   <ul>
    <li v-for="error in errors">{{error}}</li>
   </ul>
  </p>
 

  <p>
    <label for="name">Name</label>
    <input id="name" v-model="name">
  </p>

  <p>
    <label for="review">Review</label>
    <textarea  id="review" v-model="review"></textarea>
  </p>

  <p>
    <label for="rating">Rating</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>

  <p>Would you recommend this product?</p>
  <input v-model="recommend" class="noInput" name="option" type="radio" value="yes" id="yes">
  <label for="yes">Yes</label>
  <input v-model="recommend" class="noInput" name="option" type="radio" value="no" id="no">
  <label for="no">No</label>
  <p>
    <input type="submit" value="Submit">
  </p>
</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };
        eventBus.$emit("review-submitted", productReview);
        (this.name = null),
          (this.review = null),
          (this.rating = null)((this.recommend = null));
        this.errors = [];
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required.");
      }
    },
  },
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },

  template: `
  <div class="container">
    <span class="tab"
    :class="{activeTab: selectedTab === tab}" 
    v-for="(tab, index) in tabs" 
    :key="index"
    @click="selectedTab = tab">
    {{ tab }}
    </span>


    <div v-show="selectedTab==='Reviews'">
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet</p>
     <ul>
        <li v-for="review in reviews">
          <p>Name: {{review.name}}</p>
          <p>Review: {{review.review}}</p>
          <p>Rating: {{review.rating}}</p>
          <p>Recommend ? : {{review.recommend}}</p>
      </li>
     </ul>
   </div>


   <product-review
    v-show="selectedTab==='Make a Review'" 
   >
   </product-review>
  </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews",
    };
  },
});

let app = new Vue({
  el: "#app",
  data: {
    premium: false,
    cart: [],
  },
  methods: {
    addToCart(id) {
      this.cart.push(id);
    },
    removeFromCart() {
      if (this.cart.length === 0) return;
      this.cart.pop();
    },
  },
});
