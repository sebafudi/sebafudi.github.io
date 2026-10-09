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

Transparent cutouts on flat color carry the page. The recurring character is a brown tabby Maine Coon rendered from the GitHub avatar; every project and job gets one object.

```
[ hero (ink): name, one line, the cat rises from below    ]
[ intro (fog): four lines light up one at a time            ]
[ work (ink): pinned, five jobs crossfade with their object ]  the one bold moment
[ ai (fog): Autodev as a real sequence with approval gates  ]
[ yggdrasil (ink): the cable tree with parallax             ]
[ projects (fog): pinned strip, one object per project      ]
[ stack (fog): four plain lists                             ]
[ hackathons and education (paper): dated rows              ]
[ closing (ink): sleeping cat, LinkedIn button              ]
```

## Motion

- Intro: waits for the font and the decoded hero cat (at most 1.2 s), then fades in the bar, the headline and the cat together.
- Work: discrete beats from `pinnedProgress()`, one per job, with a faint progress bar while pinned.
- Projects: the strip snaps one object per step on wide screens; on narrow screens it is a native scroll-snap row.
- Hero and parallax values follow scroll through an eased chase.
- Reduced motion: every section renders in its finished state and nothing pins.

## Principles

- The cat and the objects do the talking. Each section has a headline and at most two short sentences.
- No eyebrows, no uppercase labels, no arrows on links, no middle-dot meta strings, no numbered markers. Dates mark the only real sequence.
- No people or hands in any image.
