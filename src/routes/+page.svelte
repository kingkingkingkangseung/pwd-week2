<!-- src/routes/+page.svelte -->
<script>
    let name = $state('');
    let welcome = $derived(name ? `Hello, ${name}!` : 'Welcome!');
  
    function randomize() {
      const msgs = ['웹 개발 재밌다!', 'SvelteKit 금방 익힘', 'Vercel로 바로 배포!'];
      alert(msgs[Math.floor(Math.random() * msgs.length)]);
    }
  </script>
  
  <h1>{welcome}</h1>
  
  <label>
    Your name: <input placeholder="type your name" bind:value={name} />
  </label>
  <p>미리보기: <strong>{name || '(입력 대기)'}</strong></p>
  
  <button onclick={randomize}>랜덤 메시지</button>