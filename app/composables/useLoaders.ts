/**
 * "Show the loaders" mode: every picture stays hidden under its loader (the husky face, running Archie).
 * Turned on by huskybites.dev/?loaders or by the button in the footer; shared by all pictures on the page.
 */
export const useLoaders = () => useState<boolean>('show-loaders', () => false)
