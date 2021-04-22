Vue.createApp({
  data() {
    return {
      alertMsg: "This is an alert",
      userInput: "",
      confirmedInput: "",
    };
  },
  methods: {
    alertEvent() {
      alert(this.alertMsg);
    },
    fill(event) {
      this.userInput = event.target.value;
    },
    confirmInput(event) {
      this.confirmedInput = event.target.value;
    },
  },
}).mount("#assignment");
