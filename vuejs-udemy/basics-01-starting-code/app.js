const app = Vue.createApp({
  data() {
    return {
      goalA: "Learn Vue",
      goalB:'Master Vue'
    };
  },
  methods:{
      outputGoal(){
          const randomNumber = Math.random()
          if(randomNumber < 0.5) return this.goalA

          return this.goalB
      }
  }
});

app.mount("#user-goal");
