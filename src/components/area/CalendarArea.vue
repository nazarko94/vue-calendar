<script>
import CalendarViewDay from './views/CalendarViewDay';
import CalendarViewWeek from './views/CalendarViewWeek';
import CalendarViewMonth from './views/CalendarViewMonth';
import viewTypes from '../viewTypes';
export default {
  name: 'CalendarArea',
  components: { CalendarViewDay, CalendarViewWeek, CalendarViewMonth },
  props: {
    activeView: {
      type: String,
      default: viewTypes.MONTH_VIEW
    },

    date: {
      type: Date,
      default: new Date()
    }
  },

  methods: {
    nextPage() {
      this.$refs.view.nextPage();
    },

    backPage() {
      this.$refs.view.backPage();
    }
  },

  render() {
    switch (this.activeView) {
      case viewTypes.MONTH_VIEW: {
        return this.$createElement('CalendarViewMonth', { ref: 'view' });
      }
      case viewTypes.WEEK_VIEW: {
        return this.$createElement('CalendarViewWeek', { ref: 'view' });
      }
      case viewTypes.DAY_VIEW: {
        return this.$createElement('CalendarViewDay', { ref: 'view' });
      }
      default: {
        throw new Error('Select calendar view: bad option');
      }
    }
  }
};
</script>

<style></style>
