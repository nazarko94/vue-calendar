<script>
import Day from './tables/MyDay';
import Week from './tables/MyWeek';
import Month from "./tables/MyMonth";
import types from "../types";
export default {
  name: "MySection",
  components: { Month, Week, Day },
  props: {
    activeView: {
      type: String,
      default: types.monthView,
    },

    date: {
      type: Date,
      default: new Date(),
    },
  },

  methods: {
    backPage() {
      this.$refs.view.backPage();
    },
    nextPage() {
      this.$refs.view.nextPage();
    }
  },

  render() {
    if (this.activeView == types.dayView) {
        return this.$createElement('Day', { ref: 'view' });    
    } else if (this.activeView == types.weekView) {
        return this.$createElement('Week', { ref: 'view' });
    } else if (this.activeView == types.monthView) {
        return this.$createElement("Month", { ref: 'view' });
    } else {
        throw new Error("Select calendar view: bad option");
    } 
  },
};
</script>

<style></style>
