<template>
  <div class="container">
    <div class="buttons">
      <button type="button" @click="changeView('day')">Day</button>
      <button type="button" @click="changeView('week')">Week</button>
      <button type="button" @click="changeView('month')">Month</button>
    </div>
    <div class="buttons">
      <button type="button" @click="today()">Today</button>
      <button type="button" @click="prev()">Prev</button>
      <button type="button" @click="next()">Next</button>
    </div>
    <!-- 日历容器 -->
    <div ref="calendar" id="calendar" />
  </div>
</template>
<script>
import Calendar from "@toast-ui/calendar";
export default {
  name: "ToastUICalendar",
  data() {
    return {
      calendarInstance: null, //日历实例
      options: {
        //日历默认配置项
        defaultView: "month", //初始视图类型。可用值为：“日”、“周”、“月”。
        useFormPopup: true, //创建/修改事件时是否使用默认表单弹出窗口。
        useDetailPopup: true, //单击事件时是否使用默认的详细信息弹出窗口。
        isReadOnly: false, //是否只读
        usageStatistics: false, //是否使用统计信息
      },
      id: 3,
    };
  },
  mounted() {
    // 初始化日历
    this.initCalendar();
    this.calendarInstance.createEvents([
      {
        id: "1",
        calendarId: "1",
        title: "my event",
        category: "time",
        dueDateClass: "",
        start: "2023-11-06T22:30:00+09:00",
        end: "2023-11-07T02:30:00+09:00",
      },
      {
        id: "2",
        calendarId: "1",
        title: "second event",
        category: "time",
        dueDateClass: "",
        start: "2023-11-06T17:30:00+09:00",
        end: "2023-11-07T17:31:00+09:00",
      },
    ]);
  },
  methods: {
    /**
     * 初始化日历,并获取日历实例
     */
    initCalendar() {
      console.log(this.$refs);
      this.calendarInstance = new Calendar(this.$refs.calendar, this.options);
      // Creating an event through popup
      this.calendarInstance.on("beforeCreateEvent", (eventObj) => {
        this.calendarInstance.createEvents([
          {
            ...eventObj,
            id: this.id++,
          },
        ]);
      });
      // Basic example of updating an event
      this.calendarInstance.on("beforeUpdateEvent", ({ event, changes }) => {
        console.log(event, changes);
        this.calendarInstance.updateEvent(event.id, event.calendarId, changes);
      });
      // Basic example of deleting an event
      this.calendarInstance.on("beforeDeleteEvent", (eventObj) => {
        this.calendarInstance.deleteEvent(eventObj.id, eventObj.calendarId);
      });
    },
    /**
     * 切换视图
     * @param {*} viewName
     */
    changeView(viewName) {
      this.calendarInstance.changeView(viewName);
    },
    /**
     * 销毁日历
     */
    destroy() {
      this.calendarInstance.destroy();
    },
    today() {
      this.calendarInstance.today();
    },
    prev() {
      this.calendarInstance.prev();
    },
    next() {
      this.calendarInstance.next();
    },
  },
  beforeDestroy() {
    // 销毁日历
    this.destroy();
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
