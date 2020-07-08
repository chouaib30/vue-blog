<template>
  <div class="notification-bar" :class="notificationClassType">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "NotificationBar",
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(
      () => this.removeNotification(this.notification),
      3000
    )
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  computed: {
    notificationClassType() {
      return `notification-${this.notification.type}`
    }
  },
  methods: mapActions("notification", ["removeNotification"])
}
</script>
