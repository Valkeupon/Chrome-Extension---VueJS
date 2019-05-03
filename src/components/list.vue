<template>
  <div id="list">
    <div class="wrapper" v-if="load">
      <div class="wrapper-cell">
        <div class="text">
          <div class="text-line"> </div>
          <div class="text-line"></div>
          <div class="text-line"></div>
          <div class="text-line"></div>
        </div>
      </div>
      <div class="wrapper-cell">
        <div class="text">
          <div class="text-line"></div>
          <div class="text-line"></div>
          <div class="text-line"></div>
          <div class="text-line"></div>
        </div>
      </div>
      <div class="wrapper-cell">
        <div class="text">
          <div class="text-line"></div>
          <div class="text-line"></div>
          <div class="text-line"></div>
          <div class="text-line"></div>
        </div>
      </div>
    </div>
    <ul v-else>
      <li v-for="item in items" :key="item.id">
        <a :href="item.content" target="_blank">
          <div>{{ item.title }}</div>
          <div class='date'>{{ getHumanDate(item.createdAt, 'DD-MM-YYYY') }} - <span>{{ getHumanDate(item.createdAt, 'H:mm') }}</span></div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from '../../libs/firebase.js'
import moment from 'moment'

export default {
  data () {
    return {
      items: [],
      load: true
    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    getHumanDate (date, format) {
      return moment(date).format(format)
    },
    initData: function () {
      firebase.getData((res) => {
        if (!res) {
          this.items = []
          this.load = false
          return
        }
        this.items = res
        this.load = false
      })
    }
  }
}
</script>
