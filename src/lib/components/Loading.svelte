<div class="flex">
  <span class="loader" />
</div>

<style>
  .loader {
    border: 24px solid var(--secondary-color, #fff);
    border-color: var(--primary-color, #ff3d00) var(--primary-color, #ff3d00)
      var(--secondary-color, #fff) var(--secondary-color, #fff);
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
  }

  .loader:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(-50%, -125%);
    left: 50%;
    width: 12px;
    height: 12px;
    background: var(--secondary-color, #fff);
    border-radius: 50%;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
