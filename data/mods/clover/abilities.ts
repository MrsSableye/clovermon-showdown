export const Abilities: {[k: string]: ModdedAbilityData} = {
	/* Disabled abilities */
	asoneglastrier: {
		inherit: true,
		isNonstandard: "Past",
	},
	asonespectrier: {
		inherit: true,
		isNonstandard: "Past",
	},
	battlebond: {
		inherit: true,
		isNonstandard: "Past",
	},
	chillingneigh: {
		inherit: true,
		isNonstandard: "Past",
	},
	cottondown: {
		inherit: true,
		isNonstandard: "Past",
	},
	dauntlessshield: {
		inherit: true,
		isNonstandard: "Past",
	},
	desolateland: {
		inherit: true,
		isNonstandard: "Past",
	},
	dragonsmaw: {
		inherit: true,
		isNonstandard: "Past",
	},
	gorillatactics: {
		inherit: true,
		isNonstandard: "Past",
	},
	grimneigh: {
		inherit: true,
		isNonstandard: "Past",
	},
	gulpmissile: {
		inherit: true,
		isNonstandard: "Past",
	},
	honeygather: {
		inherit: true,
		isNonstandard: "Past",
	},
	hungerswitch: {
		inherit: true,
		isNonstandard: "Past",
	},
	iceface: {
		inherit: true,
		isNonstandard: "Past",
	},
	intrepidsword: {
		inherit: true,
		isNonstandard: "Past",
	},
	mimicry: {
		inherit: true,
		isNonstandard: "Past",
	},
	mirrorarmor: {
		inherit: true,
		isNonstandard: "Past",
	},
	mountaineer: {
		inherit: true,
		isNonstandard: "Future",
	},
	multitype: {
		inherit: true,
		isNonstandard: "Past",
	},
	noability: {
		inherit: true,
		isNonstandard: "Past",
	},
	parentalbond: {
		inherit: true,
		isNonstandard: "Past",
	},
	pastelveil: {
		inherit: true,
		isNonstandard: "Past",
	},
	perishbody: {
		inherit: true,
		isNonstandard: "Past",
	},
	persistent: {
		inherit: true,
		isNonstandard: "Future",
	},
	powerconstruct: {
		inherit: true,
		isNonstandard: "Past",
	},
	primordialsea: {
		inherit: true,
		isNonstandard: "Past",
	},
	propellertail: {
		inherit: true,
		isNonstandard: "Past",
	},
	punkrock: {
		inherit: true,
		isNonstandard: "Past",
	},
	ripen: {
		inherit: true,
		isNonstandard: "Past",
	},
	rkssystem: {
		inherit: true,
		isNonstandard: "Past",
	},
	sandspit: {
		inherit: true,
		isNonstandard: "Past",
	},
	schooling: {
		inherit: true,
		isNonstandard: "Past",
	},
	screencleaner: {
		inherit: true,
		isNonstandard: "Past",
	},
	shieldsdown: {
		inherit: true,
		isNonstandard: "Past",
	},
	stancechange: {
		inherit: true,
		isNonstandard: "Past",
	},
	steelyspirit: {
		inherit: true,
		isNonstandard: "Past",
	},
	transistor: {
		inherit: true,
		isNonstandard: "Past",
	},
	wanderingspirit: {
		inherit: true,
		isNonstandard: "Past",
	},
	zenmode: {
		inherit: true,
		isNonstandard: "Past",
	},
	/* Modified abilities */
	flowergift: {
		inherit: true,
		onAllyModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpD(spd, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
	},
	forecast: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.transformed) return;
			if (pokemon.baseSpecies.baseSpecies === 'Castform') {
				let forme = null;
				switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
					break;
				case 'raindance':
				case 'primordialsea':
					if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
					break;
				case 'hail':
					if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
					break;
				default:
					if (pokemon.species.id !== 'castform') forme = 'Castform';
					break;
				}
				if (pokemon.isActive && forme) {
					pokemon.formeChange(forme, this.effect, false, '[msg]');
				}
			} else if (pokemon.baseSpecies.baseSpecies === 'Acufront') {
				let forme = null;
				switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					if (pokemon.species.id !== 'acufrontf') forme = 'Acufront-F';
					break;
				case 'raindance':
				case 'primordialsea':
					if (pokemon.species.id !== 'acufrontw') forme = 'Acufront-W';
					break;
				case 'hail':
					if (pokemon.species.id !== 'acufronti') forme = 'Acufront-I';
					break;
				default:
					if (pokemon.species.id !== 'acufront') forme = 'Acufront';
					break;
				}
				if (pokemon.isActive && forme) {
					pokemon.formeChange(forme, this.effect, false, '[msg]');
				}
			}
		},
	},
	galewings: {
		inherit: true,
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying') return priority + 1;
		},
	},
	illuminate: {
		inherit: true,
		shortDesc: "This Pokemon's moves have their accuracy multiplied by 1.3.",
		rating: 3,
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('illuminate - enhancing accuracy');
			return this.chainModify([0x14CD, 0x1000]);
		},
	},
	liquidooze: {
		inherit: true,
		onSourceTryHeal(damage, target, source, effect) {
			this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
			const canOoze = ['drain', 'leechseed', 'strengthsap', 'livewire']; // TODO: Cap-only
			if (canOoze.includes(effect.id)) {
				this.damage(damage);
				return 0;
			}
		},
	},
	protean: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
	},
	soundproof: {
		inherit: true,
		onTryHit(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', target, '[from] ability: Soundproof');
				return null;
			}
		},
	},
	trace: {
		inherit: true,
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp) return;

			const additionalBannedAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode', 'zenmonke', // TODO: Cap-only
			];
			const possibleTargets = pokemon.adjacentFoes().filter(target => (
				!target.getAbility().isPermanent && !additionalBannedAbilities.includes(target.ability)
			));
			if (!possibleTargets.length) return;

			const target = this.sample(possibleTargets);
			const ability = target.getAbility();
			this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
			pokemon.setAbility(ability);
		},
	},
	wonderguard: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Wonder Guard');
				}
				return null;
			}
		},
	},
	/* Clover Exclusive Abilities */
	adminabuse: {
		inherit: true,
		isNonstandard: null,
	},
	anability: {
		inherit: true,
		isNonstandard: null,
	},
	anyability: {
		inherit: true,
		isNonstandard: null,
	},
	bigguy: {
		inherit: true,
		isNonstandard: null,
	},
	blademaster: {
		inherit: true,
		isNonstandard: null,
	},
	boombox: {
		inherit: true,
		isNonstandard: null,
	},
	bonezone: {
		inherit: true,
		isNonstandard: null,
	},
	concert: {
		inherit: true,
		isNonstandard: null,
	},
	degenerate: {
		inherit: true,
		isNonstandard: null,
	},
	degradation: {
		inherit: true,
		isNonstandard: null,
	},
	flareheal: {
		inherit: true,
		isNonstandard: null,
	},
	ghostnote: {
		inherit: true,
		isNonstandard: null,
	},
	gradient: {
		inherit: true,
		isNonstandard: null,
	},
	hydrophile: {
		inherit: true,
		isNonstandard: null,
	},
	inversion: {
		inherit: true,
		isNonstandard: null,
	},
	jewelry: {
		inherit: true,
		isNonstandard: null,
	},
	madman: {
		inherit: true,
		isNonstandard: null,
	},
	moreroom: {
		inherit: true,
		isNonstandard: null,
	},
	pollution: {
		inherit: true,
		isNonstandard: null,
	},
	pozzed: {
		inherit: true,
		isNonstandard: null,
	},
	puppeteer: {
		inherit: true,
		isNonstandard: null,
	},
	showerpower: {
		inherit: true,
		isNonstandard: null,
	},
	striker: {
		inherit: true,
		isNonstandard: null,
	},
	suddenly: {
		inherit: true,
		isNonstandard: null,
	},
	waitforit: {
		inherit: true,
		isNonstandard: null,
	},
	woke: {
		inherit: true,
		isNonstandard: null,
	},
	woodenguard: {
		inherit: true,
		isNonstandard: null,
	},
};
