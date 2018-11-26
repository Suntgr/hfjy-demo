<template>
  <div class="keyboard" :class="{'show':show}">
    <div class="key-area">
      <div
        class="key"
        v-for="(item, index) in keyList"
        :key="index"
        :class="{
          'transparent': (!item.value || item.value === 'del'),
          'del': item.value === 'del'
        }"
        @touchstart.stop="inputNumber(item.value)"
        v-html="item.value">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NumberKeyboard',
    props: {
      show: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        keyList: [
          {key: 1, value: 1},
          {key: 2, value: 2},
          {key: 3, value: 3},
          {key: 4, value: 4},
          {key: 5, value: 5},
          {key: 6, value: 6},
          {key: 7, value: 7},
          {key: 8, value: 8},
          {key: 9, value: 9},
          {key: '', value: ''},
          {key: 0, value: '0'},
          {key: 'del', value: 'del'}
        ]
      }
    },
    methods: {
      inputNumber (value) {
        if (value) {
          this.$emit('Input', value)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .keyboard {
    -webkit-user-select: none;
    user-select: none;
    position: fixed;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    backface-visibility: hidden;
    width: 100%;
    background-color: #d2d5da;
    transition: transform .3s;
    padding: 3px;
    box-sizing: border-box;
  }

  .keyboard.show {
    transform: translate(0);
  }

  .key-area {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }

  .key {
    width: 31.3%;
    height: 50px;
    margin: 1%;
    border-radius: 6px;
    line-height: 50px;
    background: #fff;
    font-size: 22px;
    text-align: center;
    color: #2c3e50;
    box-shadow: 0 1px 2px 0 #93969b;
  }

  .key:active {
    background: #bac3d2;
    box-shadow: none;
  }

  .key.transparent {
    background: transparent;
    box-shadow: none;
  }

  .key.del {
    background: url('../assets/images/del.png') no-repeat center/ 30px 30px;
    text-indent: 999px;
  }
</style>
