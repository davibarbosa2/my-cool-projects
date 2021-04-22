const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      confirmedName: "",
    };
  },
  methods: {
    add() {
      this.counter += 1;
    },
    remove() {
      if (this.counter === 0) return;
      this.counter -= 1;
    },
    setName(event) {
      this.name = event.target.value;
    },
    confirmInput() {
      this.confirmedName = this.name;
    },
  },
});

app.mount("#events");
