<template>
  <div class="auth">
    <div class="auth-title">验证码已发送至 {{phone}}</div>
    <div class="code-box">
      <div class="code" :class="{'onfoucs': amount.length === index}" v-for="(item, index) in codeLength" :key="index">
        <span v-if="amount[index]">{{amount[index]}}</span>
        <span v-if="amount.length === index" class="flash"></span>
      </div>
    </div>
    <div class="btn-box">
      <div v-if="seconds > 0" class="countdown">{{seconds}} 秒后可重新获取</div>
      <a v-else class="resend" @click.stop="resend">重发短信验证码</a>
    </div>
    <Keyboard @Input="onPress"></Keyboard>
  </div>
</template>

<script>
  import Keyboard from '@/components/keyboard.vue'
  export default {
    components: {
      Keyboard
    },
    data () {
      return {
        codeLength: 4,
        phone: '',
        focus: true,
        seconds: 60,
        timer: null,
        amount: [],
        showKeyboard: true
      }
    },
    watch: {
      'amount' (val) {
        if (val.length === this.codeLength) {
          this.$toast('验证中...', 5000)
        }
      }
    },
    methods: {
      setCountdown () { // 开启倒计时
        this.timer = setInterval(() => {
          if (this.seconds >= 1) {
            this.seconds--
          }
        }, 1000)
      },
      resend () { // 重新发送
        clearInterval(this.timer)
        this.seconds = 60
        this.amount = []
      },
      onPress (key) {
        if (key !== 'del') {
          if (this.amount.length + 1 > this.codeLength) return
          this.amount.push(key)
        } else {
          if (this.amount.length === 0) return
          this.amount.pop()
        }
      }
    },
    mounted () {
      this.phone = this.$route.query.phone
      this.setCountdown()
    },
    destroyed () {
      clearInterval(this.timer)
      this.timer = null
    }
  }
</script>
<style lang="scss">
  @import '../assets/css/tool';
  .auth {
    -webkit-user-select: none;
    user-select: none;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    padding: 15px;
    text-align: center;
    background-color: #fff;
    .auth-title {
      margin-top: 35px;
    }
    .code-box {
      display: inline-flex;
      padding-top: 15px;
      height: 55px;
      overflow: hidden;
      background: white;
      font-size: 0;
      .code {
        width: 35px;
        height: 44px;
        border-radius: 4px;
        border: 1px solid #757779;
        margin: 4px;
        @include center-flex;
        font-size: 18px;
      }
      .onfoucs {
        border: 1px solid #1985fc;
      }
      @keyframes caret {
        50% {border-color: transparent;}
      }
      .flash {
        width: 1px;
        height: 18px;
        border-right: 1px solid;
        border-color: #1985fc;
        animation: caret 1s step-end infinite;
      }
    }
    .btn-box {
      margin-top: .4rem;
      font-size: 14px;
      line-height: 2;
    }
    .resend {
      color: #1985fc;
    }
    .numeric-keyboard table {
      border-spacing: 4px 5px !important;
      td {
        border-radius: 5px;
      }
    }
  }
</style>
