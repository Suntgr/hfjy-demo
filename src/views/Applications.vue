<template>
  <div class="loan-index">
    <div class="banner-box">
      <img class="banner" src="../assets/images/banner.jpg">
    </div>
    <div class="main">
      <div class="feature">
        <div class="grid">
          <img class="feature-pic" src="../assets/images/wap_logo_fastest.png">
          <span class="feature-slogan">一对一</span>
          <span>数字化在线客堂</span>
        </div>
        <div class="grid">
          <img class="feature-pic" src="../assets/images/wap_logo_lowest.png">
          <span class="feature-slogan">智学中心</span>
          <span>AI赋能•学习加分</span>
        </div>
        <div class="grid">
          <img class="feature-pic" src="../assets/images/wap_logo_longest.png">
          <span class="feature-slogan">优秀团队</span>
          <span>名校骨干教师</span>
        </div>
      </div>
      <p class="title">填写资料，免费试听</p>
      <div class="info-form" :class="{'wait-valid': !requireValidate}">
        <div class="input-box">
          <div class="img-box" slot="label">
            <img class="person-img" src="../assets/images/person.png">
          </div>
          <label class="virtual-input" for="inputName">
            <input
              id="inputName"
              name="name"
              v-validate="validateName"
              data-vv-as="姓名"
              v-model="name"
              placeholder="请输入你的姓名"/>
          </label>
          <i v-show="vee_errors.has('name')" class="iconfont icon-warn" @click="showWarn(vee_errors.first('name'))"></i>
        </div>
        <div class="input-box">
          <div class="img-box" slot="label">
            <img class="phone-img" src="../assets/images/phone.png">
          </div>
          <label class="virtual-input" for="inputPhone">
            <input
              id="inputPhone"
              type="tel"
              name="phone"
              v-validate="validatePhone"
              data-vv-as="手机号码"
              v-model="phone"
              placeholder="请输入你的手机号码"/>
          </label>
          <i v-show="vee_errors.has('phone')" class="iconfont icon-warn" @click="showWarn(vee_errors.first('phone'))"></i>
        </div>
      </div>
      <div class="btn-content">
        <button @click="goVerificationCode" class="btn">立即试听</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        name: '',
        phone: '',
        validateName: { // name 至少需要两个字符
          required: true,
          min: 2
        },
        validatePhone: { // phone 11位手机号码
          required: true,
          regex: /^((1[3-8][0-9])+\d{8})$/
        },
        requireValidate: false // 开启校验
      }
    },
    computed: {
      ...mapGetters([
        'info'
      ])
    },
    methods: {
      ...mapActions([
        'setInfo',
      ]),
      showWarn (errMsg) {
        this.$toast(errMsg)
      },
      goVerificationCode () {
        this.requireValidate = true

        // 校验name, phone
        this.$validator.validateAll().then(() => {
          if (this.vee_errors.any()) {
            let errMsg = this.vee_errors.items[0].msg
            return this.$toast(errMsg)
          }
          this.setInfo({phone: this.phone, name: this.name})
          this.$router.push({name: 'verification', query: {phone: this.phone}})
        })
      }
    },
    mounted () {
      this.name = this.info.name
      this.phone = this.info.phone
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/tool';
  .loan-index {
    width: 100%;
    min-height: 100%;
    line-height: 1;
    background-color: #E9EEF8;
    .banner-box {
      width: 100%;
      .banner {
        width: 100%;
        height: auto;
      }
    }
    .main {
      padding: 0 15px;
    }
    .feature {
      border-radius: 6px;
      padding: .3rem 0;
      margin: -.5rem auto 0;
      position: relative;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-shadow: 0 0 8px 0 rgba(255, 255, 255, .8);
      .grid {
        @include center-flex(y);
        flex-direction: column;
        font-size: 14px;
        color: #787878;
        .feature-pic {
          width: .75rem;
          height: .75rem;
        }
        .feature-slogan {
          color: #333;
          margin: 5px 0;
        }
      }
    }
    .title {
      font-size: 14px;
      margin: 25px 0 12px;
    }
    .icon-warn {
      color: red;
      font-size: 18px;
    }
    .wait-valid {
      .icon-warn {
        display: none;
      }
    }
    .btn-content {
      width: 100%;
      margin-top: 10px;
      .btn {
        width: 100%;
        line-height: 2.3;
        border-radius: 5px;
        color: #fff;
        padding: 0 14px;
        text-align: center;
        font-size: 18px;
        background-color: #eea200;
        border: none;
        &:active {
          background-color: #825802;
        }
      }
    }

    .info-form {
      margin: 0 auto;
      border-radius: 5px;
      overflow: hidden;
    }

    .input-box {
      @include center-flex(y);
      padding: 10px 15px;
      background-color: white;
      &:not(:last-child) {
        position: relative;
        &::before {
          content: '';
          @include retina-one-px-border(bottom);
          left: 15px;
        }
      }
      .img-box {
        width: .4rem;
        height: .4rem;
        margin-right: .3rem;
        @include center-flex;
        img {
          display: block;
          height: auto;
        }
      }
      .person-img {
        width: .26rem;
      }
      .phone-img {
        width: .24rem;
      }
      .virtual-input {
        flex: 1;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 0;
      }
      input {
        height: 40px;
        border: 0;
        outline: 0;
        background-color: transparent;
        color: inherit;
        font-size: 16px;
        overflow: hidden;
        padding: 0 1px;
      }
    }
  }
</style>
