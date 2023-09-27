<style>
  .loader {
    border: 24px solid var(--secondary-color, #FFF);
    border-color: var(--primary-color, #FF3D00) var(--primary-color, #FF3D00) var(--secondary-color, #FFF) var(--secondary-color, #FFF);
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite
  }

  .loader:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(-50% , -125%);
    left: 50%;
    width: 12px;
    height: 12px;
    background: var(--secondary-color, #FFF);
    border-radius: 50%;
  }

  @keyframes rotate {
    100%   { transform: rotate(360deg)}
  }
</style>

<div class="flex">
  <span class="loader"></span>
</div>
