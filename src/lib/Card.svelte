<!-- src/lib/Card.svelte -->
<script>
    let { title, summary, href } = $props();
  </script>
  
  <article class="card">
    <h3><a href={href}>{title}</a></h3>
    <p>{summary}</p>
  </article>