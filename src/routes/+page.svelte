<script lang="ts">
	import { type Guess, emptySheet, emptyPlayer } from '$lib/clues';
	import add from '$lib/add.svg?raw';
	import { persisted } from 'svelte-local-storage-store';

	let sheet = persisted('sheet', emptySheet());

	$: players = Object.entries($sheet);
	$: who = Object.keys($sheet[''].who);
	$: what = Object.keys($sheet[''].what);
	$: where = Object.keys($sheet[''].where);

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

	function toggleGuess(obj: Record<string, Guess>, key: string) {
		console.log('🚀 ~ file: +page.svelte:25 ~ toggleGuess ~ obj[key]:', obj[key]);
		switch (obj[key]) {
			case '':
				obj[key] = 'cross';
				break;
			case 'cross':
				obj[key] = 'question';
				break;
			case 'question':
				obj[key] = 'check';
				break;
			default:
				obj[key] = '';
				break;
		}
		$sheet = $sheet;
	}

	function addPlayer() {
		const name = window.prompt('Namn?');
		if (!name) return;
		$sheet = { ...$sheet, [name]: emptyPlayer() };
	}
</script>

<div class="sheet">
	<div class="row players">
		<div class="first">Spelare</div>
		{#each Object.entries($sheet) as [player]}
			<div class="guess">{player}</div>
		{/each}
		<div class="guess" on:click={addPlayer}>{@html add}</div>
	</div>

	<h3 class="first">Vem?</h3>

	{#each who as person}
		<div class="row">
			<div class="first"><span>{person}</span></div>
			{#each players as [_, clues]}
				<div class="guess" on:click={() => toggleGuess(clues.who, person)}>
					<span>{guessIcon(clues.who[person])}</span>
				</div>
			{/each}
		</div>
	{/each}

	<h3 class="first">Vad?</h3>

	{#each what as murderWeapon}
		<div class="row">
			<div class="first"><span>{murderWeapon}</span></div>
			{#each players as [_, clues]}
				<div class="guess" on:click={() => toggleGuess(clues.what, murderWeapon)}>
					<span>{guessIcon(clues.what[murderWeapon])}</span>
				</div>
			{/each}
		</div>
	{/each}

	<h3 class="first">Var?</h3>

	{#each where as location}
		<div class="row">
			<div class="first"><span>{location}</span></div>
			{#each players as [_, clues]}
				<div class="guess" on:click={() => toggleGuess(clues.where, location)}>
					<span>{guessIcon(clues.where[location])}</span>
				</div>
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
			font-size: 1.3em;
			text-transform: uppercase;
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
				min-width: 36px;
				min-height: 24px;
				align-items: center;
				justify-content: center;
			}

			&.players {
				.first {
					background-color: transparent;
					color: #eee;
					text-transform: uppercase;
					letter-spacing: 0.25em;
					font-size: 1.5em;
				}

				:nth-child(2) {
					background-color: transparent;
				}
			}
		}
	}
</style>
