<template>
  <header class="header-basic">
    <div class="header-limiter">
      <h1>
        <a href="#">
          Configurator
          <span>3D</span>
        </a>
      </h1>

      <nav>
        <router-link to="/">Home</router-link>
        <a href="#" class="disabled">Blog</a>
        <a href="#" class="disabled">Pricing</a>
        <a href="#" class="disabled">About</a>
        <a href="#" class="disabled">Faq</a>
        <a href="#" class="disabled">Contact</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header-basic {
  background-color: #292c2f;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.15);
  padding: 20px 40px;
  height: 80px;
  box-sizing: border-box;

  /* Logo */

  .header-limiter {
    max-width: 1200px;
    text-align: center;
    margin: 0 auto;

    h1 {
      float: left;
      line-height: 40px;
      margin: 0;

      span {
        color: #5a8ab9;
      }
    }
  }

  /* The header links */

  a {
    color: #ffffff;
    text-decoration: none;
  }

  nav {
    font: 16px Arial, Helvetica, sans-serif;
    line-height: 40px;
    float: right;

    a {
      display: inline-block;
      padding: 0 5px;
      text-decoration: none;
      color: #ffffff;
      font-size: 16px;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }

      &.disabled {
        opacity: 0.5;
        &:hover {
          cursor: default;
        }
      }
    }
  }
}

.header-basic .header-limiter nav a.selected {
  color: #5a8ab9;
  pointer-events: none;
  opacity: 1;
}

/* Making the header responsive */

@media all and (max-width: 600px) {
  .header-basic {
    padding: 20px 0;
    height: 75px;
  }

  .header-basic .header-limiter h1 {
    float: none;
    margin: -8px 0 10px;
    text-align: center;
    font-size: 24px;
    line-height: 1;
  }

  .header-basic .header-limiter nav {
    line-height: 1;
    float: none;
  }

  .header-basic .header-limiter nav a {
    font-size: 13px;
  }
}
</style>


