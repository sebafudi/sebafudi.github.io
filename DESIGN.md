# Design notes

Personal site for Sebastian Fudalej, served from `gh-pages` at sbfd.me. Vite builds `index.html`, `src/main.ts` and `src/style.css`; images and fonts live in `public/assets/`. Push to `master` runs `.github/workflows/deploy.yaml`.

## Tokens

| Token | Hex | Role |
| --- | --- | --- |
| Fog | `#E7E9E4` | Light sections. Cool grey-green, never cream |
| Paper | `#F5F6F2` | Raised surfaces on fog |
| Ink | `#1B1E21` | Dark sections and text |
| Slate | `#5C646B` | Secondary text on fog |
| Mist | `#A7AEB3` | Secondary text on ink |
| Amber | `#E5A83B` | The cat's eye. Only for the way to get in touch: the wordmark eye, the contact pill and the closing button |

Type: Bricolage Grotesque (self-hosted variable, latin and latin-ext) for everything. Display sizes run at 700 with tight tracking and the optical size axis at its largest; body text at 400.

## Layout

Transparent cutouts on flat color carry the page. The recurring character is my cat, a brown tabby Maine Coon; every project and job gets one object.

```
[ hero (ink): name, one line, the cat rises from below    ]
[ intro (fog): four lines light up one at a time            ]
[ work (ink): pinned list, newest first, focused job opens   ]  the one bold moment
[ ai (fog): Autodev as a real sequence with approval gates  ]
[ yggdrasil (ink): the cable tree with parallax             ]
[ projects (fog): pinned strip, one object per project      ]
[ stack (fog): four plain lists                             ]
[ hackathons (paper): dated rows, trophy                     ]
[ education (fog): dated rows, cap on books                  ]
[ closing (ink): sleeping cat, LinkedIn button              ]
```

## Motion

- Intro: waits for the font and the decoded hero cat (at most 1.2 s), then fades in the bar, the headline and the cat together.
- Work: every job stays on screen. Scroll picks one job per stretch (the first and last get longer stretches as headroom), and a continuous focus index eases toward it, driving each row's title scale, description reveal and clip; the list slides so the focus sits mid-screen and the objects crossfade with it.
- Projects: the strip snaps one object per step on wide screens, and a sideways wheel or trackpad swipe moves the page by the matching amount; on narrow screens it is a native scroll-snap row. A faded right edge shows there is more.
- Scroll cue: while a pinned section holds the screen, a large pill shows an outlined mouse with a drifting dot, the word Scroll and one dot per stop, the current one stretched. On the work section it sits under the object column.
- Hero and parallax values follow scroll through an eased chase.
- Reduced motion: every section renders in its finished state and nothing pins.

## Principles

- The cat and the objects do the talking. Each section has a headline and at most two short sentences.
- No eyebrows, no uppercase labels, no arrows on links, no middle-dot meta strings, no numbered markers. Dates mark the only real sequence.
- No people or hands in any image.
