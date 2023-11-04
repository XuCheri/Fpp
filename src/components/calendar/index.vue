<template>
  <div class="container">
    <div id="calendar" />
  </div>
</template>
<script>
import Calendar from "@toast-ui/calendar";
export default {
  name: "ToastUICalendar",
  data() {
    return {
      calendarInstance: null,
    };
  },
  mounted() {
    new Calendar("#calendar", {
      defaultView: "month",
    });
  },
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  #calendar {
    height: 65vh;
  }
}
</style>
