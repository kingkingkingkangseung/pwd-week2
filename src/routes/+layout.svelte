<!-- src/routes/+layout.svelte -->
<script>  
	let { children } = $props();
  </script>
  
  <svelte:head>
	<title>AJOU Mini Portfolio</title>
	<meta name="description" content="SvelteKit + Vercel mini portfolio" />
  </svelte:head>
  
  <nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/projects">Projects</a>
  </nav>
  
  <main>
	{@render children()}
  </main>
  
  <style global>
	@import '../app.css';
  </style>