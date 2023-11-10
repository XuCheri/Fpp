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
      :events="events"
      @selectDateTime="onSelectDateTime"
      @beforeCreateEvent="onBeforeCreateEvent"
      @beforeUpdateEvent="onBeforeUpdateEvent"
      @beforeDeleteEvent="onBeforeDeleteEvent"
      @afterRenderEvent="onAfterRenderEvent"
      @clickDayName="onClickDayName"
      @clickEvent="onClickEvent"
      @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
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

import { events } from "@/views/todo/mock.js";
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
      events,
      zones: [
        {
          timezoneName: "Asia/Seoul",
          displayLabel: "Seoul",
          tooltip: "UTC+09:00",
        },
        {
          timezoneName: "Pacific/Guam",
          displayLabel: "Guam",
          tooltip: "UTC+10:00",
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
  computed: {
    calendarInstance() {
      return this.$refs.calendar.getInstance();
    },
  },
  watch: {
    selectedView(newView) {
      this.calendarInstance.changeView(newView);
      this.setDateRangeText();
    },
  },
  mounted() {
    this.setDateRangeText();
  },
  methods: {
    getTemplateForMilestone(event) {
      return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`;
    },
    getTemplateForAllday(event) {
      return `[All day] ${event.title}`;
    },
    onSelectDateTime({ start, end }) {
      console.group("onSelectDateTime");
      console.log(`Date : ${start} ~ ${end}`);
      console.groupEnd();
    },
    onBeforeCreateEvent(eventData) {
      const event = {
        calendarId: eventData.calendarId || "",
        id: String(Math.random()),
        title: eventData.title,
        isAllday: eventData.isAllday,
        start: eventData.start,
        end: eventData.end,
        category: eventData.isAllday ? "allday" : "time",
        dueDateClass: "",
        location: eventData.location,
        state: eventData.state,
        isPrivate: eventData.isPrivate,
      };

      this.calendarInstance.createEvents([event]);
    },
    onBeforeUpdateEvent(updateData) {
      console.group("onBeforeUpdateEvent");
      console.log(updateData);
      console.groupEnd();

      const targetEvent = updateData.event;
      const changes = { ...updateData.changes };

      this.calendarInstance.updateEvent(targetEvent.id, targetEvent.calendarId, changes);
    },

    onBeforeDeleteEvent({ title, id, calendarId }) {
      console.group("onBeforeDeleteEvent");
      console.log("Event Info : ", title);
      console.groupEnd();

      this.calendarInstance.deleteEvent(id, calendarId);
    },
    onAfterRenderEvent({ title }) {
      console.group("onAfterRenderEvent");
      console.log("Event Info : ", title);
      console.groupEnd();
    },
    onClickDayName({ date }) {
      console.group("onClickDayName");
      console.log("Date : ", date);
      console.groupEnd();
    },
    onClickEvent({ nativeEvent, event }) {
      console.group("onClickEvent");
      console.log("MouseEvent : ", nativeEvent);
      console.log("Event Info : ", event);
      console.groupEnd();
    },
    onClickTimezonesCollapseBtn(timezoneCollapsed) {
      console.group("onClickTimezonesCollapseBtn");
      console.log("Is Timezone Collapsed?: ", timezoneCollapsed);
      console.groupEnd();

      const newTheme = {
        "week.daygridLeft.width": "100px",
        "week.timegridLeft.width": "100px",
      };

      this.calendarInstance.setTheme(newTheme);
    },
    onClickTodayButton() {
      this.calendarInstance.today();
      this.setDateRangeText();
    },
    onClickMoveButton(offset) {
      this.calendarInstance.move(offset);
      this.setDateRangeText();
    },
    setDateRangeText() {
      const date = this.calendarInstance.getDate();
      const start = this.calendarInstance.getDateRangeStart();
      const end = this.calendarInstance.getDateRangeEnd();

      const startYear = start.getFullYear();
      const endYear = end.getFullYear();

      switch (this.selectedView) {
        case "month":
          this.dateRangeText = `${date.getFullYear()}.${date.getMonth() + 1}`;

          return;
        case "day":
          this.dateRangeText = `${date.getFullYear()}.${
            date.getMonth() + 1
          }.${date.getDate()}`;

          return;
        default:
          this.dateRangeText = `${startYear}.${
            start.getMonth() + 1
          }.${start.getDate()} - ${startYear !== endYear ? `${endYear}.` : ""}${
            end.getMonth() + 1
          }.${end.getDate()}`;
      }
    },
  },
};
</script>
