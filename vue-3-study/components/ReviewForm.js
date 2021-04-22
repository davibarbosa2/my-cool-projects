app.component("review-form", {
  template:
    /*html*/
    `<form class="review-form" @submit.prevent="onSubmit" >
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input v-model="name" type="text" id="name" />

    <label for="review">Review:</label>
    <textarea v-model="review" id="review"></textarea>

    <label for="rating">Rating</label>
    <select v-model.number="rating" id="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <input class="button" type="submit" value="Submit"/>
  </form>
`,
  data() {
    return {
      name: "",
      review: "",
      rating: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.name === "" || this.review === "" || this.rating === null) {
        alert("Review form is incomplete! Please fill out all the fields ");
        return
      }

      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };
      this.$emit("review-submitted", productReview);

      //reseting

      this.name = "";
      this.review = "";
      this.rating = null;
    },
  },
});
