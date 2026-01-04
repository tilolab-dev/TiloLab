<template>
  <div class="loader">
    <div class="loader_wrapper">
      <div>
        <div class="bounceball"></div>
        <div class="bounceball up"></div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.loader {
  position: relative;
  display: flex;
  min-height: 50px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  padding-left: 20%;
  gap: 1rem;
  color: var(--text-color);
  font-size: 1.2rem;

  &_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .bounceball {
    position: relative;
    display: inline-block;
    height: 37px;
    width: 15px;
    margin: 0 1px;
  }

  .bounceball:before {
    position: absolute;
    content: "";
    display: block;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--accent-color);
    transform-origin: 50%;
    -webkit-animation: bounce 0.5s ease infinite alternate;
    animation: bounce 0.5s ease infinite alternate;
  }

  .bounceball.up:before {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .bounceball.down:before {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
}

@-webkit-keyframes bounce {
  0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }

  35% {
    height: 15px;
    border-radius: 50%;
    transform: scaleX(1);
  }

  to {
    top: 0;
  }
}

@keyframes bounce {
  0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }

  35% {
    height: 15px;
    border-radius: 50%;
    transform: scaleX(1);
  }

  to {
    top: 0;
  }
}
</style>
