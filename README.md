# R6 Operator Trainer

A complete offline operator-knowledge quiz built with plain HTML, CSS and JavaScript.

## Start the app

1. Open this folder.
2. Double-click `index.html`.
3. The app runs locally in Chrome or Edge — no installation is required.

## Included features

- All 77 operators from the supplied database
- All / Attack / Defence pools
- Every operator appears once before the pool reshuffles
- Clue order: Gadgets → Secondary weapons → Primary weapons → Unique ability
- 100 / 75 / 50 / 25 point scoring
- Custom operator-name suggestions
- Reveal answer and manual Next Operator controls
- Optional auto-advance, delay, sound and reduced-motion settings
- Current run score, best score, streak, best streak and accuracy
- Persistent local progress and lifetime statistics
- Per-operator accuracy and missed-operator tracking
- Searchable operator directory with full loadouts
- Stats export as JSON
- Desktop, laptop, tablet and phone layouts
- Built-in placeholders when images are missing
- Automatic support for PNG, WebP, AVIF, JPG and JPEG images

## Adding images

Images are optional. The quiz already looks complete without them.

Put images in these folders:

- `images/operators`
- `images/gadgets`
- `images/primary-weapons`
- `images/secondary-weapons`
- `images/abilities`

The filename must use the lower-case hyphenated name shown in `IMAGE-FILENAMES.txt`.
Any of these file types work: `.png`, `.webp`, `.avif`, `.jpg`, `.jpeg`.

Example:

- `Claymore` → `images/gadgets/claymore.avif`
- `R4-C` → `images/primary-weapons/r4-c.png`
- `Ash` → `images/operators/ash.webp`

## Important files

- `index.html` — page structure
- `style.css` — complete visual design and responsive layout
- `script.js` — quiz, navigation, statistics, settings and image handling
- `data/operators.js` — operator loadout database

## Validate the database (optional)

With Node.js installed, run:

```text
node tools/validate-data.js
```

It checks for missing fields and duplicate operator names.


## Included image assets

This build includes user-supplied image assets sorted into the correct folders. Striker and Sentry use a built-in flexible-loadout icon instead of dedicated ability pictures.


See `IMAGE-IMPORT-REPORT.txt` for image coverage details.
