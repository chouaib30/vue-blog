<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar.vue"
import { mapState } from "vuex"
export default {
  name: "NotificationContainer",
  components: {
    NotificationBar
  },
  computed: mapState("notification", ["notifications"])
}
</script>