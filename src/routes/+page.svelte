<script lang="ts">
	import { testSheet, type Clues, type Guess } from '$lib/clues';
	const sheet = testSheet();

	$: players = Object.entries(sheet);
	$: who = Object.keys(sheet[''].who);
	$: what = Object.keys(sheet[''].what);
	$: where = Object.keys(sheet[''].where);

	function guessIcon(guess: Guess) {
		switch (guess) {
			case 'check':
				return '✔️';
			case 'cross':
				return '❌';
			case 'question':
				return '❓';
			default:
				return '';
		}
	}
</script>

<div class="sheet">
	<div class="row">
		<div class="first players">Spelare</div>
		{#each Object.entries(sheet) as [player]}
			<div class="guess">{player}</div>
		{/each}
	</div>

	<h3 class="first">Vem?</h3>

	{#each who as person}
		<div class="row">
			<div class="first"><span>{person}</span></div>
			{#each players as [_, clues]}
				<div class="guess"><span>{guessIcon(clues.who[person])}</span></div>
			{/each}
		</div>
	{/each}

	<h3 class="first">Vad?</h3>

	{#each what as murderWeapon}
		<div class="row">
			<div class="first"><span>{murderWeapon}</span></div>
			{#each players as [_, clues]}
				<div class="guess"><span>{guessIcon(clues.what[murderWeapon])}</span></div>
			{/each}
		</div>
	{/each}

	<h3 class="first">Var?</h3>

	{#each where as location}
		<div class="row">
			<div class="first"><span>{location}</span></div>
			{#each players as [_, clues]}
				<div class="guess"><span>{guessIcon(clues.where[location])}</span></div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	:global(body) {
		font-family: 'Courier New', Courier, monospace;
		font-size: 12px;
		background-color: #999;
	}

	.sheet {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		h3 {
			margin: 0;
			padding: 0.15rem 0;
			background-color: #eee;
		}

		.players {
			text-transform: uppercase;
			font-weight: bold;
			letter-spacing: 0.25em;
			font-size: 1.17em;
		}

		.first {
			width: 120px;
			display: flex;
			align-items: center;
			padding-left: 0.15rem;
		}

		.row {
			display: flex;
			gap: 0.25rem;

			div {
				background-color: #eee;
			}

			.guess {
				display: flex;
				min-width: 48px;
				min-height: 24px;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
