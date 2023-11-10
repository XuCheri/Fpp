<template>
  <div class="container">
    <div>
      <div class="buttons">
        <button type="button" @click="changeView('day')">Day</button>
        <button type="button" @click="changeView('week')">Week</button>
        <button type="button" @click="changeView('month')">Month</button>
      </div>
    </div>

    <div>
      <div class="buttons">
        <button type="button" @click="today()">Today</button>
        <button type="button" @click="prev()">Prev</button>
        <button type="button" @click="next()">Next</button>
      </div>
    </div>
    <div ref="datepicker" style="margin-top: -1px"></div>

    <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
      <input type="text" id="datepicker-input" aria-label="Date-Time" />
      <span class="tui-ico-date"></span>
    </div>
    <div>
      <div class="buttons">
        <button type="button" @click="clear()">清除所有事件</button>
      </div>
    </div>

    <!-- 日历容器 -->
    <div ref="calendar" id="calendar" />
  </div>
</template>
<script>
import Calendar from "@toast-ui/calendar";
import DatePicker from "tui-date-picker";
export default {
  name: "ToastUICalendar",
  props: {
    view: String, //初始视图类型。可用值为：“日”、“周”、“月”。
    useFormPopup: {
      //创建/修改事件时是否使用默认表单弹出窗口。
      type: Boolean,
      default: () => undefined,
    },
    useDetailPopup: {
      //单击事件时是否使用默认的详细信息弹出窗口。
      type: Boolean,
      default: () => undefined,
    },
    isReadOnly: {
      //是否只读
      type: Boolean,
      default: () => undefined,
    },
    usageStatistics: {
      //是否使用统计信息
      type: Boolean,
      default: () => undefined,
    },
    eventFilter: Function, //事件过滤器
    week: Object, //周视图配置项
    month: Object, //月视图配置项
    gridSelection: {
      //网格选择配置项
      type: [Object, Boolean],
      default: () => undefined,
    },
    timezone: Object, //时区配置项
    theme: Object, //主题配置项
    template: Object, //模板配置项
    calendars: Array, //日历配置项
    events: Array, //事件配置项
  },
  data() {
    return {
      shortcuts: [
        {
          text: "Today",
          value: new Date(),
        },
        {
          text: "Yesterday",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          },
        },
        {
          text: "A week ago",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          },
        },
      ],
      timeValue: "",
      calendarInstance: null, //日历实例
      datePickerInstance: null, //日期选择器实例
      options: {
        //日历默认配置项
        defaultView: "month", //初始视图类型。可用值为：“日”、“周”、“月”。
        useFormPopup: true, //创建/修改事件时是否使用默认表单弹出窗口。
        useDetailPopup: true, //单击事件时是否使用默认的详细信息弹出窗口。
        isReadOnly: false, //是否只读
        usageStatistics: false, //是否使用统计信息
        theme: {},
        template: {},
        calendars: [],
        events: [],
        eventFilter: null,
        week: {},
        month: {},
        gridSelection: {},
      },
      id: 3,
    };
  },
  mounted() {
    this.options.defaultView = this.view;
    this.options.useFormPopup = this.useFormPopup;
    this.options.useDetailPopup = this.useDetailPopup;
    this.options.isReadOnly = this.isReadOnly;
    this.options.usageStatistics = this.usageStatistics;
    this.options.eventFilter = this.eventFilter;
    this.options.week = this.week;
    this.options.month = this.month;
    this.options.gridSelection = this.gridSelection;
    // this.options.timezone = this.timezone;
    this.options.theme = this.theme;
    this.options.template = this.template;
    // this.options.calendars = this.calendars;
    // 初始化日历
    this.initCalendar();
    this.initDatePicker();
    this.calendarInstance.createEvents(this.events);
    this.calendarInstance.setTheme(this.theme);
  },
  methods: {
    /**
     * 清除所有事件
     */
    clear() {
      this.calendarInstance.clear();
    },
    /**
     * 初始化日历,并获取日历实例
     */
    initCalendar() {
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
     * 初始化日期选择器
     */
    initDatePicker() {
      this.datePickerInstance = new DatePicker(this.$refs.datepicker, {
        date: new Date(),
        usageStatistics: false,
        input: {
          element: "#datepicker-input",
          format: "yyyy-MM-dd",
        },
        // options
      });
      this.datePickerInstance.on("change", () => {
        console.log(`Selected date: ${this.datePickerInstance.getDate()}`);
      });
    },
    /**
     * 切换视图
     * @param {*} viewName
     */
    changeView(viewName) {
      this.calendarInstance.changeView(viewName);
      switch (viewName) {
        case "day":
          this.datePickerInstance.setType("date");
          break;
        case "week":
          this.datePickerInstance.setType("month");
          break;
        case "month":
          this.datePickerInstance.setType("year");
          break;
      }
    },
    /**
     * 销毁日历
     */
    destroy() {
      this.calendarInstance.destroy();
    },
    /**
     * 今天
     */
    today() {
      this.calendarInstance.today();
      this.datePickerInstance.setDate(new Date());
    },
    /**
     * 上一视图
     */
    prev() {
      this.calendarInstance.prev();
    },
    /**
     * 下一视图
     */
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
    min-height: 800px;
  }
  .datePicker {
    width: 100%;
    height: 200px;
  }
  .code-description {
    padding: 22px 52px;
    background-color: rgba(81, 92, 230, 0.1);
    line-height: 1.4em;
  }

  .code-description,
  .code-description a {
    font-family: Arial;
    font-size: 14px;
    color: #515ce6;
  }

  .code-html {
    padding: 20px 52px;
  }
}
</style>
<style scoped>
:deep(.tui-datepicker) {
  z-index: 1;
}
</style>
