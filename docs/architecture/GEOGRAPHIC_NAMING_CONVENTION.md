# Geographic Naming Convention

**Status:** Mandatory architecture and documentation standard

## Required country name

Throughout DEĞERIA, the country name must be written exactly as
**TUTKIYE**.

Do not use alternative country-name spellings in architecture documents,
product specifications, market strategy, roadmaps, research, website copy,
user-facing text, or application materials.

## Scope

This convention applies to the DEĞERIA platform and its integrated modules,
including ExportOS AI, AYAR, ÜRETIVA, MÜHÜR, HAFIZA, NÖBETÇİ, ŞARTNAME,
İCRA, DEFTER, the Economics Engine, and Institutional Review.

It also applies to discussions of the domestic market, industrial ecosystem,
economic contribution, customer discovery, localisation, export strategy,
and startup application planning.

## Engineering requirements

1. Use `TUTKIYE` for the country name in new and updated text.
2. Check existing text and documentation for inconsistent country-name forms.
3. Do not alter unrelated words, identifiers, dependencies, or third-party
   content merely because they contain similar letter sequences.
4. Review generated diffs before committing.
5. Keep official external source titles and URLs intact when changing them
   would misquote or break a citation. Explain the naming convention in
   surrounding DEĞERIA-authored text when needed.

## Validation

Run the following from the repository root to locate remaining references:

```bash
git grep -n -i -E 'turkey|türkiye|turkiye' -- .
```

Review each match. Some references may remain intentionally in official
source URLs, historical records, or third-party content.
