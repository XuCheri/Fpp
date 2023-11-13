<template>
  <div>
    <h1>🍞📅 TOAST UI Calendar + Vue</h1>
    <span class="date-range">{{ dateRangeText }}</span>
    <calendar
      ref="calendar"
      :view="'month'"
      :use-form-popup="true"
      :use-detail-popup="true"
      :week="{
        startDayOfWeek: 1, //周开始的第一天。可用值为：0（周日）到6（周六）。
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], //一周的名称。
        workweek: false, //是否仅显示工作日。
        showTimezoneCollapseButton: true, // 是否显示时区折叠按钮。
        timezonesCollapsed: false, // 是否折叠时区。
        hourStart: 0, // 一天开始的小时。
        hourEnd: 24, // 一天结束的小时。
        narrowWeekend: false, // 是否将周末的宽度设置为窄。
        eventView: true, // 是否显示事件视图。
        taskView: true, // 是否显示任务视图。
        collapseDuplicateEvents: false, // 是否折叠重复的事件。
      }"
      :month="{
        startDayOfWeek: 1, // 周开始的第一天
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // 一周的名称
        workweek: false, // 是否仅显示工作日
        narrowWeekend: false, // 是否将周末的宽度设置为窄
        visibleWeeksCount: 0, // 可见周数,0表示自动
      }"
      :timezone="{ zones }"
      :theme="theme"
      :template="{
        milestone: getTemplateForMilestone,
        allday: getTemplateForAllday,
      }"
      :grid-selection="{
        enableDbClick: true, //是否启用双击选择
        enableClick: true, //是否启用单击选择
      }"
      :calendars="calendars"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */
import calendar from "@/components/calendar/index.vue";
// import ToastUICalendar from "./calendar.js";
import "@toast-ui/calendar/toastui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.min.css";
import "tui-time-picker/dist/tui-time-picker.min.css";

// import { events, addEvent, deleteEvent, updateEvent } from "@/views/todo/mock.js";
import { theme } from "@/views/todo/theme.js";
import "@/views/todo/index.css";

export default {
  components: {
    calendar,
  },
  data() {
    return {
      calendars: [
        {
          id: "0",
          name: "Private",
          backgroundColor: "#9e5fff",
          borderColor: "#9e5fff",
          dragBackgroundColor: "#9e5fff",
        },
        {
          id: "1",
          name: "Company",
          backgroundColor: "#00a9ff",
          borderColor: "#00a9ff",
          dragBackgroundColor: "#00a9ff",
        },
      ],
      // events,
      zones: [
        {
          timezoneName: "Asia/Hong_Kong",
          displayLabel: "Hong Kong",
          tooltip: "UTC+08:00",
        },
      ],
      theme,
      selectedView: "month",
      viewOptions: [
        {
          title: "Monthly",
          value: "month",
        },
        {
          title: "Weekly",
          value: "week",
        },
        {
          title: "Daily",
          value: "day",
        },
      ],
      dateRangeText: "",
    };
  },
  mounted() {},
  methods: {
    getTemplateForMilestone(event) {
      return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`;
    },
    getTemplateForAllday(event) {
      return `[All day] ${event.title}`;
    },
  },
};
</script>
