<!-- src/routes/projects/[slug]/+page.svelte -->
<script>
    let { data } = $props();      // { item, slug }
    let memo = $state('');
  
    // memo 상세에서만 로컬스토리지 동기화
    $effect(() => {
      if (data.slug === 'memo') {
        const saved = localStorage.getItem('memo');
        if (saved) memo = saved;
      }
    });
  
    function save() {
      localStorage.setItem('memo', memo);
      alert('저장 완료!');
    }
  </script>
  
  <h2>{data.item.title}</h2>
  <p>{data.item.body}</p>
  
  {#if data.slug === 'memo'}
    <textarea rows="6" bind:value={memo} class="card" style="width:100%"></textarea>
    <button onclick={save}>메모 저장</button>
    <p style="opacity:.6">브라우저 로컬에만 저장됩니다.</p>
  {/if}