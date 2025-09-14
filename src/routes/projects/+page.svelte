<!-- src/routes/projects/+page.svelte -->
<script>
    import Card from '$lib/Card.svelte';
    let { data } = $props(); // { projects }
  </script>
  
  <h2>Projects</h2>
  {#each data.projects as p}
    <Card title={p.title} summary={p.summary} href={`/projects/${p.slug}`} />
  {:else}
    <p class="card">아직 등록된 프로젝트가 없습니다.</p>
  {/each}