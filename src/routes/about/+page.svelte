<script lang="ts">
  const pika = () => {
    alert('PIKA PIKA!');
  };
</script>

<h2 class="h2">About Pokeland</h2>

<h3 class="h3 my-4">I love pokemons!</h3>
<div class="space-y-4">
  <p>
    This website was made to share my love of pokemons with the world. Take a look at ALL the
    pokemon, and save your favorites.
  </p>

  <p>If you like this site, let me know.</p>

  <p><a class="btn inline-block" href="/contact">Tell me you like this site</a></p>

  <p><button class="btn" on:click={pika}>PIKA!</button></p>
</div>
