export type Guess = '' | 'cross' | 'check' | 'question';

const emptyClue = {
	who: {
		'Greger Grön': '' as Guess,
		'Jack Senap': '' as Guess,
		'Doktor Orkidé': '' as Guess,
		'Patricia Påfågel': '' as Guess,
		'Viktor Plommon': '' as Guess,
		'Cassandra Scharlakan': '' as Guess
	} as const,
	what: {
		Ljusstake: '' as Guess,
		Dolk: '' as Guess,
		Blyrör: '' as Guess,
		Revolver: '' as Guess,
		Staty: '' as Guess,
		Gift: '' as Guess
	} as const,
	where: {
		Danssalongen: '' as Guess,
		Biljardrummet: '' as Guess,
		Vinterträdgården: '' as Guess,
		Matsalen: '' as Guess,
		Hallen: '' as Guess,
		Köket: '' as Guess,
		Biblioteket: '' as Guess,
		Vardagsrummet: '' as Guess,
		Arbetsrummet: '' as Guess
	} as const
};

function randomGuess(): Guess {
	const i = Math.random() * 100;
	if (i < 50) return '';
	if (i < 67) return 'cross';
	if (i < 84) return 'check';
	return 'question';
}

function randomGuesses(clues: Clues) {
	return {
		who: Object.fromEntries(Object.entries(clues.who).map(([name]) => [name, randomGuess()])),
		what: Object.fromEntries(Object.entries(clues.what).map(([name]) => [name, randomGuess()])),
		where: Object.fromEntries(Object.entries(clues.where).map(([name]) => [name, randomGuess()]))
	} as Clues;
}

export type Clues = typeof emptyClue;

export type Sheet = Record<string, Clues>;

export function testSheet(): Sheet {
	return {
		'': randomGuesses(emptyClue),
		A: randomGuesses(emptyClue),
		C: randomGuesses(emptyClue),
		K: randomGuesses(emptyClue)
	};
}
